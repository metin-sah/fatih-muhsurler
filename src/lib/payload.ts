import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Page, SiteSetting } from '@/payload-types'

export const getClient = cache(async () => getPayload({ config }))

export const getSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

export const getPage = cache(async (slug: string, draft = false): Promise<Page | null> => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export const getPageSlugs = cache(async (): Promise<string[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'pages', limit: 100, depth: 0, select: { slug: true } })
  return docs.map((doc) => doc.slug)
})
