import { Fragment } from 'react'

import type { Media, SiteSetting } from '@/payload-types'
import { fill, format, Rich, telHref } from '@/lib/text'

import { asMedia } from './Img'

export type Settings = SiteSetting

export type Button = {
  kind?: ('link' | 'phone' | 'directions') | null
  style?: ('copper' | 'line') | null
  arrow?: boolean | null
  label?: string | null
  href?: string | null
  id?: string | null
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M1 8h14M9 2l6 6-6 6" />
  </svg>
)

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
  </svg>
)

/** Buton türüne göre adres: telefon ve yol tarifi Site Ayarları'ndan okunur. */
export const buttonTarget = (button: Button, settings: Settings) => {
  const label = fill(button.label, settings)
  if (button.kind === 'phone') return { href: telHref(settings.phone), label: label || settings.phone, external: false }
  if (button.kind === 'directions') return { href: settings.directionsUrl, label, external: true }
  return { href: button.href || '#', label, external: /^https?:/i.test(button.href || '') }
}

export const Buttons = ({
  buttons,
  settings,
  className = 'btn-row rv',
  style,
}: {
  buttons?: Button[] | null
  settings: Settings
  className?: string
  style?: React.CSSProperties
}) => {
  if (!buttons?.length) return null
  return (
    <div className={className} style={style}>
      {buttons.map((button, index) => {
        const target = buttonTarget(button, settings)
        return (
          <a
            key={button.id ?? index}
            href={target.href}
            className={`btn ${button.style === 'line' ? 'btn-line' : 'btn-copper'}`}
            {...(target.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {target.label}
            {button.arrow ? <> <ArrowIcon /></> : null}
          </a>
        )
      })}
    </div>
  )
}

export const LinkArrow = ({ link, className = 'link-arrow' }: { link?: { label?: string | null; href?: string | null } | null; className?: string }) =>
  link?.label && link.href ? (
    <a href={link.href} className={className}>
      {link.label} <span>→</span>
    </a>
  ) : null

/** Lisanslı fotoğrafların kaynak satırı (Medya → Fotoğraf kaynağı). */
export const Credit = ({ media, as: Tag = 'p' }: { media?: Media | number | null; as?: 'p' | 'figcaption' }) => {
  const doc = asMedia(media)
  if (!doc?.credit) return null
  return <Tag className="credit" dangerouslySetInnerHTML={{ __html: format(doc.credit) }} />
}

/** Kuruluş mührü: dönen halka yazısı ve yıl. */
export const Seal = ({ settings, uid }: { settings: Settings; uid: string }) => {
  const id = `seal-path-${uid}`
  if (!settings.sealYear) return null
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <g className="seal-ring">
          <text>
            <textPath href={`#${id}`} startOffset="0">
              {settings.sealRing}
            </textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="62" className="seal-in" />
        <text x="100" y="94" textAnchor="middle" className="seal-since">
          {settings.sealSince}
        </text>
        <text x="100" y="126" textAnchor="middle" className="seal-year">
          {settings.sealYear}
        </text>
      </svg>
    </div>
  )
}

/** Bölüm başı: üst başlık, ana başlık ve sağdaki açıklama. */
export const SectionHead = ({
  kicker,
  heading,
  lead,
  id,
}: {
  kicker?: string | null
  heading?: string | null
  lead?: string | null
  id?: string
}) => (
  <div className="sec-head">
    <div>
      {kicker ? <span className="kicker rv">{kicker}</span> : null}
      <Rich as="h2" text={heading} className="rv" id={id} />
    </div>
    <Rich as="p" text={lead} className="lead rv" />
  </div>
)

export const Lines = ({ text }: { text?: string | null }) =>
  text ? (
    <>
      {text.split(/\r?\n/).map((line, index, all) => (
        <Fragment key={index}>
          {line}
          {index < all.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  ) : null

/** Telefon, e-posta ve adres listesi (İletişim ve Fason kesim sayfalarında). */
export const ContactList = ({ settings }: { settings: Settings }) => (
  <ul className="contact-list rv">
    <li>
      <span className="ci" aria-hidden="true">
        <PhoneIcon />
      </span>
      <div>
        <span>{settings.phoneLabel}</span>
        <a href={telHref(settings.phone)}>{settings.phone}</a>
      </div>
    </li>
    <li>
      <span className="ci" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </span>
      <div>
        <span>{settings.emailLabel}</span>
        <a href={`mailto:${settings.email}`}>{settings.email}</a>
      </div>
    </li>
    <li>
      <span className="ci" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </span>
      <div>
        <span>{settings.addressLabel}</span>
        <p>
          {settings.addressLine1}
          {settings.addressLine2 ? (
            <>
              <br />
              {settings.addressLine2}
            </>
          ) : null}
        </p>
      </div>
    </li>
  </ul>
)

/** Teklif formu: gönderim `/api/teklif` ile panele kaydedilir; tüm yazılar Site Ayarları → Teklif formu'ndan gelir. */
export const QuoteForm = ({ settings }: { settings: Settings }) => {
  const f = settings.form ?? {}
  return (
    <form
      className="form rv"
      id="form"
      data-quote
      noValidate
      data-required={f.requiredText ?? ''}
      data-phone={f.phoneInvalidText ?? ''}
      data-sending={f.sendingText ?? ''}
      data-success={f.successText ?? ''}
      data-error={f.errorText ?? ''}
    >
      {f.title ? <h2>{f.title}</h2> : null}
      {f.intro ? <p>{f.intro}</p> : null}
      <div className="fields">
        <div className="field">
          <label htmlFor="f-ad">
            {f.nameLabel} <i>*</i>
          </label>
          <input id="f-ad" name="ad" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="f-firma">{f.companyLabel}</label>
          <input id="f-firma" name="firma" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="f-tel">
            {f.phoneLabel} <i>*</i>
          </label>
          <input id="f-tel" name="telefon" type="tel" autoComplete="tel" inputMode="tel" required />
        </div>
        <div className="field">
          <label htmlFor="f-bas">{f.headsLabel}</label>
          <input id="f-bas" name="bas" inputMode="numeric" />
        </div>
        <div className="field full">
          <label htmlFor="f-mesaj">{f.messageLabel}</label>
          <textarea id="f-mesaj" name="mesaj" />
        </div>
        <div className="field" hidden aria-hidden="true">
          <input name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <div className="form-foot">
        <Rich as="small" text={f.privacyNote} />
        <button className="btn btn-copper" type="submit">
          {f.submitLabel} <ArrowIcon />
        </button>
      </div>
      <p className="form-status" role="status" aria-live="polite" />
      {f.noscriptText ? (
        <noscript>
          <p className="form-status">{f.noscriptText}</p>
        </noscript>
      ) : null}
      {f.orCallText ? (
        <p className="form-or">
          {f.orCallText} <a href={telHref(settings.phone)}>{settings.phone}</a>
        </p>
      ) : null}
    </form>
  )
}
