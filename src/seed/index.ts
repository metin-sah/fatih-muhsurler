/**
 * İlk kurulum: statik sitenin tüm içeriğini (metinler, fotoğraflar, film, logo, sertifika) Payload'a aktarır.
 * Çalıştırma: npm run seed
 * Tekrar çalıştırılabilir: medya `alt` metnine göre bulunur, sayfalar adresine göre güncellenir.
 */
import config from '@payload-config'
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { head } from '@vercel/blob'

import type { Page, SiteSetting } from '@/payload-types'

const ASSETS = path.resolve(process.cwd(), 'statik/src/assets')
const ctx = { disableRevalidate: true, skipAudit: true }

type Blocks = NonNullable<Page['layout']>

const mediaCache = new Map<string, number>()

const upload = async (payload: Payload, file: string, alt: string, credit?: string): Promise<number> => {
  const key = `${file}|${alt}`
  if (mediaCache.has(key)) return mediaCache.get(key)!
  const found = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1, depth: 0 })
  if (found.docs[0]) {
    mediaCache.set(key, found.docs[0].id)
    return found.docs[0].id
  }
  const filePath = file.endsWith('.mp4') ? path.join(ASSETS, 'video', file) : path.join(ASSETS, 'img', file)
  const doc = await payload.create({ collection: 'media', data: { alt, credit }, filePath, context: { ...ctx } })
  // Dosyanın Blob deposuna gerçekten yazıldığını doğrula.
  if (process.env.BLOB_READ_WRITE_TOKEN && doc.url) {
    const ok = await head(doc.url, { token: process.env.BLOB_READ_WRITE_TOKEN }).then(() => true, () => false)
    if (!ok) throw new Error(`Blob'a yazılamadı: ${file} (${doc.url})`)
  }
  payload.logger.info(`Medya yüklendi: ${file}`)
  mediaCache.set(key, doc.id)
  return doc.id
}

const WIKI = (author: string, file: string, place: string) =>
  `${place}. Fotoğraf: ${author}, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:${file}) (CC BY-SA 4.0)`

const phoneBtn = (style: 'copper' | 'line' = 'line', label = '') => ({ kind: 'phone' as const, style, label })
const linkBtn = (label: string, href: string, style: 'copper' | 'line' = 'copper', arrow = false) => ({ kind: 'link' as const, style, label, href, arrow })
const dirBtn = (label: string, style: 'copper' | 'line' = 'copper') => ({ kind: 'directions' as const, style, label })

const labels = (...values: string[]) => values.map((label) => ({ label }))

