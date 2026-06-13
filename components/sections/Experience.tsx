'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, CheckCircle2, Calendar, MapPin } from 'lucide-react'
import { experiences } from '@/lib/data'
import Badge from '@/components/ui/Badge'
import { fadeUp } from '@/lib/variants'

type Exp = (typeof experiences)[0]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 15%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute -left-20 top-1/4 w-[500px] h-[500px] orb orb-violet opacity-15" />
      <div className="absolute right-0 bottom-1/4 w-[350px] h-[350px] orb orb-indigo opacity-10" />

      <div ref={ref} className="container-width">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-slate-50 text-sm font-mono">02.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Experience</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Where I&apos;ve{' '}
            <span className="gradient-text-accent">worked</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            My professional journey building real-world products across healthcare, library tech, and SaaS platforms.
          </p>
        </motion.div>

        {/* ── Timeline container ── */}
        <div ref={timelineRef} className="relative">

          {/* Desktop spine — background track */}
          <div className="absolute left-1/2 -translate-x-[0.5px] top-0 h-full w-px bg-slate-800 hidden md:block" />

          {/* Desktop spine — scroll-driven fill */}
          <motion.div
            className="absolute left-1/2 -translate-x-[0.5px] top-0 h-full w-px hidden md:block origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(to bottom, #3B82F6 0%, rgba(59,130,246,0.4) 60%, transparent 100%)',
            }}
          />

          {/* Mobile spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-slate-800 md:hidden" />
          <motion.div
            className="absolute left-4 top-0 h-full w-px md:hidden origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(to bottom, #3B82F6, rgba(59,130,246,0.3))',
            }}
          />

          <div className="space-y-20 md:space-y-28">
            {experiences.map((exp, i) => (
              <ExperienceRow key={exp.id} exp={exp} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceRow({
  exp,
  isLeft,
}: {
  exp: Exp
  isLeft: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { once: true, margin: '-80px' })

  return (
    <div ref={rowRef} className="relative">

      {/* ── Mobile layout ─────────────────────────────── */}
      <div className="md:hidden relative pl-12">
        {/* Mobile dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', bounce: 0.6, delay: 0.05 }}
          className="absolute left-4 top-6 -translate-x-1/2 z-10"
        >
          <div
            className={`w-3.5 h-3.5 rounded-full border-2 ${
              exp.current
                ? 'bg-blue-500 border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.6)]'
                : 'bg-slate-800 border-slate-600'
            }`}
          >
            {exp.current && (
              <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <CardContent exp={exp} inView={inView} direction="up" />
        </motion.div>
      </div>

      {/* ── Desktop zigzag ────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_72px_1fr] items-start">

        {/* ─ Left column ─ */}
        <div className="pr-8">
          {isLeft ? (
            /* Card slides from the left */
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <CardContent exp={exp} inView={inView} direction="left" />
            </motion.div>
          ) : (
            /* Meta badge fades in on opposite side */
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-end justify-start pt-6"
            >
              <MetaBadge exp={exp} align="right" />
            </motion.div>
          )}
        </div>

        {/* ─ Center dot ─ */}
        <div className="flex flex-col items-center pt-7">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.65, delay: 0.05 }}
            className="relative z-10"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                exp.current
                  ? 'bg-blue-500 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                  : 'bg-slate-800 border-slate-600'
              }`}
            >
              {exp.current && (
                <span className="absolute w-9 h-9 rounded-full bg-blue-500/20 animate-ping" />
              )}
            </div>
          </motion.div>

          {/* Connector nub toward card */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            className={`h-px w-8 bg-gradient-to-r mt-[22px] origin-${isLeft ? 'right' : 'left'} ${
              isLeft
                ? 'mr-auto from-blue-500/50 to-transparent'
                : 'ml-auto from-transparent to-blue-500/50'
            }`}
          />
        </div>

        {/* ─ Right column ─ */}
        <div className="pl-8">
          {!isLeft ? (
            /* Card slides from the right */
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <CardContent exp={exp} inView={inView} direction="right" />
            </motion.div>
          ) : (
            /* Meta badge fades in on opposite side */
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-start justify-start pt-6"
            >
              <MetaBadge exp={exp} align="left" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Minimal meta badge shown on the opposite side of the card ── */
function MetaBadge({ exp, align }: { exp: Exp; align: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      {/* Company initial circle */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border"
        style={{
          background: `${exp.companyColor}12`,
          borderColor: `${exp.companyColor}25`,
          color: exp.companyColor,
        }}
      >
        {exp.companyInitial}
      </div>

      {/* Company + duration */}
      <div>
        <p className="text-slate-50 font-semibold text-base">{exp.company}</p>
        <p className="text-slate-400 text-sm font-mono mt-0.5">{exp.duration}</p>
        <span
          className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-xs border"
          style={{
            background: `${exp.companyColor}10`,
            borderColor: `${exp.companyColor}25`,
            color: exp.companyColor,
          }}
        >
          {exp.type}
        </span>
      </div>
    </div>
  )
}

/* ── Main card ──────────────────────────────────────────────── */
function CardContent({
  exp,
  inView,
  direction,
}: {
  exp: Exp
  inView: boolean
  direction: 'left' | 'right' | 'up'
}) {
  const achieveX = direction === 'right' ? 15 : -15

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border glow-border group ${
        exp.current ? 'border-blue-500/20' : 'border-slate-700/30'
      }`}
    >
      {/* Top accent glow for current */}
      {exp.current && (
        <div
          className="absolute inset-x-0 top-0 h-px rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${exp.companyColor}, transparent)` }}
        />
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg font-bold text-slate-50"
            >
              {exp.role}
            </motion.h3>
            {exp.current && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Current
              </motion.span>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            {exp.companyUrl && exp.companyUrl !== '#' ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors flex items-center gap-1 hover:underline underline-offset-2"
                style={{ color: exp.companyColor }}
              >
                {exp.company}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="font-semibold" style={{ color: exp.companyColor }}>
                {exp.company}
              </span>
            )}
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3 h-3" />
              {exp.duration}
            </span>
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
          </motion.div>
        </div>

        {/* Company initial badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.15 }}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0 border"
          style={{
            background: `${exp.companyColor}12`,
            borderColor: `${exp.companyColor}25`,
            color: exp.companyColor,
          }}
        >
          {exp.companyInitial}
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.28 }}
        className="text-slate-400 text-sm leading-relaxed mb-5"
      >
        {exp.description}
      </motion.p>

   

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5">
        {exp.tech.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55 + i * 0.04 }}
          >
            <Badge variant="default" className="text-[11px]">{t}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
