import type { CollectionConfig } from 'payload'

import { AuditLogs, QuoteRequests } from './Inbox'
import { Media } from './Media'
import { Pages } from './Pages'
import { Users } from './Users'

/** Yönetim panelinde görünen sıraya göre tüm koleksiyonlar. */
export const collections: CollectionConfig[] = [Pages, Media, QuoteRequests, Users, AuditLogs]
