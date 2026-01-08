import { pgTable, uuid, text, timestamp, numeric, boolean, date, integer } from 'drizzle-orm/pg-core';
import { seasons } from './seasons.schema';
import { teams } from './teams.schema';
import { users } from './users.schema';

// Guest registrations - no account required
export const guestRegistrations = pgTable('guest_registrations', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Player Info
  playerFirstName: text('player_first_name').notNull(),
  playerLastName: text('player_last_name').notNull(),
  playerDateOfBirth: date('player_date_of_birth').notNull(),
  playerGender: text('player_gender', { enum: ['male', 'female'] }).notNull(),
  playerPhotoUrl: text('player_photo_url'),

  // Parent/Guardian Info
  parentFirstName: text('parent_first_name').notNull(),
  parentLastName: text('parent_last_name').notNull(),
  parentEmail: text('parent_email').notNull(),
  parentPhone: text('parent_phone').notNull(),
  parentAddress: text('parent_address').notNull(),
  parentCity: text('parent_city').notNull(),
  parentState: text('parent_state').notNull(),
  parentZipCode: text('parent_zip_code').notNull(),

  // Secondary Guardian (optional)
  guardian2FirstName: text('guardian2_first_name'),
  guardian2LastName: text('guardian2_last_name'),
  guardian2Email: text('guardian2_email'),
  guardian2Phone: text('guardian2_phone'),
  guardian2Relationship: text('guardian2_relationship'),

  // Emergency Contacts
  emergency1Name: text('emergency1_name').notNull(),
  emergency1Phone: text('emergency1_phone').notNull(),
  emergency1Relationship: text('emergency1_relationship').notNull(),
  emergency2Name: text('emergency2_name'),
  emergency2Phone: text('emergency2_phone'),
  emergency2Relationship: text('emergency2_relationship'),

  // Medical Info
  allergies: text('allergies'),
  medicalConditions: text('medical_conditions'),
  medications: text('medications'),
  insuranceProvider: text('insurance_provider'),
  insurancePolicyNumber: text('insurance_policy_number'),
  physicianName: text('physician_name'),
  physicianPhone: text('physician_phone'),

  // Season & Team
  seasonId: uuid('season_id')
    .references(() => seasons.id, { onDelete: 'cascade' })
    .notNull(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
  ageGroup: text('age_group'), // Calculated from DOB, e.g., "U8", "U10"

  // Payment & Status
  status: text('status', {
    enum: ['draft', 'pending_payment', 'paid', 'cancelled', 'refunded'],
  })
    .notNull()
    .default('draft'),
  paymentStatus: text('payment_status', {
    enum: ['pending', 'paid', 'failed', 'refunded'],
  }).default('pending'),
  paymentIntentId: text('payment_intent_id'),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  paidAt: timestamp('paid_at'),

  // Waivers & Signatures
  electronicSignature: text('electronic_signature').notNull(),
  signedAt: timestamp('signed_at').notNull(),
  waiverAccepted: boolean('waiver_accepted').default(false).notNull(),
  photoReleaseAccepted: boolean('photo_release_accepted').default(false).notNull(),
  codeOfConductAccepted: boolean('code_of_conduct_accepted').default(false).notNull(),

  // Account Linking
  linkedUserId: uuid('linked_user_id').references(() => users.id, { onDelete: 'set null' }),
  accountInviteSentAt: timestamp('account_invite_sent_at'),
  accountInviteToken: text('account_invite_token'),
  accountInviteExpiresAt: timestamp('account_invite_expires_at'),

  // Metadata
  confirmationNumber: text('confirmation_number').notNull().unique(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Account invitation tokens for guest registrations
export const accountInvitations = pgTable('account_invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  registrationId: uuid('registration_id')
    .references(() => guestRegistrations.id, { onDelete: 'cascade' })
    .notNull(),
  usedAt: timestamp('used_at'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
