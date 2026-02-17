interface BadgeProps {
  text: string
  variant?: 'light' | 'dark'
  dotColor?: string
}

export function Badge({text, variant = 'light', dotColor = 'bg-orange'}: BadgeProps) {
  const textClass = variant === 'dark' ? 'text-white/80' : 'text-brown/80'

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span className={`text-md font-sans capitalize  ${textClass}`}>{text}</span>
    </div>
  )
}
