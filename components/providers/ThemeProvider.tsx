'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: string) => void
}

const ThemeCtx = createContext<ThemeContextValue>({
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeCtx)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      setThemeState('light')
    } else if (stored === 'dark') {
      setThemeState('dark')
    } else {
      // Respect system preference; default to dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(prefersDark ? 'dark' : 'light')
    }
  }, [])

  const setTheme = useCallback((next: string) => {
    const t = next === 'light' ? 'light' : 'dark'
    setThemeState(t)
    localStorage.setItem('theme', t)
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(t)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}
