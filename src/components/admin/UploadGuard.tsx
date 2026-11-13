'use client'

import { useEffect, type ReactNode } from 'react'

/**
 * Yönetim panelindeki tüm dosya yüklemelerini sunucuya gitmeden önce hazırlar.
 *
 * Neden: Vercel sunucu fonksiyonları 4,5 MB'tan büyük istekleri reddeder (413). Telefon fotoğrafları
 * çoğu zaman 5-10 MB olduğundan yükleme sessizce başarısız oluyordu. Tarayıcıdan doğrudan Blob'a yükleme
 * (clientUploads) ise Payload'un WebP dönüşümüyle uyumsuz: ana dosya Blob'a 0 bayt yazılıyordu.
 *
 * Çözüm: Payload panelin kaydetme isteğini `fetch` + `FormData` ile gönderir. Bu katman o isteği yakalar:
 * - büyük fotoğrafları tarayıcıda 2560 px'e küçültüp 4 MB'ın altına indirir,
 * - iPhone HEIC fotoğraflarını (tarayıcı açabiliyorsa) JPG'ye çevirir,
 * - dosya adını Türkçe karakter ve boşluk içermeyecek şekilde düzeltir,
 * - küçültülemeyen dosyalarda (video, açılamayan görsel) anlaşılır bir Türkçe uyarı gösterir.
 */

/** Vercel'in 4,5 MB istek sınırı; form alanları için pay bırakılır. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
const MAX_SIDE = 2560
const RESIZE_STEPS: Array<[side: number, quality: number]> = [
  [MAX_SIDE, 0.9],
  [MAX_SIDE, 0.84],
  [2200, 0.82],
  [1920, 0.8],
  [1600, 0.78],
]
// Animasyonlu GIF ve vektör SVG küçültülürse bozulur; olduğu gibi gönderilir.
const RASTER = /^image\/(jpeg|jpg|pjpeg|png|webp|avif|bmp|tiff|heic|heif)$/i
const HEIC = /^image\/(heic|heif)$/i

const TR_MAP: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' }

/** "Ana Sayfa Görseli (1).JPG" → "ana-sayfa-gorseli-1.jpg" */
export const safeFilename = (name: string, forcedExt?: string) => {
  const dot = name.lastIndexOf('.')
  const base = dot > 0 ? name.slice(0, dot) : name
  const ext = (forcedExt ?? (dot > 0 ? name.slice(dot + 1) : '')).toLowerCase().replace('jpeg', 'jpg')
  const slug =
    base
      .toLocaleLowerCase('tr')
      .replace(/[çğıöşüâîû]/g, (ch) => TR_MAP[ch] ?? ch)
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'gorsel'
  return ext ? `${slug}.${ext}` : slug
}

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`

class UploadProblem extends Error {}

const decode = async (file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> => {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    return { source: bitmap, width: bitmap.width, height: bitmap.height }
  } catch {
    const url = URL.createObjectURL(file)
    try {
      const img = new Image()
      img.src = url
      await img.decode()
      return { source: img, width: img.naturalWidth, height: img.naturalHeight }
    } finally {
      URL.revokeObjectURL(url)
    }
  }
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

type Prepared = { file: File; scale: number }

const shrinkImage = async (file: File): Promise<Prepared> => {
  let image: Awaited<ReturnType<typeof decode>>
  try {
    image = await decode(file)
  } catch {
    throw new UploadProblem(
      HEIC.test(file.type)
        ? `"${file.name}" iPhone HEIC biçiminde ve bu tarayıcı açamıyor. Fotoğrafı JPG olarak kaydedip tekrar yükleyin (iPhone: Ayarlar › Kamera › Biçimler › En Uyumlu) ya da Safari ile yükleyin.`
        : `"${file.name}" açılamadı; dosya bozuk olabilir. JPG ya da PNG olarak kaydedip tekrar deneyin.`,
    )
  }

  // Şeffaflık olabilecek biçimler WebP'ye (şeffaflığı korur), fotoğraflar JPG'ye çevrilir.
  const keepAlpha = /png|webp|avif/i.test(file.type)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new UploadProblem('Tarayıcı görseli işleyemedi. Lütfen başka bir tarayıcıyla deneyin.')

  let last: Blob | null = null
  let scale = 1
  for (const [side, quality] of RESIZE_STEPS) {
    scale = Math.min(1, side / Math.max(image.width, image.height))
    canvas.width = Math.max(1, Math.round(image.width * scale))
    canvas.height = Math.max(1, Math.round(image.height * scale))
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!keepAlpha) {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(image.source, 0, 0, canvas.width, canvas.height)
    let blob = await toBlob(canvas, keepAlpha ? 'image/webp' : 'image/jpeg', quality)
    // WebP kodlayamayan eski tarayıcılar PNG döndürür; o durumda JPG'ye düşülür.
    if (keepAlpha && blob && blob.type !== 'image/webp' && blob.size > MAX_UPLOAD_BYTES) blob = await toBlob(canvas, 'image/jpeg', quality)
    last = blob
    if (blob && blob.size > 0 && blob.size <= MAX_UPLOAD_BYTES) break
  }
  if ('close' in image.source && typeof image.source.close === 'function') image.source.close()

  if (!last || last.size === 0 || last.size > MAX_UPLOAD_BYTES) {
    throw new UploadProblem(`"${file.name}" (${mb(file.size)}) yeterince küçültülemedi. Daha küçük bir fotoğraf seçin.`)
  }
  const ext = last.type === 'image/webp' ? 'webp' : last.type === 'image/png' ? 'png' : 'jpg'
  return { file: new File([last], safeFilename(file.name, ext), { type: last.type, lastModified: Date.now() }), scale }
}

/** Gönderilecek dosyayı hazırlar; gerekmiyorsa yalnızca adını düzeltir. */
export const prepareUpload = async (file: File): Promise<Prepared> => {
  if (file.size === 0) throw new UploadProblem(`"${file.name}" boş bir dosya (0 bayt). Dosyayı yeniden kaydedip tekrar deneyin.`)

  if (RASTER.test(file.type) && (file.size > MAX_UPLOAD_BYTES || HEIC.test(file.type))) return shrinkImage(file)

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadProblem(
      file.type.startsWith('video/')
        ? `Video ${mb(file.size)}; en fazla 4 MB olabilir. Videoyu kısaltıp sıkıştırın (ör. HandBrake, 720p, sessiz) ya da YouTube'a yükleyip bağlantısını kullanın.`
        : `"${file.name}" ${mb(file.size)}; en fazla 4 MB olabilir.`,
    )
  }

  const name = safeFilename(file.name)
  return { file: name === file.name ? file : new File([file], name, { type: file.type, lastModified: file.lastModified }), scale: 1 }
}

