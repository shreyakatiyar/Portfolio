'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@/components/ui/BrandIcons'
import Image from 'next/image'
import { fadeUp } from '@/lib/variants'

const socials = [
  { icon: GitHubIcon,   href: 'https://github.com/shreya-katiyar',          label: 'GitHub',    handle: '@shreya-katiyar' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/shreyakatiyar/',  label: 'LinkedIn',  handle: 'Shreya Katiyar' },
  { icon: InstagramIcon,href: 'https://www.instagram.com/shreyakatiyar',     label: 'Instagram', handle: '@shreyakatiyar' },
  { icon: Mail,         href: 'mailto:shreyakatiyar76@gmail.com',            label: 'Email',     handle: 'shreyakatiyar76@gmail.com' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name:        form.name,
          email:       form.email,
          subject:    `Portfolio Contact: ${form.subject}`,
          message:     form.message,
          from_name:  'Portfolio Contact Form',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }, 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3500)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] orb orb-indigo opacity-15 pointer-events-none" />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] orb orb-violet opacity-10 pointer-events-none" />

      <div ref={ref} className="container-width">

        {/* ── Section label ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-slate-50 text-sm font-mono">06.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Contact</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        {/* ── Hero row: cat + headline ── */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">

          {/* Cat image */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -4 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0"
          >
            {/* Glow ring behind the image */}
            <div className="absolute inset-0 rounded-3xl bg-blue-500/15 blur-2xl scale-110 pointer-events-none" />
            <div className="relative w-64 h-72 lg:w-72 lg:h-80 rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl">
              <Image
                src="/business-cat.png"
                alt="Let's discuss business"
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 bg-slate-800 border border-slate-600/40 rounded-2xl px-4 py-2 shadow-xl"
            >
              <p className="text-slate-50 text-xs font-semibold whitespace-nowrap">😼 Very serious.</p>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-slate-400 text-sm tracking-widest uppercase mb-4 font-medium">
              Open to work · Available now
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5">
              Let&apos;s discuss<br />
              <span className="gradient-text-accent">business.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
              I&apos;m open to freelance projects, full-time roles, or just a good conversation
              about tech. Drop me a message — I&apos;ll respond faster than this cat blinks.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-slate-50 hover:border-slate-600 hover:bg-slate-700/50 transition-all duration-200 text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Contact form ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/30 p-8 md:p-10"
        >
          {/* Form header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <p className="text-slate-400 text-sm font-mono">Contact form</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name"    id="name"    type="text"  placeholder="Your name"          value={form.name}    onChange={handleChange} required />
              <Field label="Email"   id="email"   type="email" placeholder="your@email.com"     value={form.email}   onChange={handleChange} required />
            </div>
            <Field   label="Subject" id="subject" type="text"  placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
            <TextareaField label="Message" id="message" placeholder="Tell me about your project, idea, or just say hi…" value={form.message} onChange={handleChange} required />

            <div className="flex items-center justify-between gap-4 pt-1">
              {/* Available indicator */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="text-slate-500 text-xs">Replies within 24h</span>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/20"
              >
                {status === 'idle'    && <><Send className="w-4 h-4" /> Send Message</>}
                {status === 'sending' && (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Sending…</>
                )}
                {status === 'sent'  && <><CheckCircle className="w-4 h-4" /> Message Sent!</>}
                {status === 'error' && <><AlertCircle className="w-4 h-4" /> Failed — Try Again</>}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  )
}

/* ── Reusable field components ───────────────────────────────── */
function Field({ label, id, type, placeholder, value, onChange, required }: {
  label: string; id: string; type: string; placeholder: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="input-animated-wrap rounded-xl p-[1px]">
        <input
          id={id} name={id} type={type} placeholder={placeholder}
          value={value} onChange={onChange} required={required}
          className="w-full bg-slate-900/80 rounded-[11px] px-4 py-3 text-slate-100 placeholder-slate-500/60 text-sm focus:outline-none transition-colors duration-200"
        />
      </div>
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange, required }: {
  label: string; id: string; placeholder: string
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="input-animated-wrap rounded-xl p-[1px]">
        <textarea
          id={id} name={id} rows={5} placeholder={placeholder}
          value={value} onChange={onChange} required={required}
          className="w-full bg-slate-900/80 rounded-[11px] px-4 py-3 text-slate-100 placeholder-slate-500/60 text-sm focus:outline-none transition-colors duration-200 resize-none"
        />
      </div>
    </div>
  )
}
