import type { CollectionConfig } from 'payload'

import { customReadTotp, isAdmin, isEditor, publishedOrAuthenticated } from '@/access'
import { blocks } from '@/blocks'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Sayfa', plural: 'Sayfalar' },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Her sayfa, sırası sürükle-bırak ile değiştirilebilen bölümlerden oluşur.',
    preview: (doc) => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/${doc?.slug === 'anasayfa' ? '' : (doc?.slug ?? '')}`,
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAdmin,
    update: isEditor,
    delete: isAdmin,
    readVersions: isEditor,
  },
  custom: customReadTotp,
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 30 },
  defaultSort: 'order',
  fields: [
    { name: 'title', label: 'Sayfa adı', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bölümler',
          fields: [{ name: 'layout', label: 'Bölümler', type: 'blocks', blocks, admin: { initCollapsed: true } }],
        },
        {
          label: 'Arama motoru',
          fields: [
            { name: 'metaTitle', label: 'Sekme ve Google başlığı', type: 'text', admin: { description: 'Boşsa sayfa adı kullanılır.' } },
            { name: 'metaDescription', label: 'Google açıklaması', type: 'textarea', maxLength: 170 },
            { name: 'noindex', label: 'Arama motorlarında gösterme', type: 'checkbox' },
          ],
        },
      ],
    },
    {
      name: 'slug',
      label: 'Adres',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Ana sayfa için: anasayfa. Diğerleri için ör. tesis, fason-kesim.' },
    },
    {
      name: 'order',
      label: 'Sıra',
      type: 'number',
      defaultValue: 10,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
}
