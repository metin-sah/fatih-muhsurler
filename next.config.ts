import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

// Ziyaretçi sayfaları için içerik güvenliği politikası: yalnızca Vercel Blob medyası ve Google Haritalar gömmesi dışarıdan gelir.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "media-src 'self' https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  'frame-src https://www.google.com https://maps.google.com',
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  // Meta etiketleri her ziyaretçi için <head> içinde gönderilir (akışlı metadata kapalı).
  htmlLimitedBots: /.*/,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Yönetim paneli ve API kendi betiklerini kullanır; politika yalnızca ziyaretçi sayfalarına uygulanır.
      { source: '/((?!admin|api|_next).*)', headers: [{ key: 'Content-Security-Policy', value: csp }] },
      { source: '/assets/fonts/:file*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

const config = withPayload(nextConfig, { devBundleServerPackages: false })

// Payload'un koyu tema için eklediği Critical-CH başlığı yalnızca panelde gerekir (ziyaretçi sayfasında ilk yüklemeyi geciktirir).
const payloadHeaders = config.headers
config.headers = async () =>
  ((await payloadHeaders?.()) ?? []).map((rule) =>
    rule.headers.some((header) => header.key === 'Critical-CH') ? { ...rule, source: '/admin/:path*' } : rule,
  )

export default config
