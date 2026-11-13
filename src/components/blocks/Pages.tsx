import { Fragment } from 'react'

import type {
  ContactBlock,
  DocumentsBlock,
  FaqBlock,
  HowtoBlock,
  LegalBlock,
  MapBlock,
  PageHeroBlock,
  PillarsBlock,
  PlannerBlock,
  RouteBlock,
  SplitBlock,
  StepsBlock,
  TimelineBlock,
  UstaBlock,
} from '@/payload-types'
import { fill, Paras, Rich, slugify, telHref } from '@/lib/text'

import { asMedia, Img } from '../site/Img'
import { ArrowIcon, Buttons, ContactList, Credit, LinkArrow, QuoteForm, SectionHead, Seal, type Settings } from '../site/parts'
import { Visual } from './Visual'

type P<T> = { block: T; settings: Settings; index: number }

const bg = (value?: string | null, fallback = 'dark') =>
  ({ dark: 'sec grain', coal2: 'sec coal-2 grain', light: 'sec light grain', cream: 'sec cream grain' })[value ?? fallback] ?? 'sec grain'
const pad = (n: number) => String(n).padStart(2, '0')
const delay = (i: number) => (i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : '')

/** Sucuk sayfasındaki halka sucuk dizisi (yalnızca süsleme çizimi). */
const kangal = (cx: number, top: number, s: number, i: number) => {
  const t = (x: number, y: number) => `${(cx + x * s).toFixed(1)} ${(top + y * s).toFixed(1)}`
  const ring =
    `M${t(-4, 14)}C${t(-19, 11)} ${t(-25, 32)} ${t(-24, 50)}C${t(-23, 73)} ${t(-12, 90)} ${t(0, 90)}C${t(12, 90)} ${t(23, 73)} ${t(24, 50)}C${t(25, 32)} ${t(19, 11)} ${t(4, 14)}` +
    `C${t(3, 19)} ${t(3, 24)} ${t(3, 28)}C${t(11, 28)} ${t(13, 42)} ${t(12, 54)}C${t(11, 67)} ${t(6, 75)} ${t(0, 75)}C${t(-6, 75)} ${t(-11, 67)} ${t(-12, 54)}C${t(-13, 42)} ${t(-11, 28)} ${t(-3, 28)}C${t(-3, 24)} ${t(-3, 19)} ${t(-4, 14)}Z`
  const fat = [[-18, 46], [-15, 64], [-7, 82], [9, 82], [17, 62], [19, 40], [-20, 30], [14, 24]]
  return (
    <g key={i} style={{ ['--i' as string]: i }}>
      <path className="tie" d={`M${t(0, 15)}L${t(0, 0)}`} />
      <path className="ring" d={ring} />
      {fat.map(([x, y], k) => (
        <circle key={k} className="fat" cx={(cx + x * s).toFixed(1)} cy={(top + y * s).toFixed(1)} r={(0.9 * s).toFixed(1)} />
      ))}
      <path className="tie" d={`M${t(-5, 15)}Q${t(0, 10)} ${t(5, 15)}`} />
    </g>
  )
}

export const PageHero = ({ block, settings, index }: P<PageHeroBlock>) => {
  const photo = block.variant === 'photo' && asMedia(block.image)
  const crumbs = block.crumb ? (
    <nav className="crumbs rv" aria-label={settings.ui?.breadcrumb ?? undefined}>
      <ol>
        <li>
          <a href="/">{settings.homeLabel}</a>
        </li>
        <li aria-current="page">{block.crumb}</li>
      </ol>
    </nav>
  ) : null
  const body = (
    <>
      {crumbs}
      <Rich as="h1" text={block.title} className="rv d1" />
      <Rich as="p" text={block.lead} className="lead rv d2" />
      <Buttons buttons={block.buttons} settings={settings} className="btn-row rv d3" style={{ marginTop: 32 }} />
    </>
  )
  return (
    <section className={`page-hero${photo ? '' : ' plain'}`}>
      {photo ? (
        <div className="hero-media">
          <Img media={block.image} sizes="100vw" priority />
        </div>
      ) : null}
      {block.showSeal ? (
        <div className="wrap page-hero-in">
          <div>{body}</div>
          <Seal settings={settings} uid={`p${index}`} />
        </div>
      ) : (
        <div className="wrap">
          {body}
          {block.variant === 'sucuk' ? (
            <>
              {block.decoWord ? (
                <div className="sucuk-hero-word rv d3" aria-hidden="true">
                  {block.decoWord}
                </div>
              ) : null}
              <svg className="sucuk-garland" viewBox="0 0 560 150" aria-hidden="true">
                <path className="rope" d="M6 20Q280 32 554 20" />
                {[0, 1, 2, 3, 4].map((i) => kangal(64 + i * 108, 22, 1.2, i))}
              </svg>
            </>
          ) : null}
        </div>
      )}
      {photo && block.showCredit ? <Credit media={block.image} /> : null}
    </section>
  )
}

