'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/BrandIcons'
import { projects } from '@/lib/data'
import { fadeUp } from '@/lib/variants'

type Project = (typeof projects)[0]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section id="projects" className="section-padding relative overflow-hidden" style={{ background: '#070b12' }}>
      {/* Film grain — editorial consistency */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />

      {/* Section header */}
      <div ref={ref} className="container-width mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-[10px] tracking-[0.45em]" style={{ color: 'rgba(255,255,255,0.22)' }}>03 / PROJECTS</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Heading block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left: mask-reveal title */}
          <div className="select-none">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
                className="font-black uppercase tracking-tight text-white"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 5.5rem)', lineHeight: 0.86 }}
              >Things I&apos;ve</motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
                className="font-black uppercase tracking-tight"
                style={{
                  fontSize: 'clamp(2.6rem, 5vw, 5.5rem)', lineHeight: 0.86,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.17)',
                }}
              >Built</motion.h2>
            </div>
          </div>

          {/* Right: descriptor block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="lg:max-w-[320px] flex flex-col gap-4 lg:pb-1"
          >
            <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <p className="text-sm leading-[1.9]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Six projects across fitness, AI, education, and design.
              Hover any card to explore — click to visit the live deployment.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.35em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}>6 PROJECTS</span>
              <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <span className="text-[10px] font-mono tracking-[0.35em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}>DEPLOYED</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Infinite marquee strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Edge fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #070b12 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #070b12 0%, transparent 100%)' }}
        />

        {/* Moving track — two identical sets for seamless loop */}
        <div
          className="marquee-track"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          <div className="flex gap-5 pr-5">
            {projects.map((p) => (
              <ProjectCard key={`a-${p.id}`} project={p} />
            ))}
          </div>
          <div className="flex gap-5 pr-5">
            {projects.map((p) => (
              <ProjectCard key={`b-${p.id}`} project={p} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
        className="text-center text-xs mt-4 tracking-widest uppercase font-mono"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        hover to preview · click to open
      </motion.p>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    const url = project.live !== '#' ? project.live : project.github
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleGitHub = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(project.github, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className="relative flex-shrink-0 w-[340px] h-[340px] overflow-hidden cursor-pointer select-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      animate={{
        borderRadius: hovered ? '50%' : '20px',
        scale: hovered ? 1.08 : 1,
        boxShadow: hovered
          ? `0 0 50px ${project.accentColor}30, 0 24px 64px rgba(0,0,0,0.5)`
          : '0 4px 24px rgba(0,0,0,0.25)',
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: `linear-gradient(145deg, ${project.accentColor}14 0%, #0d1420 55%, #070b12 100%)`,
        border: `1px solid ${project.accentColor}22`,
      }}
    >
      {/* ── Default face ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.85 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
      >
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <span className="text-5xl relative z-10">{project.icon}</span>

        <div className="text-center relative z-10">
          <p className="text-white font-bold text-lg leading-tight">{project.title}</p>
          <p className="text-xs mt-1 tracking-widest uppercase font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {project.subtitle}
          </p>
        </div>

        <span
          className="relative z-10 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest border"
          style={{
            background: `${project.accentColor}10`,
            borderColor: `${project.accentColor}30`,
            color: project.accentColor,
          }}
        >
          {project.category}
        </span>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 inset-x-0 h-[2px] opacity-40"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`,
          }}
        />
      </motion.div>

      {/* ── Hover face ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 1.1 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-7"
        style={{
          background: `linear-gradient(145deg, ${project.accentColor}20 0%, rgba(7,11,18,0.97) 100%)`,
        }}
      >
        <p className="font-bold text-sm text-center leading-snug" style={{ color: project.accentColor }}>
          {project.title}
        </p>

        <p className="text-xs text-center leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap justify-center gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] px-2 py-0.5 border border-white/10"
              style={{ color: 'rgba(255,255,255,0.38)', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <motion.div
            onClick={handleGitHub}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 border border-white/15 transition-colors cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.55)', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}
          >
            <GitHubIcon className="w-4 h-4" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer"
            style={{
              background: `${project.accentColor}18`,
              borderColor: `${project.accentColor}40`,
              color: project.accentColor,
            }}
          >
            <ExternalLink className="w-3 h-3" />
            Open
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
