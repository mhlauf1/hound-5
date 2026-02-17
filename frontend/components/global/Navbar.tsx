'use client'
import {useState, useEffect, useCallback} from 'react'
import Link from 'next/link'
import {motion, AnimatePresence} from 'framer-motion'
import {useNavbarTheme} from '@/components/global/NavbarThemeProvider'

const navLinks = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      {label: 'Daycare', href: '/services/daycare'},
      {label: 'Boarding', href: '/services/boarding'},
      {label: 'Grooming', href: '/services/grooming'},
      {label: 'Self-Wash', href: '/services/self-wash'},
    ],
  },
  {label: 'About Us', href: '/about'},
  {label: 'Web Cams', href: '/webcams'},
  {label: 'Pricing', href: '/pricing'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {theme} = useNavbarTheme()

  const isTransparent = theme === 'transparent' && !scrolled

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-light-tan/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="px-6 md:px-12">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none">
              <span
                className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                  isTransparent ? 'text-white' : 'text-dark-brown'
                }`}
              >
                Hound Around
              </span>
              <span
                className={`font-sans text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                  isTransparent ? 'text-white/80' : 'text-orange'
                }`}
              >
                Resort
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
                  onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`font-sans text-base transition-colors flex items-center gap-1 ${
                      isTransparent
                        ? 'text-white hover:text-white/70'
                        : 'text-dark-brown hover:text-orange'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                  {link.dropdown && (
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{opacity: 0, y: 8}}
                          animate={{opacity: 1, y: 0}}
                          exit={{opacity: 0, y: 8}}
                          transition={{duration: 0.15}}
                          className="absolute top-full left-0 pt-2"
                        >
                          <div className="bg-white rounded-[8px] shadow-lg py-2 min-w-[180px]">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2 text-sm font-sans text-dark-brown hover:bg-light-tan hover:text-orange transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-dark-brown'
                } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-dark-brown'
                } ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-dark-brown'
                } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — outside header to avoid backdrop-filter containing block */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3}}
              className="fixed inset-0 z-50 bg-dark-brown/40 md:hidden"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'spring', damping: 30, stiffness: 300}}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px] bg-light-tan md:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-grey/50">
                <Link href="/" className="flex flex-col leading-none" onClick={closeMobile}>
                  <span className="font-serif text-lg text-dark-brown">Hound Around</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-orange">
                    Resort
                  </span>
                </Link>
                <button onClick={closeMobile} className="p-2" aria-label="Close menu">
                  <svg
                    className="w-6 h-6 text-dark-brown"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.1 + i * 0.05}}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 font-sans text-xl text-dark-brown hover:text-orange transition-colors"
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                      {link.dropdown && (
                        <div className="ml-4 pb-2 flex flex-col gap-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block py-2 font-sans text-base text-dark-brown/60 hover:text-orange transition-colors"
                              onClick={closeMobile}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 py-6 border-t border-grey/50">
                <Link
                  href="/reservations"
                  className="block w-full py-4 bg-orange text-white font-sans text-base font-medium text-center rounded-lg hover:bg-orange/90 transition-colors"
                  onClick={closeMobile}
                >
                  Make a Reservation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
