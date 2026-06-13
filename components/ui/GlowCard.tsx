'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function GlowCard({ children, className, glowColor = '#3B82F6' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Derived motion value for the spotlight gradient
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}15, transparent 80%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative overflow-hidden bg-slate-800/50 backdrop-blur-xl glow-border rounded-2xl', className)}
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{ background }}
      />
      {children}
    </motion.div>
  )
}
