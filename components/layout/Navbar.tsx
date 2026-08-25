'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [pastHero, setPastHero] = useState(false)

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Hero is exactly one viewport tall — show navbar only after scrolling past it
      setScrolled(y > 60)
      setPastHero(y > window.innerHeight * 0.85)
    }
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
        animate={{ y: pastHero ? 0 : -72, opacity: pastHero ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: pastHero ? 'auto' : 'none' }}
      >
        <div
          className="relative flex items-center gap-0.5 px-1.5 py-1.5 border backdrop-blur-2xl transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(7,11,18,0.92)' : 'rgba(7,11,18,0.65)',
            borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            borderRadius: '3px',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.4)',
          }}
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
                  className="relative block px-3 py-1.5 sm:px-4 group"
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-150 pointer-events-none" style={{ borderRadius: '2px' }} />

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: '2px',
                      }}
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.52 }}
                    />
                  )}

                  <span
                    className="relative z-10 text-[10px] font-mono tracking-[0.2em] select-none transition-colors duration-200 uppercase"
                    style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)' }}
                  >
                    {link.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
                      style={{ background: 'rgba(255,255,255,0.6)' }}
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
