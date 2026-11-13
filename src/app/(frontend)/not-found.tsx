import type { Metadata } from 'next'

import { Footer, Header } from '@/components/site/Chrome'
import { Buttons } from '@/components/site/parts'
import { getSettings } from '@/lib/payload'
import { Rich } from '@/lib/text'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return { title: settings.notFound?.metaTitle ?? undefined, robots: { index: false } }
}

export default async function NotFound() {
  const settings = await getSettings()
  const nf = settings.notFound
  return (
    <>
      <Header settings={settings} path="" />
      <main id="icerik">
        <section className="page-hero plain" style={{ minHeight: '80svh' }}>
          <div className="wrap">
            {nf?.kicker ? <span className="kicker rv">{nf.kicker}</span> : null}
            <Rich as="h1" text={nf?.title} className="rv d1" />
            <Rich as="p" text={nf?.lead} className="lead rv d2" />
            <Buttons buttons={nf?.buttons} settings={settings} className="btn-row rv d3" style={{ marginTop: 32 }} />
            {nf?.deco ? (
              <div className="nf-num" aria-hidden="true">
                {nf.deco}
              </div>
            ) : null}
            {nf?.links?.length ? (
              <ul className="nf-links rv d3" aria-label={nf.linksLabel ?? undefined}>
                {nf.links.map((item) => (
                  <li key={item.id}>
                    <a href={item.href}>
                      <span>{item.label}</span>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </main>
      <Footer settings={settings} path="" />
    </>
  )
}
