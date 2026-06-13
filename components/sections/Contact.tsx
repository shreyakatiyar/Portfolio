'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@/components/ui/BrandIcons'
import { personalInfo } from '@/lib/data'
import { fadeUp } from '@/lib/variants'

const socials = [
  { icon: GitHubIcon, href: 'https://github.com/shreya-katiyar', label: 'GitHub', handle: '@shreya-katiyar' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/shreyakatiyar/', label: 'LinkedIn', handle: 'Shreya Katiyar' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram', handle: '@shreyakatiyar' },
  { icon: Mail, href: `mailto:${'shreyakatiyar76@gmail.com'}`, label: 'Email', handle: 'shreyakatiyar76@gmail.com' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `Portfolio Contact: ${form.subject}`,
          message: form.message,
          from_name: 'Portfolio Contact Form',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setTimeout(() => {
          setStatus('idle')
          setForm({ name: '', email: '', subject: '', message: '' })
        }, 4000)
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
    <section id="contact" className="section-padding relative">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] orb orb-indigo opacity-15 pointer-events-none" />

      <div ref={ref} className="container-width">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-slate-50 text-sm font-mono">06.</span>
          <span className="text-slate-50/60 text-sm tracking-widest uppercase">Contact</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s{' '}
            <span className="gradient-text-accent">work together</span>
          </h2>
          <p className="text-slate-50/80 max-w-xl mx-auto">
            I&apos;m currently open to new opportunities. Whether you have a project in mind or
            just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Get in touch</h3>
              <p className="text-slate-50/75 text-sm leading-relaxed">
                Currently available for freelance work, full-time roles, and interesting collaborations.
                Let&apos;s build something great together.
              </p>
            </div>

            <div className="space-y-3">
              {socials.map(({ icon: Icon, href, label, handle }, i) => (
                <div key={label} className="shooting-star-border rounded-xl" style={{ animationDelay: `${-((3 - i) * 0.3125)}s` }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-[11px] bg-[#0F172A] group transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-700/40 flex items-center justify-center border border-slate-600/25 group-hover:border-slate-600/50 group-hover:bg-slate-700/60 transition-all">
                    <Icon className="w-4 h-4 text-slate-50/70 group-hover:text-slate-50 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-50/50 group-hover:text-slate-50/70 transition-colors">{label}</p>
                    <p className="text-sm text-slate-50 group-hover:text-white transition-colors">{handle}</p>
                  </div>
                </a>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="text-slate-50 text-sm font-medium">Available for work</span>
              </div>
              <p className="text-slate-50/60 text-xs">Typically responds within 24 hours</p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-7 border border-slate-600/25 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AlwaysOnInput label="Name" id="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
              <AlwaysOnInput label="Email" id="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <AlwaysOnInput label="Subject" id="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
            <AlwaysOnTextarea label="Message" id="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />

            {/* Animated-border submit button */}
            <div className="btn-animated-border rounded-xl p-[1px]">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-70 text-slate-50 font-semibold rounded-[11px] transition-colors duration-200"
              >
                {status === 'idle' && (<><Send className="w-4 h-4" /> Send Message</>)}
                {status === 'sending' && (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Sending...</>
                )}
                {status === 'sent' && (<><CheckCircle className="w-4 h-4" /> Message Sent!</>)}
                {status === 'error' && (<><AlertCircle className="w-4 h-4" /> Failed — Try Again</>)}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function AlwaysOnInput({ label, id, type, placeholder, value, onChange, required }: {
  label: string; id: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="input-animated-wrap rounded-xl p-[1px]">
        <input
          id={id} name={id} type={type} placeholder={placeholder} value={value}
          onChange={onChange} required={required}
          className="w-full bg-[#0F172A] rounded-[11px] px-4 py-3 text-slate-100 placeholder-slate-500/60 text-sm focus:outline-none transition-colors duration-200"
        />
      </div>
    </div>
  )
}

function AlwaysOnTextarea({ label, id, placeholder, value, onChange, required }: {
  label: string; id: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="input-animated-wrap rounded-xl p-[1px]">
        <textarea
          id={id} name={id} rows={5} placeholder={placeholder}
          value={value} onChange={onChange} required={required}
          className="w-full bg-[#0F172A] rounded-[11px] px-4 py-3 text-slate-100 placeholder-slate-500/60 text-sm focus:outline-none transition-colors duration-200 resize-none"
        />
      </div>
    </div>
  )
}
