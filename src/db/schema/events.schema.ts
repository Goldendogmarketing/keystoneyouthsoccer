import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { teams } from './teams.schema';
import { users } from './users.schema';

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
  opponent: text('opponent'), // For games
  isAllDay: boolean('is_all_day').default(false).notNull(),
  isCancelled: boolean('is_cancelled').default(false).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
