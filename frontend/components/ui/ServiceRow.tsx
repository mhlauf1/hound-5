import Link from 'next/link'

interface ServiceRowProps {
  number: string
  title: string
  href: string
}

export function ServiceRow({number, title, href}: ServiceRowProps) {
  return (
    <div className="border-t border-white/15 hover:bg-white/5 duration-300">
      <Link href={href} className="flex px-6 md:px-16 items-center justify-between py-6 md:py-8">
        <span className="font-serif text-3xl md:text-5xl text-white">{number}</span>
        <span className="font-serif text-2xl md:text-4xl lg:text-5xl text-white">{title}</span>
      </Link>
    </div>
  )
}
