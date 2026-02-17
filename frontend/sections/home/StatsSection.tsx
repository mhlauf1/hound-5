'use client'
import {FadeIn} from '@/components/ui/FadeIn'
import {StatCard} from '@/components/ui/StatCard'
import type {HomepageQueryResult} from '@/sanity.types'

type StatsData = NonNullable<HomepageQueryResult>['stats']

export function StatsSection({data}: {data: StatsData}) {
  if (!data) return null

  return (
    <section className="bg-light-tan py-16 md:py-24">
      <div className="px-6 md:px-16">
        {/* Top Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16">
          {data.heading && (
            <FadeIn>
              <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[64px] leading-[0.95] tracking-[-1px] text-brown">
                {data.heading}
              </h2>
            </FadeIn>
          )}
          {data.bodyText && (
            <FadeIn delay={0.1}>
              <div className="flex flex-col justify-end h-full">
                {data.bodyText.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className={`font-sans text-base md:text-lg text-dark-brown/80 leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          )}
        </div>

        {/* Stat Cards Grid */}
        {data.statsList && data.statsList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:items-end">
            {data.statsList.map((stat, index) => {
              const heights = ['lg:h-[480px]', 'lg:h-[380px]', 'lg:h-[280px]', 'lg:h-[200px]']
              return (
                <FadeIn key={stat._id} delay={0.2 + index * 0.1}>
                  <StatCard
                    number={stat.number}
                    label={stat.label}
                    accentColor={stat.accentColor || 'orange'}
                    className={heights[index] || ''}
                  />
                </FadeIn>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
