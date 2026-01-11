import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { aE as pgTable, aF as timestamp, aI as uuid, aJ as boolean, aG as text, ax as object, az as db, y as eq, _ as desc, ay as string, aB as _enum, aA as boolean$1 } from "./db-COtzJr4P.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { g as getSession, r as requireAdmin } from "./middleware-BXaiHw3P.mjs";
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
const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type", { enum: ["info", "warning", "success", "urgent"] }).default("info").notNull(),
  linkUrl: text("link_url"),
  linkText: text("link_text"),
  isActive: boolean("is_active").default(true).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const getAnnouncements_createServerFn_handler = createServerRpc("5ae0504b1f20a6d8c83fc37023d9b4df2fad6381db7e380a0a0f977a20fdfa6c", (opts, signal) => getAnnouncements.__executeServer(opts, signal));
const getAnnouncements = createServerFn({
  method: "GET"
}).handler(getAnnouncements_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  return result;
});
const getActiveAnnouncements_createServerFn_handler = createServerRpc("2a15981de6334713ed9de94ff92967306e0939465883c278bfc7fdcc49133cfd", (opts, signal) => getActiveAnnouncements.__executeServer(opts, signal));
const getActiveAnnouncements = createServerFn({
  method: "GET"
}).handler(getActiveAnnouncements_createServerFn_handler, async () => {
  const now = /* @__PURE__ */ new Date();
  const result = await db.select().from(announcements).where(eq(announcements.isActive, true)).orderBy(desc(announcements.createdAt));
  return result.filter((a) => {
    if (a.startDate && new Date(a.startDate) > now) return false;
    if (a.endDate && new Date(a.endDate) < now) return false;
    return true;
  });
});
const createAnnouncementSchema = object({
  title: string().min(1),
  message: string().min(1),
  type: _enum(["info", "warning", "success", "urgent"]),
  linkUrl: string().optional(),
  linkText: string().optional(),
  startDate: string().optional(),
  endDate: string().optional()
});
const createAnnouncement_createServerFn_handler = createServerRpc("ed65ee11f1d0fea88a69dbde34a54d774880807a07b36362f8c05e96b659e386", (opts, signal) => createAnnouncement.__executeServer(opts, signal));
const createAnnouncement = createServerFn({
  method: "POST"
}).inputValidator((data) => createAnnouncementSchema.parse(data)).handler(createAnnouncement_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  await requireAdmin();
  const [announcement] = await db.insert(announcements).values({
    title: data.title,
    message: data.message,
    type: data.type,
    linkUrl: data.linkUrl || null,
    linkText: data.linkText || null,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    createdBy: session?.user?.id || null,
    isActive: true
  }).returning();
  return announcement;
});
const updateAnnouncementSchema = object({
  id: string().uuid(),
  title: string().min(1).optional(),
  message: string().min(1).optional(),
  type: _enum(["info", "warning", "success", "urgent"]).optional(),
  linkUrl: string().optional(),
  linkText: string().optional(),
  startDate: string().optional(),
  endDate: string().optional(),
  isActive: boolean$1().optional()
});
const updateAnnouncement_createServerFn_handler = createServerRpc("287ad6d3ac2abb977ed443bf8db1be2795311878e2fd34955ce25028bf323315", (opts, signal) => updateAnnouncement.__executeServer(opts, signal));
const updateAnnouncement = createServerFn({
  method: "POST"
}).inputValidator((data) => updateAnnouncementSchema.parse(data)).handler(updateAnnouncement_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const {
    id,
    startDate,
    endDate,
    ...rest
  } = data;
  const updateData = {
    ...rest,
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (startDate !== void 0) {
    updateData.startDate = startDate ? new Date(startDate) : null;
  }
  if (endDate !== void 0) {
    updateData.endDate = endDate ? new Date(endDate) : null;
  }
  const [updated] = await db.update(announcements).set(updateData).where(eq(announcements.id, id)).returning();
  if (!updated) {
    throw new Error("Announcement not found");
  }
  return updated;
});
const deleteAnnouncementSchema = object({
  id: string().uuid()
});
const deleteAnnouncement_createServerFn_handler = createServerRpc("9696c36524f79a45becc8bc1bd32e5d162e84c7ece20474e210ac2d161dec698", (opts, signal) => deleteAnnouncement.__executeServer(opts, signal));
const deleteAnnouncement = createServerFn({
  method: "POST"
}).inputValidator((data) => deleteAnnouncementSchema.parse(data)).handler(deleteAnnouncement_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [deleted] = await db.delete(announcements).where(eq(announcements.id, data.id)).returning();
  if (!deleted) {
    throw new Error("Announcement not found");
  }
  return {
    success: true
  };
});
const toggleAnnouncementSchema = object({
  id: string().uuid()
});
const toggleAnnouncementActive_createServerFn_handler = createServerRpc("23f3a0aef6e925e16c13a3fa1f3eab6c858ce5d721361b798de3d4457ce1cb9e", (opts, signal) => toggleAnnouncementActive.__executeServer(opts, signal));
const toggleAnnouncementActive = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleAnnouncementSchema.parse(data)).handler(toggleAnnouncementActive_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [current] = await db.select().from(announcements).where(eq(announcements.id, data.id)).limit(1);
  if (!current) {
    throw new Error("Announcement not found");
  }
  const [updated] = await db.update(announcements).set({
    isActive: !current.isActive,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(announcements.id, data.id)).returning();
  return updated;
});
export {
  createAnnouncement_createServerFn_handler,
  deleteAnnouncement_createServerFn_handler,
  getActiveAnnouncements_createServerFn_handler,
  getAnnouncements_createServerFn_handler,
  toggleAnnouncementActive_createServerFn_handler,
  updateAnnouncement_createServerFn_handler
};
