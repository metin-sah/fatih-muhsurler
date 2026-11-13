import type { MetadataRoute } from 'next'

import { getClient } from '@/lib/payload'

const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { noindex: { not_equals: true } },
    limit: 100,
    depth: 0,
    select: { slug: true, updatedAt: true, order: true },
    sort: 'order',
  })
  return docs.map((doc) => ({
    url: doc.slug === 'anasayfa' ? `${siteUrl}/` : `${siteUrl}/${doc.slug}`,
    lastModified: doc.updatedAt,
    priority: doc.slug === 'anasayfa' ? 1 : 0.8,
  }))
}
