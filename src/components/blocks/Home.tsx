import type {
  AboutBlock,
  AudienceBlock,
  ExplorerBlock,
  FeatureBlock,
  FilmBlock,
  HeroBlock,
  LocationBandBlock,
  MarqueeBlock,
  PhotoBandBlock,
  StatsBlock,
  TilesBlock,
  TrustBlock,
} from '@/payload-types'
import { Paras, Rich, telHref } from '@/lib/text'

import { asMedia, Img } from '../site/Img'
import { Buttons, Credit, LinkArrow, SectionHead, Seal, type Settings } from '../site/parts'
import { Visual } from './Visual'

type P<T> = { block: T; settings: Settings; index: number; nextAnchor?: string }

const bg = (value?: string | null) =>
  ({ dark: 'sec grain', coal2: 'sec coal-2 grain', light: 'sec light grain', cream: 'sec cream grain' })[value ?? 'dark'] ?? 'sec grain'

const delay = (i: number) => (i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : '')
const pad = (n: number) => String(n).padStart(2, '0')

export const Hero = ({ block, settings, index, nextAnchor }: P<HeroBlock>) => (
  <section className="hero">
    <div className="hero-media">
      <Img media={block.image} sizes="(max-width:860px) 180vw, 100vw" priority />
    </div>
    {block.showSeal ? <Seal settings={settings} uid={`b${index}`} /> : null}
    <div className="wrap hero-in">
      {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
      <h1 className="rv d1">
        <span className="l1">{block.title}</span>
        {block.subtitle ? <span className="l2">{block.subtitle}</span> : null}
      </h1>
      <Rich as="p" text={block.lead} className="lead rv d2" />
      <Buttons buttons={block.buttons} settings={settings} className="btn-row rv d3" />
      <div className="hero-foot rv d3">
        {(block.facts ?? []).map((fact) =>
          fact.isPhone ? (
            <div key={fact.id}>
              <a href={telHref(settings.phone)} style={{ textDecoration: 'none' }}>
                <b>{fact.value}</b>
                <span>{fact.label}</span>
              </a>
            </div>
          ) : (
            <div key={fact.id}>
              <b>{fact.value}</b>
              <span>{fact.label}</span>
            </div>
          ),
        )}
        {block.scrollLabel ? (
          <a href={`#${nextAnchor ?? 'icerik'}`} className="scroll-cue">
            {block.scrollLabel} <i />
          </a>
        ) : null}
      </div>
    </div>
  </section>
)

export const Marquee = ({ block }: P<MarqueeBlock>) => {
  const list = (
    <ul>
      {(block.items ?? []).map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {list}
        {list}
      </div>
    </div>
  )
}

export const About = ({ block }: P<AboutBlock>) => (
  <section className="sec grain" id={block.anchor || undefined}>
    <div className="wrap split">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <p className="statement rv">
          {block.year ? <span className="yr">{block.year}</span> : null} <Rich text={block.statement} />
        </p>
        <div className="prose rv">
          <Paras text={block.text} className="lead" />
        </div>
        <div className="rv">
          <LinkArrow link={block.link} />
        </div>
      </div>
      <div className="collage">
        <figure className="frame rv">
          <Img media={block.image} sizes="(max-width:860px) 90vw, 45vw" />
        </figure>
        {asMedia(block.smallImage) ? (
          <figure className="frame small rv d2">
            <Img media={block.smallImage} sizes="(max-width:860px) 45vw, 22vw" />
          </figure>
        ) : null}
      </div>
    </div>
  </section>
)

export const Film = ({ block, settings }: P<FilmBlock>) => {
  const video = asMedia(block.video)
  const poster = asMedia(block.poster)
  const id = block.anchor || 'film'
  return (
    <section className="sec coal-2 grain film" aria-labelledby={id}>
      <div className="wrap">
        <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} id={id} />
        <figure className="film-frame rv" data-film>
          <video controls preload="none" playsInline width={1280} height={720} poster={poster?.sizes?.large?.url || poster?.url || undefined} aria-label={block.videoLabel}>
            {video?.url ? <source src={video.url} type={video.mimeType ?? 'video/mp4'} /> : null}
          </video>
          <button type="button" className="film-play" aria-label={settings.ui?.playFilm ?? undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>{block.playLabel}</span>
            {block.durationLabel ? <small>{block.durationLabel}</small> : null}
          </button>
        </figure>
        {block.transcript ? (
          <details className="film-text rv">
            <summary>{block.transcriptTitle}</summary>
            <p>{block.transcript}</p>
          </details>
        ) : null}
      </div>
    </section>
  )
}

export const Stats = ({ block }: P<StatsBlock>) => {
  const stats = block.stats ?? []
  const variant = stats.length === 4 ? ' four' : stats.length === 3 ? ' three' : ''
  return (
    <section className={bg(block.background)} aria-label={block.heading ? undefined : block.kicker || undefined}>
      <div className="wrap">
        {block.heading ? <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} /> : null}
        <div className={`stats${variant} rv`}>
          {stats.map((s) => (
            <div className="stat" key={s.id}>
              <b>
                {s.count ? <span data-count={s.value.replace(/\D/g, '')}>{s.value}</span> : s.value}
                {s.suffix ? <small>{s.suffix}</small> : null}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        {block.note ? <p className="stat-note rv">{block.note}</p> : null}
        {block.gallery?.length ? (
          <div className="gallery">
            {block.gallery.map((item, i) => (
              <figure className={`frame rv${delay(i)}`} key={item.id}>
                <Img media={item.image} sizes={i === 0 ? '(max-width:860px) 82vw, 40vw' : i === 1 ? '(max-width:860px) 82vw, 30vw' : '(max-width:860px) 60vw, 22vw'} />
                {item.caption ? <figcaption>{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export const Tiles = ({ block, settings }: P<TilesBlock>) => (
  <section className="sec grain tiles-sec">
    <div className="wrap">
      <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} />
    </div>
    <ul className="tiles rv">
      {(block.items ?? []).map((item, i) => (
        <li key={item.id}>
          <a className="tile" href={item.href}>
            <Img media={item.image} sizes="(max-width:860px) 50vw, 45vw" />
            <span className="t-n">{pad(i + 1)}</span>
            <span className="t-body">
              <h3>{item.title}</h3>
              {item.text ? <p>{item.text}</p> : null}
            </span>
            <span className="go" aria-hidden="true">
              <svg viewBox="0 0 18 18">
                <path d="M2 9h14M10 3l6 6-6 6" />
              </svg>
            </span>
          </a>
        </li>
      ))}
    </ul>
    <div className="wrap tiles-cta rv">
      <Buttons buttons={block.buttons} settings={settings} className="btn-row" />
      <LinkArrow link={block.moreLink} />
    </div>
  </section>
)

export const PhotoBand = ({ block }: P<PhotoBandBlock>) => (
  <section className="photo-band">
    <div className="pb-media">
      <Img media={block.image} sizes="100vw" />
    </div>
    <div className="wrap pb-in">
      <Rich as="p" text={block.statement} className="pb-say rv" />
      {block.meta?.length ? (
        <p className="pb-meta rv d1">
          {block.meta.map((item) => (
            <span key={item.id}>{item.label}</span>
          ))}
        </p>
      ) : null}
    </div>
  </section>
)

export const Explorer = ({ block, index }: P<ExplorerBlock>) => {
  const tabs = block.tabs ?? []
  const total = pad(tabs.length)
  return (
    <section className="sec light grain">
      <div className="wrap">
        <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} />
        <div className="explorer rv" data-tabs>
          <div className="ex-tabs" role="tablist" aria-label={block.tabsLabel ?? undefined}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`st-${index}-${i}`}
                aria-controls={`sp-${index}-${i}`}
                aria-selected={i === 0}
                tabIndex={i === 0 ? undefined : -1}
              >
                <em>{pad(i + 1)}</em>
                {tab.tabLabel}
              </button>
            ))}
          </div>
          {tabs.map((tab, i) => (
            <div className="ex-panel" role="tabpanel" id={`sp-${index}-${i}`} aria-labelledby={`st-${index}-${i}`} key={tab.id}>
              <div className="ex-media">
                <Visual item={tab} sizes="(max-width:860px) 100vw, 55vw" />
              </div>
              <div className="ex-text">
                <span className="ex-n">
                  {pad(i + 1)} / {total}
                </span>
                <h3>{tab.title}</h3>
                {tab.text ? <p>{tab.text}</p> : null}
                <LinkArrow link={tab.link} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const Feature = ({ block, settings }: P<FeatureBlock>) => (
  <section className="sec grain">
    <div className="wrap feature">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        <Rich as="p" text={block.lead} className="lead rv" />
        {block.steps?.length ? (
          <ol className="flow rv">
            {block.steps.map((step, i) => (
              <li key={step.id}>
                <em>{pad(i + 1)}</em>
                <div>
                  <b>{step.title}</b>
                  {step.text ? <span>{step.text}</span> : null}
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        <Buttons buttons={block.buttons} settings={settings} />
      </div>
      {block.quarters?.length ? (
        <div className="quarters rv" role="img" aria-label={block.quartersLabel ?? undefined}>
          {block.quarters.map((q, i) => (
            <div key={q.id}>
              <b>{i + 1}</b>
              <span>
                {q.label}
                {q.suffix ? <i> {q.suffix}</i> : null}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  </section>
)

export const Audience = ({ block }: P<AudienceBlock>) => (
  <section className="sec light grain">
    <div className="wrap">
      <SectionHead kicker={block.kicker} heading={block.heading} />
      <div className="audience rv">
        {(block.items ?? []).map((item) => (
          <a href={item.href} key={item.id}>
            {item.label ? <span>{item.label}</span> : null}
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
            {item.linkLabel ? <i>{item.linkLabel} →</i> : null}
          </a>
        ))}
      </div>
    </div>
  </section>
)

export const LocationBand = ({ block, settings }: P<LocationBandBlock>) => (
  <section className="band">
    <div className="band-media">
      <Img media={block.image} sizes="100vw" />
    </div>
    <div className="wrap band-in">
      {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
      <Rich as="p" text={block.statement} className="statement rv" />
      {block.showAddress ? (
        <address className="rv">
          {settings.addressLine1}, {settings.city}
        </address>
      ) : null}
      <Buttons buttons={block.buttons} settings={settings} />
    </div>
    <Credit media={block.image} />
  </section>
)

const icons = {
  shield: (
    <>
      <path d="M18 4l11 4v9c0 7-5 12-11 15C12 29 7 24 7 17V8z" />
      <path d="M13 18l4 4 6-7" />
    </>
  ),
  drop: (
    <>
      <path d="M18 5c5 7 9 11 9 16a9 9 0 0 1-18 0c0-5 4-9 9-16z" />
      <path d="M14 22a4 4 0 0 0 4 4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 10h18v14H3zM21 15h7l5 5v4H21z" />
      <circle cx="9" cy="26" r="3" />
      <circle cx="27" cy="26" r="3" />
    </>
  ),
}

export const Trust = ({ block }: P<TrustBlock>) => {
  const CardTitle = block.heading ? 'h3' : 'h2'
  return (
    <section className={bg(block.background)}>
      <div className="wrap">
        {block.heading ? <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} /> : null}
        <ul className="trust">
          {(block.items ?? []).map((item, i) => (
            <li className={`rv${delay(i)}`} key={item.id}>
              <span className="tn">{pad(i + 1)}</span>
              <svg className="ico" viewBox="0 0 36 36" aria-hidden="true">
                {icons[item.icon ?? 'shield']}
              </svg>
              <CardTitle>{item.title}</CardTitle>
              {item.text ? <p>{item.text}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
