import { aE as pgTable, aF as timestamp, aI as uuid, aJ as boolean, aG as text } from "./db-COtzJr4P.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  role: text("role", { enum: ["parent", "admin", "coach"] }).notNull().default("parent"),
  isMasterAdmin: boolean("is_master_admin").default(false).notNull(),
  isApproved: boolean("is_approved").default(false).notNull(),
  approvedBy: uuid("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  accountId: text("account_id").notNull(),
  // Better Auth required - provider's account ID or userId for credentials
  providerId: text("provider_id").notNull(),
  // Better Auth required - e.g., "credential", "google", etc.
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  // Better Auth stores password hash here for credential provider
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: text("token").notNull().unique(),
  // Better Auth required field name
  expiresAt: timestamp("expires_at").notNull(),
  // Better Auth required field name
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
export {
  accounts,
  sessions,
  users
};
