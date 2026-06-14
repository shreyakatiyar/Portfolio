'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="pointer-events-auto"
      >
        <div
          className={cn(
            'relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border transition-all duration-500',
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
                  className="relative block px-3 py-1.5 sm:px-4 rounded-full group"
                >
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-150 pointer-events-none" />

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg,rgba(59,130,246,0.22) 0%,rgba(96,165,250,0.13) 100%)',
                        border: '1px solid rgba(59,130,246,0.38)',
                        boxShadow: '0 0 18px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                      }}
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.52 }}
                    />
                  )}

                  <span
                    className={cn(
                      'relative z-10 text-xs sm:text-sm font-medium select-none transition-colors duration-200',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  >
                    {link.label}
                  </span>

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
  )
}
