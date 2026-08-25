'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]

const stack = [
  'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Framer Motion', 'JavaScript', 'HTML / CSS', 'Git',
]

const stats = [
  { value: '1+',  label: 'YEARS\nEXPERIENCE'  },
  { value: '15+', label: 'PROJECTS\nDELIVERED'  },
  { value: '10+', label: 'TECH\nMASTERED'        },
  { value: '5★',  label: 'CLIENT\nSATISFACTION' },
]

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function About() {
  const ref    = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#070b12' }}
    >
      {/* Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '160px 160px' }}
      />

      <div className="container-width">
        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.22)' }}>02 / ABOUT</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-24 items-start">

          {/* ══ LEFT — Content ══ */}
          <div className="flex flex-col gap-10">

            {/* Heading */}
            <div className="select-none">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '102%' }}
                  animate={isInView ? { y: 0 } : { y: '102%' }}
                  transition={{ duration: 0.85, delay: 0.1, ease }}
                  className="font-black uppercase tracking-tight text-white"
                  style={{ fontSize: 'clamp(3rem, 5.5vw, 6.2rem)', lineHeight: 0.84 }}
                >Crafting</motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '102%' }}
                  animate={isInView ? { y: 0 } : { y: '102%' }}
                  transition={{ duration: 0.85, delay: 0.19, ease }}
                  className="font-black uppercase tracking-tight"
                  style={{
                    fontSize: 'clamp(3rem, 5.5vw, 6.2rem)', lineHeight: 0.84,
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.17)',
                  }}
                >Experiences</motion.p>
              </div>
              <div className="overflow-hidden mt-3">
                <motion.p
                  initial={{ y: '102%' }}
                  animate={isInView ? { y: 0 } : { y: '102%' }}
                  transition={{ duration: 0.6, delay: 0.28, ease }}
                  className="text-[10px] font-mono tracking-[0.45em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >One pixel at a time</motion.p>
              </div>
            </div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-4"
              style={{ maxWidth: '500px' }}
            >
              <p className="text-sm leading-[1.95]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                I&apos;m a{' '}
                <span style={{ color: 'rgba(255,255,255,0.8)' }} className="font-semibold">
                  Frontend Developer
                </span>{' '}
                who cares deeply about the craft — not just making things work,
                but making them feel{' '}
                <em style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>right</em>.
                I specialize in React &amp; Next.js, with a designer&apos;s eye for every pixel.
              </p>
              <p className="text-sm leading-[1.95]" style={{ color: 'rgba(255,255,255,0.26)' }}>
                Currently shipping healthcare e-commerce at{' '}
                <a
                  href="https://www.linkedin.com/company/medicloudglobal/?originalSubdomain=in"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(147,197,253,0.6)' }}
                >
                  MediCloud Global <ArrowUpRight className="w-3 h-3" />
                </a>.
                Fast load times, clean code, interfaces that feel inevitable.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.44, ease }}
              className="h-px"
              style={{ background: 'rgba(255,255,255,0.06)', transformOrigin: 'left' }}
            />

            {/* Stack — badge pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span
                className="block mb-4 text-[10px] font-mono tracking-[0.4em] select-none"
                style={{ color: 'rgba(255,255,255,0.18)' }}
              >STACK</span>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.56 + i * 0.055 }}
                    className="px-3 py-1.5 text-[11px] font-mono tracking-[0.12em]"
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '2px',
                    }}
                  >{tech}</motion.span>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="h-px"
              style={{ background: 'rgba(255,255,255,0.06)', transformOrigin: 'left' }}
            />

            {/* Availability + education */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.76 }}
              className="flex flex-wrap items-center gap-6 select-none"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em]"
                  style={{ color: 'rgba(255,255,255,0.32)' }}>AVAILABLE FOR WORK</span>
              </div>
              <span className="h-3 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span className="text-[10px] font-mono tracking-[0.3em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}>B.TECH · COMPUTER SCIENCE</span>
            </motion.div>

          </div>

          {/* ══ RIGHT — Photo (sticky on desktop) ══ */}
          <div className="lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.05, delay: 0.18, ease }}
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/5',
                clipPath: 'polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)',
              }}
            >
              <Image
                src="/abt.png"
                alt="Shreya Katiyar"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-top"
                style={{ filter: 'brightness(0.82) contrast(1.07) saturate(0.85)' }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
                style={{ background: 'linear-gradient(to top, #070b12 0%, transparent 100%)' }}
              />
              {/* Inset frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}
              />

              {/* Overlaid label inside photo bottom-left */}
              <div className="absolute bottom-4 left-5 z-10 select-none">
                <p className="text-[9px] font-mono tracking-[0.4em]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>SHREYA KATIYAR</p>
                <p className="text-[9px] font-mono tracking-[0.35em] mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.2)' }}>INDIA · 2025</p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.88 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.07 }}
              className="relative flex flex-col justify-between overflow-hidden"
              style={{
                padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.055)',
                borderRadius: '4px',
                minHeight: '130px',
              }}
            >
              {/* Faint index watermark */}
              <span
                className="absolute font-black pointer-events-none select-none leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem',
                  color: 'rgba(255,255,255,0.025)',
                  right: '-0.5rem',
                  bottom: '-1rem',
                  lineHeight: 1,
                }}
              >{String(i + 1).padStart(2, '0')}</span>

              {/* Label at top */}
              <span
                className="font-mono text-[8px] tracking-[0.45em] uppercase"
                style={{ color: 'rgba(255,255,255,0.22)', whiteSpace: 'pre-line', lineHeight: 1.7 }}
              >{label}</span>

              {/* Big value at bottom */}
              <span
                className="font-black tracking-tight leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                  color: '#fff',
                  marginTop: '0.75rem',
                }}
              >{value}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
