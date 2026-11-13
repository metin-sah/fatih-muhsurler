import type { Block, Field } from 'payload'

import { anchor, background, buttons, emText, image, link, prose, sectionHead, text, textarea } from '@/fields/common'

const items = (name: string, label: string, singular: string, fields: Field[], extra: Record<string, unknown> = {}): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular, plural: label },
  admin: { initCollapsed: true },
  fields,
  ...extra,
})

const stat = items('stats', 'Rakamlar', 'Rakam', [
  {
    type: 'row',
    fields: [
      text('value', 'Değer', { required: true, admin: { width: '30%' } }),
      text('suffix', 'Birim', { admin: { width: '25%', description: 'ör. ton, baş/gün' } }),
      { name: 'count', label: 'Sayarak artsın', type: 'checkbox', admin: { width: '45%' } },
    ],
  },
  text('label', 'Açıklama', { required: true }),
])

/** Görsel ya da rakam kutusu: adımlarda ve sekmelerde fotoğraf yoksa büyük rakamlı panel çizilir. */
const visual: Field[] = [
  {
    name: 'mediaType',
    label: 'Görsel türü',
    type: 'select',
    defaultValue: 'image',
    options: [
      { label: 'Fotoğraf', value: 'image' },
      { label: 'Rakam kutusu', value: 'panel' },
    ],
  },
  image('image', 'Fotoğraf', false),
  {
    name: 'imageShape',
    label: 'Fotoğraf oranı',
    type: 'select',
    defaultValue: 'wide',
    options: [
      { label: 'Yatay (3:2)', value: 'wide' },
      { label: 'Dikey (4:5)', value: 'portrait' },
      { label: 'Kare', value: 'square' },
    ],
    admin: { condition: (_, s) => s?.mediaType !== 'panel' },
  },
  {
    type: 'collapsible',
    label: 'Rakam kutusu',
    admin: { condition: (_, s) => s?.mediaType === 'panel', initCollapsed: false },
    fields: [
      {
        type: 'row',
        fields: [
          text('panelCorner', 'Köşe yazısı', { admin: { width: '33%' } }),
          textarea('panelBig', 'Büyük yazı', { admin: { width: '33%', rows: 2, description: 'Rakam ya da kısa kelimeler' } }),
          text('panelSmall', 'Birim', { admin: { width: '33%' } }),
        ],
      },
      text('panelLabel', 'Alt yazı'),
      {
        name: 'panelTone',
        label: 'Renk',
        type: 'select',
        defaultValue: 'dark',
        options: [
          { label: 'Koyu', value: 'dark' },
          { label: 'Krem', value: 'cream' },
        ],
      },
    ],
  },
]

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Açılış (ana sayfa)', plural: 'Açılış (ana sayfa)' },
  fields: [
    image('image', 'Arka plan fotoğrafı', true),
    text('kicker', 'Üst başlık'),
    text('title', 'Büyük başlık', { required: true }),
    text('subtitle', 'İkinci satır'),
    textarea('lead', 'Açıklama'),
    buttons(),
    items('facts', 'Alt bilgiler', 'Bilgi', [
      {
        type: 'row',
        fields: [
          text('value', 'Değer', { required: true, admin: { width: '50%' } }),
          text('label', 'Açıklama', { required: true, admin: { width: '50%' } }),
        ],
      },
      { name: 'isPhone', label: 'Telefon (tıklanınca arar)', type: 'checkbox' },
    ]),
    text('scrollLabel', 'Aşağı kaydır yazısı'),
    { name: 'showSeal', label: 'Kuruluş mührünü göster', type: 'checkbox', defaultValue: true },
  ],
}

export const PageHeroBlock: Block = {
  slug: 'pageHero',
  interfaceName: 'PageHeroBlock',
  labels: { singular: 'Sayfa başlığı', plural: 'Sayfa başlıkları' },
  fields: [
    {
      name: 'variant',
      label: 'Görünüm',
      type: 'select',
      defaultValue: 'photo',
      options: [
        { label: 'Fotoğraflı', value: 'photo' },
        { label: 'Düz (fotoğrafsız)', value: 'plain' },
        { label: 'Sucuk çizimli', value: 'sucuk' },
      ],
    },
    image('image', 'Arka plan fotoğrafı', false),
    { name: 'showCredit', label: 'Fotoğraf kaynağını göster', type: 'checkbox' },
    text('crumb', 'Sayfa yolundaki ad', { admin: { description: 'Ana Sayfa — … satırında görünen kısa ad.' } }),
    emText('title', 'Başlık', true),
    textarea('lead', 'Açıklama'),
    buttons(),
    text('decoWord', 'Büyük süs kelimesi', { admin: { condition: (_, s) => s?.variant === 'sucuk' } }),
    { name: 'showSeal', label: 'Kuruluş mührünü göster', type: 'checkbox' },
  ],
}

