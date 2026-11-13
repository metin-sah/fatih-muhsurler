import type { Field, GlobalConfig } from 'payload'

import { isAdmin, publicOrAuthenticated } from '@/access'
import { buttons, emText, image, text, textarea } from '@/fields/common'
import { revalidateGlobal } from '@/hooks/revalidate'

const row = (...fields: Field[]): Field => ({ type: 'row', fields })
const half = (field: Field): Field => ({ ...field, admin: { ...(field as { admin?: object }).admin, width: '50%' } }) as Field

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: { group: 'Ayarlar', description: 'Tüm sayfalarda ortak kullanılan bilgiler: iletişim, menü, logo, form yazıları.' },
  access: { read: publicOrAuthenticated, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Genel',
          fields: [
            row(half(text('companyName', 'Firma adı', { required: true })), half(text('titleSuffix', 'Sekme başlığı eki'))),
            textarea('brandSubline', 'Logonun yanındaki yazı', { admin: { rows: 2, description: 'Satır sonu için Enter.' } }),
            row(
              half(image('logo', 'Logo', true, 'Koyu zemin üzerinde görünür (SVG önerilir).')),
              half(image('favicon', 'Tarayıcı simgesi (favicon)', true, 'Kare, SVG önerilir.')),
            ),
            row(
              half(image('appleIcon', 'Telefon ana ekran simgesi', false, '180×180 PNG.')),
              half(image('ogImage', 'Paylaşım görseli', true, 'Bağlantı paylaşılınca görünen 1200×630 görsel.')),
            ),
            textarea('defaultDescription', 'Varsayılan Google açıklaması', { maxLength: 170 }),
            textarea('businessDescription', 'İşletme tanımı (Google işletme bilgisi)', { admin: { rows: 2 } }),
            text('foundingDate', 'Tesisin kuruluş yılı (Google işletme bilgisi)'),
          ],
        },
        {
          label: 'İletişim',
          fields: [
            row(half(text('phone', 'Telefon', { required: true })), half(text('email', 'E-posta', { required: true }))),
            row(half(text('addressLine1', 'Adres (1. satır)', { required: true })), half(text('addressLine2', 'Adres (2. satır)'))),
            row(half(text('addressShort', 'Kısa adres (üst şerit)')), half(text('city', 'Şehir'))),
            text('directionsUrl', 'Yol tarifi bağlantısı (Google Haritalar)', { required: true }),
            text('mapEmbedUrl', 'Harita gömme bağlantısı', { admin: { description: 'Google Haritalar "embed" adresi.' } }),
            text('mapSearchUrl', 'Haritada göster bağlantısı'),
            row(
              half(text('phoneLabel', 'Telefon başlığı')),
              half(text('emailLabel', 'E-posta başlığı')),
            ),
            text('addressLabel', 'Adres başlığı'),
          ],
        },
        {
          label: 'Menü ve alt bilgi',
          fields: [
            {
              name: 'nav',
              label: 'Ana menü',
              type: 'array',
              labels: { singular: 'Menü öğesi', plural: 'Menü öğeleri' },
              fields: [row(half(text('label', 'Yazı', { required: true })), half(text('href', 'Adres', { required: true })))],
            },
            row(half(text('homeLabel', 'Ana sayfa adı')), half(text('callLabel', 'Ara butonu (mobil)'))),
            row(half(text('quoteLabel', 'Teklif butonu yazısı')), half(text('quoteHref', 'Teklif butonu adresi'))),
            textarea('footerText', 'Alt bilgi tanıtım yazısı', { admin: { rows: 2 } }),
            row(half(text('footerMark', 'Alt bilgideki büyük süs yazısı')), half(text('copyrightName', 'Telif satırındaki ad'))),
            row(half(text('footerAddressTitle', 'Adres sütunu başlığı')), half(text('footerContactTitle', 'İletişim sütunu başlığı'))),
            row(half(text('footerPagesTitle', 'Sayfalar sütunu başlığı')), half(text('directionsLabel', 'Yol tarifi bağlantı yazısı'))),
            row(half(text('legalLabel', 'Yasal metin bağlantısı')), half(text('legalHref', 'Yasal metin adresi'))),
            text('toTopLabel', 'Yukarı dön yazısı'),
          ],
        },
        {
          label: 'Kuruluş mührü',
          fields: [
            text('sealRing', 'Halka yazısı', { admin: { description: 'Dairenin çevresinde dönen yazı.' } }),
            row(half(text('sealSince', 'Üst yazı')), half(text('sealYear', 'Yıl'))),
          ],
        },
        {
          label: 'İletişim çağrısı',
          description: 'Sayfa sonlarındaki "bizi arayın" bölümü. Bir sayfaya eklemek için sayfaya "İletişim çağrısı" bloğu ekleyin.',
          fields: [
            {
              name: 'cta',
              label: 'İletişim çağrısı',
              type: 'group',
              fields: [text('kicker', 'Üst başlık'), emText('heading', 'Başlık', true), { name: 'showPhone', label: 'Telefonu büyük göster', type: 'checkbox', defaultValue: true }, buttons()],
            },
          ],
        },
        {
          label: 'Teklif formu',
          fields: [
            {
              name: 'form',
              label: 'Teklif formu',
              type: 'group',
              fields: [
                text('title', 'Başlık'),
                textarea('intro', 'Açıklama', { admin: { rows: 2 } }),
                row(half(text('nameLabel', 'Ad soyad alanı')), half(text('companyLabel', 'Firma alanı'))),
                row(half(text('phoneLabel', 'Telefon alanı')), half(text('headsLabel', 'Baş sayısı alanı'))),
                text('messageLabel', 'Mesaj alanı'),
                textarea('privacyNote', 'Gizlilik notu', { admin: { rows: 2, description: 'Bağlantı için [görünen metin](/adres).' } }),
                row(half(text('submitLabel', 'Gönder butonu')), half(text('sendingText', 'Gönderiliyor yazısı'))),
                textarea('successText', 'Başarılı gönderim mesajı', { admin: { rows: 2 } }),
                textarea('errorText', 'Hata mesajı', { admin: { rows: 2 } }),
                text('requiredText', 'Zorunlu alan uyarısı'),
                text('phoneInvalidText', 'Geçersiz telefon uyarısı'),
                text('orCallText', 'Telefon satırı yazısı', { admin: { description: 'ör. ya da arayın:' } }),
                textarea('noscriptText', 'JavaScript kapalı uyarısı', { admin: { rows: 2 } }),
              ],
            },
          ],
        },
        {
          label: 'Bulunamadı (404)',
          fields: [
            {
              name: 'notFound',
              label: 'Bulunamadı sayfası',
              type: 'group',
              fields: [
                row(half(text('kicker', 'Üst başlık')), half(text('deco', 'Büyük süs yazısı'))),
                emText('title', 'Başlık', true),
                textarea('lead', 'Açıklama', { admin: { rows: 2 } }),
                text('metaTitle', 'Sekme başlığı'),
                buttons(),
                text('linksLabel', 'Kısayolların adı (ekran okuyucu)'),
                {
                  name: 'links',
                  label: 'Kısayollar',
                  type: 'array',
                  fields: [
                    row(half(text('label', 'Ad', { required: true })), half(text('href', 'Adres', { required: true }))),
                    text('text', 'Açıklama'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Arayüz yazıları',
          description: 'Ekran okuyucular ve küçük düğmeler için kısa yazılar.',
          fields: [
            {
              name: 'ui',
              label: 'Arayüz yazıları',
              type: 'group',
              fields: [
                row(half(text('skipLink', 'İçeriğe geç bağlantısı')), half(text('mainMenu', 'Ana menü adı'))),
                row(half(text('mobileMenu', 'Mobil menü adı')), half(text('openMenu', 'Menüyü aç'))),
                row(half(text('closeMenu', 'Menüyü kapat')), half(text('breadcrumb', 'Sayfa yolu adı'))),
                row(half(text('quickContact', 'Hızlı iletişim adı')), half(text('playFilm', 'Filmi oynat (ekran okuyucu)'))),
              ],
            },
          ],
        },
      ],
    },
  ],
}
