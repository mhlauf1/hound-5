import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'
import {Geist} from 'next/font/google'

import DraftModeToast from '@/app/components/DraftModeToast'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '@/app/client-utils'
import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'
import {NavbarThemeProvider} from '@/components/global/NavbarThemeProvider'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const seasonMix = localFont({
  src: [
    {path: '../public/fonts/SeasonMix-TRIAL-Light.otf', weight: '300'},
    {path: '../public/fonts/SeasonMix-TRIAL-Regular.otf', weight: '400'},
  ],
  variable: '--font-season-mix',
  display: 'swap',
})

const helveticaNeue = localFont({
  src: '../public/fonts/HelveticaNeueRoman.otf',
  variable: '--font-helvetica-neue',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-geist',
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html
      lang="en"
      className={`${seasonMix.variable} ${geist.variable}  ${helveticaNeue.variable}`}
    >
      <body>
        <NavbarThemeProvider>
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
        </NavbarThemeProvider>
      </body>
    </html>
  )
}
