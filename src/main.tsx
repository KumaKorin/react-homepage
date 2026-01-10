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

// 等待字体和头像加载完成再渲染页面，避免闪烁
Promise.all([document.fonts.ready, preloadImage(profile.image)])
    .then(() => {
        root.render(<App />)
    })
    .catch(err => {
        console.error('Resources loading failed:', err)
        root.render(<App />)
    })
