'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'
import { skillCategories } from '@/lib/data'

const proficiency = [
  { label: 'Frontend', sub: 'React & JavaScript', value: 90, fromColor: '#1E3A8A', toColor: '#60A5FA', glow: 'rgba(59,130,246,0.35)' },
  { label: 'Styling',  sub: 'CSS & Design',       value: 83, fromColor: '#1E1B4B', toColor: '#818CF8', glow: 'rgba(99,102,241,0.35)' },
  { label: 'Tools',    sub: 'APIs & Optimizations',value: 82, fromColor: '#0C4A6E', toColor: '#38BDF8', glow: 'rgba(14,165,233,0.35)' },
]

const BAR_MAX_HEIGHT = 210

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="section-padding relative" style={{ background: '#070b12' }}>
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '160px 160px' }} />

      <div ref={ref} className="container-width">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] tracking-[0.45em]" style={{ color: 'rgba(255,255,255,0.22)' }}>04 / SKILLS</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          {/* Left — two-line editorial heading */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.06, ease: [0.76, 0, 0.24, 1] }}
                className="font-black uppercase tracking-tight text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)', lineHeight: 0.86 }}
              >My</motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '102%' }}
                animate={isInView ? { y: 0 } : { y: '102%' }}
                transition={{ duration: 0.85, delay: 0.14, ease: [0.76, 0, 0.24, 1] }}
                className="font-black uppercase tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 6rem)', lineHeight: 0.86,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.17)',
                }}
              >Toolkit</motion.h2>
            </div>
          </div>

          {/* Right — sub-text + pill tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="lg:text-right"
            style={{ maxWidth: '320px' }}
          >
            <p className="text-sm leading-[1.85] mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Technologies and tools I use to bring ideas to life.<br className="hidden lg:block" />
              Always learning, always growing.
            </p>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma'].map(t => (
                <span
                  key={t}
                  className="font-mono text-[9px] tracking-[0.3em] px-2.5 py-1"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.3)',
                    borderRadius: '2px',
                  }}
                >{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-12 border border-white/[0.06] p-8 md:p-10"
          style={{ background: 'rgba(13,20,32,0.7)', borderRadius: '3px' }}>
          <div className="flex-1 text-center lg:text-left">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>Overall Proficiency</p>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-4">Expertise across<br />three disciplines</h3>
            <p className="text-sm leading-relaxed max-w-sm mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.38)' }}>Measured across skills within each category — from UI development and design systems to API integration and tooling.</p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              {proficiency.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.toColor }} />
                  <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-center gap-6 md:gap-10">
            {proficiency.map((p, i) => <ProficiencyBar key={p.label} data={p} index={i} />)}
          </div>
        </motion.div>

        <SkillNetwork />
      </div>

      <TechMarquee />
    </section>
  )
}

type NetworkNode = { id: string; name: string; abbr: string; level: number; x: number; y: number; exploring: boolean }

const SKILL_NODES: NetworkNode[] = [
  { id: 'react',     name: 'React.js',      abbr: 'Re',   level: 92, x: 47, y: 47, exploring: false },
  { id: 'js',        name: 'JavaScript',    abbr: 'JS',   level: 90, x: 33, y: 33, exploring: false },
  { id: 'nextjs',    name: 'Next.js',       abbr: 'Nx',   level: 88, x: 62, y: 33, exploring: false },
  { id: 'css3',      name: 'CSS3',          abbr: 'CS',   level: 92, x: 25, y: 55, exploring: false },
  { id: 'html5',     name: 'HTML5',         abbr: 'H5',   level: 95, x: 22, y: 18, exploring: false },
  { id: 'tailwind',  name: 'Tailwind CSS',  abbr: 'Tw',   level: 90, x: 65, y: 57, exploring: false },
  { id: 'bootstrap', name: 'Bootstrap',     abbr: 'Bs',   level: 85, x: 42, y: 73, exploring: false },
  { id: 'api',       name: 'REST APIs',     abbr: 'API',  level: 88, x: 54, y: 73, exploring: false },
  { id: 'git',       name: 'Git & GitHub',  abbr: 'Git',  level: 88, x: 32, y: 80, exploring: false },
  { id: 'docker',    name: 'Docker',        abbr: 'Do',   level: 72, x: 76, y: 47, exploring: false },
  { id: 'postman',   name: 'Postman',       abbr: 'Pm',   level: 85, x: 76, y: 73, exploring: false },
  { id: 'framer',    name: 'Framer Motion', abbr: 'Fr',   level: 78, x: 47, y: 13, exploring: false },
  { id: 'figma',     name: 'Figma',         abbr: 'Fi',   level: 75, x: 62, y: 13, exploring: false },
  { id: 'ts',        name: 'TypeScript',    abbr: 'TS',   level: 55, x: 85, y: 25, exploring: false },
  { id: 'anim',      name: 'Hard Animation',abbr: 'Anim', level: 35, x: 13, y: 68, exploring: true  },
  { id: 'express',   name: 'Express',       abbr: 'Ex',   level: 40, x: 88, y: 70, exploring: true  },
  { id: 'go',        name: 'Go',            abbr: 'Go',   level: 25, x: 8,  y: 42, exploring: true  },
]

const SKILL_EDGES: [string, string][] = [
  ['react','js'],['react','nextjs'],['react','framer'],['react','api'],['react','css3'],['react','tailwind'],
  ['js','html5'],['js','css3'],['html5','framer'],['figma','framer'],['nextjs','figma'],
  ['nextjs','tailwind'],['nextjs','ts'],['css3','bootstrap'],['api','bootstrap'],['api','postman'],
  ['docker','postman'],['docker','ts'],['docker','express'],['ts','go'],['anim','go'],['anim','css3'],
  ['ts','figma'],['ts','express'],['git','react'],['git','go'],['git','nextjs'],
]

function SkillNetwork() {
  const networkRef = useRef<HTMLDivElement>(null)
  const inView = useInView(networkRef, { once: true, amount: 0.3 })
  const [hovered, setHovered] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()

  const connectedSet = useMemo(() => {
    if (!hovered) return new Set<string>()
    const s = new Set<string>()
    SKILL_EDGES.forEach(([a, b]) => { if (a === hovered) s.add(b); if (b === hovered) s.add(a) })
    return s
  }, [hovered])

  return (
    <motion.div ref={networkRef} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="mt-12">
      <p className="text-center text-sm font-mono mb-6 uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.18)' }}>Skill Network — hover any node to explore</p>
      <div className="relative w-full" style={{ paddingBottom: '40%' }}>
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {SKILL_EDGES.map(([aId, bId]) => {
              const a = SKILL_NODES.find(n => n.id === aId)!
              const b = SKILL_NODES.find(n => n.id === bId)!
              const isHot = hovered === aId || hovered === bId
              const isDim = hovered !== null && !isHot
              return <line key={`${aId}-${bId}`} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`} stroke={isHot ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.08)'} strokeWidth={isHot ? '1.5' : '0.8'} style={{ transition: 'stroke 0.2s', opacity: isDim ? 0.08 : 1 }} />
            })}
          </svg>
          {SKILL_NODES.map((node) => {
            const isHov    = hovered === node.id
            const isConn   = connectedSet.has(node.id)
            const isDimmed = hovered !== null && !isHov && !isConn
            const tipBelow = node.y < 22
            return (
              <div key={node.id} className="absolute z-10" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)' }} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}>
                {isHov && (
                  <div className="absolute z-30 pointer-events-none" style={tipBelow ? { top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' } : { bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="border rounded px-3 py-1.5 shadow-xl whitespace-nowrap" style={{ background: 'rgba(13,20,32,0.96)', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <p className="text-xs font-semibold text-white">{node.name}</p>
                      <p className={`text-[11px] font-mono ${node.exploring ? 'opacity-40' : 'opacity-70'} text-white`}>{node.exploring ? '⟳ Exploring' : `${node.level}%`}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0" style={tipBelow ? { bottom: '100%', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '5px solid rgba(13,20,32,0.96)' } : { top: '100%', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid rgba(13,20,32,0.96)' }} />
                  </div>
                )}
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer select-none" style={{ background: node.exploring ? 'rgba(255,255,255,0.03)' : isHov ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)', border: `2px solid ${node.exploring ? (isHov ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)') : (isHov ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)')}`, boxShadow: node.exploring ? 'none' : isHov ? '0 0 22px rgba(255,255,255,0.18),0 0 8px rgba(255,255,255,0.1)' : '0 0 7px rgba(255,255,255,0.05)', opacity: isDimmed ? 0.15 : 1, transform: isHov ? 'scale(1.35)' : 'scale(1)', transition: 'all 0.2s ease', fontSize: '10px', fontWeight: 700, letterSpacing: '-0.01em', color: node.exploring ? 'rgba(255,255,255,0.25)' : isHov ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)' }}>
                  {node.abbr}
                  {!node.exploring && isHov && <span className="absolute rounded-full animate-ping pointer-events-none" style={{ inset: '-10px', border: '1px solid rgba(255,255,255,0.22)' }} />}
                </div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 pointer-events-none text-center" style={{ opacity: isDimmed ? 0.08 : isHov ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                  <p className={`text-[9px] font-mono text-white whitespace-nowrap leading-tight ${node.exploring ? 'opacity-20' : 'opacity-45'}`}>{node.name.split(' ')[0]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>Proficient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }} />
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>Exploring</span>
        </div>
      </div>
    </motion.div>
  )
}

const TECH_ITEMS = [
  { name: 'React.js', dot: '#61DAFB' }, { name: 'Next.js', dot: '#FFFFFF' }, { name: 'JavaScript', dot: '#F7DF1E' },
  { name: 'TypeScript', dot: '#3178C6' }, { name: 'HTML5', dot: '#E34F26' }, { name: 'CSS3', dot: '#1572B6' },
  { name: 'Tailwind CSS', dot: '#06B6D4' }, { name: 'Framer Motion', dot: '#BB4FFF' }, { name: 'Redux', dot: '#764ABC' },
  { name: 'Bootstrap', dot: '#7952B3' }, { name: 'REST APIs', dot: '#3B82F6' }, { name: 'Git & GitHub', dot: '#F05032' },
  { name: 'Docker', dot: '#2496ED' }, { name: 'Figma', dot: '#F24E1E' }, { name: 'Postman', dot: '#FF6C37' }, { name: 'Microservices', dot: '#10B981' },
]

function TechMarquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS]
  return (
    <div className="relative mt-14 w-full overflow-hidden py-5 border-y border-white/[0.05]">
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #070b12 10%, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #070b12 10%, transparent)' }} />
      <div className="marquee-track flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 mx-7 text-sm font-medium tracking-wide select-none" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot, boxShadow: `0 0 6px ${item.dot}80` }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProficiencyBar({ data, index }: { data: (typeof proficiency)[0]; index: number }) {
  const barRef  = useRef<HTMLDivElement>(null)
  const inView  = useInView(barRef, { once: true, amount: 0.4 })
  const [height, setHeight] = useState(0)
  const [count,  setCount]  = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const delay = index * 160; const duration = 1500; const targetHeight = BAR_MAX_HEIGHT * (data.value / 100)
    let rafId: number
    const timeoutId = setTimeout(() => {
      const startTime = Date.now()
      const tick = () => {
        const elapsed = Date.now() - startTime; const raw = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - raw, 4)
        setHeight(targetHeight * eased); setCount(Math.round(data.value * eased))
        if (raw < 1) { rafId = requestAnimationFrame(tick) } else { setHeight(targetHeight); setCount(data.value) }
      }
      rafId = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeoutId); cancelAnimationFrame(rafId) }
  }, [inView, data.value, index])

  return (
    <div ref={barRef} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ height: `${BAR_MAX_HEIGHT}px`, width: '80px' }}>
        <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-3xl rounded-b-lg opacity-15" style={{ background: data.toColor }} />
        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl rounded-b-lg overflow-hidden" style={{ height: `${height}px`, background: `linear-gradient(to top, ${data.fromColor} 0%, ${data.toColor} 100%)`, boxShadow: `0 -8px 40px ${data.glow}, 0 0 20px ${data.glow}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1/3 rounded-l-3xl" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
          <div className="absolute top-0 inset-x-4 h-px rounded-full" style={{ background: `linear-gradient(to right, transparent, ${data.toColor}, transparent)` }} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white">{data.label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>{data.sub}</p>
      </div>
    </div>
  )
}
