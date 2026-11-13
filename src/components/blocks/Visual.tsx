import type { Media } from '@/payload-types'
import { Lines } from '../site/parts'
import { Img } from '../site/Img'

export type VisualItem = {
  mediaType?: ('image' | 'panel') | null
  image?: (number | null) | Media
  imageShape?: ('wide' | 'portrait' | 'square') | null
  panelCorner?: string | null
  panelBig?: string | null
  panelSmall?: string | null
  panelLabel?: string | null
  panelTone?: ('dark' | 'cream') | null
}

const shapeStyle: Record<string, React.CSSProperties | undefined> = {
  portrait: { aspectRatio: '4/5', maxWidth: 440, justifySelf: 'center', width: '100%' },
  square: { aspectRatio: '1/1', maxWidth: 520 },
}

/** Adım ve sekmelerdeki görsel alanı: fotoğraf ya da büyük rakamlı kutu. */
export const Visual = ({ item, sizes, className = '' }: { item: VisualItem; sizes: string; className?: string }) => {
  if (item.mediaType === 'panel') {
    const multiline = (item.panelBig ?? '').includes('\n') || /[a-zçğıöşü]{4,}/i.test(item.panelBig ?? '')
    return (
      <div
        className={`panel${item.panelTone === 'cream' ? ' cream-p' : ''}${multiline ? ' word' : ''}${className ? ` ${className}` : ''}`}
        role="img"
        aria-label={[item.panelBig, item.panelSmall, item.panelLabel].filter(Boolean).join(' ').replace(/\n/g, ', ')}
      >
        <span className="ring" aria-hidden="true" />
        {item.panelCorner ? <span className="corner">{item.panelCorner}</span> : null}
        <div className="big" style={multiline ? { fontSize: 'clamp(2.1rem,4vw,3.4rem)', lineHeight: 1.05 } : undefined}>
          <Lines text={item.panelBig} />
          {item.panelSmall ? <small>{item.panelSmall}</small> : null}
        </div>
        {item.panelLabel ? <span className="lbl">{item.panelLabel}</span> : null}
      </div>
    )
  }
  const shape = item.imageShape ?? 'wide'
  return (
    <figure className={`frame${shape === 'wide' ? ' wide' : ''}${className ? ` ${className}` : ''}`} style={shapeStyle[shape]}>
      <Img media={item.image} sizes={sizes} />
    </figure>
  )
}
