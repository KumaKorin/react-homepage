import ReactDOM from 'react-dom/client'
import './Style/Main.css'
import App from './App'
import { profile } from './profile'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
    })
}

const loadFonts = async () => {
    try {
        await Promise.all([
            document.fonts.load('1em MiSans'),
            document.fonts.load('bold 1em MiSans'),
            document.fonts.load("1em 'Roboto Mono'"),
            document.fonts.load("italic 700 1em 'Roboto Mono'")
        ])
        await document.fonts.ready
    } catch (e) {
        console.warn('Font loading warning:', e)
    }
}

// 等待所有资源（字体 + 头像）就绪
Promise.all([loadFonts(), preloadImage(profile.image)])
    .then(() => {
        root.render(<App />)
    })
    .catch(err => {
        console.error('Resources loading failed:', err)
        root.render(<App />)
    })
