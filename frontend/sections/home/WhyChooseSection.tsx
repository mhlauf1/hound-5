'use client'
import {PortableTextBlock} from 'next-sanity'
import {FadeIn} from '@/components/ui/FadeIn'
import {Badge} from '@/components/ui/Badge'
import {Button} from '@/components/ui/Button'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import type {HomepageQueryResult} from '@/sanity.types'

type WhyChooseData = NonNullable<HomepageQueryResult>['whyChoose']

export function WhyChooseSection({data}: {data: WhyChooseData}) {
  if (!data) return null

  return (
    <section className="relative h-screen">
      {/* Background image — full bleed, covers entire section */}
      {data.image?.asset ? (
        <div className="absolute inset-0">
          <Image
            id={data.image.asset._id}
            alt={data.image.alt || 'Why choose Hound Around'}
            width={3840}
            crop={data.image.crop}
            mode="cover"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-dark-brown/20" />
      )}

      {/* Content overlay */}
      <div className="relative h-full hidden lg:flex">
        {/* Left spacer — shows background image */}
        <div className="flex-1" />

        {/* Right column — white border lines matching hero right column */}
        <div className="w-[600px] mr-16 shrink-0 border-x border-white h-full">
          {/* Sticky content box */}
          <div className="sticky top-24 mt-4 bg-light-tan px-10 py-12 xl:px-12">
            {data.badge?.text && (
              <FadeIn delay={0.1}>
                <Badge text={data.badge.text} />
              </FadeIn>
            )}

            {data.heading && (
              <FadeIn delay={0.2}>
                <h2 className="mt-4 font-serif text-[28px] md:text-[36px] lg:text-[44px] leading-[1.05] text-dark-brown">
                  {data.heading}
                </h2>
              </FadeIn>
            )}

            {data.bodyText && data.bodyText.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="mt-6 text-dark-brown/80">
                  <PortableText value={data.bodyText as PortableTextBlock[]} />
                </div>
              </FadeIn>
            )}

            {data.features && data.features.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {data.features.map((feature) => (
                    <div key={feature._key} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                      <span className="font-sans text-sm md:text-base text-dark-brown">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {data.cta?.label && data.cta?.href && (
              <FadeIn delay={0.5}>
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
        </div>
      </div>

      {/* Mobile layout — stacked content over image */}

      <div className="relative h-full flex flex-col justify-end lg:hidden">
        <div className="bg-light-tan pt-10 p-6 md:p-10">
          <FadeIn delay={0.3}>
            {data.badge?.text && <Badge text={data.badge.text} />}

            {data.heading && (
              <h2 className="mt-4 font-serif text-[36px] md:text-[36px] leading-[1.15] text-dark-brown">
                {data.heading}
              </h2>
            )}

            {data.bodyText && data.bodyText.length > 0 && (
              <div className="mt-4 text-dark-brown/80">
                <PortableText value={data.bodyText as PortableTextBlock[]} />
              </div>
            )}

            {data.features && data.features.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {data.features.map((feature) => (
                  <div key={feature._key} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                    <span className="font-sans text-sm md:text-base text-dark-brown">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {data.cta?.label && data.cta?.href && (
              <div className="mt-8">
                <Button
                  label={data.cta.label}
                  href={data.cta.href}
                  variant={(data.cta.style as 'solid' | 'outline') || 'solid'}
                />
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
