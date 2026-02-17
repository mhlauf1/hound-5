import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

const serviceLinks = [
  {label: 'Daycare', href: '/services/daycare'},
  {label: 'Boarding', href: '/services/boarding'},
  {label: 'Grooming', href: '/services/grooming'},
  {label: 'Self-Wash', href: '/services/self-wash'},
]

const companyLinks = [
  {label: 'About Us', href: '/about'},
  {label: 'Pricing', href: '/pricing'},
  {label: 'Webcams', href: '/webcams'},
  {label: 'New Clients', href: '/contact'},
]

export default async function Footer() {
  const {data: settings} = await sanityFetch({query: settingsQuery})

  return (
    <footer className="bg-light-tan border-t border-grey/50">
      <div className="px-6 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-serif text-lg text-dark-brown">Hound Around</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-orange font-medium">
                Resort
              </span>
            </Link>
            {settings?.tagline && (
              <p className="mt-4 text-sm text-dark-brown/70 font-sans leading-relaxed max-w-[240px]">
                {settings.tagline}
              </p>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-sm font-medium tracking-[0.05em] text-dark-brown mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-dark-brown/70 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans text-sm font-medium tracking-[0.05em] text-dark-brown mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-dark-brown/70 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm font-medium tracking-[0.05em] text-dark-brown mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm font-sans text-dark-brown/70">
              {settings?.address && (
                <p>
                  {settings.address.street}
                  <br />
                  {settings.address.city}, {settings.address.state} {settings.address.zip}
                </p>
              )}
              {settings?.phone && <p>{settings.phone}</p>}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-orange transition-colors"
                >
                  {settings.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-grey/50">
        <div className="px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-dark-brown/60">
          <p>
            &copy; {new Date().getFullYear()} Hound Around Resort. Part of the{' '}
            <span className="underline">Embark Pet Services</span> family.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-dark-brown transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-dark-brown transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
