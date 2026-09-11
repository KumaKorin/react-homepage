import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        reactRouter(),
        webfontDownload([
            'https://fonts.loli.net/css2?family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
        ])
    ]
})
