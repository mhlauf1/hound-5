'use client'
import Link from 'next/link'
import {motion} from 'framer-motion'

interface ButtonProps {
  label: string
  href: string
  variant?: 'solid' | 'outline'
  icon?: boolean
  className?: string
}

export function Button({label, href, variant = 'solid', icon = true, className = ''}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center gap-2 rounded-[8px] px-6 py-3 font-sans font-medium text-base transition-colors duration-200'
  const variantClasses =
    variant === 'solid'
      ? 'bg-orange text-white hover:bg-orange/90'
      : 'border border-orange text-orange hover:bg-orange hover:text-white'

  return (
    <motion.div>
      <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
        {label}
        {icon && <span className="ml-1">&rarr;</span>}
      </Link>
    </motion.div>
  )
}
