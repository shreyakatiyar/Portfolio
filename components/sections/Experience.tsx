'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { experiences } from '@/lib/data'

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type Exp = (typeof experiences)[0]

export default function Experience() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section-padding relative overflow-hidden" style={{ background: '#070b12' }}>
      {/* Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '160px 160px' }}
      />

      <div ref={ref} className="container-width">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.22)' }}>02 / EXPERIENCE</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* Heading */}
        <div className="mb-20 select-none">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '102%' }}
              animate={isInView ? { y: 0 } : { y: '102%' }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              className="font-black uppercase tracking-tight text-white"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 5.5rem)', lineHeight: 0.86 }}
            >Where I&apos;ve</motion.h2>
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
            >Worked</motion.h2>
          </div>
        </div>

        {/* Chronicle entries */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {experiences.map((exp, i) => (
            <ExperienceEntry key={exp.id} exp={exp} index={i} flipped={i % 2 === 1} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────── */

function ExperienceEntry({ exp, index, flipped = false }: { exp: Exp; index: number; flipped?: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const num    = String(index + 1).padStart(2, '0')
  const d      = 0.06 * index   // stagger base

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Hover tint */}
      <motion.div
        initial={false}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.012)' }}
      />

      {/* ══ DESKTOP — FLIPPED layout (left: number+meta / right: content) ══ */}
      {flipped && (
        <div className="hidden lg:grid relative z-10 py-14" style={{ gridTemplateColumns: '40% 60%', gap: '3rem' }}>

          {/* LEFT: faint big number + meta info */}
          <div className="relative flex flex-col gap-6 pt-1">
            {/* Big faint number */}
            <div
              aria-hidden
              className="absolute left-0 top-0 font-black pointer-events-none select-none"
              style={{ fontSize: 'clamp(7rem, 16vw, 14rem)', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
            >{num}</div>

            {/* Meta — pushed to bottom of the left col */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + d }}
              className="relative z-10 flex flex-col gap-3 mt-auto"
              style={{ paddingTop: 'clamp(4rem, 10vw, 7rem)' }}
            >
              <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.52)' }}>{exp.duration}</span>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[10px] font-mono tracking-[0.15em]"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.38)', borderRadius: '2px' }}
                >{exp.type}</span>
                <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.22)' }}>{exp.location}</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: all the content */}
          <EntryContent exp={exp} inView={inView} num={num} d={d} />
        </div>
      )}

      {/* ══ DESKTOP — NORMAL layout (full-width content, big number right) ══ */}
      {!flipped && (
        <div className="hidden lg:block relative z-10 py-14">
          {/* Big faint number on right */}
          <div
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none"
            style={{ fontSize: 'clamp(7rem, 18vw, 16rem)', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
          >{num}</div>

          {/* Top row: role + company (left) / meta (right) */}
          <div className="flex items-start justify-between gap-16 mb-8">
            <IndexAndRole exp={exp} inView={inView} num={num} d={d} />
            <Meta exp={exp} inView={inView} d={d} align="right" />
          </div>
          <Divider inView={inView} d={d} />
          <Description exp={exp} inView={inView} d={d} />
          <TechPills exp={exp} inView={inView} d={d} />
        </div>
      )}

      {/* ══ MOBILE — always stacked ══ */}
      <div className="lg:hidden relative z-10 py-10">
        <div className="flex flex-col gap-5 mb-7">
          <IndexAndRole exp={exp} inView={inView} num={num} d={d} />
          <Meta exp={exp} inView={inView} d={d} align="left" />
        </div>
        <Divider inView={inView} d={d} />
        <Description exp={exp} inView={inView} d={d} />
        <TechPills exp={exp} inView={inView} d={d} />
      </div>

    </div>
  )
}

/* ── Shared sub-components ── */

function EntryContent({ exp, inView, num, d }: { exp: Exp; inView: boolean; num: string; d: number }) {
  return (
    <div>
      <div className="mb-8">
        <IndexAndRole exp={exp} inView={inView} num={num} d={d} />
      </div>
      <Divider inView={inView} d={d} />
      <Description exp={exp} inView={inView} d={d} />
      <TechPills exp={exp} inView={inView} d={d} />
    </div>
  )
}

function IndexAndRole({ exp, inView, num, d }: { exp: Exp; inView: boolean; num: string; d: number }) {
  return (
    <div className="flex-1 min-w-0">
      {/* Small index + CURRENT pill */}
      <div className="flex items-center gap-3 mb-3">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.08 + d }}
          className="text-[10px] font-mono tracking-[0.45em] tabular-nums"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >{num}</motion.span>

        {exp.current && (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.18 + d }}
            className="flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono tracking-[0.2em]"
            style={{ border: '1px solid rgba(52,211,153,0.22)', background: 'rgba(52,211,153,0.04)', color: 'rgba(52,211,153,0.75)', borderRadius: '2px' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-55" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            CURRENT
          </motion.span>
        )}
      </div>

      {/* Role — mask reveal */}
      <div className="overflow-hidden mb-2">
        <motion.h3
          initial={{ y: '105%' }}
          animate={inView ? { y: 0 } : { y: '105%' }}
          transition={{ duration: 0.72, delay: 0.12 + d, ease }}
          className="font-black uppercase tracking-tight text-white"
          style={{ fontSize: 'clamp(1.55rem, 3vw, 2.6rem)', lineHeight: 0.9 }}
        >{exp.role}</motion.h3>
      </div>

      {/* Company */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.22 + d }}
      >
        {exp.companyUrl && exp.companyUrl !== '#' ? (
          <a
            href={exp.companyUrl}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-65"
            style={{ color: exp.companyColor }}
          >
            {exp.company}
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
          </a>
        ) : (
          <span className="text-sm font-semibold" style={{ color: exp.companyColor }}>{exp.company}</span>
        )}
      </motion.div>
    </div>
  )
}

function Meta({ exp, inView, d, align }: { exp: Exp; inView: boolean; d: number; align: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.2 + d }}
      className={`flex flex-col gap-2.5 flex-shrink-0 ${align === 'right' ? 'text-right items-end' : 'text-left items-start'}`}
    >
      <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.52)' }}>{exp.duration}</span>
      <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
        <span
          className="px-2 py-0.5 text-[10px] font-mono tracking-[0.15em]"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.38)', borderRadius: '2px' }}
        >{exp.type}</span>
        <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.22)' }}>{exp.location}</span>
      </div>
    </motion.div>
  )
}

function Divider({ inView, d }: { inView: boolean; d: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + d, ease }}
      className="h-px mb-7"
      style={{ background: 'rgba(255,255,255,0.05)', transformOrigin: 'left' }}
    />
  )
}

function Description({ exp, inView, d }: { exp: Exp; inView: boolean; d: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.33 + d }}
      className="text-sm leading-[1.95] mb-7"
      style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '620px' }}
    >{exp.description}</motion.p>
  )
}

function TechPills({ exp, inView, d }: { exp: Exp; inView: boolean; d: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.42 + d }}
      className="flex flex-wrap gap-2"
    >
      {exp.tech.map((t, ti) => (
        <motion.span
          key={t}
          initial={{ opacity: 0, y: 5 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.46 + d + ti * 0.04 }}
          className="px-2.5 py-1 text-[11px] font-mono tracking-[0.1em]"
          style={{ color: 'rgba(255,255,255,0.38)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px' }}
        >{t}</motion.span>
      ))}
    </motion.div>
  )
}
