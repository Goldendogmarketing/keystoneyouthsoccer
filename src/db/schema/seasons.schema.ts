import { pgTable, uuid, text, timestamp, date, boolean, numeric } from 'drizzle-orm/pg-core';

export const seasons = pgTable('seasons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Spring 2026"
  seasonType: text('season_type', { enum: ['spring', 'fall'] }).notNull().default('spring'),
  year: text('year').notNull(), // e.g., "2026"
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  registrationOpenDate: date('registration_open_date').notNull(),
  registrationCloseDate: date('registration_close_date').notNull(),
  isActive: boolean('is_active').default(false).notNull(),
  isRegistrationOpen: boolean('is_registration_open').default(false).notNull(),
  registrationFee: numeric('registration_fee', { precision: 10, scale: 2 }).notNull(),
  lateFee: numeric('late_fee', { precision: 10, scale: 2 }).default('0'),
  description: text('description'),
  ageGroups: text('age_groups'), // JSON string of age groups like ["U6", "U8", "U10", "U12"]
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
