interface SectionWrapperProps {
  children: React.ReactNode
  bg?: 'light-tan' | 'dark-brown' | 'white' | 'grey'
  className?: string
  id?: string
}

const bgClasses: Record<string, string> = {
  'light-tan': 'bg-light-tan',
  'dark-brown': 'bg-dark-brown text-white',
  white: 'bg-white',
  grey: 'bg-grey',
}

export function SectionWrapper({children, bg = 'light-tan', className = '', id}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bgClasses[bg] || ''} ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}
