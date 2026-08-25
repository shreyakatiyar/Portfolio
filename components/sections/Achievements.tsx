'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '@/lib/data'

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// 6 cards in a 3-col grid: large (span-2) and small (span-1) alternating
// Row 1: [1:span-2] [2:span-1]
// Row 2: [3:span-1] [4:span-2]
// Row 3: [5:span-1] [6:span-2]
const SPANS = [2, 1, 1, 2, 1, 2]

export default function Achievements() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="section-padding relative overflow-hidden" style={{ background: '#070b12' }}>
      {/* Film grain */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '160px 160px' }} />

      {/* Faint background word */}
      <div aria-hidden className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-black uppercase leading-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.02em' }}>
          MILESTONES
        </span>
      </div>

      <div ref={ref} className="container-width relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-[10px] tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.22)' }}>05 / ACHIEVEMENTS</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* Heading + sub-row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 select-none">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.08, ease }}
                className="font-black uppercase tracking-tight text-white"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 5.5rem)', lineHeight: 0.86 }}
              >What I&apos;ve</motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.16, ease }}
                className="font-black uppercase tracking-tight"
                style={{
                  fontSize: 'clamp(2.6rem, 5vw, 5.5rem)', lineHeight: 0.86,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.17)',
                }}
              >Accomplished</motion.h2>
            </div>
          </div>

          {/* Sub-label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-sm leading-[1.8] lg:text-right"
            style={{ color: 'rgba(255,255,255,0.28)', maxWidth: '280px' }}
          >
            Six milestones across performance,<br className="hidden lg:block" /> product, and craft.
          </motion.p>
        </div>

        {/* ── Bento grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {achievements.map((ach, i) => (
            <AchCard
              key={ach.id}
              achievement={ach}
              index={i}
              span={SPANS[i]}
              isInView={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function AchCard({
  achievement, index, span, isInView,
}: {
  achievement: (typeof achievements)[0]
  index: number
  span: number
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')
  const d   = (index % 3) * 0.06 + Math.floor(index / 3) * 0.1
  const isLarge = span === 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + d, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col overflow-hidden ${isLarge ? 'lg:col-span-2' : 'lg:col-span-1'}`}
      style={{
        padding: isLarge ? '2.5rem' : '2rem',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '3px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        minHeight: isLarge ? '260px' : '220px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index */}
      <div className="flex items-center justify-between mb-auto">
        <span className="text-[9px] font-mono tracking-[0.5em]"
          style={{ color: 'rgba(255,255,255,0.2)' }}>{num}</span>
      </div>

      {/* Metric — the visual hero */}
      <div className="overflow-hidden mt-10 mb-4">
        <motion.p
          initial={{ y: '105%' }}
          animate={isInView ? { y: 0 } : { y: '105%' }}
          transition={{ duration: 0.7, delay: 0.22 + d, ease }}
          className="font-black uppercase tracking-tight text-white leading-none"
          style={{ fontSize: isLarge ? 'clamp(2.4rem, 4.5vw, 4rem)' : 'clamp(1.9rem, 3vw, 2.8rem)' }}
        >{achievement.metric}</motion.p>
      </div>

      {/* Thin rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3 + d, ease }}
        className="h-px mb-4"
        style={{ background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
      />

      {/* Title */}
      <h3
        className="text-sm font-semibold mb-2 transition-colors duration-200"
        style={{ color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)' }}
      >{achievement.title}</h3>

      {/* Description */}
      <p className="text-xs leading-[1.85]"
        style={{ color: 'rgba(255,255,255,0.25)' }}>
        {achievement.description}
      </p>
    </motion.div>
  )
}
