import type { Endpoint } from 'payload'

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

// Aynı adresten kısa sürede çok sayıda gönderimi engeller (sunucu örneği başına basit sayaç).
const recent = new Map<string, number[]>()
const limited = (key: string) => {
  const now = Date.now()
  const list = (recent.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  list.push(now)
  recent.set(key, list)
  return list.length > 5
}

/** Sitedeki teklif formu: talebi panele "Teklif Talepleri" olarak kaydeder. */
export const quoteEndpoint: Endpoint = {
  path: '/teklif',
  method: 'post',
  handler: async (req) => {
    const body = (await req.json?.().catch(() => null)) as Record<string, unknown> | null
    if (!body) return Response.json({ ok: false }, { status: 400 })
    // Botlar için gizli alan: dolu gelirse sessizce başarılı say.
    if (clean(body.website, 200)) return Response.json({ ok: true })
    const name = clean(body.name, 120)
    const phone = clean(body.phone, 40)
    if (!name || phone.replace(/\D/g, '').length < 10) return Response.json({ ok: false, error: 'invalid' }, { status: 422 })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'yerel'
    if (limited(ip)) return Response.json({ ok: false, error: 'rate' }, { status: 429 })
    await req.payload.create({
      collection: 'quote-requests',
      overrideAccess: true,
      data: {
        name,
        phone,
        company: clean(body.company, 160),
        heads: clean(body.heads, 20),
        message: clean(body.message, 3000),
        sourcePage: clean(body.page, 200),
      },
    })
    return Response.json({ ok: true })
  },
}
