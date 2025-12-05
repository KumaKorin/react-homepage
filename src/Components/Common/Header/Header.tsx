import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillSun, AiFillMoon, AiFillHome } from 'react-icons/ai'
import { MdArticle } from 'react-icons/md'
// import { FaNoteSticky } from 'react-icons/fa6'
import { FaLink } from 'react-icons/fa'
import { profile } from '../../../profile'
import { useTheme } from '../../../Context/themeContext'

import style from './Header.module.css'

const Header: React.FC = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const isMicrosoftEdge = /Edg\/\d+/.test(navigator.userAgent)

    const { theme, setTheme } = useTheme()
    const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light')

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

    return (
        <nav
            className={`${style.nav} ${
                isScrolled && !isMicrosoftEdge
                    ? style.scrolled
                    : isScrolled && isMicrosoftEdge
                    ? style.edgeScrolled
                    : ''
            }`}
        >
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
                    {/* <Link
                        className={`${style.nav_item} ${currentPath === '/state' ? style.active : ''}`}
                        to="/state"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <FaNoteSticky /> State
                    </Link> */}
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
