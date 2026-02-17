interface TestimonialCardProps {
  quote: string
  authorName: string
  authorLabel?: string
}

export function TestimonialCard({quote, authorName, authorLabel}: TestimonialCardProps) {
  return (
    <div className="bg-light-tan rounded-[8px] p-6 md:p-8">
      <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-dark-brown leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6">
        <span className="font-serif font-bold text-dark-brown">- {authorName}.</span>
        {authorLabel && (
          <span className="ml-2 text-sm text-dark-brown/60 font-sans">{authorLabel}</span>
        )}
      </div>
    </div>
  )
}
