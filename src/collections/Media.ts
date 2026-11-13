import { APIError, type CollectionConfig } from 'payload'

import { customReadTotp, isEditor, publicOrAuthenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medya', plural: 'Medya' },
  admin: {
    group: 'İçerik',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: 'Fotoğraf, logo, belge görseli ve video. Büyük fotoğraflar yüklemeden önce otomatik küçültülür.',
  },
  access: { read: publicOrAuthenticated, create: isEditor, update: isEditor, delete: isEditor },
  custom: customReadTotp,
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'image/heic', 'image/heif', 'video/mp4', 'video/webm'],
    focalPoint: true,
    crop: true,
    formatOptions: { format: 'webp', options: { quality: 86 } },
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    // Yalnızca genişlik verilir: çerçeveler görseli kendi oranında kırpar, en/boy oranı korunur.
    imageSizes: [
      { name: 'small', width: 480, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'medium', width: 900, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1600, formatOptions: { format: 'webp', options: { quality: 84 } } },
    ],
    adminThumbnail: 'small',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternatif metin',
      type: 'text',
      required: true,
      admin: { description: 'Görseli göremeyen ziyaretçiler ve Google için kısa açıklama (zorunlu).' },
    },
    {
      name: 'credit',
      label: 'Fotoğraf kaynağı',
      type: 'text',
      admin: {
        description: 'Lisanslı fotoğraflar için kaynak satırı. Bağlantı için [görünen metin](https://adres) yazın. Kendi fotoğraflarınızda boş bırakın.',
      },
    },
  ],
  hooks: {
    // Boş (0 bayt) dosya kaydedilip sitede kırık görsel olarak çıkmasın.
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file && req.file.size === 0) {
          throw new APIError('Dosya boş geldi (0 bayt). Lütfen dosyayı yeniden seçip tekrar kaydedin.', 400, undefined, true)
        }
      },
    ],
    afterChange: [revalidateCollection],
    afterDelete: [revalidateCollectionDelete],
  },
}
