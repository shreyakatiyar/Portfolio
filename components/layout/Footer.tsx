'use client'

export default function Footer() {
  return (
    <footer style={{ background: '#070b12', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
          © {new Date().getFullYear()} Shreya Katiyar. All rights reserved.
        </p>
        <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
          Built with Next.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  )
}
