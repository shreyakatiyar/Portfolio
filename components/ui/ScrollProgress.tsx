'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: progress / 100,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.75), rgba(255,255,255,0.4))',
      }}
      initial={{ scaleX: 0 }}
    />
  )
}
