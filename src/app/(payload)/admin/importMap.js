import { CtaNote as CtaNote_0c046e23e3ac1d777a3aac1985eb80b1 } from '@/components/admin/CtaNote'
import { TOTPField as TOTPField_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { AdminIcon as AdminIcon_066c562e10ad4e70ff0de1a39f9b91f6 } from '@/components/admin/Brand'
import { AdminLogo as AdminLogo_066c562e10ad4e70ff0de1a39f9b91f6 } from '@/components/admin/Brand'
import { UploadGuard as UploadGuard_114f42eb9fb9477d280d724fc1d1dceb } from '@/components/admin/UploadGuard'
import { TOTPProvider as TOTPProvider_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { TOTPSetup as TOTPSetup_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { TOTPVerify as TOTPVerify_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/components/admin/CtaNote#CtaNote": CtaNote_0c046e23e3ac1d777a3aac1985eb80b1,
  "payload-totp/rsc#TOTPField": TOTPField_4eaf6cb33cfb75be01716613e3c9a512,
  "@/components/admin/Brand#AdminIcon": AdminIcon_066c562e10ad4e70ff0de1a39f9b91f6,
  "@/components/admin/Brand#AdminLogo": AdminLogo_066c562e10ad4e70ff0de1a39f9b91f6,
  "@/components/admin/UploadGuard#UploadGuard": UploadGuard_114f42eb9fb9477d280d724fc1d1dceb,
  "payload-totp/rsc#TOTPProvider": TOTPProvider_4eaf6cb33cfb75be01716613e3c9a512,
  "payload-totp/rsc#TOTPSetup": TOTPSetup_4eaf6cb33cfb75be01716613e3c9a512,
  "payload-totp/rsc#TOTPVerify": TOTPVerify_4eaf6cb33cfb75be01716613e3c9a512,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e
}
