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

  // The site is designed dark-only (hardcoded dark section backgrounds), so the
  // theme is locked to dark — light mode made text invisible on those sections.
  const setTheme = useCallback((_next: string) => {
    setThemeState('dark')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}
