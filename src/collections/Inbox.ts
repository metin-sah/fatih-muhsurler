import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isEditor, nobody } from '@/access'

/** Sitedeki teklif formundan gelen talepler. Ziyaretçi formu `/api/teklif` uç noktası üzerinden kaydeder. */
export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: { singular: 'Teklif Talebi', plural: 'Teklif Talepleri' },
  admin: {
    group: 'Gelen Kutusu',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'phone', 'heads', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: { read: isEditor, update: isEditor, delete: isAdmin, create: nobody },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Ad soyad', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'company', label: 'Firma', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'heads', label: 'Tahmini baş sayısı', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'message', label: 'Mesaj', type: 'textarea' },
    {
      name: 'status',
      label: 'Durum',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'Yeni', value: 'new' },
        { label: 'Arandı', value: 'called' },
        { label: 'Teklif verildi', value: 'quoted' },
        { label: 'Kapandı', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'note', label: 'İç not', type: 'textarea', admin: { position: 'sidebar', description: 'Yalnızca panelde görünür.' } },
    { name: 'sourcePage', label: 'Gönderildiği sayfa', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: { singular: 'İşlem Kaydı', plural: 'İşlem Kayıtları' },
  admin: {
    group: 'Sistem',
    useAsTitle: 'documentTitle',
    defaultColumns: ['createdAt', 'user', 'action', 'entity', 'documentTitle'],
    hidden: ({ user }) => !hasRole(user as never, 'superadmin', 'admin'),
  },
  defaultSort: '-createdAt',
  access: { read: isAdmin, create: nobody, update: nobody, delete: nobody },
  fields: [
    { name: 'user', label: 'Kullanıcı', type: 'relationship', relationTo: 'users', index: true },
    {
      name: 'action',
      label: 'İşlem',
      type: 'select',
      index: true,
      options: [
        { label: 'Oluşturma', value: 'create' },
        { label: 'Güncelleme', value: 'update' },
        { label: 'Yayınlama', value: 'publish' },
        { label: 'Silme', value: 'delete' },
      ],
    },
    { name: 'entity', label: 'Bölüm', type: 'text', index: true },
    { name: 'documentId', label: 'Kayıt no', type: 'text' },
    { name: 'documentTitle', label: 'Kayıt', type: 'text' },
    { name: 'changedFields', label: 'Değişen alanlar', type: 'text', hasMany: true },
  ],
}
