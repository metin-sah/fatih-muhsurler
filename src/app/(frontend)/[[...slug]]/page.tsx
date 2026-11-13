import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Footer, Header } from '@/components/site/Chrome'
import { JsonLd } from '@/components/site/JsonLd'
import { getPage, getPageSlugs, getSettings } from '@/lib/payload'

type Args = { params: Promise<{ slug?: string[] }> }

const HOME = 'anasayfa'

const resolve = async (params: Args['params']) => {
  const { slug } = await params
  // Ana sayfa yalnızca kök adreste açılır (/anasayfa ikinci bir kopya üretmesin).
  if (slug?.length === 1 && slug[0] === HOME) return null
  return { slug: slug?.join('/') || HOME, path: `/${slug?.join('/') ?? ''}` }
}

export const revalidate = 86400

export async function generateStaticParams() {
  const slugs = await getPageSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug: slug === HOME ? [] : slug.split('/') }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const target = await resolve(params)
  if (!target) return {}
  const [page, settings] = await Promise.all([getPage(target.slug), getSettings()])
  if (!page) return {}
  return {
    title: page.metaTitle || `${page.title}${settings.titleSuffix ?? ''}`,
    description: page.metaDescription || settings.defaultDescription || undefined,
    alternates: { canonical: target.path },
    openGraph: { title: page.metaTitle || page.title, description: page.metaDescription || undefined, url: target.path },
    robots: page.noindex ? { index: false } : undefined,
  }
}

export default async function Page({ params }: Args) {
  const target = await resolve(params)
  if (!target) notFound()
  const { isEnabled: draft } = await draftMode()
  const [page, settings] = await Promise.all([getPage(target.slug, draft), getSettings()])
  if (!page) notFound()
  return (
    <>
      <Header settings={settings} path={target.path} />
      <main id="icerik">
        <RenderBlocks blocks={page.layout ?? []} settings={settings} />
      </main>
      <Footer settings={settings} path={target.path} />
      <JsonLd page={page} settings={settings} path={target.path} home={target.slug === HOME} />
    </>
  )
}
