import type { Metadata, Viewport } from 'next'

import { asMedia } from '@/components/site/Img'
import { getSettings } from '@/lib/payload'

import './styles.css'

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const viewport: Viewport = { themeColor: '#1C1917' }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const favicon = asMedia(settings.favicon)
  const apple = asMedia(settings.appleIcon)
  const og = asMedia(settings.ogImage)
  return {
    metadataBase: new URL(siteUrl),
    description: settings.defaultDescription ?? undefined,
    icons: {
      icon: favicon?.url ? [{ url: favicon.url, type: favicon.mimeType ?? undefined }] : undefined,
      apple: apple?.url ? [{ url: apple.url }] : undefined,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: settings.companyName,
      images: og?.url ? [{ url: og.url, width: og.width ?? undefined, height: og.height ?? undefined, alt: og.alt ?? undefined }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/assets/fonts/fraunces-normal-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/fraunces-italic-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/inter-normal-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ prefetch: [{ where: { href_matches: '/*' }, eagerness: 'moderate' }] }) }}
        />
      </head>
      <body>
        {children}
        <script src="/assets/js/site.js" defer />
      </body>
    </html>
  )
}