/** Paneldeki kırpma, piksel değerlerini adres satırında gönderir; küçültülen dosyaya göre ölçeklenir. */
const scaleUploadEdits = (input: RequestInfo | URL, scale: number): RequestInfo | URL => {
  if (scale === 1) return input
  const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  if (!raw.includes('uploadEdits')) return input
  const url = new URL(raw, window.location.href)
  for (const key of ['uploadEdits[heightInPixels]', 'uploadEdits[widthInPixels]']) {
    const value = Number(url.searchParams.get(key))
    if (value > 0) url.searchParams.set(key, String(Math.max(1, Math.floor(value * scale) - 1)))  // yuvarlama yüzünden sınırı aşmasın
  }
  return typeof input === 'string' || input instanceof URL ? url.href : new Request(url.href, input)
}

const errorResponse = (message: string) =>
  new Response(JSON.stringify({ message }), { status: 400, headers: { 'Content-Type': 'application/json' } })

let installed = false

const install = () => {
  if (installed || typeof window === 'undefined') return
  installed = true
  const nativeFetch = window.fetch.bind(window)

  window.fetch = async (input, init) => {
    const body = init?.body
    const file = body instanceof FormData ? body.get('file') : null
    if (!(file instanceof File)) return nativeFetch(input, init)

    try {
      const { file: prepared, scale } = await prepareUpload(file)
      if (prepared === file) return nativeFetch(input, init)
      const next = new FormData()
      for (const [key, value] of (body as FormData).entries()) {
        if (key === 'file') next.append('file', prepared, prepared.name)
        else next.append(key, value)
      }
      return nativeFetch(scaleUploadEdits(input, scale), { ...init, body: next })
    } catch (error) {
      if (error instanceof UploadProblem) return errorResponse(error.message)
      throw error
    }
  }
}

export const UploadGuard = ({ children }: { children?: ReactNode }) => {
  install()
  useEffect(install, [])
  return <>{children}</>
}
