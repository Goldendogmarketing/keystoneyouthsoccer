import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const smsLogs = pgTable('sms_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  recipientPhone: text('recipient_phone').notNull(),
  message: text('message').notNull(),
  status: text('status', { enum: ['pending', 'sent', 'failed', 'delivered'] }).default('pending').notNull(),
  twilioSid: text('twilio_sid'),
  error: text('error'),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});
