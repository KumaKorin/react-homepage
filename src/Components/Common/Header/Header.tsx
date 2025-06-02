import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillSun, AiFillMoon, AiFillHome, AiFillMessage } from 'react-icons/ai'
import { MdArticle } from 'react-icons/md'
import { FaLink } from 'react-icons/fa'
import { profile } from '../../../profile'

import style from './Header.module.css'

const Header: React.FC = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
    }

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    })

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        document.body.className = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50) // 当滚动超过 50px 时，设置为 true
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (themeToggle.current) {
            themeToggle.current.setAttribute(
                'aria-label',
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            )
        }
    }, [theme])

    const themeToggle = useRef<HTMLButtonElement | null>(null)
    const handleThemeToggle = () => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))

    return (
        <nav className={`${style.nav} ${isScrolled ? style.scrolled : ''}`}>
            <div className={style.nav_wrapper}>
                <div className={style.nav_title}>
                    <Link className={style.nav_logo} to="/">
                        {profile.sitename}
                    </Link>
                </div>
                <div className={style.nav_itemsList}>
                    <Link
                        className={`${style.nav_item} ${currentPath === '/' ? style.active : ''}`}
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <AiFillHome /> Home
                    </Link>
                    <Link
                        className={`${style.nav_item} ${currentPath === '/blog' ? style.active : ''}`}
                        to="/blog"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <MdArticle /> Blog
                    </Link>
                    <Link
                        className={`${style.nav_item} ${currentPath === '/state' ? style.active : ''}`}
                        to="/state"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <AiFillMessage /> State
                    </Link>
                    <Link
                        className={`${style.nav_item} ${currentPath === '/links' ? style.active : ''}`}
                        to="/links"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <FaLink /> Links
                    </Link>
                    <button
                        className={`${style.nav_item} ${style.nav_toggle}`}
                        ref={themeToggle}
                        onClick={handleThemeToggle}
                    >
                        {theme === 'light' ? <AiFillMoon /> : <AiFillSun />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header