export const MarqueeBlock: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  labels: { singular: 'Kayan yazı şeridi', plural: 'Kayan yazı şeritleri' },
  fields: [items('items', 'Kelimeler', 'Kelime', [text('label', 'Kelime', { required: true })])],
}

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: { singular: 'Tanıtım (iki fotoğraflı)', plural: 'Tanıtım (iki fotoğraflı)' },
  fields: [
    anchor(),
    text('kicker', 'Üst başlık'),
    text('year', 'Vurgulu yıl', { admin: { description: 'Cümlenin başında bakır renkte görünür, ör. 1955.' } }),
    emText('statement', 'Büyük cümle', true),
    prose('text', 'Açıklama'),
    link(),
    image('image', 'Büyük fotoğraf', true),
    image('smallImage', 'Küçük fotoğraf', false),
  ],
}

export const FilmBlock: Block = {
  slug: 'film',
  interfaceName: 'FilmBlock',
  labels: { singular: 'Tanıtım filmi', plural: 'Tanıtım filmleri' },
  fields: [
    anchor(),
    ...sectionHead(),
    image('video', 'Video dosyası (MP4)', true),
    image('poster', 'Kapak görseli', true),
    text('videoLabel', 'Video açıklaması (ekran okuyucu)', { required: true }),
    {
      type: 'row',
      fields: [
        text('playLabel', 'Oynat butonu', { admin: { width: '50%' } }),
        text('durationLabel', 'Süre yazısı', { admin: { width: '50%' } }),
      ],
    },
    text('transcriptTitle', 'Metin başlığı'),
    textarea('transcript', 'Filmin metni'),
    text('uploadDate', 'Yayın tarihi (YYYY-AA-GG)'),
    text('duration', 'Süre (saniye)'),
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Rakamlar ve fotoğraflar', plural: 'Rakamlar ve fotoğraflar' },
  fields: [
    ...sectionHead({ required: false }),
    stat,
    text('note', 'Dipnot'),
    items('gallery', 'Fotoğraf şeridi', 'Fotoğraf', [image('image', 'Fotoğraf', true), text('caption', 'Fotoğraf altı')], {
      maxRows: 3,
    }),
    background('light'),
  ],
}

export const TilesBlock: Block = {
  slug: 'tiles',
  interfaceName: 'TilesBlock',
  labels: { singular: 'Fotoğraf karoları', plural: 'Fotoğraf karoları' },
  fields: [
    ...sectionHead(),
    items(
      'items',
      'Karolar',
      'Karo',
      [
        text('title', 'Başlık', { required: true }),
        textarea('text', 'Açıklama', { admin: { rows: 2 } }),
        text('href', 'Bağlantı', { required: true }),
        image('image', 'Fotoğraf', true),
      ],
      { minRows: 2, maxRows: 6 },
    ),
    buttons(),
    link('moreLink', 'Ek bağlantı'),
  ],
}

export const PhotoBandBlock: Block = {
  slug: 'photoBand',
  interfaceName: 'PhotoBandBlock',
  labels: { singular: 'Tam genişlik fotoğraf bandı', plural: 'Fotoğraf bantları' },
  fields: [
    image('image', 'Fotoğraf', true),
    emText('statement', 'Büyük yazı', true),
    items('meta', 'Alt etiketler', 'Etiket', [text('label', 'Etiket', { required: true })]),
  ],
}

export const ExplorerBlock: Block = {
  slug: 'explorer',
  interfaceName: 'ExplorerBlock',
  labels: { singular: 'Sekmeli süreç', plural: 'Sekmeli süreçler' },
  fields: [
    ...sectionHead(),
    text('tabsLabel', 'Sekmelerin adı (ekran okuyucu)'),
    items(
      'tabs',
      'Sekmeler',
      'Sekme',
      [
        text('tabLabel', 'Sekme adı', { required: true }),
        text('title', 'Başlık', { required: true }),
        textarea('text', 'Açıklama', { admin: { rows: 3 } }),
        link(),
        ...visual,
      ],
      { minRows: 2 },
    ),
  ],
}

export const FeatureBlock: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  labels: { singular: 'Hizmet özeti (çeyrek karkas)', plural: 'Hizmet özetleri' },
  fields: [
    ...sectionHead(),
    items('steps', 'Adımlar', 'Adım', [text('title', 'Başlık', { required: true }), text('text', 'Açıklama')]),
    buttons(),
    text('quartersLabel', 'Çeyrek çiziminin açıklaması (ekran okuyucu)'),
    items(
      'quarters',
      'Çeyrekler',
      'Çeyrek',
      [
        {
          type: 'row',
          fields: [
            text('label', 'Ad', { required: true, admin: { width: '50%' } }),
            text('suffix', 'Ek', { admin: { width: '50%', description: 'Telefonda alt satıra geçer, ör. çeyrek' } }),
          ],
        },
      ],
      { maxRows: 4 },
    ),
  ],
}

