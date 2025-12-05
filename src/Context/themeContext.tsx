import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx {
    theme: Theme
    setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme')
        return saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light'
    })

    useEffect(() => {
        document.body.className = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
    return ctx
}
