import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { tr } from '@payloadcms/translations/languages/tr'
import path from 'path'
import { buildConfig, type CollectionConfig, type GlobalConfig } from 'payload'
import { payloadTotp } from 'payload-totp'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { collections } from './collections'
import { quoteEndpoint } from './endpoints/quote'
import { SiteSettings } from './globals/SiteSettings'
import { auditCollectionChange, auditCollectionDelete, auditGlobalChange } from './hooks/audit'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Yerelde 3000 doluysa sunucu başka porta geçer; panelde kaydetme o portta da çalışsın.
// Canlıda: ana alan adı, www sürümü ve Vercel'in kendi adresleri (alan adı bağlanana kadar panel bunlardan açılır).
const vercelHosts = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL, ...(process.env.SITE_ALIASES ?? '').split(',')]
  .map((host) => host?.trim())
  .filter(Boolean)
  .map((host) => `https://${host}`)
const wwwVariant = serverURL.replace(/^https:\/\/(?!www\.)/, 'https://www.')
const allowedOrigins = [
  ...new Set(
    process.env.NODE_ENV === 'development'
      ? [serverURL, ...[3000, 3001, 3002, 3003].map((port) => `http://localhost:${port}`)]
      : [serverURL, wwwVariant, ...vercelHosts],
  ),
]

const withAudit = (collection: CollectionConfig): CollectionConfig =>
  collection.slug === 'audit-logs'
    ? collection
    : {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterChange: [...(collection.hooks?.afterChange ?? []), auditCollectionChange],
          afterDelete: [...(collection.hooks?.afterDelete ?? []), auditCollectionDelete],
        },
      }

const withGlobalAudit = (global: GlobalConfig): GlobalConfig => ({
  ...global,
  hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), auditGlobalChange] },
})

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname), autoGenerate: false },
    dateFormat: 'dd.MM.yyyy HH:mm',
    meta: { titleSuffix: ' · Yönetim Paneli' },
    components: {
      // Yüklemeleri sunucuya gitmeden önce küçültür/düzeltir (Vercel 4,5 MB sınırı).
      providers: ['@/components/admin/UploadGuard#UploadGuard'],
      graphics: {
        Logo: '@/components/admin/Brand#AdminLogo',
        Icon: '@/components/admin/Brand#AdminIcon',
      },
    },
    livePreview: {
      collections: ['pages'],
      url: ({ data }) => `${serverURL}/${data?.slug === 'anasayfa' ? '' : (data?.slug ?? '')}`,
      breakpoints: [
        { label: 'Telefon', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Masaüstü', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: { supportedLanguages: { tr }, fallbackLanguage: 'tr' },
  collections: collections.map(withAudit),
  globals: [SiteSettings].map(withGlobalAudit),
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Şema yalnızca migration ile değişir; geliştirme ve üretim aynı yolu izler.
    push: false,
    prodMigrations: migrations,
  }),
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || '',
        defaultFromName: process.env.EMAIL_FROM_NAME || '',
      })
    : undefined,
  sharp,
  endpoints: [quoteEndpoint],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts'), autoGenerate: false },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Herkese açık medya doğrudan Blob adresinden sunulur (sunucu fonksiyonundan geçmez).
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Seçkin'de görüldü: tarayıcıdan doğrudan yükleme WebP dönüşümüyle uyumsuz, dosya boş yazılıyordu.
      clientUploads: false,
    }),
    // 2FA: eklenti tüm erişim kurallarını sardığı için en sonda olmalıdır.
    payloadTotp({
      collection: 'users',
      forceSetup: true,
      disabled: process.env.TOTP_DISABLED === 'true',
      totp: { issuer: process.env.TOTP_ISSUER || 'Fatih Mühsürler Panel' },
    }),
  ],
})
