import { PassThrough } from 'node:stream'
import type { EntryContext, RouterContextProvider } from 'react-router'
import { createReadableStreamFromReadable } from '@react-router/node'
import { ServerRouter } from 'react-router'
import type { RenderToPipeableStreamOptions } from 'react-dom/server'
import { renderToPipeableStream } from 'react-dom/server'

export const streamTimeout = 5_000

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    routerContext: EntryContext,
    _loadContext: RouterContextProvider
) {
    if (request.method.toUpperCase() === 'HEAD') {
        return new Response(null, {
            status: responseStatusCode,
            headers: responseHeaders
        })
    }

    return new Promise<Response>((resolve, reject) => {
        let shellRendered = false
        let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(() => abort(), streamTimeout + 1000)
        const readyOption: keyof RenderToPipeableStreamOptions = 'onShellReady'

        const { pipe, abort } = renderToPipeableStream(<ServerRouter context={routerContext} url={request.url} />, {
            [readyOption]() {
                shellRendered = true
                const body = new PassThrough({
                    final(callback) {
                        clearTimeout(timeoutId)
                        timeoutId = undefined
                        callback()
                    }
                })
                const stream = createReadableStreamFromReadable(body)

                responseHeaders.set('Content-Type', 'text/html')
                pipe(body)

                resolve(
                    new Response(stream, {
                        headers: responseHeaders,
                        status: responseStatusCode
                    })
                )
            },
            onShellError(error: unknown) {
                reject(error)
            },
            onError(error: unknown) {
                responseStatusCode = 500
                if (shellRendered) {
                    console.error(error)
                }
            }
        })
    })
}
