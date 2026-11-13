import type { Page } from '@/payload-types'

import { fill } from '@/lib/text'

import { asMedia } from './Img'
import type { Settings } from './parts'

const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const Script = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
)

/** Google için yapısal veri: işletme, sayfa yolu, film ve sıkça sorulan sorular — tamamı panel içeriğinden üretilir. */
export const JsonLd = ({ page, settings, path, home }: { page: Page; settings: Settings; path: string; home: boolean }) => {
  const blocks = page.layout ?? []
  const og = asMedia(settings.ogImage)
  const out: object[] = []

  if (home) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#isletme`,
      name: settings.companyName,
      url: siteUrl,
      telephone: settings.phone,
      email: settings.email,
      image: og?.url,
      description: settings.businessDescription ?? undefined,
      foundingDate: settings.foundingDate ?? undefined,
      address: { '@type': 'PostalAddress', streetAddress: settings.addressLine1, addressLocality: settings.city, addressCountry: 'TR' },
      hasMap: settings.mapSearchUrl ?? undefined,
    })
  } else {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: settings.homeLabel, item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.title, item: `${siteUrl}${path}` },
      ],
    })
  }

  for (const block of blocks) {
    if (block.blockType === 'faq' && block.items?.length) {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: block.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: fill(item.answer, settings) },
        })),
      })
    }
    if (block.blockType === 'film') {
      const video = asMedia(block.video)
      const poster = asMedia(block.poster)
      if (video?.url)
        out.push({
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: block.videoLabel,
          description: block.lead ?? block.videoLabel,
          thumbnailUrl: poster?.url,
          contentUrl: video.url,
          uploadDate: block.uploadDate ?? undefined,
          duration: block.duration ? `PT${block.duration}S` : undefined,
          inLanguage: 'tr',
        })
    }
  }
  return (
    <>
      {out.map((data, i) => (
        <Script key={i} data={data} />
      ))}
    </>
  )
}
