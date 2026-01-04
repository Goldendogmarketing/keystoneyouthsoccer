import { pgTable, uuid, text, timestamp, integer, boolean, date } from 'drizzle-orm/pg-core';

export const sponsors = pgTable('sponsors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  logoUrl: text('logo_url').notNull(),
  websiteUrl: text('website_url'),
  description: text('description'),
  tier: text('tier', { enum: ['platinum', 'gold', 'silver', 'bronze'] }),
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  contactName: text('contact_name'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
