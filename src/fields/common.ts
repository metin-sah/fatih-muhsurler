import type { ArrayField, Field, GroupField, SelectField, TextField, TextareaField, UploadField } from 'payload'

/** Panelde yazım kurallarını hatırlatan ortak açıklama. */
export const FORMAT_HINT = 'Vurgu (bakır/italik) için *yıldızlar* arasına alın; yeni satır için Enter.'
const LINK_HINT = 'Bağlantı için [görünen metin](/adres) yazın.'

export const text = (name: string, label: string, extra: Partial<TextField> = {}): TextField => ({
  name,
  label,
  type: 'text',
  ...extra,
} as TextField)

export const textarea = (name: string, label: string, extra: Partial<TextareaField> = {}): TextareaField => ({
  name,
  label,
  type: 'textarea',
  ...extra,
} as TextareaField)

/** Vurgu (*...*) ve satır sonu destekleyen başlık alanı. */
export const emText = (name: string, label: string, required = false): TextareaField =>
  textarea(name, label, { required, admin: { rows: 2, description: FORMAT_HINT } })

/** Paragraf alanı: boş satırla ayrılan her blok ayrı paragraf olur. */
export const prose = (name: string, label: string, required = false): TextareaField =>
  textarea(name, label, {
    required,
    admin: { rows: 4, description: `Boş satırla ayrılan her bölüm ayrı paragraf olur. **Kalın** için iki yıldız. ${LINK_HINT}` },
  })

export const image = (name: string, label: string, required = false, description?: string): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  admin: description ? { description } : undefined,
})

/** Bölüm başı: küçük üst başlık, ana başlık ve kısa açıklama. */
export const sectionHead = (opts: { lead?: boolean; required?: boolean } = {}): Field[] => [
  text('kicker', 'Üst başlık', { admin: { description: 'Başlığın üstündeki küçük bakır yazı.' } }),
  emText('heading', 'Başlık', opts.required ?? true),
  ...(opts.lead === false ? [] : [textarea('lead', 'Açıklama', { admin: { rows: 3 } })]),
]

export const link = (name = 'link', label = 'Bağlantı'): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        text('label', 'Yazı', { admin: { width: '50%' } }),
        text('href', 'Adres', { admin: { width: '50%', description: 'Örnek: /tesis, /iletisim#form' } }),
      ],
    },
  ],
})

export const BUTTON_KINDS = [
  { label: 'Sayfa bağlantısı', value: 'link' },
  { label: 'Telefonu ara (Site ayarlarındaki numara)', value: 'phone' },
  { label: 'Yol tarifi (Site ayarlarındaki harita adresi)', value: 'directions' },
]

export const buttons = (name = 'buttons', label = 'Butonlar'): ArrayField => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Buton', plural: 'Butonlar' },
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'kind',
          label: 'Tür',
          type: 'select',
          defaultValue: 'link',
          options: BUTTON_KINDS,
          admin: { width: '40%' },
        },
        {
          name: 'style',
          label: 'Görünüm',
          type: 'select',
          defaultValue: 'copper',
          options: [
            { label: 'Dolu (bakır)', value: 'copper' },
            { label: 'Çerçeveli', value: 'line' },
          ],
          admin: { width: '30%' },
        },
        { name: 'arrow', label: 'Ok işareti', type: 'checkbox', admin: { width: '30%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        text('label', 'Yazı', {
          admin: { width: '50%', description: 'Telefon butonunda boş bırakılırsa numara yazılır.' },
        }),
        text('href', 'Adres', {
          admin: { width: '50%', condition: (_, sibling) => sibling?.kind === 'link' },
        }),
      ],
    },
  ],
})

export const background = (defaultValue = 'dark'): SelectField => ({
  name: 'background',
  label: 'Zemin',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Koyu', value: 'dark' },
    { label: 'Koyu (ikinci ton)', value: 'coal2' },
    { label: 'Açık', value: 'light' },
    { label: 'Krem', value: 'cream' },
  ],
})

export const anchor = (): TextField =>
  text('anchor', 'Bölüm kimliği', {
    admin: { description: 'Sayfa içi bağlantı için (ör. film, biz). Boş bırakılabilir.' },
  })
