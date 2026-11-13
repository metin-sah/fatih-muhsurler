import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Site küçük olduğu için herhangi bir içerik değişince tüm ziyaretçi sayfalarının önbelleği tazelenir;
 * panelde yapılan değişiklik bir sonraki ziyarette görünür.
 */
const refreshSite = (context: Record<string, unknown> | undefined) => {
  if (context?.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Seed gibi Next.js dışında çalışan betiklerde önbellek yoktur.
  }
}

export const revalidateCollection: CollectionAfterChangeHook = ({ doc, req }) => {
  refreshSite(req.context)
  return doc
}

export const revalidateCollectionDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  refreshSite(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  refreshSite(req.context)
  return doc
}
