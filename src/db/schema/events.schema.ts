import { pgTable, uuid, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { teams } from './teams.schema';
import { users } from './users.schema';
import { seasons } from './seasons.schema';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type', { enum: ['game', 'practice', 'event', 'meeting', 'tournament'] })
    .default('event')
    .notNull(),
  date: timestamp('date').notNull(),
  endDate: timestamp('end_date'),
  time: text('time').notNull(), // e.g., "10:00 AM"
  location: text('location').notNull(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
  teamName: text('team_name'), // For display when team is deleted or for non-team events
  awayTeamId: uuid('away_team_id').references(() => teams.id, { onDelete: 'set null' }),
  awayTeamName: text('away_team_name'), // For games
  opponent: text('opponent'), // Legacy field for games
  ageGroup: text('age_group'), // e.g., "U6", "U8", "U10", "U12" for division filtering
  seasonId: uuid('season_id').references(() => seasons.id, { onDelete: 'set null' }),
  // Game-specific fields
  homeScore: integer('home_score'),
  awayScore: integer('away_score'),
  gameStatus: text('game_status', { enum: ['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled'] }).default('scheduled'),
  isAllDay: boolean('is_all_day').default(false).notNull(),
  isCancelled: boolean('is_cancelled').default(false).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
