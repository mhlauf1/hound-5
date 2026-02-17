import {sanityFetch} from '@/sanity/lib/live'
import {homepageQuery} from '@/sanity/lib/queries'
import {
  HeroSection,
  ServicesSection,
  WhyChooseSection,
  StatsSection,
  TestimonialsSection,
} from '@/sections/home'

export default async function Page() {
  const {data: homepage} = await sanityFetch({
    query: homepageQuery,
  })

  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-brown">Welcome to Hound Around Resort</h1>
          <p className="mt-4 text-dark-brown/70">
            Add homepage content in Sanity Studio to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection data={homepage.hero} />
      <ServicesSection data={homepage.services} />
      <WhyChooseSection data={homepage.whyChoose} />
      <StatsSection data={homepage.stats} />
      <TestimonialsSection data={homepage.testimonials} />
    </>
  )
}
