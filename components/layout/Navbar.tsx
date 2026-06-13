'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4, rootMargin: '-80px 0px -80px 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── Desktop floating pill ─────────────────────────────── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Outer pill — glass capsule */}
        <div
          className={cn(
            'relative flex items-center gap-0.5 px-2 py-1.5 rounded-full border transition-all duration-500',
            scrolled
              ? 'bg-slate-900/90 backdrop-blur-2xl border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]'
              : 'bg-slate-900/55 backdrop-blur-xl border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
          )}
        >
          {navLinks.map((link, i) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative block px-4 py-1.5 rounded-full group"
                >
                  {/* Hover bg — plain CSS transition, no layoutId conflict */}
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-150 pointer-events-none" />

                  {/* Sliding active pill — the unique indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'linear-gradient(135deg,rgba(59,130,246,0.22) 0%,rgba(96,165,250,0.13) 100%)',
                        border: '1px solid rgba(59,130,246,0.38)',
                        boxShadow: '0 0 18px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                      }}
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.52 }}
                    />
                  )}

                  {/* Label */}
                  <span
                    className={cn(
                      'relative z-10 text-sm font-medium select-none transition-colors duration-200',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  >
                    {link.label}
                  </span>

                  {/* Active dot — slides with layoutId separately for extra flair */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-blue-400"
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.52 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.nav>
      </div>

      {/* ── Mobile button (top-right floating pill) ──────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        className="fixed top-5 right-5 z-50 md:hidden"
      >
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-slate-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* ── Mobile dropdown ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 right-5 z-40 min-w-[160px] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)] md:hidden overflow-hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'block px-4 py-2.5 text-sm rounded-xl transition-all duration-200',
                      isActive
                        ? 'text-white bg-blue-500/15 border border-blue-500/20 font-medium'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
