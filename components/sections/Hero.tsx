'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Mail, ArrowRight, Download } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons'
import Image from 'next/image'
import Link from 'next/link'
import { heroContainer, heroItem } from '@/lib/variants'

const socials = [
  { icon: GitHubIcon, href: "https://github.com/shreyakatiyar", label: 'GitHub' },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/shreyakatiyar/", label: 'LinkedIn' },
  // { icon: XTwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
  { icon: Mail, href: 'mailto:shreyakatiyar76@gmail.com', label: 'Email' },
]


export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = document.documentElement.clientWidth)
    let height = (canvas.height = document.documentElement.clientHeight)
    let animId: number

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = []
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.35 + 0.08,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59,130,246,${p.alpha * 0.4})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width = canvas.width = document.documentElement.clientWidth
      height = canvas.height = document.documentElement.clientHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Orbs */}
      <motion.div
        className="orb orb-indigo absolute top-1/4 -left-10 w-[600px] h-[600px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb-violet absolute bottom-1/4 -right-10 w-[500px] h-[500px]"
        animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.08), transparent)' }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 pb-10 min-h-screen">

        {/* Left: text */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Available badge */}
          <motion.div variants={heroItem} className="flex justify-center lg:justify-start mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/60 text-slate-100 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Available for new opportunities
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={heroItem} className="text-slate-400 text-base md:text-lg mb-4 tracking-[0.25em] uppercase font-medium">
            Hello, I&apos;m
          </motion.p>

          {/* Name — letter by letter */}
          <div className="mb-6 overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight">
              {'Shreya Katiyar'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.035 }}
                  className={char === ' ' ? 'inline-block w-4 md:w-6' : 'inline-block gradient-text'}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Role */}
          <motion.div variants={heroItem} className="mb-6">
            <div className="inline-flex items-center gap-3 text-xl md:text-2xl font-medium text-slate-400">
              <span className="w-6 h-[1px] bg-blue-500" />
              <TypeAnimation
                sequence={[
                  'Frontend Developer', 2500,
                  'React Developer', 2500,
                  'Next.js Engineer', 2500,
                  'UI/UX Enthusiast', 2500,
                ]}
                repeat={Infinity}
                className="text-slate-50"
              />
              <span className="w-6 h-[1px] bg-blue-500" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p variants={heroItem} className="text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Building beautiful, high-performance web applications with React & Next.js.
            I turn complex problems into elegant interfaces that{' '}
            <span className="text-slate-50">users love</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-10">
            <Link
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold transition-colors duration-300 shadow-lg shadow-blue-500/20"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/shreya.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl px-6 py-3 font-semibold transition-colors duration-300 border border-slate-600/40"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={heroItem} className="flex items-center justify-center lg:justify-start gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                {...(label !== 'Email' && {
    target: '_blank',
    rel: 'noopener noreferrer',
  })}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl border border-slate-600/30 hover:border-slate-600/60 text-slate-50/70 hover:text-slate-50 transition-all duration-200 hover:bg-slate-700/20"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-[380px] mx-auto">
            {/* Glow blob */}
            <div className="absolute inset-0 bg-blue-500/12 rounded-3xl blur-3xl scale-105 pointer-events-none" />

            {/* Main image — animated border */}
            <div className="img-animated-border rounded-3xl p-[1px] shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-[23px] overflow-hidden">
                <Image
                  src="/h1.png"
                  alt="Shreya Katiyar"
                  width={380}
                  height={390}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: '560px' }}
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator — static wrapper handles centering, motion.div handles animation only */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-slate-50">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-400/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
