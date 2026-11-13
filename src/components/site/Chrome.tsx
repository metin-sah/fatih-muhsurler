import { telHref } from '@/lib/text'

import { asMedia } from './Img'
import { Lines, PhoneIcon, type Settings } from './parts'

const isCurrent = (href: string, path: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))

const Brand = ({ settings }: { settings: Settings }) => {
  const logo = asMedia(settings.logo)
  return (
    <a href="/" className="brand">
      {logo?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="brand-logo" src={logo.url} width={logo.width ?? undefined} height={logo.height ?? undefined} alt={logo.alt ?? settings.companyName} />
      ) : null}
      {settings.brandSubline ? (
        <span className="brand-text">
          <small>
            <Lines text={settings.brandSubline} />
          </small>
        </span>
      ) : null}
    </a>
  )
}

const MenuLinks = ({ settings, path }: { settings: Settings; path: string }) => (
  <>
    {(settings.nav ?? []).map((item) => (
      <a key={item.id ?? item.href} href={item.href} aria-current={isCurrent(item.href, path) ? 'page' : undefined}>
        {item.label}
      </a>
    ))}
  </>
)

export const Header = ({ settings, path }: { settings: Settings; path: string }) => {
  const ui = settings.ui ?? {}
  return (
    <>
      <a className="skip" href="#icerik">
        {ui.skipLink}
      </a>
      <header className="site-header" id="ust">
        <div className="topbar">
          <div className="wrap topbar-in">
            <span>{settings.addressShort}</span>
            <span>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
              <a href={telHref(settings.phone)}>{settings.phone}</a>
            </span>
          </div>
        </div>
        <div className="wrap nav">
          <Brand settings={settings} />
          <nav className="menu" aria-label={ui.mainMenu ?? undefined}>
            <MenuLinks settings={settings} path={path} />
          </nav>
          <a href={telHref(settings.phone)} className="nav-tel">
            {settings.phone}
          </a>
          {settings.quoteLabel ? (
            <a href={settings.quoteHref ?? '#'} className="btn btn-copper nav-cta">
              {settings.quoteLabel}
            </a>
          ) : null}
          <button
            className="burger"
            type="button"
            aria-label={ui.openMenu ?? undefined}
            data-open={ui.openMenu ?? ''}
            data-close={ui.closeMenu ?? ''}
            aria-expanded="false"
            aria-controls="mobil-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className="drawer" id="mobil-menu" hidden>
        <nav aria-label={ui.mobileMenu ?? undefined}>
          {settings.homeLabel ? (
            <a href="/" aria-current={path === '/' ? 'page' : undefined}>
              {settings.homeLabel}
            </a>
          ) : null}
          <MenuLinks settings={settings} path={path} />
        </nav>
        <div className="drawer-foot">
          {settings.quoteLabel ? (
            <a href={settings.quoteHref ?? '#'} className="btn btn-copper">
              {settings.quoteLabel}
            </a>
          ) : null}
          <a href={telHref(settings.phone)} className="drawer-tel">
            {settings.phone}
          </a>
          <p>
            {settings.addressLine1}
            <br />
            {settings.city}
          </p>
        </div>
      </div>
    </>
  )
}

export const Footer = ({ settings, path }: { settings: Settings; path: string }) => (
  <>
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <Brand settings={settings} />
            {settings.footerText ? <p>{settings.footerText}</p> : null}
          </div>
          <div>
            <h2 className="f-title">{settings.footerAddressTitle}</h2>
            <address>
              {settings.addressLine1}
              {settings.addressLine2 ? (
                <>
                  <br />
                  {settings.addressLine2}
                </>
              ) : null}
            </address>
            {settings.directionsLabel ? (
              <a className="f-link-arrow" href={settings.directionsUrl} target="_blank" rel="noopener">
                {settings.directionsLabel}
              </a>
            ) : null}
          </div>
          <div>
            <h2 className="f-title">{settings.footerContactTitle}</h2>
            <address>
              <a href={telHref(settings.phone)}>{settings.phone}</a>
              <br />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </address>
          </div>
          <div>
            <h2 className="f-title">{settings.footerPagesTitle}</h2>
            <ul className="f-links">
              {(settings.nav ?? []).map((item) => (
                <li key={item.id ?? item.href}>
                  <a href={item.href} aria-current={isCurrent(item.href, path) ? 'page' : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {settings.footerMark ? (
          <div className="f-mark" aria-hidden="true">
            {settings.footerMark}
          </div>
        ) : null}
        <div className="f-bot">
          <span>
            © <span data-year>{new Date().getFullYear()}</span> {settings.copyrightName}
          </span>
          <span>
            {settings.legalLabel && settings.legalHref ? <a href={settings.legalHref}>{settings.legalLabel}</a> : null}
            {settings.toTopLabel ? (
              <a href="#ust" className="to-top">
                {settings.toTopLabel}
              </a>
            ) : null}
          </span>
        </div>
      </div>
    </footer>
    <nav className="mbar" aria-label={settings.ui?.quickContact ?? undefined}>
      <a href={telHref(settings.phone)}>
        <PhoneIcon />
        {settings.callLabel}
      </a>
      {settings.quoteLabel ? (
        <a href={settings.quoteHref ?? '#'} className="solid">
          {settings.quoteLabel}
        </a>
      ) : null}
    </nav>
  </>
)
