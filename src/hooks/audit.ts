import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

const IGNORED = new Set(['audit-logs', 'payload-preferences', 'payload-locked-documents', 'payload-migrations', 'totp-attempts', 'payload-jobs'])

const titleOf = (doc: Record<string, unknown> | undefined): string => {
  if (!doc) return ''
  for (const key of ['title', 'name', 'email', 'filename']) {
    const value = doc[key]
    if (typeof value === 'string' && value) return value.slice(0, 200)
  }
  return String(doc.id ?? '')
}

const changedFields = (doc: Record<string, unknown>, previous?: Record<string, unknown>): string[] => {
  if (!previous) return []
  const skip = new Set(['updatedAt', 'createdAt', '_status'])
  return Object.keys(doc).filter(
    (key) => !skip.has(key) && JSON.stringify(doc[key]) !== JSON.stringify(previous[key]),
  )
}

/** Kim, neyi, ne zaman değiştirdi: tüm koleksiyon ve global değişikliklerini kaydeder. */
export const auditCollectionChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, collection }) => {
  if (IGNORED.has(collection.slug) || req.context?.skipAudit || !req.user) return doc
  await req.payload.create({
    collection: 'audit-logs',
    overrideAccess: true,
    req,
    data: {
      user: req.user.id as number,
      action: operation === 'create' ? 'create' : doc?._status === 'published' && previousDoc?._status !== 'published' ? 'publish' : 'update',
      entity: collection.slug,
      documentId: String(doc.id),
      documentTitle: titleOf(doc),
      changedFields: changedFields(doc, previousDoc),
    },
  })
  return doc
}

export const auditCollectionDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  if (IGNORED.has(collection.slug) || req.context?.skipAudit || !req.user) return doc
  await req.payload.create({
    collection: 'audit-logs',
    overrideAccess: true,
    req,
    data: {
      user: req.user.id as number,
      action: 'delete',
      entity: collection.slug,
      documentId: String(doc?.id ?? ''),
      documentTitle: titleOf(doc),
      changedFields: [],
    },
  })
  return doc
}

export const auditGlobalChange: GlobalAfterChangeHook = async ({ doc, previousDoc, req, global }) => {
  if (req.context?.skipAudit || !req.user) return doc
  await req.payload.create({
    collection: 'audit-logs',
    overrideAccess: true,
    req,
    data: {
      user: req.user.id as number,
      action: 'update',
      entity: `global:${global.slug}`,
      documentId: global.slug,
      documentTitle: global.slug,
      changedFields: changedFields(doc, previousDoc),
    },
  })
  return doc
}
