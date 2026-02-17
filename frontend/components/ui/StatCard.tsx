'use client'
import {useRef} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'

interface StatCardProps {
  number: string
  label: string
  accentColor?: string
  className?: string
}

const bgColorMap: Record<string, string> = {
  orange: 'bg-orange',
  green: 'bg-green',
  brown: 'bg-brown',
  grey: 'bg-grey',
}

export function StatCard({number, label, accentColor = 'orange', className}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 60%', 'start 30%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const bgClass = bgColorMap[accentColor] || 'bg-orange'

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-lg p-6 md:p-8 flex flex-col justify-between ${className || ''}`}
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-full origin-top ${bgClass}`}
        style={{scaleY}}
      />
      <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-dark-brown tracking-tight leading-none">
        {number}
      </p>
      <p className="mt-4 text-lg md:text-xl text-dark-brown font-sans">{label}</p>
    </div>
  )
}
