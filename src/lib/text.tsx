import { createElement, type ElementType } from 'react'

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const SAFE_HREF = /^(\/|#|https?:\/\/|mailto:|tel:)/i

/**
 * Paneldeki sade yazım kurallarını HTML'e çevirir:
 * *vurgu* → <em>, **kalın** → <strong>, [yazı](adres) → bağlantı, satır sonu → <br>.
 * Önce tüm metin kaçırılır; yalnızca bu dört kalıp etikete dönüşür.
 */
export const format = (value: string | null | undefined): string => {
  if (!value) return ''
  return escape(value)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
      const url = href.replace(/&amp;/g, '&')
      if (!SAFE_HREF.test(url)) return label
      const external = /^https?:/i.test(url)
      return `<a href="${escape(url)}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\r?\n/g, '<br>')
}

type RichProps = { text?: string | null; as?: ElementType; className?: string; id?: string }

/** Biçimli tek parça metin (başlık, açıklama). Boşsa hiçbir şey çizmez. */
export const Rich = ({ text, as = 'span', className, id }: RichProps) =>
  text ? createElement(as, { className, id, dangerouslySetInnerHTML: { __html: format(text) } }) : null

/** Boş satırla ayrılan bölümleri ayrı paragraflar olarak çizer. */
export const Paras = ({ text, className }: { text?: string | null; className?: string }) => {
  if (!text) return null
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part, index) => (
          <p key={index} className={className} dangerouslySetInnerHTML={{ __html: format(part) }} />
        ))}
    </>
  )
}

/** Telefon numarasından arama bağlantısı üretir (0 ile başlayan Türkiye numaraları +90'a çevrilir). */
export const telHref = (phone?: string | null) => {
  const digits = (phone ?? '').replace(/\D/g, '')
  if (!digits) return '#'
  return `tel:+${digits.startsWith('0') ? `90${digits.slice(1)}` : digits}`
}

/** Bölüm kimliği için Türkçe karakterleri sadeleştirir. */
export const slugify = (value: string) =>
  value
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşüâ]/g, (ch) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a' })[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

type Contact = { phone?: string | null; email?: string | null; addressLine1?: string | null; addressLine2?: string | null; city?: string | null }

/**
 * Metindeki {telefon}, {eposta} ve {adres} yer tutucularını Site Ayarları'ndaki güncel bilgiyle değiştirir;
 * numara ya da adres değişince yalnızca ayarlardan düzeltmek yeter.
 */
export const fill = (value: string | null | undefined, contact: Contact): string =>
  (value ?? '')
    .replace(/\{telefon\}/g, contact.phone ?? '')
    .replace(/\{eposta\}/g, contact.email ?? '')
    .replace(/\{adres\}/g, [contact.addressLine1, contact.addressLine2].filter(Boolean).join(', '))
