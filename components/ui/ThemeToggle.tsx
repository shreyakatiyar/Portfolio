'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="fixed bottom-6 right-6 z-50 w-12 h-12">
      {/* Pulsing attention ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}
        style={{
          background: isDark ? 'rgba(59,130,246,0.42)' : 'rgba(37,99,235,0.32)',
        }}
      />

      <motion.button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl"
        style={{
          background: isDark
            ? 'rgba(15, 23, 42, 0.92)'
            : 'rgba(248, 250, 252, 0.95)',
          border: isDark
            ? '1.5px solid rgba(99,130,246,0.40)'
            : '1.5px solid rgba(37,99,235,0.40)',
          boxShadow: isDark
            ? '0 8px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.14), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 8px 28px rgba(0,0,0,0.18), 0 0 0 1px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
        whileHover={{
          scale: 1.12,
          boxShadow: isDark
            ? '0 8px 32px rgba(59,130,246,0.50), 0 0 0 1px rgba(59,130,246,0.30)'
            : '0 8px 32px rgba(37,99,235,0.35), 0 0 0 1px rgba(37,99,235,0.30)',
        }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
