import { pgTable, uuid, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { seasons } from './seasons.schema';
import { users } from './users.schema';
import { players } from './players.schema';

export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  seasonId: uuid('season_id')
    .references(() => seasons.id, { onDelete: 'cascade' })
    .notNull(),
  ageGroup: text('age_group').notNull(), // e.g., "U8", "U10"
  coachId: uuid('coach_id').references(() => users.id),
  photoUrl: text('photo_url'),
  isChampion: boolean('is_champion').default(false).notNull(),
  championYear: integer('champion_year'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teamRoster = pgTable('team_roster', {
  id: uuid('id').primaryKey().defaultRandom(),
  teamId: uuid('team_id')
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
  playerId: uuid('player_id')
    .references(() => players.id, { onDelete: 'cascade' })
    .notNull(),
  jerseyNumber: integer('jersey_number'),
  position: text('position'),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

export const coaches = pgTable('coaches', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  bio: text('bio'),
  certifications: text('certifications'),
  yearsExperience: integer('years_experience'),
  photoUrl: text('photo_url'),
  isVolunteer: boolean('is_volunteer').default(true).notNull(),
  status: text('status', { enum: ['active', 'inactive', 'pending'] }).default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
