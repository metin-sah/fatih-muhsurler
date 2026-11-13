import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media } from '@/payload-types'

const getBrand = async () => {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)
  return { logo: (settings?.logo as Media | null) ?? null, name: settings?.companyName ?? '' }
}

/** Giriş ekranındaki logo: logo koyu zemin için tasarlandığından koyu bir kutuda gösterilir. */
export const AdminLogo = async () => {
  const { logo, name } = await getBrand()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {logo?.url ? (
        <span style={{ background: '#1c1917', padding: '18px 26px', borderRadius: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.url} alt={logo.alt ?? name} style={{ height: 72, width: 'auto', display: 'block' }} />
        </span>
      ) : null}
      <span style={{ fontFamily: 'Georgia, serif', fontSize: 20 }}>{name}</span>
    </div>
  )
}

/** Menüdeki küçük simge. */
export const AdminIcon = async () => {
  const { logo, name } = await getBrand()
  if (!logo?.url) return <span>{name.charAt(0)}</span>
  return (
    <span style={{ background: '#1c1917', padding: 4, borderRadius: 6, display: 'inline-block' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.url} alt={logo.alt ?? name} style={{ height: 20, width: 'auto', display: 'block' }} />
    </span>
  )
}
