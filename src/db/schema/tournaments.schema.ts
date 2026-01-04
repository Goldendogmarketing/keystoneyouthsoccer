import { pgTable, uuid, text, timestamp, date, numeric, boolean, integer } from 'drizzle-orm/pg-core';
import { teams } from './teams.schema';

export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "3v3 Challenge Rotary Tournament"
  description: text('description'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  location: text('location').notNull(),
  registrationFee: numeric('registration_fee', { precision: 10, scale: 2 }),
  registrationDeadline: date('registration_deadline'),
  maxTeams: integer('max_teams'),
  ageGroups: text('age_groups'), // JSON array
  rules: text('rules'),
  isActive: boolean('is_active').default(true).notNull(),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tournamentRegistrations = pgTable('tournament_registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id')
    .references(() => tournaments.id, { onDelete: 'cascade' })
    .notNull(),
  teamId: uuid('team_id').references(() => teams.id),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone').notNull(),
  paymentStatus: text('payment_status', { enum: ['pending', 'paid', 'refunded'] }).default(
    'pending',
  ),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
