'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function SpotlightCursor({ size = 250 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const x = useSpring(0, { bounce: 0 })
  const y = useSpring(0, { bounce: 0 })
  const left = useTransform(x, v => `${v - size / 2}px`)
  const top  = useTransform(y, v => `${v - size / 2}px`)

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    parent.style.position = 'relative'
    parent.style.overflow = 'hidden'

    const move = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect()
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
    }
    parent.addEventListener('mousemove', move)
    parent.addEventListener('mouseenter', () => setActive(true))
    parent.addEventListener('mouseleave', () => setActive(false))
    return () => parent.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,white,transparent_75%)] blur-2xl transition-opacity duration-200"
      style={{ width: size, height: size, left, top, opacity: active ? 1 : 0 }}
    />
  )
}