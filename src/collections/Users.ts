import type { CollectionConfig } from 'payload'

import { hasRole, isSuperAdmin, isSuperAdminField, ROLES } from '@/access'

const roleLabels: Record<(typeof ROLES)[number], string> = {
  superadmin: 'Süper yönetici',
  admin: 'Yönetici',
  editor: 'Editör',
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Kullanıcı', plural: 'Kullanıcılar' },
  admin: { group: 'Sistem', useAsTitle: 'name', defaultColumns: ['name', 'email', 'role'] },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => (hasRole(user, 'superadmin') ? true : user ? { id: { equals: user.id } } : false),
    create: isSuperAdmin,
    update: ({ req: { user } }) => (hasRole(user, 'superadmin') ? true : user ? { id: { equals: user.id } } : false),
    delete: isSuperAdmin,
    unlock: isSuperAdmin,
  },
  fields: [
    { name: 'name', label: 'Ad soyad', type: 'text', required: true },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      // İlk kullanıcı (kurulum ekranında oluşturulan) süper yönetici olur.
      defaultValue: 'superadmin',
      saveToJWT: true,
      access: { update: isSuperAdminField },
      options: ROLES.map((value) => ({ value, label: roleLabels[value] })),
      admin: { position: 'sidebar' },
    },
  ],
}
