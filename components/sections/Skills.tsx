'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'
import { skillCategories } from '@/lib/data'
import { fadeUp } from '@/lib/variants'



// Overall proficiency per category (average of skills)
const proficiency = [
  {
    label: 'Frontend',
    sub: 'React & JavaScript',
    value: 90,
    fromColor: '#1E3A8A',
    toColor: '#60A5FA',
    glow: 'rgba(59,130,246,0.35)',
  },
  {
    label: 'Styling',
    sub: 'CSS & Design',
    value: 83,
    fromColor: '#1E1B4B',
    toColor: '#818CF8',
    glow: 'rgba(99,102,241,0.35)',
  },
  {
    label: 'Tools',
    sub: 'APIs & Optimizations',
    value: 82,
    fromColor: '#0C4A6E',
    toColor: '#38BDF8',
    glow: 'rgba(14,165,233,0.35)',
  },
]

const BAR_MAX_HEIGHT = 210 // px

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] orb orb-indigo opacity-10 pointer-events-none" />

      <div ref={ref} className="container-width">
        {/* ── Section label ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-slate-50 text-sm font-mono">04.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Skills</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        {/* ── Big headline ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text-accent">toolkit</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Technologies and tools I use to bring ideas to Live. Always learning, always growing.
          </p>
        </motion.div>

        {/* ── Proficiency overview — heading left, bars right ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-12 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 md:p-10"
        >
          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-slate-500 text-xs tracking-widest uppercase mb-3">Overall Proficiency</p>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-50 leading-tight mb-4">
              Expertise across<br />
              <span className="gradient-text-accent">three disciplines</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
              Measured across skills within each category — from UI development and design systems
              to API integration and tooling.
            </p>

            {/* Mini legend */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              {proficiency.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: p.toColor }}
                  />
                  <span className="text-xs text-slate-400">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bars */}
          <div className="flex items-end justify-center gap-6 md:gap-10">
            {proficiency.map((p, i) => (
              <ProficiencyBar key={p.label} data={p} index={i} />
            ))}
          </div>
        </motion.div>


        {/* ── Skill Network ── */}
        <SkillNetwork />
      </div>
    </section>
  )
}

/* ── Skill Network Node Graph ──────────────────────────────── */
type NetworkNode = {
  id: string
  name: string
  abbr: string
  level: number
  x: number
  y: number
  exploring: boolean
}

const SKILL_NODES: NetworkNode[] = [
  { id: 'react',     name: 'React.js',       abbr: 'Re',   level: 92, x: 47, y: 47, exploring: false },
  { id: 'js',        name: 'JavaScript',     abbr: 'JS',   level: 90, x: 33, y: 33, exploring: false },
  { id: 'nextjs',    name: 'Next.js',        abbr: 'Nx',   level: 88, x: 62, y: 33, exploring: false },
  { id: 'css3',      name: 'CSS3',           abbr: 'CS',   level: 92, x: 25, y: 55, exploring: false },
  { id: 'html5',     name: 'HTML5',          abbr: 'H5',   level: 95, x: 22, y: 18, exploring: false },
  { id: 'tailwind',  name: 'Tailwind CSS',   abbr: 'Tw',   level: 90, x: 65, y: 57, exploring: false },
  { id: 'bootstrap', name: 'Bootstrap',      abbr: 'Bs',   level: 85, x: 42, y: 73, exploring: false },
  { id: 'api',       name: 'REST APIs',      abbr: 'API',  level: 88, x: 54, y: 73, exploring: false },
  { id: 'git',       name: 'Git & GitHub',   abbr: 'Git',  level: 88, x: 32, y: 80, exploring: false },
  { id: 'docker',    name: 'Docker',         abbr: 'Do',   level: 72, x: 76, y: 47, exploring: false },
  { id: 'postman',   name: 'Postman',        abbr: 'Pm',   level: 85, x: 76, y: 73, exploring: false },
  { id: 'framer',    name: 'Framer Motion',  abbr: 'Fr',   level: 78, x: 47, y: 13, exploring: false },
  { id: 'figma',     name: 'Figma',          abbr: 'Fi',   level: 75, x: 62, y: 13, exploring: false },
  { id: 'ts',        name: 'TypeScript',     abbr: 'TS',   level: 55, x: 85, y: 25, exploring: false },
  // Exploring

  { id: 'anim',      name: 'Hard Animation', abbr: 'Anim', level: 35, x: 13, y: 68, exploring: true },
  { id: 'express',   name: 'Express',        abbr: 'Ex',   level: 40, x: 88, y: 70, exploring: true },
  { id: 'go',        name: 'Go',             abbr: 'Go',   level: 25, x: 8,  y: 42, exploring: true },
]

