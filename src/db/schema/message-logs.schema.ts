import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { teams } from './teams.schema';
import { seasons } from './seasons.schema';

export const messageLogs = pgTable('message_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type', { enum: ['email', 'sms'] }).notNull(),
  subject: text('subject'), // For emails
  body: text('body').notNull(),
  recipientType: text('recipient_type', { enum: ['all', 'team', 'season', 'individual'] }).notNull(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
  seasonId: uuid('season_id').references(() => seasons.id, { onDelete: 'set null' }),
  recipientEmail: text('recipient_email'), // For individual
  recipientPhone: text('recipient_phone'), // For individual SMS
  recipientCount: integer('recipient_count').default(0).notNull(),
  status: text('status', { enum: ['pending', 'sent', 'failed', 'partial'] }).default('pending').notNull(),
  errorMessage: text('error_message'),
  sentBy: uuid('sent_by').references(() => users.id),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
