import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { aE as pgTable, aF as timestamp, aG as text, aI as uuid, aJ as boolean, aK as numeric, aL as date, ax as object, az as db, y as eq, _ as desc, ay as string, aC as array, aA as boolean$1, aB as _enum } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { r as requireAdmin } from "./middleware-BXaiHw3P.mjs";
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
const guestRegistrations = pgTable("guest_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Player Info
  playerFirstName: text("player_first_name").notNull(),
  playerLastName: text("player_last_name").notNull(),
  playerDateOfBirth: date("player_date_of_birth").notNull(),
  playerGender: text("player_gender", { enum: ["male", "female"] }).notNull(),
  playerPhotoUrl: text("player_photo_url"),
  // Parent/Guardian Info
  parentFirstName: text("parent_first_name").notNull(),
  parentLastName: text("parent_last_name").notNull(),
  parentEmail: text("parent_email").notNull(),
  parentPhone: text("parent_phone").notNull(),
  parentAddress: text("parent_address").notNull(),
  parentCity: text("parent_city").notNull(),
  parentState: text("parent_state").notNull(),
  parentZipCode: text("parent_zip_code").notNull(),
  // Secondary Guardian (optional)
  guardian2FirstName: text("guardian2_first_name"),
  guardian2LastName: text("guardian2_last_name"),
  guardian2Email: text("guardian2_email"),
  guardian2Phone: text("guardian2_phone"),
  guardian2Relationship: text("guardian2_relationship"),
  // Emergency Contacts
  emergency1Name: text("emergency1_name").notNull(),
  emergency1Phone: text("emergency1_phone").notNull(),
  emergency1Relationship: text("emergency1_relationship").notNull(),
  emergency2Name: text("emergency2_name"),
  emergency2Phone: text("emergency2_phone"),
  emergency2Relationship: text("emergency2_relationship"),
  // Medical Info
  allergies: text("allergies"),
  medicalConditions: text("medical_conditions"),
  medications: text("medications"),
  insuranceProvider: text("insurance_provider"),
  insurancePolicyNumber: text("insurance_policy_number"),
  physicianName: text("physician_name"),
  physicianPhone: text("physician_phone"),
  // Season & Team
  seasonId: uuid("season_id").references(() => seasons.id, { onDelete: "cascade" }).notNull(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
  ageGroup: text("age_group"),
  // Calculated from DOB, e.g., "U8", "U10"
  // Payment & Status
  status: text("status", {
    enum: ["draft", "pending_payment", "paid", "cancelled", "refunded"]
  }).notNull().default("draft"),
  paymentStatus: text("payment_status", {
    enum: ["pending", "paid", "failed", "refunded"]
  }).default("pending"),
  paymentIntentId: text("payment_intent_id"),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paidAt: timestamp("paid_at"),
  // Waivers & Signatures
  electronicSignature: text("electronic_signature").notNull(),
  signedAt: timestamp("signed_at").notNull(),
  waiverAccepted: boolean("waiver_accepted").default(false).notNull(),
  photoReleaseAccepted: boolean("photo_release_accepted").default(false).notNull(),
  codeOfConductAccepted: boolean("code_of_conduct_accepted").default(false).notNull(),
  // Account Linking
  linkedUserId: uuid("linked_user_id").references(() => users.id, { onDelete: "set null" }),
  accountInviteSentAt: timestamp("account_invite_sent_at"),
  accountInviteToken: text("account_invite_token"),
  accountInviteExpiresAt: timestamp("account_invite_expires_at"),
  // Metadata
  confirmationNumber: text("confirmation_number").notNull().unique(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
pgTable("account_invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  registrationId: uuid("registration_id").references(() => guestRegistrations.id, { onDelete: "cascade" }).notNull(),
  usedAt: timestamp("used_at"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
function calculateAgeGroup(dateOfBirth, seasonStartDate) {
  const dob = new Date(dateOfBirth);
  const seasonStart = new Date(seasonStartDate);
  const cutoffYear = seasonStart.getFullYear();
  const age = cutoffYear - dob.getFullYear();
  if (age <= 6) return "U6";
  if (age <= 8) return "U8";
  if (age <= 10) return "U10";
  if (age <= 12) return "U12";
  if (age <= 14) return "U14";
  return "U16+";
}
function generateConfirmationNumber() {
  const timestamp2 = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KYS-${timestamp2}-${random}`;
}
const getGuestRegistrationsSchema = object({
  seasonId: string().uuid().optional(),
  status: string().optional(),
  ageGroup: string().optional(),
  search: string().optional(),
  teamAssigned: boolean$1().optional()
});
const getGuestRegistrations_createServerFn_handler = createServerRpc("d198db21a0a1500eed6c78a72047d7ecd6043909e43efd92f8297614e5513deb", (opts, signal) => getGuestRegistrations.__executeServer(opts, signal));
const getGuestRegistrations = createServerFn({
  method: "GET"
}).inputValidator((data) => getGuestRegistrationsSchema.parse(data)).handler(getGuestRegistrations_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  let query = db.select({
    registration: guestRegistrations,
    season: seasons,
    team: teams
  }).from(guestRegistrations).leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id)).leftJoin(teams, eq(guestRegistrations.teamId, teams.id)).orderBy(desc(guestRegistrations.createdAt));
  const results = await query;
  let filtered = results;
  if (data.seasonId) {
    filtered = filtered.filter((r) => r.registration.seasonId === data.seasonId);
  }
  if (data.status) {
    filtered = filtered.filter((r) => r.registration.status === data.status);
  }
  if (data.ageGroup) {
    filtered = filtered.filter((r) => r.registration.ageGroup === data.ageGroup);
  }
  if (data.teamAssigned !== void 0) {
    if (data.teamAssigned) {
      filtered = filtered.filter((r) => r.registration.teamId !== null);
    } else {
      filtered = filtered.filter((r) => r.registration.teamId === null);
    }
  }
  if (data.search) {
    const search = data.search.toLowerCase();
    filtered = filtered.filter((r) => r.registration.playerFirstName.toLowerCase().includes(search) || r.registration.playerLastName.toLowerCase().includes(search) || r.registration.parentEmail.toLowerCase().includes(search) || r.registration.parentFirstName.toLowerCase().includes(search) || r.registration.parentLastName.toLowerCase().includes(search) || r.registration.confirmationNumber.toLowerCase().includes(search));
  }
  return filtered;
});
const getRegistrationDetailsSchema = object({
  id: string().uuid()
});
const getRegistrationDetails_createServerFn_handler = createServerRpc("a924a6f799a2fdb290b6a26fcedc6b8b6489e5503a6925a593673737aa19ab64", (opts, signal) => getRegistrationDetails.__executeServer(opts, signal));
const getRegistrationDetails = createServerFn({
  method: "GET"
}).inputValidator((data) => getRegistrationDetailsSchema.parse(data)).handler(getRegistrationDetails_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [result] = await db.select({
    registration: guestRegistrations,
    season: seasons,
    team: teams
  }).from(guestRegistrations).leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id)).leftJoin(teams, eq(guestRegistrations.teamId, teams.id)).where(eq(guestRegistrations.id, data.id)).limit(1);
  if (!result) {
    throw new Error("Registration not found");
  }
  return result;
});
const createGuestRegistrationSchema = object({
  // Player
  playerFirstName: string().min(1),
  playerLastName: string().min(1),
  playerDateOfBirth: string(),
  playerGender: _enum(["male", "female"]),
  // Parent
  parentFirstName: string().min(1),
  parentLastName: string().min(1),
  parentEmail: string().email(),
  parentPhone: string().min(1),
  parentAddress: string().min(1),
  parentCity: string().min(1),
  parentState: string().min(1),
  parentZipCode: string().min(1),
  // Secondary Guardian (optional)
  guardian2FirstName: string().optional(),
  guardian2LastName: string().optional(),
  guardian2Email: string().optional(),
  guardian2Phone: string().optional(),
  guardian2Relationship: string().optional(),
  // Emergency Contacts
  emergency1Name: string().min(1),
  emergency1Phone: string().min(1),
  emergency1Relationship: string().min(1),
  emergency2Name: string().optional(),
  emergency2Phone: string().optional(),
  emergency2Relationship: string().optional(),
  // Medical
  allergies: string().optional(),
  medicalConditions: string().optional(),
  medications: string().optional(),
  insuranceProvider: string().optional(),
  insurancePolicyNumber: string().optional(),
  physicianName: string().optional(),
  physicianPhone: string().optional(),
  // Season
  seasonId: string().uuid(),
  // Waivers
  electronicSignature: string().min(1),
  waiverAccepted: boolean$1(),
  photoReleaseAccepted: boolean$1(),
  codeOfConductAccepted: boolean$1()
});
const createGuestRegistration_createServerFn_handler = createServerRpc("30a806273d2e668febecc6bd9b370aa8d049365051bd0c6ab870b25412322dbb", (opts, signal) => createGuestRegistration.__executeServer(opts, signal));
const createGuestRegistration = createServerFn({
  method: "POST"
}).inputValidator((data) => createGuestRegistrationSchema.parse(data)).handler(createGuestRegistration_createServerFn_handler, async ({
  data
}) => {
  const [season] = await db.select().from(seasons).where(eq(seasons.id, data.seasonId)).limit(1);
  if (!season) {
    throw new Error("Season not found");
  }
  const now = /* @__PURE__ */ new Date();
  const regOpen = new Date(season.registrationOpenDate);
  const regClose = new Date(season.registrationCloseDate);
  if (now < regOpen) {
    throw new Error("Registration has not opened yet");
  }
  if (now > regClose) {
    throw new Error("Registration has closed");
  }
  const ageGroup = calculateAgeGroup(data.playerDateOfBirth, season.startDate);
  const confirmationNumber = generateConfirmationNumber();
  const [registration] = await db.insert(guestRegistrations).values({
    ...data,
    ageGroup,
    confirmationNumber,
    amount: season.registrationFee,
    status: "pending_payment",
    paymentStatus: "pending",
    signedAt: /* @__PURE__ */ new Date()
  }).returning();
  return registration;
});
const updateRegistrationSchema = object({
  id: string().uuid(),
  status: string().optional(),
  paymentStatus: string().optional(),
  teamId: string().uuid().optional().nullable(),
  notes: string().optional()
});
const updateRegistration_createServerFn_handler = createServerRpc("65bffc39668db5a3e4d72a6d363bebcab178a90aadbd455b2e82b8d3d15e5ed7", (opts, signal) => updateRegistration.__executeServer(opts, signal));
const updateRegistration = createServerFn({
  method: "POST"
}).inputValidator((data) => updateRegistrationSchema.parse(data)).handler(updateRegistration_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const {
    id,
    ...updateData
  } = data;
  const [updated] = await db.update(guestRegistrations).set({
    ...updateData,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(guestRegistrations.id, id)).returning();
  if (!updated) {
    throw new Error("Registration not found");
  }
  return updated;
});
const assignToTeamSchema = object({
  registrationId: string().uuid(),
  teamId: string().uuid().nullable()
});
const assignToTeam_createServerFn_handler = createServerRpc("bfdb014bee0de1bc86c3be29868515e29ed24ab4eedf65cd4cf49e6f8221f607", (opts, signal) => assignToTeam.__executeServer(opts, signal));
const assignToTeam = createServerFn({
  method: "POST"
}).inputValidator((data) => assignToTeamSchema.parse(data)).handler(assignToTeam_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [updated] = await db.update(guestRegistrations).set({
    teamId: data.teamId,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(guestRegistrations.id, data.registrationId)).returning();
  if (!updated) {
    throw new Error("Registration not found");
  }
  return updated;
});
const bulkAssignToTeamSchema = object({
  registrationIds: array(string().uuid()),
  teamId: string().uuid()
});
const bulkAssignToTeam_createServerFn_handler = createServerRpc("685a905ef235c5c141fa88be0a792133ddcd4350ccd5a9fcdb91bff4f3ded2f9", (opts, signal) => bulkAssignToTeam.__executeServer(opts, signal));
const bulkAssignToTeam = createServerFn({
  method: "POST"
}).inputValidator((data) => bulkAssignToTeamSchema.parse(data)).handler(bulkAssignToTeam_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const updated = await Promise.all(data.registrationIds.map(async (id) => {
    const [result] = await db.update(guestRegistrations).set({
      teamId: data.teamId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(guestRegistrations.id, id)).returning();
    return result;
  }));
  return {
    count: updated.length
  };
});
const exportCsvSchema = object({
  seasonId: string().uuid().optional(),
  format: _enum(["standard", "gotsoccer"]).optional()
});
const exportRegistrationsCsv_createServerFn_handler = createServerRpc("e6a1f8f625631561a046edf6952e4cfdc79c36ffb98ebf93025d400f8ee150a2", (opts, signal) => exportRegistrationsCsv.__executeServer(opts, signal));
const exportRegistrationsCsv = createServerFn({
  method: "POST"
}).inputValidator((data) => exportCsvSchema.parse(data)).handler(exportRegistrationsCsv_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  let query = db.select({
    registration: guestRegistrations,
    season: seasons,
    team: teams
  }).from(guestRegistrations).leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id)).leftJoin(teams, eq(guestRegistrations.teamId, teams.id)).where(eq(guestRegistrations.paymentStatus, "paid")).orderBy(guestRegistrations.playerLastName);
  let results = await query;
  if (data.seasonId) {
    results = results.filter((r) => r.registration.seasonId === data.seasonId);
  }
  const headers = ["Confirmation #", "Player First Name", "Player Last Name", "Date of Birth", "Gender", "Age Group", "Team", "Parent First Name", "Parent Last Name", "Parent Email", "Parent Phone", "Address", "City", "State", "Zip", "Emergency Contact 1", "Emergency Phone 1", "Emergency Contact 2", "Emergency Phone 2", "Allergies", "Medical Conditions", "Insurance Provider", "Insurance Policy #", "Season", "Registration Date", "Payment Status", "Amount Paid"];
  const rows = results.map((r) => [r.registration.confirmationNumber, r.registration.playerFirstName, r.registration.playerLastName, r.registration.playerDateOfBirth, r.registration.playerGender, r.registration.ageGroup || "", r.team?.name || "Unassigned", r.registration.parentFirstName, r.registration.parentLastName, r.registration.parentEmail, r.registration.parentPhone, r.registration.parentAddress, r.registration.parentCity, r.registration.parentState, r.registration.parentZipCode, r.registration.emergency1Name, r.registration.emergency1Phone, r.registration.emergency2Name || "", r.registration.emergency2Phone || "", r.registration.allergies || "", r.registration.medicalConditions || "", r.registration.insuranceProvider || "", r.registration.insurancePolicyNumber || "", r.season?.name || "", new Date(r.registration.createdAt).toLocaleDateString(), r.registration.paymentStatus, r.registration.amount]);
  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  return {
    csv: csvContent,
    filename: `registrations_${data.seasonId || "all"}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`,
    count: results.length
  };
});
const getCrmStats_createServerFn_handler = createServerRpc("1b2c3386e869ed4101287bcd7c3790c400e306edd7db5c921c3a9d4189e47541", (opts, signal) => getCrmStats.__executeServer(opts, signal));
const getCrmStats = createServerFn({
  method: "GET"
}).handler(getCrmStats_createServerFn_handler, async () => {
  await requireAdmin();
  const all = await db.select().from(guestRegistrations);
  const allSeasons = await db.select().from(seasons);
  const activeSeason = allSeasons.find((s) => s.isActive);
  const activeSeasonId = activeSeason?.id;
  const seasonRegistrations = activeSeasonId ? all.filter((r) => r.seasonId === activeSeasonId) : all;
  const totalRegistrations = seasonRegistrations.length;
  const paidRegistrations = seasonRegistrations.filter((r) => r.paymentStatus === "paid").length;
  const pendingRegistrations = seasonRegistrations.filter((r) => r.paymentStatus === "pending").length;
  const totalRevenue = seasonRegistrations.filter((r) => r.paymentStatus === "paid").reduce((sum, r) => sum + parseFloat(r.amount), 0);
  const assignedToTeam = seasonRegistrations.filter((r) => r.teamId !== null).length;
  const unassigned = seasonRegistrations.filter((r) => r.teamId === null && r.paymentStatus === "paid").length;
  const ageGroups = {};
  seasonRegistrations.filter((r) => r.paymentStatus === "paid").forEach((r) => {
    const ag = r.ageGroup || "Unknown";
    ageGroups[ag] = (ageGroups[ag] || 0) + 1;
  });
  return {
    totalRegistrations,
    paidRegistrations,
    pendingRegistrations,
    totalRevenue,
    assignedToTeam,
    unassigned,
    ageGroups,
    activeSeason: activeSeason?.name || null
  };
});
const getTeamsForAssignmentSchema = object({
  seasonId: string().uuid(),
  ageGroup: string().optional()
});
const getTeamsForAssignment_createServerFn_handler = createServerRpc("be48564cd96d7dd4fcc89c0dd0b22122768659e19494527e90d1abdfe6b48ab9", (opts, signal) => getTeamsForAssignment.__executeServer(opts, signal));
const getTeamsForAssignment = createServerFn({
  method: "GET"
}).inputValidator((data) => getTeamsForAssignmentSchema.parse(data)).handler(getTeamsForAssignment_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  let teamsData = await db.select().from(teams).where(eq(teams.seasonId, data.seasonId)).orderBy(teams.ageGroup, teams.name);
  if (data.ageGroup) {
    teamsData = teamsData.filter((t) => t.ageGroup === data.ageGroup);
  }
  return teamsData;
});
export {
  assignToTeam_createServerFn_handler,
  bulkAssignToTeam_createServerFn_handler,
  createGuestRegistration_createServerFn_handler,
  exportRegistrationsCsv_createServerFn_handler,
  getCrmStats_createServerFn_handler,
  getGuestRegistrations_createServerFn_handler,
  getRegistrationDetails_createServerFn_handler,
  getTeamsForAssignment_createServerFn_handler,
  updateRegistration_createServerFn_handler
};
