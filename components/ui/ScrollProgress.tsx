'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  // Motion value updates the transform directly — no React re-render per scroll frame
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.75), rgba(255,255,255,0.4))',
      }}
    />
  )
}