export const AudienceBlock: Block = {
  slug: 'audience',
  interfaceName: 'AudienceBlock',
  labels: { singular: 'Kime hitap ediyoruz', plural: 'Kime hitap ediyoruz' },
  fields: [
    ...sectionHead({ lead: false }),
    items('items', 'Kartlar', 'Kart', [
      text('label', 'Üst etiket'),
      text('title', 'Başlık', { required: true }),
      textarea('text', 'Açıklama', { admin: { rows: 2 } }),
      {
        type: 'row',
        fields: [
          text('linkLabel', 'Bağlantı yazısı', { admin: { width: '50%' } }),
          text('href', 'Adres', { required: true, admin: { width: '50%' } }),
        ],
      },
    ]),
  ],
}

export const LocationBandBlock: Block = {
  slug: 'locationBand',
  interfaceName: 'LocationBandBlock',
  labels: { singular: 'Konum bandı', plural: 'Konum bantları' },
  fields: [
    image('image', 'Arka plan fotoğrafı', true),
    text('kicker', 'Üst başlık'),
    emText('statement', 'Büyük yazı', true),
    { name: 'showAddress', label: 'Adresi göster (Site ayarlarından)', type: 'checkbox', defaultValue: true },
    buttons(),
  ],
}

export const TrustBlock: Block = {
  slug: 'trust',
  interfaceName: 'TrustBlock',
  labels: { singular: 'Güvence kartları', plural: 'Güvence kartları' },
  fields: [
    ...sectionHead({ required: false }),
    items('items', 'Kartlar', 'Kart', [
      {
        name: 'icon',
        label: 'Simge',
        type: 'select',
        defaultValue: 'shield',
        options: [
          { label: 'Kalkan (denetim)', value: 'shield' },
          { label: 'Damla (çevre)', value: 'drop' },
          { label: 'Kamyon (soğuk zincir)', value: 'truck' },
        ],
      },
      text('title', 'Başlık', { required: true }),
      textarea('text', 'Açıklama', { admin: { rows: 2 } }),
    ]),
    background('cream'),
  ],
}

