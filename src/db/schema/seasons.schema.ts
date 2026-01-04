import { pgTable, uuid, text, timestamp, date, boolean, numeric } from 'drizzle-orm/pg-core';

export const seasons = pgTable('seasons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Spring 2026"
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  registrationOpenDate: date('registration_open_date').notNull(),
  registrationCloseDate: date('registration_close_date').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  registrationFee: numeric('registration_fee', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  ageGroups: text('age_groups'), // JSON string of age groups
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
