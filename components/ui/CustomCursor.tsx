'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150, mass: 0.8 })
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150, mass: 0.8 })

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4)
      cursorY.set(e.clientY - 4)
    }

    const onEnterInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px'
        ringRef.current.style.height = '50px'
        ringRef.current.style.borderColor = 'rgba(59, 130, 246, 0.8)'
        ringRef.current.style.backgroundColor = 'rgba(59, 130, 246, 0.06)'
      }
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    }

    const onLeaveInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px'
        ringRef.current.style.height = '32px'
        ringRef.current.style.borderColor = 'rgba(59, 130, 246, 0.4)'
        ringRef.current.style.backgroundColor = 'transparent'
      }
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')

    window.addEventListener('mousemove', moveCursor)
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [cursorX, cursorY])

  return (
    <div className="custom-cursor hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed w-8 h-8 rounded-full border border-blue-500/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ x: ringX, y: ringY, marginLeft: '-12px', marginTop: '-12px' }}
      />
    </div>
  )
}
