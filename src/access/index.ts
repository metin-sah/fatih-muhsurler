import type { Access, FieldAccess, PayloadRequest } from 'payload'
import { totpAccess } from 'payload-totp'

export const ROLES = ['superadmin', 'admin', 'editor'] as const
export type Role = (typeof ROLES)[number]

type MaybeUser = PayloadRequest['user']

const roleOf = (user: MaybeUser): Role | undefined =>
  user && 'role' in user ? ((user as { role?: Role }).role ?? undefined) : undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean => {
  const role = roleOf(user)
  return Boolean(role && roles.includes(role))
}

export const isSuperAdmin: Access = ({ req: { user } }) => hasRole(user, 'superadmin')
export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'superadmin', 'admin')
export const isEditor: Access = ({ req: { user } }) => hasRole(user, 'superadmin', 'admin', 'editor')
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, 'superadmin')

/** Ziyaretçiler yalnızca yayınlanmış içeriği okur; giriş yapanlar 2FA doğrulamasından geçer. */
export const publishedOrAuthenticated: Access = (args) => {
  if (args.req.user) return totpAccess(() => true)(args)
  return { _status: { equals: 'published' } }
}

export const publicOrAuthenticated: Access = (args) => {
  if (args.req.user) return totpAccess(() => true)(args)
  return true
}

/** `read` erişimi kendimiz yönettiğimiz için 2FA eklentisinin otomatik sarmalayıcısını kapatır. */
export const customReadTotp = { totp: { disableAccessWrapper: { read: true } } }

/** Formlar sunucu tarafında `overrideAccess` ile yazar; dışarıdan oluşturmaya kapalıdır. */
export const nobody: Access = () => false
