import { users } from "./users.schema-CUS3FIEB.mjs";
import { aE as pgTable, aF as timestamp, aG as text, aI as uuid, aL as date, aJ as boolean } from "./db-COtzJr4P.mjs";
const players = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  photoUrl: text("photo_url"),
  parentUserId: uuid("parent_user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  medicalNotes: text("medical_notes"),
  allergies: text("allergies"),
  medicalConditions: text("medical_conditions"),
  insuranceProvider: text("insurance_provider"),
  insurancePolicyNumber: text("insurance_policy_number"),
  physicianName: text("physician_name"),
  physicianPhone: text("physician_phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const emergencyContacts = pgTable("emergency_contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  playerId: uuid("player_id").references(() => players.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  priority: text("priority", { enum: ["primary", "secondary"] }).notNull()
});
const guardians = pgTable("guardians", {
  id: uuid("id").primaryKey().defaultRandom(),
  playerId: uuid("player_id").references(() => players.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code")
});
export {
  emergencyContacts as e,
  guardians as g,
  players as p
};
