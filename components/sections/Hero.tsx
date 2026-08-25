'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]

const socials = [
  { label: 'GITHUB',    href: 'https://github.com/shreya-katiyar'                       },
  { label: 'LINKEDIN',  href: 'https://www.linkedin.com/in/shreyakatiyar/'              },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/yrrrr_shreya/'                },
]

const TOTAL_CARDS = 4

export default function Hero() {
  const [showAbout, setShowAbout] = useState(false)
  const [cardIdx, setCardIdx]     = useState(0)
  const [time, setTime]           = useState('')
  const wheelLock  = useRef(false)
  const cardIdxRef = useRef(0)
  const panelRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const d = new Date()
      const h = d.getHours().toString().padStart(2, '0')
      const m = d.getMinutes().toString().padStart(2, '0')
      setTime(`${h} : ${m}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Keep ref in sync so native listener always reads latest index
  useEffect(() => { cardIdxRef.current = cardIdx }, [cardIdx])

  // Reset cards when panel closes
  useEffect(() => {
    if (!showAbout) setCardIdx(0)
  }, [showAbout])

  const goTo = (idx: number) => setCardIdx(Math.max(0, Math.min(TOTAL_CARDS - 1, idx)))
  const closePanel = () => setShowAbout(false)

  // Non-passive native wheel listener — fires before Lenis can process events
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!showAbout) return
      e.preventDefault()
      e.stopPropagation()
      if (wheelLock.current) return
      wheelLock.current = true
      const cur = cardIdxRef.current
      if (e.deltaY > 30)       goTo(cur + 1)
      else if (e.deltaY < -30) goTo(cur - 1)
      setTimeout(() => { wheelLock.current = false }, 800)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [showAbout])

  return (
    <>
    {/* ══════════  PANEL 1 — Hero  ══════════ */}
    <div id="home" className="relative h-screen overflow-hidden">
        <section
          className="relative w-full h-full overflow-hidden"
        >
          {/* ── Full-bleed B&W photo ── */}
          <div className="absolute inset-0">
            <Image
              src="/image.png"
              alt="Shreya Katiyar"
              fill priority
              className="object-cover object-center"
              style={{ filter: 'grayscale(100%) brightness(0.52) contrast(1.15)' }}
            />
          </div>

          {/* Overlay layers */}
          <div className="absolute inset-0" style={{ background: 'rgba(4,4,8,0.28)' }} />
          {/* Bottom gradient — lifts name legibility */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(4,4,8,0.88) 0%, rgba(4,4,8,0.4) 50%, transparent 100%)' }} />
          {/* Top gradient */}
          <div className="absolute inset-x-0 top-0 h-[22%] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(4,4,8,0.7) 0%, transparent 100%)' }} />

          {/* ── All overlaid content ── */}
          <div
            className="absolute inset-0 flex flex-col z-10"
            style={{ padding: '1.6rem max(1.5rem, calc((100vw - 72rem) / 2)) 1.8rem' }}
          >

            {/* ── TOP BAR ── */}
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-white/60 text-[10px] font-mono tracking-[0.4em]">SHREYA.DEV</span>
              <span className="text-white/40 text-[10px] font-mono tracking-[0.3em]">{time}</span>
              <nav className="hidden md:flex items-center gap-1">
                {['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item, i) => (
                  <span key={item} className="flex items-center gap-1">
                    {i > 0 && <span className="text-white/20 text-[10px] font-mono mx-1">/</span>}
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-white/50 text-[10px] font-mono tracking-[0.3em] hover:text-white/80 transition-colors duration-200"
                    >{item}</a>
                  </span>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-white/65 text-[10px] font-mono tracking-[0.3em] underline underline-offset-4 hover:text-white transition-colors duration-200"
              >HIRE ME</a>
            </motion.div>

            {/* ── MIDDLE CONTENT ── */}
            <div className="flex-1 flex items-center justify-between py-8">

              {/* Left — Social links */}
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-3"
              >
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/45 text-[10px] font-mono tracking-[0.35em] hover:text-white/80 transition-colors duration-200"
                  >{label}</a>
                ))}
              </motion.div>

              {/* Right — Bio block */}
              <motion.div
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="max-w-[340px] text-right flex flex-col gap-5"
              >
                <p className="text-white/65 text-sm leading-[1.8]">
                  I'm a Frontend Developer,
                  specializing in React &amp; Next.js. Building performant,
                  pixel-perfect experiences that users love.
                </p>

                <div className="flex items-start justify-end gap-8">
                  <div className="text-right">
                    <p className="text-white/30 text-[9px] font-mono tracking-[0.35em] mb-1">CURRENTLY AT</p>
                    <p className="text-white/65 text-xs font-medium">MediCloud Global</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-[9px] font-mono tracking-[0.35em] mb-1">STATUS</p>
                    <p className="text-white/65 text-xs font-medium flex items-center justify-end gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
      
                      </span>
                      Open to Work
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center justify-end gap-2.5">
                  <a
                    href="#projects"
                    onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-5 py-2 bg-white text-[#040408] text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors duration-200"
                    style={{ borderRadius: '2px' }}
                  >View Work</a>
                  <button
                    onClick={() => setShowAbout(true)}
                    className="px-5 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-white/50 hover:text-white/75 transition-colors duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px' }}
                  >Who am I?</button>
                  <button
                    onClick={() => window.open('/api/resume', '_blank', 'noopener,noreferrer')}
                    className="px-5 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-white/40 hover:text-white/60 transition-colors duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px' }}
                  >Resume</button>
                </div>
              </motion.div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="flex items-end justify-between">

              {/* HUGE editorial name — serif */}
              <div className="select-none leading-none">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '102%' }} animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease }}
                    className="text-white font-black uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3.2rem, 7vw, 10rem)',
                      lineHeight: 0.86,
                      letterSpacing: '-0.01em',
                    }}
                  >SHREYA</motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '102%' }} animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.22, ease }}
                    className="text-white font-black uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3.2rem, 7vw, 10rem)',
                      lineHeight: 0.86,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {/* Invisible "S" to align K with the H in SHREYA */}
                    <span aria-hidden style={{ visibility: 'hidden' }}>S</span>KATIYAR
                  </motion.h1>
                </div>
              </div>

            </div>
          </div>
        </section>
    </div>

      {/* ══════════  PANEL 2 — Who am I (fixed overlay) ══════════ */}
      <motion.div
        ref={panelRef}
        initial={false}
        animate={{ x: showAbout ? '0%' : '100%' }}
        transition={{ duration: 0.9, ease }}
        className="fixed inset-0 z-[60] overflow-hidden"
        style={{ background: '#070b12' }}
      >

        {/* ── HEADER — editorial magazine layout ── */}
        <div
          className="absolute top-0 left-0 right-0 z-40 flex flex-col"
          style={{
            height: '280px',
            padding: '0 clamp(2rem, 6vw, 5rem)',
            background: '#070b12',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Nav row */}
          <div className="flex items-center justify-between" style={{ paddingTop: '1.4rem', paddingBottom: '1.2rem' }}>
            <button
              onClick={closePanel}
              className="flex items-center gap-2 text-[9px] font-mono tracking-[0.4em] uppercase transition-all duration-200 hover:gap-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <span className="font-mono text-[9px] tracking-[0.45em]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              SHREYA KATIYAR — {String(Math.min(cardIdx + 1, TOTAL_CARDS)).padStart(2,'0')} / {String(TOTAL_CARDS).padStart(2,'0')}
            </span>
          </div>

          {/* Thin rule */}
          <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Main header: WHO AM I + divider + bio + stats */}
          <div className="flex gap-10 items-stretch flex-1 pb-5">

            {/* Left — stacked display title */}
            <div className="flex-shrink-0 flex flex-col justify-center select-none">
              <div style={{ lineHeight: 0.82, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                <p className="font-black uppercase text-white"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>WHO</p>
                <p className="font-black uppercase"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>AM</p>
                <p className="font-black uppercase text-white"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>I?</p>
              </div>
            </div>

            {/* Vertical rule */}
            <div className="flex-shrink-0 w-px self-stretch" style={{ background: 'rgba(255,255,255,0.07)' }} />

            {/* Right — bio + stats */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              {/* Bio paragraph */}
              <p className="leading-[1.9]" style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'rgba(255,255,255,0.48)', maxWidth: '580px' }}>
                Frontend developer crafting pixel-perfect, performant web experiences.<br />
                Obsessed with clean code, thoughtful design, and the satisfying click<br className="hidden lg:block" />
                of a well-placed component. Based in Kanpur — coding since the beginning.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-0 flex-wrap">
                {[
                  { label: 'BASED IN', value: 'Kanpur, India' },
                  { label: 'COLLEGE',  value: 'Rama University' },
                  { label: 'CGPA',     value: '8.5 / 10' },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-8 mx-6" style={{ background: 'rgba(255,255,255,0.07)' }} />}
                    <div>
                      <p className="font-mono mb-1" style={{ fontSize: '8px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.2)' }}>{stat.label}</p>
                      <p className="font-semibold" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dot nav — right, centered in card area */}
        <div
          className="absolute right-5 z-30 flex flex-col gap-2.5 -translate-y-1/2"
          style={{ top: 'calc(280px + 28vh)' }}
        >
          {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: cardIdx === i ? 6 : 3,
                height: cardIdx === i ? 6 : 3,
                borderRadius: '50%',
                background: cardIdx === i ? '#fff' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

        {/* Sliding card stack */}
        <div
          className="absolute left-0 right-0 overflow-hidden flex flex-col items-center"
          style={{ top: '280px', bottom: 0, paddingTop: '1.5rem' }}
        >
          <motion.div
            animate={{ y: `calc(${-cardIdx} * (56vh + 2rem))` }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center"
            style={{ willChange: 'transform', width: 'min(96vw, 1280px)', gap: '2rem' }}
          >
            <InterestCard
              index="01" label="LOVE" tag="— CATS"
              heading="I love cats." quote="They don't judge my code."
              sub="They just sit on my keyboard and silently judge me as a person instead."
              image="/cat1.png" imgSide="right"
              bg="#ede4d6" textColor="#1a1208" accentColor="#92400e"
              accent2="#d97706"
            />
            <InterestCard
              index="02" label="RITUAL" tag="— MUSIC"
              heading="Retro at midnight." quote="Lo-fi hip hop forever."
              sub="Old soul beats. Synth pads. Coding sessions that start at 11pm and end at sunrise."
              image="/music.png" imgSide="left"
              bg="#0d0820" textColor="#fff" accentColor="#c084fc"
              accent2="#7c3aed"
            />
            <InterestCard
              index="03" label="FREE TIME" tag="— NETFLIX"
              heading="Netflix & chill." quote='"Just one more episode."'
              sub="Me, every single night, since the dawn of streaming. No regrets. Zero."
              image="/netflix.png" imgSide="right"
              bg="#0f0000" textColor="#fff" accentColor="#f87171"
              accent2="#dc2626"
            />
            <OutroCard active={cardIdx === 3} onBack={closePanel} />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

/* ══ Interest Card — horizontal split layout ══ */
function InterestCard({
  index, label, tag, heading, quote, sub,
  image, imgSide, bg, textColor, accentColor, accent2,
}: {
  index: string; label: string; tag: string
  heading: string; quote: string; sub: string
  image: string; imgSide: 'left' | 'right'
  bg: string; textColor: string; accentColor: string; accent2: string
}) {
  const isDark = textColor === '#fff'

  return (
    <div
      className="relative flex-shrink-0 flex overflow-hidden"
      style={{ height: '56vh', width: '100%', background: bg, borderRadius: '14px' }}
    >
      {/* ── Image half (left) ── */}
      {imgSide === 'left' && (
        <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '44%' }}>
          <Image
            src={image} alt={heading} fill
            className="object-contain"
            style={{ objectPosition: 'center', padding: '1.5rem', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.35))' }}
          />
          {/* Gradient fade toward content side */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${bg})` }} />
        </div>
      )}

      {/* ── Content half ── */}
      <div className="relative flex flex-col justify-between flex-1 z-10"
        style={{ padding: 'clamp(1.6rem, 3.5vh, 2.4rem) clamp(1.6rem, 3.5vw, 2.8rem)' }}>

        {/* Ghost index number */}
        <span
          className="absolute font-black leading-none pointer-events-none select-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 14vw, 13rem)',
            color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
            right: '-0.5rem', bottom: '-1.5rem',
            lineHeight: 1,
          }}
        >{index}</span>

        {/* Top: index chip + label */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[8px] tracking-[0.55em] uppercase px-2 py-1"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              color: isDark ? 'rgba(255,255,255,0.35)' : `${textColor}66`,
              borderRadius: '3px',
            }}
          >{index}</span>
          <span className="font-mono text-[8px] tracking-[0.45em] uppercase"
            style={{ color: isDark ? 'rgba(255,255,255,0.25)' : `${textColor}55` }}>{label}{tag}</span>
        </div>

        {/* Middle: main heading + quote */}
        <div>
          <h2
            className="font-black uppercase tracking-tight leading-none mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.2rem)', color: accentColor }}
          >{heading}</h2>
          <p className="font-semibold italic mb-3" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: accentColor, opacity: 0.75 }}>
            {quote}
          </p>
          <p className="leading-[1.85]" style={{ fontSize: 'clamp(11px, 1vw, 13px)', color: isDark ? 'rgba(255,255,255,0.38)' : `${textColor}77`, maxWidth: '340px' }}>
            {sub}
          </p>
        </div>

        {/* Bottom: scroll hint with accent line */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: accentColor, opacity: 0.5 }} />
          <span className="font-mono text-[8px] tracking-[0.5em]"
            style={{ color: isDark ? 'rgba(255,255,255,0.2)' : `${textColor}44` }}>SCROLL ↓</span>
        </div>
      </div>

      {/* ── Image half (right) ── */}
      {imgSide === 'right' && (
        <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '44%' }}>
          {/* Gradient fade from content side */}
          <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(to left, transparent 60%, ${bg})` }} />
          <Image
            src={image} alt={heading} fill
            className="object-contain"
            style={{ objectPosition: 'center', padding: '1.5rem', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.35))' }}
          />
        </div>
      )}

      {/* Accent left border */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: `linear-gradient(to bottom, ${accent2}, transparent)` }}
      />
    </div>
  )
}

/* ══ Outro card ══ */
function OutroCard({ active, onBack }: { active: boolean; onBack: () => void }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!active) { setCountdown(5); return }
    if (countdown <= 0) { onBack(); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [active, countdown, onBack])

  const pct = ((5 - countdown) / 5) * 100
  const R = 38

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden flex"
      style={{ height: '56vh', width: '100%', borderRadius: '14px', background: '#06060f' }}
    >
      {/* cat2 full-bleed left */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '44%' }}>
        <Image src="/cat2.png" alt="" fill className="object-cover object-center"
          style={{ filter: 'grayscale(100%) brightness(0.35) contrast(1.1)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 50%, #06060f)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1"
        style={{ padding: 'clamp(1.6rem, 3.5vh, 2.4rem) clamp(1.6rem, 3.5vw, 2.8rem)' }}>

        {/* Label */}
        <span className="font-mono text-[8px] tracking-[0.55em] uppercase px-2 py-1 self-start"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
          04 — THAT&apos;S ME
        </span>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-black uppercase text-white tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontFamily: 'var(--font-display)' }}>
            Now you<br />know me.
          </h2>
          <p className="font-mono text-[10px] tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Cat lover · Music head · Netflix addict
          </p>
        </motion.div>

        {/* Countdown + back */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative cursor-pointer flex items-center justify-center" onClick={onBack}
            style={{ width: 80, height: 80 }}>
            <svg className="absolute inset-0 -rotate-90" width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * R}`}
                strokeDashoffset={`${2 * Math.PI * R * (1 - pct / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-lg leading-none">{countdown}</span>
              <span className="font-mono text-[7px] tracking-[0.3em] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>BACK</span>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-[9px] tracking-[0.4em] uppercase hover:opacity-60 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            <ArrowLeft className="w-3 h-3" /> Back to Portfolio
          </button>
        </motion.div>
      </div>

      {/* Accent left border */}
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
    </div>
  )
}
