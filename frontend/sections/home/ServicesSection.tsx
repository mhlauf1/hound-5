'use client'
import {motion} from 'framer-motion'
import {FadeIn} from '@/components/ui/FadeIn'
import {Badge} from '@/components/ui/Badge'
import {Button} from '@/components/ui/Button'
import {ServiceRow} from '@/components/ui/ServiceRow'
import type {HomepageQueryResult} from '@/sanity.types'

type ServicesData = NonNullable<HomepageQueryResult>['services']

const listContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
}

const listItem = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const},
  },
}

export function ServicesSection({data}: {data: ServicesData}) {
  if (!data) return null

  return (
    <section className="bg-dark-brown">
      {/* Top accent row — lines up under hero rectangles */}
      <div className="flex" style={{height: '25px'}}>
        <div className="w-[65%]" />
        <div className="w-[600px] shrink-0 grid grid-cols-4 grid-rows-1">
          <div className="bg-grey" />
          <div className="bg-dark-brown" />
          <div className="bg-orange" />
          <div className="bg-dark-brown" />
        </div>
      </div>

      <div className="py-16 md:py-24">
        {data.badge?.text && (
          <div className="px-6 md:px-16">
            <FadeIn>
              <Badge text={data.badge.text} variant="dark" />
            </FadeIn>
          </div>
        )}

        {data.heading && (
          <FadeIn className="px-6 md:px-16" delay={0.1}>
            <h2 className="mt-6 font-serif text-[28px] md:text-[36px] lg:text-[48px] leading-[1.25] text-white font-light max-w-6xl">
              {data.heading}
            </h2>
          </FadeIn>
        )}

        {data.servicesList && data.servicesList.length > 0 && (
          <motion.div
            className="mt-10 md:mt-16"
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-80px'}}
          >
            {data.servicesList.map((service, index) => (
              <motion.div key={service._id} variants={listItem}>
                <ServiceRow
                  number={String(index + 1)}
                  title={service.title}
                  href={`/services/${service.slug}`}
                />
              </motion.div>
            ))}
            <motion.div variants={listItem}>
              <div className="border-t border-white/15" />
            </motion.div>
          </motion.div>
        )}

        {data.cta?.label && data.cta?.href && (
          <FadeIn className="px-6 md:px-16" delay={0.5}>
            <div className="mt-10">
              <Button
                label={data.cta.label}
                href={data.cta.href}
                variant={(data.cta.style as 'solid' | 'outline') || 'solid'}
              />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
