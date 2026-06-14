'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { fadeUp } from '@/lib/variants'

const stack = ['React.js', 'Next.js','Javascript',  'Tailwind CSS','TypeScript', 'Framer Motion']

const bentoStats = [
  { value: '1+', label: 'Yrs Experience', accent: '#3B82F6' },
  { value: '5+', label: 'Projects Shipped', accent: '#8B5CF6' },
  { value: '10+', label: 'Technologies', accent: '#06B6D4' },
  { value: '100%', label: 'Passion for UI', accent: '#10B981' },
]

const personality = [
  { emoji: '🎨', text: 'Design-minded' },
  { emoji: '⚡', text: 'Performance-first' },
  { emoji: '🔄', text: 'Always Learning' },
  { emoji: '☕', text: 'Coffee-fueled' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute -right-20 top-1/4 w-[500px] h-[500px] orb orb-indigo opacity-15 pointer-events-none" />

      <div ref={ref} className="container-width">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-slate-50 text-sm font-mono">01.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">About Me</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Left column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Card 1: Main intro */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 overflow-hidden flex-1"
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
              {/* Dot matrix texture */}
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(148,163,184,1) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl xl:text-[2.6rem] font-bold leading-[1.1] mb-5">
                  Crafting{' '}
                  <span className="gradient-text-accent">digital experiences</span>
                  <br />that matter
                </h2>
                <div className="space-y-3 text-slate-400 text-[15px] leading-relaxed max-w-[520px] mb-6">
                  <p>
                    I&apos;m a{' '}
                    <span className="text-slate-100 font-semibold">Frontend Developer</span>{' '}
                    with 1+ year building production-grade web applications. I specialize in React.js
                    and Next.js, bringing a designer&apos;s eye and engineer&apos;s precision to every project.
                  </p>
                  <p>
                    I thrive at the intersection of{' '}
                    <span className="text-slate-200 font-medium">great UX and clean code</span>{' '}
                    — building interfaces that feel fast, intuitive, and delightful.
                  </p>
                </div>
                {/* Stack chips */}
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      className="px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bottom row: Currently + Stats 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Card 3: Currently building */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-3">Currently</p>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                  </span>
                  <span className="text-slate-100 font-semibold text-sm">Building in production</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Frontend Dev at{' '}
                  <a
                    href="https://www.linkedin.com/company/medicloudglobal/?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-medium hover:underline inline-flex items-center gap-0.5"
                  >
                    MediCloud Global <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                  {' '}— shipping healthcare e-commerce at scale.
                </p>
              </motion.div>

              {/* Card 4: Stats 2×2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="grid grid-cols-2 gap-3"
              >
                {bentoStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.38 + i * 0.08, duration: 0.5 }}
                    className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/30 text-center"
                  >
                    <div className="text-xl font-bold leading-none mb-1" style={{ color: s.accent }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Card 2: Profile photo — animated border wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="img-animated-border rounded-3xl p-[1px] flex-1"
              style={{ minHeight: '340px' }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[23px]" style={{ minHeight: '338px' }}>
                <Image
                  src="/abt.png"
    
                  alt="Shreya Katiyar"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                {/* Blue tint */}
                <div className="absolute inset-0 bg-blue-950/15" />
                {/* Name + available badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
 
                      <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        India 
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Personality / vibe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-4">My vibe</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {personality.map((p) => (
                  <div key={p.text} className="flex items-center gap-2">
                    <span className="text-base">{p.emoji}</span>
                    <span className="text-slate-300 text-xs font-medium">{p.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-slate-500 text-xs">
                  When I&apos;m not coding, I&apos;m exploring web animation, design systems, and frontend architecture.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
