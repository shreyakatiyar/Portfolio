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
        animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />

      <motion.button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative w-12 h-12 flex items-center justify-center backdrop-blur-xl"
        style={{
          background: isDark ? 'rgba(7,11,18,0.92)' : 'rgba(248,250,252,0.95)',
          border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(0,0,0,0.12)',
          borderRadius: '3px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
        whileHover={{
          scale: 1.12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.18)',
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
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