const run = async (payload: Payload) => {
  const m = (file: string, alt: string, credit?: string) => upload(payload, file, alt, credit)

  /* ---------- Site ayarları ---------- */
  const settings: Partial<SiteSetting> = {
    companyName: 'Fatih Mühsürler Et Entegre Tesisleri',
    titleSuffix: ', Fatih Mühsürler Et',
    brandSubline: 'Et Entegre\nTesisleri',
    logo: await m('logo-fm-turuncu.svg', 'Fatih Mühsürler'),
    favicon: await m('favicon-fm.svg', 'Fatih Mühsürler simgesi (FM)'),
    appleIcon: await m('apple-touch-icon-fm.png', 'Fatih Mühsürler ana ekran simgesi'),
    ogImage: await m('og-fm.jpg', 'Fatih Mühsürler Et Entegre Tesisleri, Afyonkarahisar'),
    defaultDescription:
      "Afyonkarahisar OSB'de besicilik, kesim, fason kesim ve sucuk üretimi tek çatı altında. 1955'ten bu yana aile mesleği.",
    businessDescription: "Afyonkarahisar OSB'de besicilik, kesim, fason kesim ve sucuk üretimi.",
    foundingDate: '2001',
    phone: '0272 246 46 46',
    email: 'fatihmuhsurler@hotmail.com',
    addressLine1: 'OSB 1. Cadde, 13. Sokak, No: 15',
    addressLine2: 'Organize Sanayi Bölgesi, Merkez/Afyonkarahisar',
    addressShort: 'OSB 1. Cadde, 13. Sokak, No: 15 · Merkez/Afyonkarahisar',
    city: 'Merkez/Afyonkarahisar',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=OSB+1.+Cadde+13.+Sokak+No+15+Afyonkarahisar+Organize+Sanayi+B%C3%B6lgesi',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Fatih+M%C3%BChs%C3%BCrler+Et+Entegre+Tesisleri+OSB+1.+Cadde+13.+Sokak+No+15+Afyonkarahisar&output=embed',
    mapSearchUrl: 'https://www.google.com/maps/search/?api=1&query=OSB+1.+Cadde+13.+Sokak+No+15+Afyonkarahisar',
    phoneLabel: 'Telefon',
    emailLabel: 'E-posta',
    addressLabel: 'Adres',
    nav: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Tesis', href: '/tesis' },
      { label: 'Fason Kesim', href: '/fason-kesim' },
      { label: 'Sucuk', href: '/sucuk' },
      { label: 'Kalite', href: '/kalite' },
      { label: 'İletişim', href: '/iletisim' },
    ],
    homeLabel: 'Ana Sayfa',
    callLabel: 'Ara',
    quoteLabel: 'Teklif Al',
    quoteHref: '/iletisim#form',
    footerText:
      "Afyonkarahisar'da, 1955'ten bu yana süren bir aile mesleği. Besi, kesim, soğuk muhafaza ve sucuk üretimi tek çatı altında.",
    footerMark: 'Mühsürler',
    copyrightName: 'Fatih Mühsürler Et Entegre Tesisleri',
    footerAddressTitle: 'Adres',
    footerContactTitle: 'İletişim',
    footerPagesTitle: 'Sayfalar',
    directionsLabel: 'Yol tarifi al →',
    legalLabel: 'Kişisel verilerin korunması',
    legalHref: '/kvkk',
    toTopLabel: 'Yukarı ↑',
    sealRing: 'FATİH MÜHSÜRLER · AFYONKARAHİSAR ·',
    sealSince: 'Kuruluş',
    sealYear: '1955',
    cta: {
      kicker: 'İletişim',
      heading: 'Fason kesim ya da toptan alım için *bizi arayın.*',
      showPhone: true,
      buttons: [linkBtn('Teklif Al', '/iletisim#form'), linkBtn('Adres ve yol tarifi', '/iletisim', 'line')],
    },
    form: {
      title: 'Teklif formu',
      intro: 'Formu doldurun; talebiniz bize ulaşır, sizi arayıp ayrıntıları konuşalım.',
      nameLabel: 'Ad soyad',
      companyLabel: 'Firma',
      phoneLabel: 'Telefon',
      headsLabel: 'Tahmini baş sayısı',
      messageLabel: 'Mesaj',
      privacyNote: 'Bilgileriniz yalnızca size dönüş yapmak için kullanılır. [Ayrıntılar](/kvkk)',
      submitLabel: 'Gönder',
      sendingText: 'Gönderiliyor…',
      successText: 'Teşekkürler, talebiniz bize ulaştı. En kısa sürede sizi arayacağız.',
      errorText: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizi telefonla arayın.',
      requiredText: 'Bu alanı doldurun.',
      phoneInvalidText: 'Telefon numarası eksik görünüyor.',
      orCallText: 'ya da arayın:',
      noscriptText: 'Form için tarayıcınızda JavaScript açık olmalı. Bize telefon ya da e-postayla ulaşabilirsiniz.',
    },
    notFound: {
      kicker: '404',
      deco: '404',
      title: 'Aradığınız sayfa *bulunamadı*',
      lead: 'Adres değişmiş ya da yanlış yazılmış olabilir.',
      metaTitle: 'Sayfa bulunamadı, Fatih Mühsürler Et',
      buttons: [linkBtn('Ana sayfaya dön', '/'), phoneBtn('line')],
      linksLabel: 'Sık ziyaret edilen sayfalar',
      links: [
        { label: 'Tesis', href: '/tesis', text: 'Besiden sevkiyata yedi adım' },
        { label: 'Fason kesim', href: '/fason-kesim', text: 'Kendi hayvanınızı kestirin' },
        { label: 'İletişim', href: '/iletisim', text: 'Adres, telefon ve teklif formu' },
      ],
    },
    ui: {
      skipLink: 'İçeriğe geç',
      mainMenu: 'Ana menü',
      mobileMenu: 'Mobil menü',
      openMenu: 'Menüyü aç',
      closeMenu: 'Menüyü kapat',
      breadcrumb: 'Sayfa yolu',
      quickContact: 'Hızlı iletişim',
      playFilm: 'Filmi oynat',
    },
  }
  await payload.updateGlobal({ slug: 'site-settings', data: settings as SiteSetting, context: { ...ctx } })
  payload.logger.info('Site ayarları yazıldı')

  /* ---------- Ortak parçalar ---------- */
  const cta = { blockType: 'cta' as const }
  const contact = (kicker: string | null, heading: string | null, lead: string | null, background: 'dark' | 'coal2') => ({
    blockType: 'contact' as const,
    kicker,
    heading,
    lead,
    showContacts: true,
    background,
  })

  /* ---------- Ana sayfa ---------- */
  const home: Blocks = [
    {
      blockType: 'hero',
      image: await m('besi-acilis.webp', "Afyonkarahisar OSB'deki besi ahırımızda öğleden sonra ışığında Simental sığırlar"),
      kicker: 'Afyonkarahisar OSB',
      title: 'Fatih Mühsürler',
      subtitle: 'Et Entegre Tesisleri',
      lead: "Besiden sofraya, tek çatı altında. Afyonkarahisar'da, 1955'ten bu yana süren bir aile mesleği.",
      buttons: [linkBtn('Teklif Al', '/iletisim#form', 'copper', true), linkBtn('Tesisi Tanıyın', '/tesis', 'line')],
      facts: [
        { value: '1955', label: 'Aile mesleği' },
        { value: '2001', label: 'Entegre tesis' },
        { value: '0272 246 46 46', label: 'Bizi arayın', isPhone: true },
      ],
      scrollLabel: 'Keşfedin',
      showSeal: true,
    },
    { blockType: 'marquee', items: labels('Besi', 'Veteriner kontrolü', 'Kesim', 'Soğuk muhafaza', 'Sucukhane', 'Sevkiyat') },
    {
      blockType: 'about',
      anchor: 'biz',
      kicker: 'Biz kimiz',
      year: '1955.',
      statement:
        "Besicilik ve çiftçilikle başlayan, karkas etin trenle İstanbul'a taşındığı bir aile mesleği; bugün *Afyonkarahisar'da tek çatı altında.*",
      text: "Afyonkarahisar Organize Sanayi Bölgesi'ndeki tesisimizde hayvan yetiştiriciliği, kesim, soğuk muhafaza ve sucuk üretimi bir arada yapılıyor. Babamızdan devraldığımız mesleği 2001'den beri kendi entegre tesisimizde sürdürüyoruz.",
      link: { label: 'Hikâyemizi okuyun', href: '/hakkimizda' },
      image: await m('besi-agac.webp', 'Besi ahırımızda sığırlar, arkada servi ağaçları'),
      smallImage: await m('giris-yol.webp', 'Tesisimize giden yol ve giriş tabelası'),
    },
    {
      blockType: 'film',
      anchor: 'film',
      kicker: 'Kısa film',
      heading: '43 saniyede *bir aile mesleği*.',
      lead: "1955'te trenle İstanbul'a giden karkastan bugünkü tesisimize. Ağaç baskı tekniğinden esinlenerek çizildi, Türkçe anlatımlı.",
      video: await m('bir-aile-meslegi.mp4', 'Bir Aile Mesleği, 43 saniyelik tanıtım filmi'),
      poster: await m('film-poster.webp', 'Bir Aile Mesleği filminin kapak görseli'),
      videoLabel: 'Bir Aile Mesleği, 43 saniyelik tanıtım filmi',
      playLabel: 'Filmi izleyin',
      durationLabel: '43 sn, sesli',
      transcriptTitle: 'Filmin metni',
      transcript:
        "1955. Selahattin Mühsürler, karkas eti trenle İstanbul'a götürüyor. 2001. Afyonkarahisar'da entegre tesis kuruluyor. 600 büyükbaş besi kapasitesi. Günde 400 baş kesim kapasitesi. 120 ton soğuk hava kapasitesi. Sevkiyat, kendi frigorifik araçlarımızla. Fatih Mühsürler Et Entegre Tesisleri. Besiden sofraya, tek çatı altında.",
      uploadDate: '2026-10-31',
      duration: '43',
    },
    {
      blockType: 'stats',
      kicker: 'Rakamlarla tesis',
      heading: 'Bir aile mesleği, *bugünkü* ölçeğiyle.',
      lead: 'Besi alanından soğuk hava depolarına, tesisimizin kapasitesi.',
      stats: [
        { value: '1955', label: 'Aile mesleğinin kuruluşu' },
        { value: '2001', label: 'Entegre tesisimizin kuruluşu' },
        { value: '600', count: true, label: 'Büyükbaş besi kapasitesi' },
        { value: '400', count: true, suffix: 'baş/gün', label: 'Kesim kapasitesi' },
        { value: '120', count: true, suffix: 'ton', label: 'Soğuk hava depo kapasitesi' },
      ],
      note: 'Olağan günlerde yaklaşık 200 baş kesim yapılır; 400 baş günlük kapasitedir.',
      gallery: [
        { image: await m('tesis-dis.webp', "Afyonkarahisar OSB'deki tesisimizin dışarıdan görünüşü"), caption: 'Tesis, Afyonkarahisar OSB' },
        { image: await m('besi-avlu.webp', 'Besi ahırımızda Simental sığırlar'), caption: 'Besi ahırı' },
        { image: await m('tabela.webp', 'Tesis girişindeki Fatih Mühsürler tabelası'), caption: 'Tesis girişi' },
      ],
      background: 'light',
    },
    {
      blockType: 'tiles',
      kicker: 'Neler yapıyoruz',
      heading: 'Dört iş, *tek* tesis.',
      lead: 'Hayvanın yetiştirilmesinden karkasın sevkiyatına kadar işin her adımı kendi tesisimizde yapılıyor.',
      items: [
        { title: 'Besicilik', text: 'Kendi tesisimizde büyükbaş hayvan yetiştiriyoruz.', href: '/tesis#besi', image: await m('besi-boga.webp', 'Besi ahırımızda Simental bir boğa') },
        { title: 'Kesimhane', text: 'Veteriner kontrolünde, günde 400 başa kadar kesim kapasitesi.', href: '/tesis#kesim', image: await m('karkas-kesim.webp', 'Kesimhanemizde soğuk odaya alınmış karkaslar') },
        { title: 'Fason kesim', text: 'Kendi hayvanını getiren işletmelere kesim hizmeti.', href: '/fason-kesim', image: await m('karkas-ceyrek.webp', 'Soğuk odada asılı çeyrek karkaslar') },
        { title: 'Sucukhane', text: 'Tesis içinde, geleneksel yöntemle sucuk üretimi.', href: '/sucuk', image: await m('sucuk-tahta.webp', 'Kendi üretimimiz halka sucuk, ahşap tahta üzerinde') },
      ],
      buttons: [linkBtn('Teklif Al', '/iletisim#form')],
      moreLink: { label: 'Tesisin yedi adımı', href: '/tesis' },
    },
    {
      blockType: 'photoBand',
      image: await m('besi-genis.webp', 'Besi ahırımızın çatısı altında sığırlar'),
      statement: 'Besiden sofraya,\n*tek çatı altında.*',
      meta: labels('Afyonkarahisar OSB', "1955'ten bu yana"),
    },
    {
      blockType: 'explorer',
      kicker: 'Süreç',
      heading: 'Besiden *sevkiyata*, altı adım.',
      lead: 'Bir adım seçin; tesiste o aşamada neler yapıldığını görün.',
      tabsLabel: 'Üretim süreci adımları',
      tabs: [
        { tabLabel: 'Besi', title: 'Besi', text: 'Tesisimiz 600 büyükbaş kapasitelidir. Montofon, Simental, Anadolu ırkı, Holstein ve Limuzin gibi ırklar yetiştirilir.', link: { label: 'Tesis sayfasında görün', href: '/tesis#besi' }, mediaType: 'image', image: await m('besi-ikili.webp', 'Besi ahırımızda iki Simental boğa'), imageShape: 'wide' },
        { tabLabel: 'Veteriner kontrolü', title: 'Veteriner kontrolü', text: "Tesiste bir özel veteriner hekim ve Tarım İl Müdürlüğü'nün görevlendirdiği bir devlet veteriner hekimi görev yapar.", link: { label: 'Tesis sayfasında görün', href: '/tesis#veteriner' }, mediaType: 'image', image: await m('ahir-buzagi.webp', 'Gün ışığı alan ahırda duran buzağı'), imageShape: 'wide' },
        { tabLabel: 'Kesim', title: 'Kesim', text: 'Kesimhanemizin günlük kapasitesi 400 baştır; olağan günlerde yaklaşık 200 baş kesim yapılır.', link: { label: 'Tesis sayfasında görün', href: '/tesis#kesim' }, mediaType: 'panel', panelBig: '400', panelSmall: 'baş / gün', panelLabel: 'Günlük kesim kapasitesi', panelTone: 'dark' },
        { tabLabel: 'Soğuk hava', title: 'Soğuk hava', text: 'Karkaslar, 120 ton karkas kapasiteli soğuk hava depolarında bekletilir.', link: { label: 'Tesis sayfasında görün', href: '/tesis#soguk-hava' }, mediaType: 'panel', panelBig: '120', panelSmall: 'ton', panelLabel: 'Karkas kapasiteli soğuk hava depoları', panelTone: 'dark' },
        { tabLabel: 'Sucukhane', title: 'Sucukhane', text: 'Tesis içindeki sucukhanemizde sucuk geleneksel yöntemle üretilir.', link: { label: 'Tesis sayfasında görün', href: '/tesis#sucukhane' }, mediaType: 'image', image: await m('sucuk-halka.webp', 'Kendi üretimimiz halka sucuk'), imageShape: 'square' },
        { tabLabel: 'Sevkiyat', title: 'Sevkiyat', text: 'Sevkiyat, kendi frigorifik kasalı araçlarımızla yapılır.', link: { label: 'Tesis sayfasında görün', href: '/tesis#sevkiyat' }, mediaType: 'image', image: await m('tir-yan.webp', 'Frigorifik kasalı tırımız tesisin yükleme rampasında'), imageShape: 'wide' },
      ],
    },
    {
      blockType: 'feature',
      kicker: 'Fason kesim',
      heading: 'Canlı hayvan girer, *dört çeyrek* karkas çıkar.',
      lead: 'Kendi hayvanını getiren kasap ve işletmelere kesim hizmeti veriyoruz. Günlük 400 baş kapasitemizle yoğun dönemlerde de hizmet verebiliyoruz.',
      steps: [
        { title: 'Bizi arayın', text: 'Kesim gününü ve baş sayısını belirleyelim.' },
        { title: 'Kontrol ve kesim', text: 'Hayvanlar veteriner kontrolünden geçer ve kesilir.' },
        { title: 'Teslim', text: 'Karkaslar dört parça olarak teslim edilir.' },
      ],
      buttons: [linkBtn('Fason kesim hizmeti', '/fason-kesim'), phoneBtn('line')],
      quartersLabel: 'Karkas dört çeyrek olarak teslim edilir',
      quarters: [
        { label: 'Sol ön', suffix: 'çeyrek' },
        { label: 'Sağ ön', suffix: 'çeyrek' },
        { label: 'Sol arka', suffix: 'çeyrek' },
        { label: 'Sağ arka', suffix: 'çeyrek' },
      ],
    },
    {
      blockType: 'audience',
      kicker: 'Sizin için',
      heading: 'Ne *arıyorsunuz?*',
      items: [
        { label: 'Kasap ve işletmeler', title: 'Kendi hayvanımı kestirmek istiyorum', text: 'Canlı hayvan tesise girer, dört parça karkas olarak teslim edilir.', linkLabel: 'Fason kesim', href: '/fason-kesim' },
        { label: 'Toptancılar', title: 'Toptan alım yapmak istiyorum', text: 'İhtiyacınızı yazın ya da bizi arayın, ayrıntıları konuşalım.', linkLabel: 'Teklif al', href: '/iletisim#form' },
        { label: 'Sucuk', title: 'Sucuk sipariş etmek istiyorum', text: 'Sucuğumuzu online sipariş için Usta Kasap adıyla sunuyoruz.', linkLabel: 'Sucuk sayfası', href: '/sucuk' },
      ],
    },
    {
      blockType: 'locationBand',
      image: await m('afyon-havadan.webp', 'Havadan Afyonkarahisar Kalesi', WIKI('Nabbegat', 'Afyonkarahisar_Kalesi_havadan.jpg', 'Afyonkarahisar Kalesi')),
      kicker: 'Konum',
      statement: "Tesisimiz, Afyonkarahisar *Organize Sanayi Bölgesi'nde.*",
      showAddress: true,
      buttons: [dirBtn('Yol Tarifi Al'), linkBtn('İletişim', '/iletisim', 'line')],
    },
    {
      blockType: 'trust',
      kicker: 'Denetim ve sorumluluk',
      heading: 'Veteriner, *çevre*, soğuk zincir.',
      lead: 'Tesisimizde iki veteriner hekim görev yapar; arıtma tesisimiz ve frigorifik araçlarımız vardır.',
      items: [
        { icon: 'shield', title: 'Veteriner denetimi', text: "Tesiste özel veteriner hekim ve Tarım İl Müdürlüğü'nün görevlendirdiği devlet veteriner hekimi görev yapar." },
        { icon: 'drop', title: 'Çevre', text: 'Atık su arıtma tesisimiz vardır; çevre izin ve denetimlerimiz mevcuttur.' },
        { icon: 'truck', title: 'Soğuk zincir', text: '120 ton karkas kapasiteli soğuk hava depoları ve kendi frigorifik araçlarımızla sevkiyat.' },
      ],
      background: 'cream',
    },
    cta,
  ]

  /* ---------- Tesis ---------- */
  const tesis: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'photo',
      image: await m('karkas-sira.webp', 'Soğuk hava deposunda raylara asılı karkaslar'),
      crumb: 'Tesis',
      title: 'Besiden sofraya: *tek çatı* altında',
      lead: "Fatih Mühsürler Et Entegre Tesisleri'nde hayvanın yetiştirilmesinden karkasın sevkiyatına kadar yedi adım aynı tesiste yapılır.",
    },
    {
      blockType: 'steps',
      stats: [
        { value: '600', label: 'Büyükbaş besi kapasitesi' },
        { value: '400', suffix: 'baş/gün', label: 'Kesim kapasitesi' },
        { value: '120', suffix: 'ton', label: 'Soğuk hava depo kapasitesi' },
        { value: '2', label: 'Veteriner hekim: özel ve devlet' },
      ],
      navLabel: 'Adımlar',
      items: [
        { anchor: 'besi', title: 'Besi', text: 'Tesisimiz 600 büyükbaş kapasitelidir. Montofon, Simental, Anadolu ırkı, Holstein ve Limuzin gibi ırklar yetiştirilir.', chips: labels('Montofon', 'Simental', 'Anadolu ırkı', 'Holstein', 'Limuzin'), fact: '600 büyükbaş kapasite', mediaType: 'image', image: await m('besi-ahir.webp', 'Besi ahırımızda Simental ve melez sığırlar'), imageShape: 'wide' },
        { anchor: 'veteriner', title: 'Veteriner kontrolü', text: "Tesiste bir özel veteriner hekim ve Tarım İl Müdürlüğü'nün görevlendirdiği bir devlet veteriner hekimi görev yapar.", fact: 'Özel + devlet veteriner hekimi', mediaType: 'image', image: await m('ahir-buzagi.webp', 'Gün ışığı alan ahırda duran buzağı'), imageShape: 'wide' },
        { anchor: 'kesim', title: 'Kesim', text: 'Kesimhanemizin günlük kapasitesi 400 baştır; olağan günlerde yaklaşık 200 baş kesim yapılır.', fact: 'Olağan gün ≈ 200 baş', mediaType: 'panel', panelCorner: 'Kesimhane', panelBig: '400', panelSmall: 'baş / gün', panelLabel: 'Günlük kesim kapasitesi', panelTone: 'dark' },
        { anchor: 'soguk-hava', navTitle: 'Soğuk muhafaza', title: 'Soğuk muhafaza', text: 'Karkaslar, 120 ton karkas kapasiteli soğuk hava depolarında bekletilir.', fact: '120 ton karkas kapasitesi', mediaType: 'image', image: await m('soguk-oda.webp', 'Soğuk hava deposunda raylara asılı, numaralı karkaslar'), imageShape: 'wide' },
        { anchor: 'sucukhane', title: 'Sucukhane', text: 'Tesis içindeki sucukhanemizde sucuk geleneksel yöntemle üretilir. Sucukhane yalnızca kendi üretimimiz için kullanılır.', link: { label: 'Sucuk hakkında', href: '/sucuk' }, mediaType: 'image', image: await m('sucuk-kagit.webp', 'Kendi üretimimiz halka sucuk, Usta Kasap kâğıdı üzerinde'), imageShape: 'portrait' },
        { anchor: 'yan-urunler', title: 'Yan ürünler', text: 'Kesimden çıkan işkembe, bağırsak ve kırkbayır (kırkkat) tesisimizde işlenir. İşkembe yurtiçinde tüketilir.', mediaType: 'panel', panelBig: 'İşkembe\nBağırsak\nKırkbayır', panelLabel: 'Kesimden çıkan yan ürünler', panelTone: 'cream' },
        { anchor: 'sevkiyat', title: 'Sevkiyat', text: 'Sevkiyat, kendi frigorifik kasalı araçlarımızla yapılır.', mediaType: 'image', image: await m('tir-dok.webp', 'Frigorifik kasalı tırımız yükleme kapısının önünde'), imageShape: 'wide' },
      ],
    },
    {
      blockType: 'split',
      kicker: 'Çevreye saygı',
      heading: 'Atık suyumuzu *arıtıyoruz*.',
      lead: 'Atık su arıtma tesisimiz vardır; çevre izin ve denetimlerimiz mevcuttur.',
      link: { label: 'Kalite ve denetim', href: '/kalite' },
      image: await m('frig-vadisi.webp', "Frig Vadisi'nde kaya oluşumları, Afyon", WIKI('Bitiryaki', 'Afyon_Frig_Vadisi_Oyuk_Taşlar_ve_Evler_03.jpg', 'Frig Vadisi')),
      imageShape: 'wide',
      showCredit: true,
      background: 'cream',
    },
    cta,
  ]

  /* ---------- Fason kesim ---------- */
  const fason: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'photo',
      image: await m('ceyrek-sira.webp', 'Soğuk odada sıra sıra asılı çeyrek karkaslar'),
      crumb: 'Fason Kesim',
      title: 'Fason kesim *hizmeti*',
      lead: 'Kendi hayvanını getiren kasap ve işletmelere kesim hizmeti veriyoruz. Canlı hayvan tesisimize girer, dört parça (dört çeyrek) karkas olarak çıkar.',
      buttons: [linkBtn('Teklif Al', '#form', 'copper', true), phoneBtn('line')],
    },
    {
      blockType: 'planner',
      kicker: 'Afyonkarahisar kesimhane',
      heading: 'Canlı hayvan girer, *dört çeyrek* karkas çıkar.',
      lead: 'Günlük 400 baş kapasitemizle yoğun dönemlerde de hizmet verebiliyoruz. Hayvanlar kesim öncesinde veteriner kontrolünden geçer.',
      chips: labels('400 baş / gün kapasite', 'Veteriner kontrolü', '4 parça karkas teslim'),
      question: 'Kaç baş kestirmek istiyorsunuz?',
      unit: 'baş',
      min: 1,
      max: 400,
      start: 20,
      multiplier: 4,
      marks: [
        { value: 200, display: '≈ 200', label: 'olağan gün' },
        { value: 400, display: '400', label: 'günlük kapasite' },
      ],
      resultText: 'parça karkas teslim edilir',
      resultNote: '(baş başına 4 çeyrek)',
      buttonLabel: 'Bu sayıyla teklif iste',
    },
    {
      blockType: 'howto',
      kicker: 'Nasıl işler',
      heading: 'Üç adımda *kesim*.',
      lead: 'Kesim gününü birlikte planlıyor, karkasları dört parça olarak teslim ediyoruz.',
      items: [
        { title: 'Bizi arayın', text: 'Kesim gününü ve baş sayısını birlikte belirleyelim.' },
        { title: 'Kontrol ve kesim', text: 'Hayvanlar tesise gelir, veteriner kontrolünden geçer ve kesilir.' },
        { title: 'Teslim', text: 'Karkaslar dört parça olarak teslim edilir.' },
      ],
      note: 'Ücret ve şartlar için bizi arayın.',
      noteCall: true,
    },
    {
      blockType: 'faq',
      kicker: 'Sıkça sorulanlar',
      heading: 'Fason kesim hakkında *sorular*.',
      items: [
        { question: 'Günlük kesim kapasiteniz ne kadar?', answer: 'Kesimhanemizin günlük kapasitesi 400 baştır. Olağan günlerde yaklaşık 200 baş kesim yapılır.' },
        { question: 'Hayvan bana nasıl teslim edilir?', answer: 'Canlı hayvan tesisimize girer, dört parça (dört çeyrek) karkas olarak çıkar.' },
        { question: 'Kesim öncesinde veteriner kontrolü var mı?', answer: "Evet. Hayvanlar veteriner kontrolünden geçer. Tesiste bir özel veteriner hekim ve Tarım İl Müdürlüğü'nün görevlendirdiği bir devlet veteriner hekimi görev yapar." },
        { question: 'Ücret ve şartlar nedir?', answer: 'Ücret ve şartlar için {telefon} numarasından bizi arayın.' },
        { question: 'Tesisiniz nerede?', answer: '{adres}.' },
      ],
    },
    contact('Teklif', 'Kesim gününüzü *planlayalım*.', 'Tahmini baş sayısını ve size uygun günü yazın; sizi arayıp ayrıntıları konuşalım.', 'coal2'),
  ]

  /* ---------- Hakkımızda ---------- */
  const hakkimizda: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'photo',
      image: await m('afyon-panorama.webp', 'Afyonkarahisar şehri, kalesi ve çevresindeki tepeler', WIKI('Şenol Zümrüt', 'Afyonkarahisar_Kalesi_5.jpg', 'Afyonkarahisar')),
      showCredit: true,
      crumb: 'Hakkımızda',
      title: 'Bir aile mesleğinin *hikâyesi*',
      lead: "Fatih Mühsürler Et Entegre Tesisleri, 1955'te başlayan bir aile mesleğinin bugünkü hâlidir.",
      showSeal: true,
    },
    {
      blockType: 'timeline',
      kicker: "1955'ten bugüne",
      heading: "Trenle İstanbul'a giden karkastan *entegre* tesise.",
      text: "Hikâyemiz 1955'te başlıyor. Selahattin Mühsürler besicilik ve çiftçilikle uğraşıyor, et ticaretine de karkas eti trenle İstanbul'a götürerek adım atıyor. Meslek, babamızın vefatından sonra oğulları tarafından sürdürülüyor.\n\n2001'de ailenin ikinci kuşağı Afyonkarahisar Organize Sanayi Bölgesi'nde kendi entegre tesisini kuruyor. Canlı hayvan yetiştiriciliği ve kesim aynı çatı altında toplanıyor. Bugün tesisi Fatih Mühsürler yönetiyor.",
      listLabel: 'Kilometre taşları',
      items: [
        { year: '1955', title: 'Meslek başlıyor', text: 'Selahattin Mühsürler besicilik, çiftçilik ve karkas et ticaretiyle işe başlıyor.' },
        { year: '2001', title: 'Entegre tesis kuruluyor', text: "Ailenin ikinci kuşağı Afyonkarahisar OSB'de kendi tesisini kuruyor." },
        { year: 'Bugün', title: 'Aynı meslek, aynı çatı', text: 'Besi, kesim, soğuk muhafaza ve sucuk üretimi tek tesiste. Tesisi Fatih Mühsürler yönetiyor.' },
      ],
      background: 'light',
    },
    {
      blockType: 'route',
      kicker: '1955',
      heading: "Karkas et, *trenle* İstanbul'a.",
      lead: "Selahattin Mühsürler et ticaretine, karkas eti trenle İstanbul'a götürerek adım atıyor. Mesleğimizin başlangıcı bu yolculuk.",
      link: { label: '43 saniyelik filmi izleyin', href: '/#film' },
      from: 'Afyonkarahisar',
      to: 'İstanbul',
      drawingLabel: "Afyonkarahisar'dan İstanbul'a uzanan tren yolunu gösteren şematik çizim",
      caption: 'Şematik çizim, gerçek güzergâhı göstermez.',
    },
    {
      blockType: 'pillars',
      kicker: 'Yaklaşımımız',
      heading: 'Üç şeye *bağlıyız*.',
      items: [
        { title: 'Aile mesleği', text: "1955'ten bu yana aynı aile, aynı meslek." },
        { title: 'Kendi tesisimizde', text: 'Besiden sevkiyata kadar her adım kendi tesisimizde.' },
        { title: 'Geleneksel yöntem', text: 'Doğal üretim anlayışıyla, tecrübeye dayalı yöntemler.' },
      ],
      background: 'dark',
    },
    {
      blockType: 'split',
      kicker: 'Tesisimiz',
      heading: 'İşin her adımını *yerinde* görün.',
      lead: 'Besi alanından soğuk hava depolarına, sucukhaneden sevkiyata kadar tesisimizde neler yapıldığını anlattık.',
      link: { label: 'Tesis ve faaliyetler', href: '/tesis' },
      image: await m('ekip-mezbaha.webp', 'Önlük, bone, sakal bonesi, eldiven ve iş çizmesiyle soğuk hava deposunda çalışma arkadaşımız'),
      imageShape: 'tall',
      reverse: true,
      background: 'cream',
    },
    cta,
  ]

  /* ---------- Sucuk ---------- */
  const sucuk: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'sucuk',
      crumb: 'Sucuk',
      title: 'Sucuk: *geleneksel* yöntemle',
      lead: "Afyonkarahisar'daki tesisimizin sucukhanesinde, geleneksel yöntemle üretilen sucuk.",
      decoWord: 'Sucuk',
    },
    {
      blockType: 'usta',
      kicker: 'Sucukhanemiz',
      heading: 'Kendi tesisimizde, *kendi* üretimimiz.',
      text: 'Tesisimizdeki sucukhanede sucuğu geleneksel yöntemlerle üretiyoruz. Sucuğumuzu online sipariş için **Usta Kasap** adıyla sunuyoruz.',
      chips: labels('Tesis içinde üretim', 'Geleneksel yöntem', 'Yalnızca kendi üretimimiz'),
      shopLink: { label: "Usta Kasap'ı ziyaret edin", href: '' },
      infoLabel: 'Bilgi için:',
      cardKicker: 'Online sipariş',
      cardTitle: 'Usta Kasap',
      cardText: 'Sucukhanemizde üretilen sucuk, online sipariş için Usta Kasap adıyla sunuluyor.',
    },
    {
      blockType: 'pillars',
      anchor: 'ilkeler',
      kicker: 'Sucuğumuz',
      heading: 'Üç *ilke*, tek sucukhane.',
      lead: 'Sucukhanemiz, besiden sevkiyata uzanan entegre tesisimizin içindedir.',
      image: await m('sucuk-tahta.webp', 'Kendi üretimimiz halka sucuk, ahşap tahta üzerinde'),
      items: [
        { title: 'Tesis içinde üretim', text: "Sucuk, Afyonkarahisar OSB'deki tesisimizin sucukhanesinde üretilir." },
        { title: 'Geleneksel yöntem', text: 'Üretimde geleneksel yöntemleri sürdürüyoruz.' },
        { title: 'Yalnızca kendi üretimimiz', text: 'Sucukhane yalnızca kendi üretimimiz için kullanılır.' },
      ],
      chainLabel: 'Tesisteki yeri',
      chain: [
        { label: 'Besi', href: '/tesis#besi' },
        { label: 'Kesim', href: '/tesis#kesim' },
        { label: 'Soğuk muhafaza', href: '/tesis#soguk-hava' },
        { label: 'Sucukhane', href: '/tesis#sucukhane', current: true },
        { label: 'Sevkiyat', href: '/tesis#sevkiyat' },
      ],
      background: 'dark',
    },
    cta,
  ]

  /* ---------- Kalite ---------- */
  const kalite: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'photo',
      image: await m('besi-gokyuzu.webp', 'Besi ahırımızda sığırlar'),
      crumb: 'Kalite',
      title: 'Kalite, hijyen\nve *denetim*',
      lead: "Fatih Mühsürler Et Entegre Tesisleri'nde iki veteriner hekim görev yapar; atık su arıtma tesisimiz ve kendi soğuk zincirimiz vardır.",
    },
    {
      blockType: 'trust',
      items: [
        { icon: 'shield', title: 'Veteriner denetimi', text: "Tesiste bir özel veteriner hekim ve Tarım İl Müdürlüğü'nün görevlendirdiği devlet veteriner hekimi görev yapar." },
        { icon: 'drop', title: 'Çevre', text: 'Atık su arıtma tesisimiz vardır. Çevre izin ve denetimlerimiz mevcuttur.' },
        { icon: 'truck', title: 'Soğuk zincir', text: '120 ton kapasiteli soğuk depolar ve frigorifik araçlar.' },
      ],
      background: 'light',
    },
    {
      blockType: 'documents',
      kicker: 'Belgelerimiz',
      heading: 'Belgelenmiş *helal* üretim.',
      items: [
        {
          image: await m('helal-sertifika.webp', 'Dünya Helal Akademisi tarafından Fatih Mühsürler Et Entegre Tesisleri adına verilen helal sertifikası'),
          label: 'Helal Gıda Sertifikası',
          title: 'Dünya Helal Akademisi',
          rows: [
            { label: 'Standart', value: 'OIC/SMIIC 1:2019' },
            { label: 'Kapsam', value: 'Büyükbaş hayvan kesimi, karkas et, sakatat' },
            { label: 'Geçerlilik', value: '11.03.2026 – 10.03.2027' },
            { label: 'Sertifika no', value: 'HELAL-TR-03-0262-1509' },
          ],
          linkLabel: 'Sertifikayı görüntüle',
          zoomLabel: 'Helal sertifikasını büyük boyutta aç',
        },
      ],
      background: 'light',
    },
    {
      blockType: 'split',
      kicker: 'Tesis',
      heading: 'Tesisimizi *yakından* tanıyın.',
      lead: 'Besiden kesime, soğuk muhafazadan sevkiyata kadar adımların ayrıntısını tesis sayfamızda bulabilirsiniz.',
      link: { label: 'Tesis ve faaliyetler', href: '/tesis' },
      image: await m('karkas-oda.webp', 'Soğuk hava deposunda hijyenik koşullarda asılı karkaslar'),
      imageShape: 'wide',
      background: 'dark',
    },
    cta,
  ]

  /* ---------- İletişim ---------- */
  const iletisim: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'photo',
      image: await m('tesis-avlu.webp', "Afyonkarahisar OSB'deki tesisimizin avlusu ve yükleme kapıları"),
      crumb: 'İletişim',
      title: 'İletişim',
      lead: 'Fason kesim, toptan alım ve diğer sorularınız için bize telefonla ya da formla ulaşabilirsiniz.',
      buttons: [phoneBtn('copper', 'Ara: {telefon}'), dirBtn('Yol Tarifi Al', 'line')],
    },
    contact(null, 'Fatih Mühsürler *Et Entegre Tesisleri*', null, 'dark'),
    {
      blockType: 'map',
      kicker: 'Konum',
      heading: 'Tesisimize *yol tarifi*',
      lead: '{adres}.',
      cover: await m('tabela.webp', 'Tesis girişindeki Fatih Mühsürler tabelası'),
      coverTitle: 'Afyonkarahisar OSB',
      coverText: "Harita Google Haritalar'dan yüklenir. Yüklediğinizde Google çerez kullanabilir.",
      buttonLabel: 'Haritayı göster',
      buttons: [dirBtn('Yol Tarifi Al', 'line'), phoneBtn('line', 'Ara: {telefon}')],
    },
  ]

  /* ---------- KVKK ---------- */
  const kvkk: Blocks = [
    {
      blockType: 'pageHero',
      variant: 'plain',
      crumb: 'Kişisel verilerin korunması',
      title: 'Kişisel verilerin *korunması*',
      lead: 'İletişim formu ve e-posta yoluyla paylaştığınız bilgiler hakkında aydınlatma metni.',
    },
    {
      blockType: 'legal',
      tocLabel: 'İçindekiler',
      sections: [
        { title: 'Veri sorumlusu', text: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu Fatih Mühsürler Et Entegre Tesisleri'dir. Adres: {adres}." },
        { title: 'Hangi bilgileri, neden işliyoruz', text: 'Teklif formu ya da e-posta yoluyla paylaştığınız ad soyad, firma, telefon ve mesaj bilgilerinizi yalnızca talebinize dönüş yapmak ve olası iş ilişkisini yürütmek için kullanırız.' },
        { title: 'Hukuki sebep', text: 'Bilgileriniz, bir sözleşmenin kurulmasıyla doğrudan ilgili olması ve meşru menfaatimiz hukuki sebeplerine dayanılarak işlenir.' },
        { title: 'Aktarım', text: 'Bilgileriniz üçüncü kişilerle paylaşılmaz; yalnızca kanunen yetkili kurumların talebi hâlinde ilgili mevzuat çerçevesinde aktarılabilir.' },
        { title: 'Çerezler', text: 'Bu site reklam veya ziyaretçi takibi amaçlı çerez kullanmaz. İletişim sayfasındaki haritayı yüklemeyi seçerseniz Google Haritalar kendi çerezlerini kullanabilir.' },
        { title: 'Haklarınız', text: 'Kanunun 11. maddesi uyarınca bilgilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Talepleriniz için [{eposta}](mailto:{eposta}) adresine yazabilir ya da {telefon} numarasını arayabilirsiniz.' },
      ],
    },
  ]

  const pages: { slug: string; title: string; order: number; metaTitle: string; metaDescription: string; noindex?: boolean; layout: Blocks }[] = [
    { slug: 'anasayfa', title: 'Ana Sayfa', order: 0, metaTitle: 'Fatih Mühsürler Et Entegre Tesisleri, Afyonkarahisar', metaDescription: "Afyonkarahisar OSB'de besicilik, kesim, fason kesim ve sucuk üretimi tek çatı altında. 1955'ten bu yana aile mesleği.", layout: home },
    { slug: 'hakkimizda', title: 'Hakkımızda', order: 1, metaTitle: 'Hakkımızda, Fatih Mühsürler Et Entegre Tesisleri', metaDescription: "1955'te başlayan bir aile mesleği: karkas etin trenle İstanbul'a taşındığı günlerden Afyonkarahisar OSB'deki entegre tesise.", layout: hakkimizda },
    { slug: 'tesis', title: 'Tesis', order: 2, metaTitle: 'Tesis ve Faaliyetler, Fatih Mühsürler Et', metaDescription: 'Besi, kesimhane, soğuk hava depoları, sucukhane ve sevkiyat. Besiden sofraya tek çatı altında.', layout: tesis },
    { slug: 'fason-kesim', title: 'Fason Kesim', order: 3, metaTitle: 'Afyon Fason Kesim, Fatih Mühsürler Et', metaDescription: 'Günde 400 baş kapasiteli kesimhanede fason kesim. Canlı hayvan girer, dört parça karkas çıkar.', layout: fason },
    { slug: 'sucuk', title: 'Sucuk', order: 4, metaTitle: 'Sucuk, Fatih Mühsürler Et Entegre Tesisleri', metaDescription: 'Geleneksel yöntemle üretilen sucuk. Online sipariş için Usta Kasap.', layout: sucuk },
    { slug: 'kalite', title: 'Kalite', order: 5, metaTitle: 'Kalite ve Denetim, Fatih Mühsürler Et', metaDescription: 'Helal sertifikası, veteriner denetimi, atık su arıtma ve çevre izinleri.', layout: kalite },
    { slug: 'iletisim', title: 'İletişim', order: 6, metaTitle: 'İletişim, Fatih Mühsürler Et Entegre Tesisleri', metaDescription: 'OSB 1. Cadde 13. Sokak No:15 Merkez/Afyonkarahisar. Tel: 0272 246 46 46.', layout: iletisim },
    { slug: 'kvkk', title: 'Kişisel Verilerin Korunması', order: 9, metaTitle: 'Kişisel Verilerin Korunması, Fatih Mühsürler Et', metaDescription: 'Fatih Mühsürler Et Entegre Tesisleri iletişim formu kişisel veri aydınlatma metni.', noindex: true, layout: kvkk },
  ]

  for (const page of pages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1, depth: 0 })
    const data = { ...page, _status: 'published' as const }
    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: { ...ctx } })
    } else {
      await payload.create({ collection: 'pages', data, context: { ...ctx } })
    }
    payload.logger.info(`Sayfa yazıldı: /${page.slug}`)
  }
  payload.logger.info('Seed tamamlandı')
}

const payload = await getPayload({ config })
await run(payload)
process.exit(0)
