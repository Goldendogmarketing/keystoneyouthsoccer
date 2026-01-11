import { pgTable, uuid, text, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';
import { players } from './players.schema';
import { seasons } from './seasons.schema';
import { users } from './users.schema';

export const registrations = pgTable('registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  playerId: uuid('player_id')
    .references(() => players.id, { onDelete: 'cascade' })
    .notNull(),
  seasonId: uuid('season_id')
    .references(() => seasons.id, { onDelete: 'cascade' })
    .notNull(),
  parentUserId: uuid('parent_user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  status: text('status', {
    enum: ['draft', 'pending_payment', 'paid', 'cancelled', 'refunded'],
  })
    .notNull()
    .default('draft'),
  paymentStatus: text('payment_status', {
    enum: ['pending', 'paid', 'failed', 'refunded'],
  }).default('pending'),
  paymentIntentId: text('payment_intent_id'), // Payment transaction ID (Authorize.net)
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  submittedAt: timestamp('submitted_at'),
  paidAt: timestamp('paid_at'),
  electronicSignature: text('electronic_signature').notNull(),
  signedAt: timestamp('signed_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const registrationDocuments = pgTable('registration_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  registrationId: uuid('registration_id')
    .references(() => registrations.id, { onDelete: 'cascade' })
    .notNull(),
  documentType: text('document_type', {
    enum: ['waiver', 'medical_form', 'code_of_conduct', 'photo_release'],
  }).notNull(),
  signedBy: text('signed_by').notNull(),
  signedAt: timestamp('signed_at').notNull(),
  signature: text('signature').notNull(),
});
