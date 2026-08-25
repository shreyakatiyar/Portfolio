'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

type Status = 'idle' | 'sending' | 'sent' | 'error'

const socials = [
  { idx: '01', label: 'GitHub',    handle: '/shreya-katiyar',       href: 'https://github.com/shreya-katiyar'                  },
  { idx: '02', label: 'LinkedIn',  handle: '/in/shreyakatiyar',     href: 'https://www.linkedin.com/in/shreyakatiyar/'         },
  { idx: '03', label: 'Instagram', handle: '@yrrrr_shreya',         href: 'https://www.instagram.com/yrrrr_shreya/'            },
  { idx: '04', label: 'Email',     handle: 'katiyarshreya2019',     href: 'mailto:katiyarshreya2019@gmail.com'                 },
]

export default function Contact() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: 'a97d2fad-ad29-4ec3-a7cb-9f0f5ea77fd9', ...form }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
      if (data.success) setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#070b12' }}>
      {/* Film grain */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '160px 160px' }} />

      {/* Faint background word */}
      <div aria-hidden className="absolute inset-0 z-[1] flex items-end justify-end pointer-events-none select-none overflow-hidden pr-4">
        <span className="font-black uppercase leading-none"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', color: 'rgba(255,255,255,0.018)', letterSpacing: '-0.02em' }}>
          CONTACT
        </span>
      </div>

      <div ref={ref} className="container-width relative z-10 section-padding">

        {/* ── Section label + availability ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 mb-16"
        >
          <div className="flex items-center gap-4 flex-1">
            <span className="font-mono text-[10px] tracking-[0.45em]"
              style={{ color: 'rgba(255,255,255,0.22)' }}>06 / CONTACT</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.18 }}
            className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0"
            style={{ border: '1px solid rgba(52,211,153,0.2)', borderRadius: '2px', background: 'rgba(52,211,153,0.04)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[9px] font-mono tracking-[0.3em]"
              style={{ color: 'rgba(52,211,153,0.8)' }}>OPEN TO WORK</span>
          </motion.div>
        </motion.div>

        {/* ── Hero heading — full width ── */}
        <div className="mb-16 select-none">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              animate={isInView ? { y: 0 } : { y: '105%' }}
              transition={{ duration: 0.9, delay: 0.06, ease }}
              className="font-black uppercase text-white"
              style={{ fontSize: 'clamp(3.4rem, 8vw, 9rem)', lineHeight: 0.85, letterSpacing: '-0.02em' }}
            >Make It</motion.h2>
          </div>
          <div className="flex items-end gap-6 overflow-visible">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%' }}
                animate={isInView ? { y: 0 } : { y: '105%' }}
                transition={{ duration: 0.9, delay: 0.14, ease }}
                className="font-black uppercase"
                style={{
                  fontSize: 'clamp(3.4rem, 8vw, 9rem)', lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.18)',
                }}
              >Happen.</motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="hidden lg:block text-sm pb-3 leading-[1.8]"
              style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '260px' }}
            >
              Got a project, a role, or an idea?<br />Drop me a message — let's talk.
            </motion.p>
          </div>
        </div>

        {/* ── Horizontal rule ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="h-px mb-14"
          style={{ background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
        />

        {/* ── Main 2-col body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1px_1fr] gap-0 items-start">

          {/* LEFT — cat + info */}
          <div className="flex flex-col gap-8 lg:pr-12 pb-12 lg:pb-0">

            {/* Cat image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.38, ease }}
              className="relative self-start w-full"
              style={{ maxWidth: '280px' }}
            >
              {/* Frame */}
              <div className="relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 2%, 2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                <Image
                  src="/business-cat.png"
                  alt="Very serious business cat"
                  width={280}
                  height={260}
                  className="object-cover w-full"
                  style={{ filter: 'grayscale(20%) brightness(0.8) contrast(1.08)' }}
                />
                {/* Bottom scrim */}
                <div className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #070b12 0%, transparent 100%)' }} />
                {/* Corner label */}
                <div className="absolute bottom-3 left-4 select-none">
                  <p className="text-[8px] font-mono tracking-[0.45em]"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>VERY SERIOUS.</p>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.72 }}
                className="absolute -top-3 -right-3 px-2.5 py-1.5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', backdropFilter: 'blur(4px)' }}
              >
                <p className="text-[9px] font-mono tracking-[0.25em]"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>Let&apos;s talk 💬</p>
              </motion.div>
            </motion.div>

            {/* Short mobile descriptor */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="lg:hidden text-sm leading-[1.9]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Got a project, a role, or an idea?<br />Drop me a message — let's talk.
            </motion.p>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="flex flex-col gap-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { label: 'Response time', value: '≤ 24 hours'            },
                { label: 'Location',      value: 'India (IST, UTC+5:30)' },
                { label: 'Open for',      value: 'Full-time · Freelance' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>
                  <span className="text-xs font-medium"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>{value}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Vertical divider (desktop only) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="hidden lg:block self-stretch"
            style={{ width: '1px', background: 'rgba(255,255,255,0.06)', transformOrigin: 'top' }}
          />

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="lg:pl-12"
          >
            {status === 'sent' ? (
              <div className="py-8 flex flex-col gap-6">
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '105%' }} animate={{ y: 0 }}
                    transition={{ duration: 0.65, ease }}
                    className="font-black uppercase text-white"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 0.88, letterSpacing: '-0.015em' }}
                  >Message<br />Received.</motion.div>
                </div>
                <p className="text-sm leading-[1.9] mt-2" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '360px' }}>
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="self-start text-[10px] font-mono tracking-[0.3em] uppercase transition-opacity hover:opacity-60 mt-4"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >← Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-9">

                {/* Form header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-mono tracking-[0.5em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.18)' }}>Send a message</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                  <LineField id="name"  label="Your Name"  value={form.name}  onChange={set('name')}  required />
                  <LineField id="email" label="Your Email" value={form.email} onChange={set('email')} type="email" required />
                </div>

                {/* Subject */}
                <LineField id="subject" label="Subject" value={form.subject} onChange={set('subject')} required />

                {/* Message */}
                <LineTextarea id="message" label="Your Message" value={form.message} onChange={set('message')} required />

                {/* Submit row */}
                <div className="flex items-center justify-between gap-6 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {status === 'error' ? (
                    <p className="text-[11px] font-mono" style={{ color: 'rgba(255,90,90,0.75)' }}>
                      Something went wrong. Try again.
                    </p>
                  ) : (
                    <p className="text-[10px] font-mono tracking-[0.3em]"
                      style={{ color: 'rgba(255,255,255,0.16)' }}>REPLIES WITHIN 24H</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-shrink-0 flex items-center gap-2.5 px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: '#ffffff',
                      color: '#070b12',
                      borderRadius: '2px',
                      opacity: status === 'sending' ? 0.6 : 1,
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-[#070b12]/30 border-t-[#070b12] rounded-full animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>Send Message <ArrowUpRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>

        {/* ── Social bar — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-wrap sm:flex-nowrap">
            {socials.map((s, i) => (
              <a
                key={s.idx}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative flex-1 flex items-center justify-between gap-4 py-5 px-5 transition-colors duration-200"
                style={{
                  borderRight: i < socials.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  minWidth: '0',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[8px] font-mono tracking-[0.4em] flex-shrink-0"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>{s.idx}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white leading-none mb-1 transition-opacity duration-200 group-hover:opacity-55">{s.label}</p>
                    <p className="text-[10px] font-mono truncate"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>{s.handle}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'rgba(255,255,255,0.18)' }} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex items-center justify-between gap-4 flex-wrap"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span className="pt-6 font-mono text-[9px] tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.12)' }}>SHREYA KATIYAR · FRONTEND DEVELOPER</span>
          <span className="pt-6 font-mono text-[9px] tracking-[0.35em]"
            style={{ color: 'rgba(255,255,255,0.08)' }}>INDIA · © 2025</span>
        </motion.div>

      </div>
    </section>
  )
}

/* ── Line input field ── */
function LineField({
  id, label, value, onChange, type = 'text', required,
}: {
  id: string; label: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-[9px] font-mono tracking-[0.45em] uppercase select-none"
        style={{ color: 'rgba(255,255,255,0.22)' }}>{label}</label>
      <input
        id={id} name={id} type={type} value={value} onChange={onChange} required={required}
        className="bg-transparent w-full text-sm text-white outline-none pb-3 transition-colors duration-300"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', caretColor: 'rgba(255,255,255,0.7)' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)')}
        onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')}
        placeholder=""
      />
    </div>
  )
}

/* ── Line textarea field ── */
function LineTextarea({
  id, label, value, onChange, required,
}: {
  id: string; label: string; value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-[9px] font-mono tracking-[0.45em] uppercase select-none"
        style={{ color: 'rgba(255,255,255,0.22)' }}>{label}</label>
      <textarea
        id={id} name={id} value={value} onChange={onChange} required={required}
        rows={5} placeholder=""
        className="bg-transparent w-full text-sm text-white outline-none resize-none pb-3 transition-colors duration-300"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', caretColor: 'rgba(255,255,255,0.7)' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)')}
        onBlur={e  => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')}
      />
    </div>
  )
}
