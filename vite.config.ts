import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        webfontDownload([
            'https://fonts.loli.net/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
            'https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Medium.min.css',
            'https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Bold.min.css'
        ])
    ]
})
