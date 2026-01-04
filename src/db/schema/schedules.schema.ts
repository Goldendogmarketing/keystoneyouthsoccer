import { pgTable, uuid, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { teams } from './teams.schema';
import { seasons } from './seasons.schema';

export const games = pgTable('games', {
  id: uuid('id').primaryKey().defaultRandom(),
  seasonId: uuid('season_id')
    .references(() => seasons.id, { onDelete: 'cascade' })
    .notNull(),
  homeTeamId: uuid('home_team_id').references(() => teams.id),
  awayTeamId: uuid('away_team_id').references(() => teams.id),
  scheduledAt: timestamp('scheduled_at').notNull(),
  location: text('location').notNull(),
  field: text('field'),
  type: text('type', { enum: ['regular', 'playoff', 'tournament'] }).default('regular'),
  status: text('status', { enum: ['scheduled', 'in_progress', 'completed', 'cancelled'] }).default(
    'scheduled',
  ),
  homeScore: integer('home_score'),
  awayScore: integer('away_score'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const practices = pgTable('practices', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id')
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
  scheduledAt: timestamp('scheduled_at').notNull(),
  location: text('location').notNull(),
  field: text('field'),
  duration: integer('duration'), // minutes
  notes: text('notes'),
  isCancelled: boolean('is_cancelled').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
