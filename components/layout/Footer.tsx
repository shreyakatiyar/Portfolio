'use client'

export default function Footer() {
  return (
    <footer className="border-t border-slate-600 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-800 text-sm">
          © {new Date().getFullYear()} Shreya Katiyar. All rights reserved.
        </p>
        <p className="text-slate-400 text-sm">
          Built with{' '}
          <span className="text-slate-400">Next.js</span>
          {' & '}
          <span className="text-slate-400">Framer Motion</span>
        </p>
      </div>
    </footer>
  )
}