const SKILL_EDGES: [string, string][] = [
  ['react', 'js'], ['react', 'nextjs'], ['react', 'framer'], ['react', 'api'],
  ['react', 'css3'], ['react', 'tailwind'],
  ['js', 'html5'], ['js', 'css3'],
  ['html5', 'framer'], ['figma', 'framer'], ['nextjs', 'figma'],
  ['nextjs', 'tailwind'], ['nextjs', 'ts'],
  ['css3', 'bootstrap'], ['api', 'bootstrap'], ['api', 'postman'],
  ['docker', 'postman'], ['docker', 'ts'], ['docker', 'express'],
  ['ts', 'go'], ['anim', 'go'], ['anim', 'css3'],
  ['ts', 'figma'], ['ts', 'express'],
  ['git', 'react'], ['git', 'go'], ['git', 'nextjs'],
]

function SkillNetwork() {
  const networkRef = useRef<HTMLDivElement>(null)
  const inView = useInView(networkRef, { once: true, amount: 0.3 })
  const [hovered, setHovered] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'

  const connectedSet = useMemo(() => {
    if (!hovered) return new Set<string>()
    const s = new Set<string>()
    SKILL_EDGES.forEach(([a, b]) => {
      if (a === hovered) s.add(b)
      if (b === hovered) s.add(a)
    })
    return s
  }, [hovered])

  return (
    <motion.div
      ref={networkRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mt-12"
    >
      <p className="text-center text-slate-700 text-sm font-bold mb-6 uppercase tracking-widest">
        Skill Network — hover any node to explore
      </p>

      {/* Aspect-ratio container (2.5 : 1) */}
      <div className="relative w-full" style={{ paddingBottom: '40%' }}>
        <div className="absolute inset-0">

          {/* SVG lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {SKILL_EDGES.map(([aId, bId]) => {
              const a = SKILL_NODES.find(n => n.id === aId)!
              const b = SKILL_NODES.find(n => n.id === bId)!
              const isHot = hovered === aId || hovered === bId
              const isDim = hovered !== null && !isHot
              return (
                <line
                  key={`${aId}-${bId}`}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke={isHot ? 'rgba(59,130,246,0.75)' : (isDark ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.45)')}
                  strokeWidth={isHot ? '1.5' : (isDark ? '0.8' : '1.2')}
                  style={{ transition: 'stroke 0.2s', opacity: isDim ? 0.08 : 1 }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {SKILL_NODES.map((node) => {
            const isHov = hovered === node.id
            const isConn = connectedSet.has(node.id)
            const isDimmed = hovered !== null && !isHov && !isConn
            const tipBelow = node.y < 22

            return (
              <div
                key={node.id}
                className="absolute z-10"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Tooltip */}
                {isHov && (
                  <div
                    className="absolute z-30 pointer-events-none"
                    style={tipBelow
                      ? { top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }
                      : { bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }
                    }
                  >
                    <div className="bg-slate-800/95 border border-slate-700 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap">
                      <p className="text-slate-100 text-xs font-semibold">{node.name}</p>
                      <p className={`text-[11px] font-mono ${node.exploring ? 'text-slate-500' : 'text-blue-400'}`}>
                        {node.exploring ? '⟳ Exploring' : `${node.level}%`}
                      </p>
                    </div>
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                      style={tipBelow
                        ? { bottom: '100%', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '5px solid rgba(51,65,85,0.9)' }
                        : { top: '100%', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid rgba(51,65,85,0.9)' }
                      }
                    />
                  </div>
                )}

                {/* Circle */}
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer select-none"
                  style={{
                    background: node.exploring
                      ? (isDark ? 'rgba(15,23,42,0.85)' : 'rgba(71,85,105,0.68)')
                      : isHov
                        ? 'rgba(59,130,246,0.28)'
                        : 'rgba(59,130,246,0.1)',
                    border: `2px solid ${
                      node.exploring
                        ? (isHov ? 'rgba(100,116,139,0.55)' : (isDark ? 'rgba(51,65,85,0.25)' : 'rgba(100,116,139,0.40)'))
                        : (isHov ? '#60A5FA' : 'rgba(59,130,246,0.38)')
                    }`,
                    boxShadow: node.exploring
                      ? 'none'
                      : isHov
                        ? '0 0 22px rgba(59,130,246,0.5), 0 0 8px rgba(59,130,246,0.25)'
                        : '0 0 7px rgba(59,130,246,0.12)',
                    opacity: isDimmed ? 0.15 : 1,
                    transform: isHov ? 'scale(1.35)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: node.exploring
                      ? (isDark
                          ? (isHov ? '#64748B' : '#334155')
                          : '#E2E8F0')
                      : (isHov ? '#BAE6FD' : '#60A5FA'),
                  }}
                >
                  {node.abbr}
                  {/* Ping ring on hover (learned only) */}
                  {!node.exploring && isHov && (
                    <span
                      className="absolute rounded-full border border-blue-400/35 animate-ping pointer-events-none"
                      style={{ inset: '-10px' }}
                    />
                  )}
                </div>

                {/* Label */}
                <div
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 pointer-events-none text-center"
                  style={{ opacity: isDimmed ? 0.08 : isHov ? 1 : 0.5, transition: 'opacity 0.2s' }}
                >
                  <p className={`text-[9px] font-medium whitespace-nowrap leading-tight ${
                    node.exploring ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {node.name.split(' ')[0]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-blue-400/50 bg-blue-500/15" />
          <span className="text-xs text-slate-400">Proficient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-slate-700 bg-slate-900/80" />
          <span className="text-xs text-slate-600">Exploring</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Big proficiency bar (the 3-bar visual) ────────────────── */
function ProficiencyBar({
  data,
  index,
}: {
  data: (typeof proficiency)[0]
  index: number
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const inView = useInView(barRef, { once: true, amount: 0.4 })

  const [height, setHeight] = useState(0)   // px
  const [count, setCount] = useState(0)     // 0–100
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const delay = index * 160 // stagger each bar by 160 ms
    const duration = 1500
    const targetHeight = BAR_MAX_HEIGHT * (data.value / 100)

    let rafId: number
    const timeoutId = setTimeout(() => {
      const startTime = Date.now()

      const tick = () => {
        const elapsed = Date.now() - startTime
        const raw = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - raw, 4) // easeOutQuart — dramatic rise

        setHeight(targetHeight * eased)
        setCount(Math.round(data.value * eased))

        if (raw < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setHeight(targetHeight)
          setCount(data.value)
        }
      }

      rafId = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [inView, data.value, index])

  return (
    <div ref={barRef} className="flex flex-col items-center gap-3">
      {/* Percentage number */}
      {/* <div className="text-center">
        <span
          className="text-3xl md:text-4xl font-bold tabular-nums"
          style={{ color: data.toColor }}
        >
          {count}%
        </span>
      </div> */}

      {/* Bar container — fixed height, both track and fill anchored to bottom */}
      <div
        className="relative"
        style={{ height: `${BAR_MAX_HEIGHT}px`, width: '80px' }}
      >
        {/* Track */}
        <div
          className="absolute inset-x-0 bottom-0 top-0 rounded-t-3xl rounded-b-lg opacity-15"
          style={{ background: data.toColor }}
        />

        {/* Fill — grows from bottom via absolute bottom-0 */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-t-3xl rounded-b-lg overflow-hidden"
          style={{
            height: `${height}px`,
            background: `linear-gradient(to top, ${data.fromColor} 0%, ${data.toColor} 100%)`,
            boxShadow: `0 -8px 40px ${data.glow}, 0 0 20px ${data.glow}`,
          }}
        >
          {/* Inner highlight */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 rounded-l-3xl"
            style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }}
          />
          {/* Top gleam */}
          <div
            className="absolute top-0 inset-x-4 h-px rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${data.toColor}, transparent)` }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-slate-200 text-sm font-semibold">{data.label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{data.sub}</p>
      </div>
    </div>
  )
}

/* ── Individual skill bar (inside each card) ───────────────── */
function SkillBar({
  skill,
  accent,
  staggerDelay,
}: {
  skill: { name: string; level: number }
  accent: { from: string; to: string; dot: string }
  staggerDelay: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { once: true, amount: 0.5 })

  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const duration = 1200
    let rafId: number
    const timeoutId = setTimeout(() => {
      const startTime = Date.now()

      const tick = () => {
        const elapsed = Date.now() - startTime
        const raw = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - raw, 3)

        setCount(Math.round(skill.level * eased))
        setWidth(skill.level * eased)

        if (raw < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setCount(skill.level)
          setWidth(skill.level)
        }
      }

      rafId = requestAnimationFrame(tick)
    }, staggerDelay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [inView, skill.level, staggerDelay])

  return (
    <div ref={rowRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-300">{skill.name}</span>
        <span className="text-xs font-mono tabular-nums" style={{ color: accent.dot }}>
          {count}%
        </span>
      </div>
      <div className="relative h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(to right, ${accent.from}, ${accent.to})`,
            boxShadow: `0 0 8px ${accent.from}55`,
          }}
        />
      </div>
    </div>
  )
}