export const DocumentsBlock: Block = {
  slug: 'documents',
  interfaceName: 'DocumentsBlock',
  labels: { singular: 'Belgeler', plural: 'Belgeler' },
  fields: [
    ...sectionHead({ lead: false }),
    items('items', 'Belgeler', 'Belge', [
      image('image', 'Belge görseli', true),
      text('label', 'Belge türü', { required: true }),
      text('title', 'Veren kurum', { required: true }),
      items('rows', 'Bilgiler', 'Satır', [
        {
          type: 'row',
          fields: [
            text('label', 'Başlık', { required: true, admin: { width: '35%' } }),
            text('value', 'Değer', { required: true, admin: { width: '65%' } }),
          ],
        },
      ]),
      text('linkLabel', 'Görüntüle bağlantısının yazısı'),
      text('zoomLabel', 'Büyütme açıklaması (ekran okuyucu)'),
    ]),
    background('light'),
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: { singular: 'Tesis adımları', plural: 'Tesis adımları' },
  fields: [
    stat,
    text('navLabel', 'Adım menüsünün adı (ekran okuyucu)'),
    items(
      'items',
      'Adımlar',
      'Adım',
      [
        {
          type: 'row',
          fields: [
            text('anchor', 'Bölüm kimliği', { required: true, admin: { width: '40%', description: 'ör. besi, kesim' } }),
            text('navTitle', 'Menüdeki ad', { admin: { width: '60%' } }),
          ],
        },
        text('title', 'Başlık', { required: true }),
        textarea('text', 'Açıklama', { admin: { rows: 3 } }),
        items('chips', 'Etiketler', 'Etiket', [text('label', 'Etiket', { required: true })]),
        text('fact', 'Öne çıkan bilgi'),
        link(),
        ...visual,
      ],
      { minRows: 1 },
    ),
  ],
}

export const SplitBlock: Block = {
  slug: 'split',
  interfaceName: 'SplitBlock',
  labels: { singular: 'Yazı ve fotoğraf', plural: 'Yazı ve fotoğraf' },
  fields: [
    ...sectionHead(),
    link(),
    image('image', 'Fotoğraf', true),
    {
      name: 'imageShape',
      label: 'Fotoğraf oranı',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Yatay (3:2)', value: 'wide' },
        { label: 'Dikey (4:5)', value: 'portrait' },
        { label: 'Uzun dikey (2:3)', value: 'tall' },
      ],
    },
    { name: 'showCredit', label: 'Fotoğraf kaynağını göster', type: 'checkbox' },
    { name: 'reverse', label: 'Fotoğraf solda', type: 'checkbox' },
    background('cream'),
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: { singular: 'Tarihçe', plural: 'Tarihçe' },
  fields: [
    ...sectionHead({ lead: false }),
    prose('text', 'Metin'),
    text('listLabel', 'Zaman çizelgesinin adı (ekran okuyucu)'),
    items('items', 'Kilometre taşları', 'Kilometre taşı', [
      text('year', 'Yıl', { required: true }),
      text('title', 'Başlık', { required: true }),
      textarea('text', 'Açıklama', { admin: { rows: 2 } }),
    ]),
    background('light'),
  ],
}

export const RouteBlock: Block = {
  slug: 'route',
  interfaceName: 'RouteBlock',
  labels: { singular: 'Tren yolu çizimi', plural: 'Tren yolu çizimleri' },
  fields: [
    ...sectionHead(),
    link(),
    {
      type: 'row',
      fields: [
        text('from', 'Başlangıç', { required: true, admin: { width: '50%' } }),
        text('to', 'Varış', { required: true, admin: { width: '50%' } }),
      ],
    },
    text('drawingLabel', 'Çizimin açıklaması (ekran okuyucu)'),
    text('caption', 'Çizim altı yazısı'),
  ],
}

export const PillarsBlock: Block = {
  slug: 'pillars',
  interfaceName: 'PillarsBlock',
  labels: { singular: 'İlkeler', plural: 'İlkeler' },
  fields: [
    anchor(),
    ...sectionHead(),
    image('image', 'Geniş fotoğraf', false),
    items('items', 'İlkeler', 'İlke', [text('title', 'Başlık', { required: true }), textarea('text', 'Açıklama', { admin: { rows: 2 } })]),
    text('chainLabel', 'Zincir adı (ekran okuyucu)'),
    items('chain', 'Tesis zinciri', 'Halka', [
      {
        type: 'row',
        fields: [
          text('label', 'Ad', { required: true, admin: { width: '40%' } }),
          text('href', 'Adres', { admin: { width: '40%' } }),
          { name: 'current', label: 'Bu sayfa', type: 'checkbox', admin: { width: '20%' } },
        ],
      },
    ]),
    background('dark'),
  ],
}

export const UstaBlock: Block = {
  slug: 'usta',
  interfaceName: 'UstaBlock',
  labels: { singular: 'Online sipariş kartı', plural: 'Online sipariş kartları' },
  fields: [
    text('kicker', 'Üst başlık'),
    emText('heading', 'Başlık', true),
    prose('text', 'Açıklama'),
    items('chips', 'Etiketler', 'Etiket', [text('label', 'Etiket', { required: true })]),
    link('shopLink', 'Sipariş sitesi bağlantısı'),
    text('infoLabel', 'Telefon satırı yazısı', { admin: { description: 'ör. Bilgi için:' } }),
    text('cardKicker', 'Kart üst yazısı'),
    text('cardTitle', 'Kart başlığı'),
    textarea('cardText', 'Kart açıklaması', { admin: { rows: 2 } }),
  ],
}

export const PlannerBlock: Block = {
  slug: 'planner',
  interfaceName: 'PlannerBlock',
  labels: { singular: 'Kesim hesaplayıcı', plural: 'Kesim hesaplayıcılar' },
  fields: [
    ...sectionHead(),
    items('chips', 'Etiketler', 'Etiket', [text('label', 'Etiket', { required: true })]),
    text('question', 'Soru'),
    text('unit', 'Birim'),
    {
      type: 'row',
      fields: [
        { name: 'min', label: 'En az', type: 'number', defaultValue: 1, admin: { width: '25%' } },
        { name: 'max', label: 'En çok', type: 'number', defaultValue: 400, admin: { width: '25%' } },
        { name: 'start', label: 'Başlangıç', type: 'number', defaultValue: 20, admin: { width: '25%' } },
        { name: 'multiplier', label: 'Baş başına parça', type: 'number', defaultValue: 4, admin: { width: '25%' } },
      ],
    },
    items('marks', 'Ölçek işaretleri', 'İşaret', [
      {
        type: 'row',
        fields: [
          { name: 'value', label: 'Değer', type: 'number', required: true, admin: { width: '30%' } },
          text('display', 'Görünen', { admin: { width: '30%' } }),
          text('label', 'Açıklama', { admin: { width: '40%' } }),
        ],
      },
    ]),
    text('resultText', 'Sonuç yazısı'),
    text('resultNote', 'Sonuç notu'),
    text('buttonLabel', 'Buton yazısı'),
  ],
}

export const HowtoBlock: Block = {
  slug: 'howto',
  interfaceName: 'HowtoBlock',
  labels: { singular: 'Nasıl işler', plural: 'Nasıl işler' },
  fields: [
    ...sectionHead(),
    items('items', 'Adımlar', 'Adım', [text('title', 'Başlık', { required: true }), textarea('text', 'Açıklama', { admin: { rows: 2 } })]),
    text('note', 'Alt not'),
    { name: 'noteCall', label: 'Notun yanında telefonu göster', type: 'checkbox', defaultValue: true },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'Sıkça sorulanlar', plural: 'Sıkça sorulanlar' },
  fields: [
    ...sectionHead({ lead: false }),
    items('items', 'Sorular', 'Soru', [text('question', 'Soru', { required: true }), textarea('answer', 'Cevap', { required: true })]),
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: { singular: 'İletişim ve teklif formu', plural: 'İletişim ve teklif formu' },
  fields: [
    ...sectionHead({ required: false }),
    { name: 'showContacts', label: 'İletişim bilgilerini göster', type: 'checkbox', defaultValue: true },
    background('coal2'),
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  labels: { singular: 'Harita', plural: 'Haritalar' },
  fields: [
    ...sectionHead(),
    image('cover', 'Harita kapağı fotoğrafı', false),
    text('coverTitle', 'Kapak başlığı'),
    textarea('coverText', 'Kapak açıklaması', { admin: { rows: 2 } }),
    text('buttonLabel', 'Haritayı göster butonu'),
    buttons(),
  ],
}

export const LegalBlock: Block = {
  slug: 'legal',
  interfaceName: 'LegalBlock',
  labels: { singular: 'Yasal metin', plural: 'Yasal metinler' },
  fields: [
    text('tocLabel', 'İçindekiler başlığı'),
    items('sections', 'Bölümler', 'Bölüm', [text('title', 'Başlık', { required: true }), prose('text', 'Metin', true)]),
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'İletişim çağrısı (ortak)', plural: 'İletişim çağrıları' },
  fields: [
    {
      name: 'note',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/CtaNote#CtaNote' } },
    },
  ],
}

export const blocks: Block[] = [
  HeroBlock,
  PageHeroBlock,
  MarqueeBlock,
  AboutBlock,
  FilmBlock,
  StatsBlock,
  TilesBlock,
  PhotoBandBlock,
  ExplorerBlock,
  FeatureBlock,
  AudienceBlock,
  LocationBandBlock,
  TrustBlock,
  DocumentsBlock,
  StepsBlock,
  SplitBlock,
  TimelineBlock,
  RouteBlock,
  PillarsBlock,
  UstaBlock,
  PlannerBlock,
  HowtoBlock,
  FaqBlock,
  ContactBlock,
  MapBlock,
  LegalBlock,
  CtaBlock,
]
