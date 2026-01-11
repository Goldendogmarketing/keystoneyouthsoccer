import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { aE as pgTable, aF as timestamp, aG as text, aK as numeric, aI as uuid } from "./db-COtzJr4P.mjs";
const registrations = pgTable("registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  playerId: uuid("player_id").references(() => players.id, { onDelete: "cascade" }).notNull(),
  seasonId: uuid("season_id").references(() => seasons.id, { onDelete: "cascade" }).notNull(),
  parentUserId: uuid("parent_user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  status: text("status", {
    enum: ["draft", "pending_payment", "paid", "cancelled", "refunded"]
  }).notNull().default("draft"),
  paymentStatus: text("payment_status", {
    enum: ["pending", "paid", "failed", "refunded"]
  }).default("pending"),
  paymentIntentId: text("payment_intent_id"),
  // Payment transaction ID (Authorize.net)
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  submittedAt: timestamp("submitted_at"),
  paidAt: timestamp("paid_at"),
  electronicSignature: text("electronic_signature").notNull(),
  signedAt: timestamp("signed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
pgTable("registration_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  registrationId: uuid("registration_id").references(() => registrations.id, { onDelete: "cascade" }).notNull(),
  documentType: text("document_type", {
    enum: ["waiver", "medical_form", "code_of_conduct", "photo_release"]
  }).notNull(),
  signedBy: text("signed_by").notNull(),
  signedAt: timestamp("signed_at").notNull(),
  signature: text("signature").notNull()
});
export {
  registrations as r
};
