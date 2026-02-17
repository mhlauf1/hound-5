'use client'
import {useEffect} from 'react'
import {FadeIn} from '@/components/ui/FadeIn'
import {Button} from '@/components/ui/Button'
import Image from '@/app/components/SanityImage'
import {useNavbarTheme} from '@/components/global/NavbarThemeProvider'
import {useMediaQuery} from '@/hooks/useMediaQuery'
import type {HomepageQueryResult} from '@/sanity.types'

type HeroData = NonNullable<HomepageQueryResult>['hero']

export function HeroSection({data}: {data: HeroData}) {
  const {setTheme} = useNavbarTheme()
  const {matches: isMobile, ready} = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    setTheme('transparent')
    return () => setTheme('default')
  }, [setTheme])

  if (!data) return null

  return (
    <section className="bg-light-tan">
      {/* Hero Image — full bleed, navbar overlays this */}
      {data.heroImage?.asset && (
        <div className="relative w-full h-[50vh] lg:h-[60vh]">
          <Image
            id={data.heroImage.asset._id}
            alt={data.heroImage.alt || 'Hero image'}
            width={3840}
            crop={data.heroImage.crop}
            hotspot={data.heroImage.hotspot}
            mode="cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Angled badge banner overlapping bottom of image */}
          {data.badge?.text && (
            <div className="absolute bottom-0 left-0" style={{height: '50px'}}>
              <div
                className="relative border-b border-brown/20 h-full w-fit bg-light-tan"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 100%, 0 100%)',
                }}
              >
                <div className="h-full flex items-center pl-6 md:pl-12 pr-20 gap-2">
                  <span className="size-2 rounded-full border border-brown/60" />
                  <span className="font-sans text-sm text-brown">{data.badge.text}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Grid — padding-based layout */}
      <div className="">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[36vh] ">
          {/* Left Column — 60% */}
          <div className="flex flex-col-reverse md:flex-col pt-4 md:pt-10 px-6 md:px-12  gap-2 md:gap-4 w-full lg:w-[65%]">
            {ready ? (
              <FadeIn delay={isMobile ? 0.3 : 0.2}>
                <h1 className="font-serif max-w-[18ch] text-[42px] md:text-[56px] lg:[text-70px] xl:text-[88px] leading-[1.05] tracking-[-1px] text-brown">
                  {data.headline}
                </h1>
              </FadeIn>
            ) : (
              <h1 className="font-serif max-w-[18ch] text-[42px] md:text-[56px] lg:[text-70px] xl:text-[88px] leading-[1.05] tracking-[-1px] text-brown opacity-0">
                {data.headline}
              </h1>
            )}
            {data.subline &&
              (ready ? (
                <FadeIn delay={isMobile ? 0.1 : 0.3}>
                  <p className="mt-3 md:mt-4 font-sans  text-base md:text-lg text-brown/70">
                    {data.subline}
                  </p>
                </FadeIn>
              ) : (
                <p className="mt-3 md:mt-4 font-sans  text-base md:text-lg text-brown/70 opacity-0">
                  {data.subline}
                </p>
              ))}
          </div>

          {/* Right Column — 40% */}
          <div className="flex pb-10 lg:pb-0 border-x pt-5 lg:pt-10 border-black/10 flex-col items-start px-6 md:px-12 lg:px-0 lg:items-center w-auto lg:w-[600px]">
            {data.bodyText &&
              (ready ? (
                <FadeIn delay={0.4}>
                  <div className="rounded-[12px]">
                    <p className="font-sans text-lg md:max-w-[41ch]  md:text-xl text-brown/80 leading-relaxed">
                      {data.bodyText}
                    </p>
                    {data.cta?.label && data.cta?.href && (
                      <div className="mt-6">
                        <Button
                          label={data.cta.label}
                          href={data.cta.href}
                          variant={(data.cta.style as 'solid' | 'outline') || 'solid'}
                        />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ) : (
                <div className="rounded-[12px] opacity-0">
                  <p className="font-sans text-lg md:max-w-[41ch]  md:text-xl text-brown/80 leading-relaxed">
                    {data.bodyText}
                  </p>
                  {data.cta?.label && data.cta?.href && (
                    <div className="mt-6">
                      <Button
                        label={data.cta.label}
                        href={data.cta.href}
                        variant={(data.cta.style as 'solid' | 'outline') || 'solid'}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom accent grid — uses same flex layout as content above */}
      <div className="flex" style={{height: '25px'}}>
        <div className="w-[65%]" />
        <div className="w-full md:w-[600px] shrink-0 grid grid-cols-4 grid-rows-1">
          <div className="bg-light-tan border-l border-black/10" />
          <div className="bg-green" />
          <div className="bg-light-tan" />
          <div className="bg-brown" />
        </div>
      </div>
    </section>
  )
}