export const Steps = ({ block }: P<StepsBlock>) => {
  const stats = block.stats ?? []
  const steps = block.items ?? []
  return (
    <section className="sec light grain">
      {stats.length ? (
        <div className="wrap">
          <div className={`stats${stats.length === 4 ? ' four' : ''} rv`}>
            {stats.map((s) => (
              <div className="stat" key={s.id}>
                <b>
                  {s.value}
                  {s.suffix ? <small>{s.suffix}</small> : null}
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="wrap tesis-grid">
        <nav className="step-nav" aria-label={block.navLabel ?? undefined}>
          <ol>
            {steps.map((step, i) => (
              <li key={step.id}>
                <a href={`#${step.anchor}`}>
                  <em>{pad(i + 1)}</em>
                  {step.navTitle || step.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="steps">
          {steps.map((step, i) => (
            <article className="step" id={step.anchor} key={step.id}>
              <Visual item={step} sizes="(max-width:860px) 100vw, 38vw" className="step-media rv" />
              <div className="rv">
                <span className="step-num">{pad(i + 1)}</span>
                <h2>{step.title}</h2>
                {step.text ? <p>{step.text}</p> : null}
                {step.chips?.length ? (
                  <div className="breeds">
                    {step.chips.map((chip) => (
                      <span className="chip" key={chip.id}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                ) : null}
                {step.fact ? <span className="fact">{step.fact}</span> : null}
                {step.link?.label ? (
                  <div style={{ marginTop: 24 }}>
                    <LinkArrow link={step.link} />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const shapeStyle = { portrait: undefined, tall: { aspectRatio: '2/3' } } as const

export const Split = ({ block }: P<SplitBlock>) => {
  const shape = block.imageShape ?? 'wide'
  return (
    <section className={bg(block.background, 'cream')}>
      <div className={`wrap split${block.reverse ? ' rev' : ''}`}>
        <div className="stack">
          {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
          <Rich as="h2" text={block.heading} className="rv" />
          <Rich as="p" text={block.lead} className="lead rv" />
          <div className="rv">
            <LinkArrow link={block.link} />
          </div>
        </div>
        <figure className={`frame${shape === 'wide' ? ' wide' : ''} rv`} style={shape === 'tall' ? shapeStyle.tall : undefined}>
          <Img media={block.image} sizes="(max-width:860px) 100vw, 50vw" />
          {block.showCredit ? <Credit media={block.image} as="figcaption" /> : null}
        </figure>
      </div>
    </section>
  )
}

export const Timeline = ({ block }: P<TimelineBlock>) => (
  <section className={bg(block.background, 'light')}>
    <div className="wrap split">
      <div className="prose stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        <Paras text={block.text} className="rv" />
      </div>
      <ol className="timeline rv" aria-label={block.listLabel ?? undefined}>
        {(block.items ?? []).map((item) => (
          <li key={item.id}>
            <b>{item.year}</b>
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export const Route = ({ block }: P<RouteBlock>) => (
  <section className="sec coal-2 grain">
    <div className="wrap route-wrap">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        <Rich as="p" text={block.lead} className="lead rv" />
        <div className="rv">
          <LinkArrow link={block.link} />
        </div>
      </div>
      <figure className="route rv">
        <svg viewBox="0 0 560 340" role="img" aria-label={block.drawingLabel ?? undefined}>
          <path className="r-base" d="M478 268C420 262 392 214 340 202S250 196 214 150 150 92 86 70" />
          <path className="r-ties" d="M478 268C420 262 392 214 340 202S250 196 214 150 150 92 86 70" />
          <path className="r-line" pathLength={1} d="M478 268C420 262 392 214 340 202S250 196 214 150 150 92 86 70" />
          <circle className="r-stop" cx="478" cy="268" r="7" />
          <circle className="r-stop" cx="86" cy="70" r="7" />
          <g className="r-train">
            <rect x="-13" y="-7" width="26" height="14" rx="3" />
          </g>
          <text x="478" y="302" textAnchor="middle">
            {block.from}
          </text>
          <text x="86" y="42" textAnchor="middle">
            {block.to}
          </text>
        </svg>
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    </div>
  </section>
)

export const Pillars = ({ block }: P<PillarsBlock>) => (
  <section className={bg(block.background)} id={block.anchor || undefined}>
    <div className="wrap">
      <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} />
      {asMedia(block.image) ? (
        <figure className="frame wide sucuk-photo rv">
          <Img media={block.image} sizes="(max-width:860px) 100vw, 90vw" />
        </figure>
      ) : null}
      <ul className="pillars rv">
        {(block.items ?? []).map((item, i) => (
          <li key={item.id}>
            <em>{pad(i + 1)}</em>
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </li>
        ))}
      </ul>
      {block.chain?.length ? (
        <ol className="chain rv" aria-label={block.chainLabel ?? undefined}>
          {block.chain.map((item) => (
            <li key={item.id} aria-current={item.current ? 'step' : undefined}>
              <a href={item.href ?? '#'}>{item.label}</a>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  </section>
)

export const Usta = ({ block, settings, index }: P<UstaBlock>) => (
  <section className="sec cream grain">
    <div className="wrap usta">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        <div className="prose rv">
          <Paras text={block.text} className="lead" />
        </div>
        {block.chips?.length ? (
          <div className="facts-inline rv">
            {block.chips.map((chip) => (
              <span className="chip" key={chip.id}>
                {chip.label}
              </span>
            ))}
          </div>
        ) : null}
        {block.shopLink?.href && block.shopLink.label ? (
          <div className="btn-row rv">
            <a href={block.shopLink.href} className="btn btn-copper" target="_blank" rel="noopener">
              {block.shopLink.label}
            </a>
          </div>
        ) : null}
        {block.infoLabel ? (
          <p className="rv dim">
            {block.infoLabel}{' '}
            <a href={telHref(settings.phone)} style={{ color: 'var(--bordo)', fontWeight: 600, textDecoration: 'none' }}>
              {settings.phone}
            </a>
          </p>
        ) : null}
      </div>
      <div className="usta-card rv">
        {block.cardKicker ? <span className="k">{block.cardKicker}</span> : null}
        <svg className="usta-draw" viewBox="0 0 340 120" aria-hidden="true">
          <path d="M8 14h324" />
          {[0, 1, 2, 3, 4].map((i) => kangal(48 + i * 61, 14, 1, i))}
        </svg>
        <div>
          {block.cardTitle ? <b>{block.cardTitle}</b> : null}
          {block.cardText ? <p style={{ marginTop: 14 }}>{block.cardText}</p> : null}
        </div>
        <Seal settings={settings} uid={`u${index}`} />
      </div>
    </div>
  </section>
)

export const Planner = ({ block }: P<PlannerBlock>) => {
  const min = block.min ?? 1
  const max = block.max ?? 400
  const start = block.start ?? 20
  const mult = block.multiplier ?? 4
  return (
    <section className="sec grain">
      <div className="wrap feature">
        <div className="stack">
          {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
          <Rich as="h2" text={block.heading} className="rv" />
          <Rich as="p" text={block.lead} className="lead rv" />
          {block.chips?.length ? (
            <div className="facts-inline rv">
              {block.chips.map((chip) => (
                <span className="chip" key={chip.id}>
                  {chip.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="planner rv" data-planner data-mult={mult} data-unit={block.unit ?? ''}>
          <label htmlFor="pl-bas">{block.question}</label>
          <div className="pl-read">
            <output id="pl-out" htmlFor="pl-bas">
              {start}
            </output>
            <span>{block.unit}</span>
          </div>
          <input id="pl-bas" type="range" min={min} max={max} defaultValue={start} step={1} />
          <div className="pl-scale" aria-hidden="true">
            {(block.marks ?? []).map((mark) => (
              <i className="pl-mark" key={mark.id} style={{ left: `${((mark.value - min) / (max - min)) * 100}%` }}>
                <b>{mark.display || mark.value}</b>
                {mark.label}
              </i>
            ))}
          </div>
          <p className="pl-result" aria-live="polite">
            <b data-planner-result>{start * mult}</b> {block.resultText} {block.resultNote ? <span>{block.resultNote}</span> : null}
          </p>
          {block.buttonLabel ? (
            <a href="#form" className="btn btn-copper" data-planner-go>
              {block.buttonLabel} <ArrowIcon />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export const Howto = ({ block, settings }: P<HowtoBlock>) => (
  <section className="sec light grain">
    <div className="wrap">
      <SectionHead kicker={block.kicker} heading={block.heading} lead={block.lead} />
      <ol className="howto">
        {(block.items ?? []).map((item, i) => (
          <li className={`rv${delay(i)}`} key={item.id}>
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </li>
        ))}
      </ol>
      {block.note ? (
        <div className="price-note rv">
          <p>{block.note}</p>
          {block.noteCall ? <a href={telHref(settings.phone)}>{settings.phone} →</a> : null}
        </div>
      ) : null}
    </div>
  </section>
)

export const Faq = ({ block, settings }: P<FaqBlock>) => (
  <section className="sec grain">
    <div className="wrap faq-grid">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
      </div>
      <div className="faq rv">
        {(block.items ?? []).map((item, i) => (
          <details key={item.id} open={i === 0}>
            <summary>{item.question}</summary>
            <p>{fill(item.answer, settings)}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

export const Contact = ({ block, settings }: P<ContactBlock>) => (
  <section className={bg(block.background, 'coal2')}>
    <div className="wrap form-wrap">
      <div className="stack">
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        <Rich as="p" text={block.lead} className="lead rv" />
        {block.showContacts ? <ContactList settings={settings} /> : null}
      </div>
      <QuoteForm settings={settings} />
    </div>
  </section>
)

export const MapSection = ({ block, settings }: P<MapBlock>) => {
  const cover = asMedia(block.cover)
  const coverUrl = cover?.sizes?.medium?.url || cover?.url
  return (
    <section className="sec light grain">
      <div className="wrap">
        <SectionHead kicker={block.kicker} heading={block.heading} lead={fill(block.lead, settings)} />
        <div
          className="map rv"
          data-src={settings.mapEmbedUrl ?? ''}
          data-title={settings.companyName}
          style={coverUrl ? ({ ['--map-cover' as string]: `url(${coverUrl})` } as React.CSSProperties) : undefined}
        >
          <div className="map-facade">
            <svg className="pin" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 36s11-11 11-20a11 11 0 0 0-22 0c0 9 11 20 11 20z" />
              <circle cx="20" cy="16" r="4" />
            </svg>
            {block.coverTitle ? <b>{block.coverTitle}</b> : null}
            {block.coverText ? <p>{block.coverText}</p> : null}
            {block.buttonLabel ? (
              <button type="button" className="btn btn-copper" data-map>
                {block.buttonLabel}
              </button>
            ) : null}
          </div>
        </div>
        <Buttons buttons={block.buttons} settings={settings} className="map-actions rv" />
      </div>
    </section>
  )
}

export const Legal = ({ block, settings }: P<LegalBlock>) => {
  const sections = (block.sections ?? []).map((section) => ({ ...section, slug: slugify(section.title) }))
  return (
    <section className="sec light grain legal">
      <div className="wrap legal-grid">
        <nav className="legal-toc" aria-label={block.tocLabel ?? undefined}>
          {block.tocLabel ? <span className="kicker">{block.tocLabel}</span> : null}
          <ol>
            {sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.slug}`}>
                  <em>{pad(i + 1)}</em>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-body">
          {sections.map((section, i) => (
            <Fragment key={section.id}>
              <h2 id={section.slug}>
                <span>{pad(i + 1)}</span>
                {section.title}
              </h2>
              <Paras text={fill(section.text, settings)} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export const Documents = ({ block }: P<DocumentsBlock>) => (
  <section className={bg(block.background, 'light')}>
    <div className="wrap">
      <div className="docs-sec" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}>
        {block.kicker ? <span className="kicker rv">{block.kicker}</span> : null}
        <Rich as="h2" text={block.heading} className="rv" />
        {(block.items ?? []).map((doc) => {
          const media = asMedia(doc.image)
          return (
            <div className="doc rv" key={doc.id}>
              <a className="doc-img" href={media?.url ?? '#'} target="_blank" rel="noopener" aria-label={doc.zoomLabel ?? undefined}>
                <Img media={doc.image} sizes="(max-width:860px) 80vw, 320px" />
              </a>
              <div className="doc-body">
                <span className="doc-k">{doc.label}</span>
                <h3>{doc.title}</h3>
                {doc.rows?.length ? (
                  <dl>
                    {doc.rows.map((row) => (
                      <div key={row.id}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {doc.linkLabel && media?.url ? (
                  <a className="link-arrow" href={media.url} target="_blank" rel="noopener">
                    {doc.linkLabel} <span>→</span>
                  </a>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

export const Cta = ({ settings, index }: { settings: Settings; index: number }) => {
  const cta = settings.cta
  if (!cta?.heading) return null
  return (
    <section className="cta">
      <div className="wrap cta-in">
        <div>
          {cta.kicker ? (
            <span className="kicker rv" style={{ color: 'var(--cream)' }}>
              {cta.kicker}
            </span>
          ) : null}
          <Rich as="h2" text={cta.heading} className="rv" />
          {cta.showPhone ? (
            <a className="tel rv" href={telHref(settings.phone)}>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
                </svg>
              </span>
              {settings.phone}
            </a>
          ) : null}
          <Buttons buttons={cta.buttons} settings={settings} />
        </div>
        <div className="cta-seal">
          <Seal settings={settings} uid={`c${index}`} />
        </div>
      </div>
    </section>
  )
}
