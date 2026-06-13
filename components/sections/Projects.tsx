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
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/3 top-0 w-[600px] h-[600px] orb orb-indigo opacity-10 pointer-events-none" />

      {/* Section header */}
      <div ref={ref} className="container-width mb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-slate-50 text-sm font-mono">03.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Projects</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Things I&apos;ve{' '}
            <span className="gradient-text-accent">built</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Six projects across fitness, AI, education, and design.
            Hover any card to explore — click to visit on deployed screen.
          </p>
        </motion.div>
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
          style={{ background: 'linear-gradient(to right, #0F172A 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0F172A 0%, transparent 100%)' }}
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
        className="text-center text-slate-600 text-xs mt-4 tracking-widest uppercase"
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
      className="relative flex-shrink-0 w-[260px] h-[260px] overflow-hidden cursor-pointer select-none"
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
        background: `linear-gradient(145deg, ${project.accentColor}18 0%, #1E293B 55%, #0F172A 100%)`,
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
          <p className="text-slate-50 font-bold text-lg leading-tight">{project.title}</p>
          <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase font-medium">
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
          background: `linear-gradient(145deg, ${project.accentColor}28 0%, rgba(15,23,42,0.97) 100%)`,
        }}
      >
        <p className="font-bold text-sm text-center leading-snug" style={{ color: project.accentColor }}>
          {project.title}
        </p>

        <p className="text-slate-300 text-xs text-center leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap justify-center gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-slate-400"
              style={{ background: 'rgba(255,255,255,0.05)' }}
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
            className="p-2 rounded-full border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.08)' }}
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
