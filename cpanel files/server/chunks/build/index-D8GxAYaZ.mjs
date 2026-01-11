import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { aE as pgTable, aF as timestamp, aJ as boolean, aG as text, aI as uuid, aH as integer, ax as object, az as db, y as eq, _ as desc, ay as string, aB as _enum, aA as boolean$1 } from "./db-COtzJr4P.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { r as requireAdmin, g as getSession } from "./middleware-BXaiHw3P.mjs";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "./players.schema-DU3TqpAa.mjs";
const emailTemplates = pgTable("email_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  // HTML or markdown
  variables: text("variables"),
  // JSON string of available variables like {{playerName}}, {{teamName}}
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const messageLogs = pgTable("message_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type", { enum: ["email", "sms"] }).notNull(),
  subject: text("subject"),
  // For emails
  body: text("body").notNull(),
  recipientType: text("recipient_type", { enum: ["all", "team", "season", "individual"] }).notNull(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
  seasonId: uuid("season_id").references(() => seasons.id, { onDelete: "set null" }),
  recipientEmail: text("recipient_email"),
  // For individual
  recipientPhone: text("recipient_phone"),
  // For individual SMS
  recipientCount: integer("recipient_count").default(0).notNull(),
  status: text("status", { enum: ["pending", "sent", "failed", "partial"] }).default("pending").notNull(),
  errorMessage: text("error_message"),
  sentBy: uuid("sent_by").references(() => users.id),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
const getEmailTemplates_createServerFn_handler = createServerRpc("25b2d325487e75afc6c8c9d52a6b90a83aaa05dd53db728d57543235a14fa5f7", (opts, signal) => getEmailTemplates.__executeServer(opts, signal));
const getEmailTemplates = createServerFn({
  method: "GET"
}).handler(getEmailTemplates_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select().from(emailTemplates).orderBy(emailTemplates.name);
  return result;
});
const getActiveEmailTemplates_createServerFn_handler = createServerRpc("85c847e7755e23e0fb3a6609fe82e948cc47d2aec89d83da38fb551a9340e955", (opts, signal) => getActiveEmailTemplates.__executeServer(opts, signal));
const getActiveEmailTemplates = createServerFn({
  method: "GET"
}).handler(getActiveEmailTemplates_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select().from(emailTemplates).where(eq(emailTemplates.isActive, true)).orderBy(emailTemplates.name);
  return result;
});
const createTemplateSchema = object({
  name: string().min(1),
  slug: string().min(1),
  subject: string().min(1),
  body: string().min(1),
  variables: string().optional()
});
const createEmailTemplate_createServerFn_handler = createServerRpc("8110a98f6513afc2c7c894aa0d23e22c6a8ec855b9bb469eb8341d5258781c7e", (opts, signal) => createEmailTemplate.__executeServer(opts, signal));
const createEmailTemplate = createServerFn({
  method: "POST"
}).inputValidator((data) => createTemplateSchema.parse(data)).handler(createEmailTemplate_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [template] = await db.insert(emailTemplates).values({
    name: data.name,
    slug: data.slug,
    subject: data.subject,
    body: data.body,
    variables: data.variables || null
  }).returning();
  return template;
});
const updateTemplateSchema = object({
  id: string().uuid(),
  name: string().min(1).optional(),
  slug: string().min(1).optional(),
  subject: string().min(1).optional(),
  body: string().min(1).optional(),
  variables: string().optional(),
  isActive: boolean$1().optional()
});
const updateEmailTemplate_createServerFn_handler = createServerRpc("af8fc817dd7367384785c7f61fc7481d4e2e82de9663fefa1cb81e9455b173a7", (opts, signal) => updateEmailTemplate.__executeServer(opts, signal));
const updateEmailTemplate = createServerFn({
  method: "POST"
}).inputValidator((data) => updateTemplateSchema.parse(data)).handler(updateEmailTemplate_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const {
    id,
    ...updateData
  } = data;
  const [updated] = await db.update(emailTemplates).set({
    ...updateData,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(emailTemplates.id, id)).returning();
  if (!updated) {
    throw new Error("Template not found");
  }
  return updated;
});
const deleteTemplateSchema = object({
  id: string().uuid()
});
const deleteEmailTemplate_createServerFn_handler = createServerRpc("737c7c55fecd0640a8124ad661b89b94f2d1a108204d1fd948449f95a91c8959", (opts, signal) => deleteEmailTemplate.__executeServer(opts, signal));
const deleteEmailTemplate = createServerFn({
  method: "POST"
}).inputValidator((data) => deleteTemplateSchema.parse(data)).handler(deleteEmailTemplate_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [deleted] = await db.delete(emailTemplates).where(eq(emailTemplates.id, data.id)).returning();
  if (!deleted) {
    throw new Error("Template not found");
  }
  return {
    success: true
  };
});
const getMessageLogs_createServerFn_handler = createServerRpc("231383daeb247975f8957b85d49468e445eeeb297635d23572f350371f6cd17f", (opts, signal) => getMessageLogs.__executeServer(opts, signal));
const getMessageLogs = createServerFn({
  method: "GET"
}).handler(getMessageLogs_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select().from(messageLogs).orderBy(desc(messageLogs.sentAt)).limit(50);
  return result;
});
const getTeamsForMessages_createServerFn_handler = createServerRpc("c494ba8f5415ed5e6397ce620841dc442a441ac5f19d5948f8c8fc4892e26cb9", (opts, signal) => getTeamsForMessages.__executeServer(opts, signal));
const getTeamsForMessages = createServerFn({
  method: "GET"
}).handler(getTeamsForMessages_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select({
    id: teams.id,
    name: teams.name
  }).from(teams).orderBy(teams.name);
  return result;
});
const getSeasonsForMessages_createServerFn_handler = createServerRpc("f5d49ed0576b53fbcbeadf679c768df367f7a7d879381b4917097434205465f7", (opts, signal) => getSeasonsForMessages.__executeServer(opts, signal));
const getSeasonsForMessages = createServerFn({
  method: "GET"
}).handler(getSeasonsForMessages_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select({
    id: seasons.id,
    name: seasons.name
  }).from(seasons).orderBy(desc(seasons.startDate));
  return result;
});
const sendMessageSchema = object({
  type: _enum(["email", "sms"]),
  subject: string().optional(),
  body: string().min(1),
  recipientType: _enum(["all", "team", "season", "individual"]),
  teamId: string().uuid().optional(),
  seasonId: string().uuid().optional(),
  recipientEmail: string().email().optional(),
  recipientPhone: string().optional()
});
const sendMessage_createServerFn_handler = createServerRpc("970ff36921000af9073613a1bb0c68250004d2415cd3bae77230118c16e989c4", (opts, signal) => sendMessage.__executeServer(opts, signal));
const sendMessage = createServerFn({
  method: "POST"
}).inputValidator((data) => sendMessageSchema.parse(data)).handler(sendMessage_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  await requireAdmin();
  let recipientCount = 1;
  if (data.recipientType === "all") {
    recipientCount = 156;
  } else if (data.recipientType === "team") {
    recipientCount = 15;
  } else if (data.recipientType === "season") {
    recipientCount = 50;
  }
  const [log] = await db.insert(messageLogs).values({
    type: data.type,
    subject: data.subject || null,
    body: data.body,
    recipientType: data.recipientType,
    teamId: data.teamId || null,
    seasonId: data.seasonId || null,
    recipientEmail: data.recipientEmail || null,
    recipientPhone: data.recipientPhone || null,
    recipientCount,
    status: "sent",
    // Would be 'pending' in production until actually sent
    sentBy: session?.user?.id || null
  }).returning();
  return log;
});
const getMessageStats_createServerFn_handler = createServerRpc("5fb8e5b48badc2dfe28140c42ae7ef29fba46a47a9738d1a9ba110bf37f52017", (opts, signal) => getMessageStats.__executeServer(opts, signal));
const getMessageStats = createServerFn({
  method: "GET"
}).handler(getMessageStats_createServerFn_handler, async () => {
  await requireAdmin();
  const now = /* @__PURE__ */ new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const allLogs = await db.select().from(messageLogs);
  const thisMonthLogs = allLogs.filter((log) => new Date(log.sentAt) >= startOfMonth);
  const emailCount = thisMonthLogs.filter((log) => log.type === "email").length;
  const smsCount = thisMonthLogs.filter((log) => log.type === "sms").length;
  const totalRecipients = thisMonthLogs.reduce((sum, log) => sum + log.recipientCount, 0);
  return {
    emailsSentThisMonth: emailCount,
    smsSentThisMonth: smsCount,
    totalRecipientsThisMonth: totalRecipients
  };
});
export {
  createEmailTemplate_createServerFn_handler,
  deleteEmailTemplate_createServerFn_handler,
  getActiveEmailTemplates_createServerFn_handler,
  getEmailTemplates_createServerFn_handler,
  getMessageLogs_createServerFn_handler,
  getMessageStats_createServerFn_handler,
  getSeasonsForMessages_createServerFn_handler,
  getTeamsForMessages_createServerFn_handler,
  sendMessage_createServerFn_handler,
  updateEmailTemplate_createServerFn_handler
};
