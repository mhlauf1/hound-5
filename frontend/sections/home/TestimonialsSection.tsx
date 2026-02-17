'use client'
import {useState, useEffect, useCallback} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {FadeIn} from '@/components/ui/FadeIn'
import {Badge} from '@/components/ui/Badge'
import Image from '@/app/components/SanityImage'
import type {HomepageQueryResult} from '@/sanity.types'

type TestimonialsData = NonNullable<HomepageQueryResult>['testimonials']

export function TestimonialsSection({data}: {data: TestimonialsData}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonials = data?.testimonialsList || []

  const next = useCallback(() => {
    if (testimonials.length > 0) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }
  }, [testimonials.length])

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, testimonials.length])

  if (!data || testimonials.length === 0) return null

  const active = testimonials[activeIndex]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column — Light tan background */}
      <div className="bg-grey flex flex-col justify-between px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div>
          {data.badge?.text && (
            <FadeIn>
              <Badge text={data.badge.text} variant="light" />
            </FadeIn>
          )}

          {data.heading && (
            <FadeIn delay={0.1}>
              <h2 className="mt-4 font-serif text-[32px] md:text-[54px] max-w-[12ch] lg:text-[64px] font-light leading-[1.05] text-dark-brown">
                {data.heading}
              </h2>
            </FadeIn>
          )}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-auto relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -20}}
                transition={{duration: 0.3}}
              >
                {active && (
                  <div className="bg-white/60 p-8 md:p-10 flex flex-col justify-between min-h-[240px]">
                    <p className="font-serif text-xl md:text-2xl font-light max-w-[90%] lg:text-[32px] text-dark-brown ">
                      &ldquo;{active.quote}&rdquo;
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div>
                        <span className="font-serif font-bold text-dark-brown">
                          - {active.authorName}.
                        </span>
                        {active.authorLabel && (
                          <span className="ml-2 text-sm text-dark-brown/60 font-sans">
                            {active.authorLabel}
                          </span>
                        )}
                      </div>

                      {testimonials.length > 1 && (
                        <div className="flex gap-1.5">
                          {testimonials.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveIndex(index)}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                  ? 'bg-orange'
                                  : 'border border-orange/40 bg-transparent hover:border-orange'
                              }`}
                              aria-label={`View testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      {/* Right Column — Dark brown background with square image */}
      <div className="bg-dark-brown flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <FadeIn delay={0.2}>
          {data.image?.asset ? (
            <div className=" overflow-hidden aspect-square w-full max-w-[520px]">
              <Image
                id={data.image.asset._id}
                alt={data.image.alt || 'Testimonials'}
                width={640}
                crop={data.image.crop}
                mode="cover"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className=" bg-dark-brown/50 border border-white/10 aspect-square w-full max-w-[520px]" />
          )}
        </FadeIn>
      </div>
    </section>
  )
}
