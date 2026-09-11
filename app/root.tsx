import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { ReactNode } from 'react'
import '../src/Style/Main.css'

export function links() {
    return [
        {
            rel: 'icon',
            href: 'https://i1.mcobj.com/blog/2021/10/cropped-20210402_6287886e90680-192x192.png',
            sizes: '192x192'
        }
    ]
}

export function meta() {
    return [{ title: 'KumaKorin' }]
}

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="zh-CN">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}
