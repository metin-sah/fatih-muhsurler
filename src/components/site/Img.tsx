import type { Media } from '@/payload-types'

type Props = {
  media?: Media | number | null
  sizes?: string
  className?: string
  priority?: boolean
  style?: React.CSSProperties
}

export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in (value as Media) ? (value as Media) : null

/** Panelden gelen görsel: Payload'un ürettiği boyutlardan srcset kurar. */
export const Img = ({ media, sizes = '100vw', className, priority, style }: Props) => {
  const doc = asMedia(media)
  if (!doc?.url) return null
  const candidates = [doc.sizes?.small, doc.sizes?.medium, doc.sizes?.large]
    .filter((size): size is NonNullable<typeof size> => Boolean(size?.url && size?.width))
    .map((size) => `${size.url} ${size.width}w`)
  if (doc.width) candidates.push(`${doc.url} ${doc.width}w`)
  const src = doc.sizes?.medium?.url || doc.url
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={candidates.length > 1 ? candidates.join(', ') : undefined}
      sizes={candidates.length > 1 ? sizes : undefined}
      width={doc.width ?? undefined}
      height={doc.height ?? undefined}
      alt={doc.alt ?? ''}
      className={className}
      style={style}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}
