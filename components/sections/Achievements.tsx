'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '@/lib/data'
import { fadeUp } from '@/lib/variants'
import { cn } from '@/lib/utils'

const colorConfig: Record<string, { card: string; metric: string; glow: string }> = {
  terra: {
    card: 'hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]',
    metric: 'text-blue-400',
    glow: 'bg-blue-500/10',
  },
  olive: {
    card: 'hover:border-slate-500/30 hover:shadow-[0_8px_30px_rgba(148,163,184,0.08)]',
    metric: 'text-slate-300',
    glow: 'bg-slate-700/50',
  },
  lav: {
    card: 'hover:border-slate-600/25 hover:shadow-[0_8px_30px_rgba(148,163,184,0.06)]',
    metric: 'text-slate-400',
    glow: 'bg-slate-700/30',
  },
}

const currently = [
  { label: 'System Design', emoji: '&#127959;' },
  { label: 'WebGL & Three.js', emoji: '&#127760;' },
  { label: 'Rust', emoji: '&#9881;' },
  { label: 'Web Performance', emoji: '&#9889;' },
  { label: 'Open Source', emoji: '&#11088;' },
]

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="section-padding relative">
      <div className="absolute right-1/4 top-1/2 w-[400px] h-[400px] orb orb-violet opacity-15" />

      <div ref={ref} className="container-width">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-slate-50 text-sm font-mono">05.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Achievements</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I&apos;ve{' '}
            <span className="gradient-text-accent">accomplished</span>
          </h2>
          <p className="text-slate-50/80 max-w-xl">
            Key milestones and accomplishments from my journey as a frontend developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, i) => {
            const colors = colorConfig[achievement.color]
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  'group bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 transition-all duration-300',
                  colors.card
                )}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4', colors.glow)}>
                  {achievement.icon}
                </div>
                <div className={cn('text-lg font-bold mb-1', colors.metric)}>
                  {achievement.metric}
                </div>
                <h3 className="text-base font-semibold text-slate-50 mb-2">{achievement.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30"
        > */}
          {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">
                &#128218;
              </div>
              <div>
                <p className="text-slate-50 font-semibold">Currently Exploring</p>
                <p className="text-slate-400 text-sm">Always leveling up</p>
              </div>
            </div>
            <div className="flex-1 flex flex-wrap gap-3">
              {currently.map(({ label, emoji }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600/25 text-sm text-slate-300"
                >
                  <span dangerouslySetInnerHTML={{ __html: emoji }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div> */}
        {/* </motion.div> */}
      </div>
    </section>
  )
}
