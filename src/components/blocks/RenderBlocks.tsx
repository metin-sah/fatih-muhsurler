import type { Page } from '@/payload-types'

import type { Settings } from '../site/parts'
import { About, Audience, Explorer, Feature, Film, Hero, LocationBand, Marquee, PhotoBand, Stats, Tiles, Trust } from './Home'
import {
  Contact,
  Cta,
  Documents,
  Faq,
  Howto,
  Legal,
  MapSection,
  PageHero,
  Pillars,
  Planner,
  Route,
  Split,
  Steps,
  Timeline,
  Usta,
} from './Pages'

type Block = NonNullable<Page['layout']>[number]

const components: Record<string, React.ComponentType<{ block: never; settings: Settings; index: number; nextAnchor?: string }>> = {
  hero: Hero as never,
  pageHero: PageHero as never,
  marquee: Marquee as never,
  about: About as never,
  film: Film as never,
  stats: Stats as never,
  tiles: Tiles as never,
  photoBand: PhotoBand as never,
  explorer: Explorer as never,
  feature: Feature as never,
  audience: Audience as never,
  locationBand: LocationBand as never,
  trust: Trust as never,
  documents: Documents as never,
  steps: Steps as never,
  split: Split as never,
  timeline: Timeline as never,
  route: Route as never,
  pillars: Pillars as never,
  usta: Usta as never,
  planner: Planner as never,
  howto: Howto as never,
  faq: Faq as never,
  contact: Contact as never,
  map: MapSection as never,
  legal: Legal as never,
}

/** Sayfadaki bölümleri panelde dizildiği sırayla çizer. */
export const RenderBlocks = ({ blocks, settings }: { blocks: Block[]; settings: Settings }) => {
  const anchors = blocks.map((block) => ('anchor' in block && block.anchor ? block.anchor : null))
  return (
    <>
      {blocks.map((block, index) => {
        if (block.blockType === 'cta') return <Cta key={block.id ?? index} settings={settings} index={index} />
        const Component = components[block.blockType]
        if (!Component) return null
        const nextAnchor = anchors.slice(index + 1).find(Boolean) ?? undefined
        return <Component key={block.id ?? index} block={block as never} settings={settings} index={index} nextAnchor={nextAnchor} />
      })}
    </>
  )
}
