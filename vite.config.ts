import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        webfontDownload([
            'https://fonts.loli.net/css2?family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
            'https://font.assets.mcobj.com/fonts/misans/face.css'
        ])
    ]
})
