import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { aE as pgTable, aF as timestamp, aI as uuid, aJ as boolean, aG as text, aH as integer, ax as object, az as db, F as inArray, y as eq, v as and, K as lte, B as gte, Y as or, _ as desc, ay as string, aC as array, aA as boolean$1, aB as _enum, aD as number } from "./db-COtzJr4P.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
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
import "./players.schema-DU3TqpAa.mjs";
const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: ["game", "practice", "event", "meeting", "tournament"] }).default("event").notNull(),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  time: text("time").notNull(),
  // e.g., "10:00 AM"
  location: text("location").notNull(),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
  teamName: text("team_name"),
  // For display when team is deleted or for non-team events
  awayTeamId: uuid("away_team_id").references(() => teams.id, { onDelete: "set null" }),
  awayTeamName: text("away_team_name"),
  // For games
  opponent: text("opponent"),
  // Legacy field for games
  ageGroup: text("age_group"),
  // e.g., "U6", "U8", "U10", "U12" for division filtering
  seasonId: uuid("season_id").references(() => seasons.id, { onDelete: "set null" }),
  // Game-specific fields
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  gameStatus: text("game_status", { enum: ["scheduled", "in_progress", "completed", "postponed", "cancelled"] }).default("scheduled"),
  isAllDay: boolean("is_all_day").default(false).notNull(),
  isCancelled: boolean("is_cancelled").default(false).notNull(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const getEvents_createServerFn_handler = createServerRpc("7afa32a60154902a081b399d6f42aa61882b431f5759fb1f485d797422d36fee", (opts, signal) => getEvents.__executeServer(opts, signal));
const getEvents = createServerFn({
  method: "GET"
}).handler(getEvents_createServerFn_handler, async () => {
  await requireAdmin();
  const result = await db.select().from(events).orderBy(desc(events.date));
  return result;
});
const getFilteredEventsSchema = object({
  startDate: string().optional(),
  endDate: string().optional(),
  teamId: string().uuid().optional(),
  ageGroup: string().optional(),
  seasonId: string().uuid().optional(),
  type: _enum(["game", "practice", "event", "meeting", "tournament", "all"]).optional(),
  includeCancelled: boolean$1().optional()
});
const getFilteredEvents_createServerFn_handler = createServerRpc("095209b16a801ece1d9215186531ecb430c41617d81bec20e75f6ebf3120812a", (opts, signal) => getFilteredEvents.__executeServer(opts, signal));
const getFilteredEvents = createServerFn({
  method: "GET"
}).inputValidator((data) => getFilteredEventsSchema.parse(data)).handler(getFilteredEvents_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const conditions = [];
  if (data.startDate) {
    conditions.push(gte(events.date, new Date(data.startDate)));
  }
  if (data.endDate) {
    conditions.push(lte(events.date, new Date(data.endDate)));
  }
  if (data.teamId) {
    conditions.push(or(eq(events.teamId, data.teamId), eq(events.awayTeamId, data.teamId)));
  }
  if (data.ageGroup) {
    conditions.push(eq(events.ageGroup, data.ageGroup));
  }
  if (data.seasonId) {
    conditions.push(eq(events.seasonId, data.seasonId));
  }
  if (data.type && data.type !== "all") {
    conditions.push(eq(events.type, data.type));
  }
  if (!data.includeCancelled) {
    conditions.push(eq(events.isCancelled, false));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
  const result = await db.select().from(events).where(whereClause).orderBy(events.date);
  return result;
});
const getEventsByDateRangeSchema = object({
  startDate: string(),
  endDate: string()
});
const getEventsByDateRange_createServerFn_handler = createServerRpc("170ff47465c72d46f1628aee6ed01e804c9016edb69131bdc6e12116ff071c5c", (opts, signal) => getEventsByDateRange.__executeServer(opts, signal));
const getEventsByDateRange = createServerFn({
  method: "GET"
}).inputValidator((data) => getEventsByDateRangeSchema.parse(data)).handler(getEventsByDateRange_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const result = await db.select().from(events).where(and(gte(events.date, start), lte(events.date, end))).orderBy(events.date);
  return result;
});
const getUpcomingEvents_createServerFn_handler = createServerRpc("849572a8c12a2befef998cde22a07731ffdd3021b5088e3d47feb16360dfefe1", (opts, signal) => getUpcomingEvents.__executeServer(opts, signal));
const getUpcomingEvents = createServerFn({
  method: "GET"
}).handler(getUpcomingEvents_createServerFn_handler, async () => {
  const now = /* @__PURE__ */ new Date();
  const result = await db.select().from(events).where(and(gte(events.date, now), eq(events.isCancelled, false))).orderBy(events.date).limit(10);
  return result;
});
const getEventsByTeamSchema = object({
  teamId: string().uuid(),
  includeAway: boolean$1().optional()
});
const getEventsByTeam_createServerFn_handler = createServerRpc("98f9495b995c25e53e3d7d40bf5737a1766ef987c979a20de260b486ee2f82d9", (opts, signal) => getEventsByTeam.__executeServer(opts, signal));
const getEventsByTeam = createServerFn({
  method: "GET"
}).inputValidator((data) => getEventsByTeamSchema.parse(data)).handler(getEventsByTeam_createServerFn_handler, async ({
  data
}) => {
  const teamCondition = data.includeAway ? or(eq(events.teamId, data.teamId), eq(events.awayTeamId, data.teamId)) : eq(events.teamId, data.teamId);
  const result = await db.select().from(events).where(and(teamCondition, eq(events.isCancelled, false))).orderBy(events.date);
  return result;
});
const getEventsByAgeGroupSchema = object({
  ageGroup: string(),
  seasonId: string().uuid().optional()
});
const getEventsByAgeGroup_createServerFn_handler = createServerRpc("89c962d3115f0f032df9303ffc5183f5c452e7ed5173ff6371c89d86428b4358", (opts, signal) => getEventsByAgeGroup.__executeServer(opts, signal));
const getEventsByAgeGroup = createServerFn({
  method: "GET"
}).inputValidator((data) => getEventsByAgeGroupSchema.parse(data)).handler(getEventsByAgeGroup_createServerFn_handler, async ({
  data
}) => {
  const conditions = [eq(events.ageGroup, data.ageGroup), eq(events.isCancelled, false)];
  if (data.seasonId) {
    conditions.push(eq(events.seasonId, data.seasonId));
  }
  const result = await db.select().from(events).where(and(...conditions)).orderBy(events.date);
  return result;
});
const getAvailableAgeGroups_createServerFn_handler = createServerRpc("7be6fda7a70f103c05be9ee0bfcfef6dac27da3706611c352ed975dfcacebe30", (opts, signal) => getAvailableAgeGroups.__executeServer(opts, signal));
const getAvailableAgeGroups = createServerFn({
  method: "GET"
}).handler(getAvailableAgeGroups_createServerFn_handler, async () => {
  const teamAgeGroups = await db.selectDistinct({
    ageGroup: teams.ageGroup
  }).from(teams).where(teams.ageGroup);
  const standardAgeGroups = ["U6", "U8", "U10", "U12", "U14", "U16", "U18"];
  const fromTeams = teamAgeGroups.map((t) => t.ageGroup).filter(Boolean);
  const allGroups = [.../* @__PURE__ */ new Set([...standardAgeGroups, ...fromTeams])];
  return allGroups.sort((a, b) => {
    const numA = parseInt(a.replace("U", ""));
    const numB = parseInt(b.replace("U", ""));
    return numA - numB;
  });
});
const createEventSchema = object({
  title: string().min(1),
  description: string().optional(),
  type: _enum(["game", "practice", "event", "meeting", "tournament"]),
  date: string(),
  // ISO date string
  endDate: string().optional(),
  time: string().min(1),
  location: string().min(1),
  teamId: string().uuid().optional(),
  teamName: string().optional(),
  awayTeamId: string().uuid().optional(),
  awayTeamName: string().optional(),
  opponent: string().optional(),
  ageGroup: string().optional(),
  seasonId: string().uuid().optional(),
  isAllDay: boolean$1().optional()
});
const createEvent_createServerFn_handler = createServerRpc("66aaa9d88c4a26fcfe3912d370aa4cb5deab6906d80390edb04335bc48f8dd20", (opts, signal) => createEvent.__executeServer(opts, signal));
const createEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => createEventSchema.parse(data)).handler(createEvent_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  await requireAdmin();
  const [event] = await db.insert(events).values({
    title: data.title,
    description: data.description || null,
    type: data.type,
    date: new Date(data.date),
    endDate: data.endDate ? new Date(data.endDate) : null,
    time: data.time,
    location: data.location,
    teamId: data.teamId || null,
    teamName: data.teamName || null,
    awayTeamId: data.awayTeamId || null,
    awayTeamName: data.awayTeamName || null,
    opponent: data.opponent || null,
    ageGroup: data.ageGroup || null,
    seasonId: data.seasonId || null,
    isAllDay: data.isAllDay || false,
    createdBy: session?.user?.id || null
  }).returning();
  return event;
});
const updateEventSchema = object({
  id: string().uuid(),
  title: string().min(1).optional(),
  description: string().optional(),
  type: _enum(["game", "practice", "event", "meeting", "tournament"]).optional(),
  date: string().optional(),
  endDate: string().optional(),
  time: string().optional(),
  location: string().optional(),
  teamId: string().uuid().optional().nullable(),
  teamName: string().optional().nullable(),
  awayTeamId: string().uuid().optional().nullable(),
  awayTeamName: string().optional().nullable(),
  opponent: string().optional().nullable(),
  ageGroup: string().optional().nullable(),
  seasonId: string().uuid().optional().nullable(),
  homeScore: number().int().optional().nullable(),
  awayScore: number().int().optional().nullable(),
  gameStatus: _enum(["scheduled", "in_progress", "completed", "postponed", "cancelled"]).optional(),
  isAllDay: boolean$1().optional(),
  isCancelled: boolean$1().optional()
});
const updateEvent_createServerFn_handler = createServerRpc("18fd6edbe5c87a8a12c56bc49b0a7b7b66785cc54cd68da27ae5dd14b583b6b2", (opts, signal) => updateEvent.__executeServer(opts, signal));
const updateEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => updateEventSchema.parse(data)).handler(updateEvent_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const {
    id,
    date,
    endDate,
    ...rest
  } = data;
  const updateData = {
    ...rest,
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (date !== void 0) {
    updateData.date = new Date(date);
  }
  if (endDate !== void 0) {
    updateData.endDate = endDate ? new Date(endDate) : null;
  }
  const [updated] = await db.update(events).set(updateData).where(eq(events.id, id)).returning();
  if (!updated) {
    throw new Error("Event not found");
  }
  return updated;
});
const deleteEventSchema = object({
  id: string().uuid()
});
const deleteEvent_createServerFn_handler = createServerRpc("a575bc33934d99dcf2bf88e6cbe1b950782d145ad0831c3aed6f8fa2addc8bb0", (opts, signal) => deleteEvent.__executeServer(opts, signal));
const deleteEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => deleteEventSchema.parse(data)).handler(deleteEvent_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [deleted] = await db.delete(events).where(eq(events.id, data.id)).returning();
  if (!deleted) {
    throw new Error("Event not found");
  }
  return {
    success: true
  };
});
const cancelEventSchema = object({
  id: string().uuid()
});
const cancelEvent_createServerFn_handler = createServerRpc("455f21b8efd8f72ed120b216764ea1dbfb80707ca5a81bc633e67731d5a3dc20", (opts, signal) => cancelEvent.__executeServer(opts, signal));
const cancelEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => cancelEventSchema.parse(data)).handler(cancelEvent_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [updated] = await db.update(events).set({
    isCancelled: true,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(events.id, data.id)).returning();
  if (!updated) {
    throw new Error("Event not found");
  }
  return updated;
});
const scheduleGameSchema = object({
  homeTeamId: string().uuid(),
  awayTeamId: string().uuid(),
  date: string(),
  time: string(),
  location: string(),
  ageGroup: string().optional(),
  seasonId: string().uuid().optional(),
  description: string().optional()
});
const scheduleGame_createServerFn_handler = createServerRpc("a25c529fcf519ce084acaea6f558da9c1e834d17a17e6ee2175989c396ae64b4", (opts, signal) => scheduleGame.__executeServer(opts, signal));
const scheduleGame = createServerFn({
  method: "POST"
}).inputValidator((data) => scheduleGameSchema.parse(data)).handler(scheduleGame_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  await requireAdmin();
  const [homeTeam] = await db.select().from(teams).where(eq(teams.id, data.homeTeamId)).limit(1);
  const [awayTeam] = await db.select().from(teams).where(eq(teams.id, data.awayTeamId)).limit(1);
  if (!homeTeam || !awayTeam) {
    throw new Error("One or both teams not found");
  }
  const ageGroup = data.ageGroup || homeTeam.ageGroup || awayTeam.ageGroup;
  const seasonId = data.seasonId || homeTeam.seasonId || awayTeam.seasonId;
  const title = `${homeTeam.name} vs ${awayTeam.name}`;
  const [game] = await db.insert(events).values({
    title,
    description: data.description || null,
    type: "game",
    date: new Date(data.date),
    time: data.time,
    location: data.location,
    teamId: data.homeTeamId,
    teamName: homeTeam.name,
    awayTeamId: data.awayTeamId,
    awayTeamName: awayTeam.name,
    ageGroup: ageGroup || null,
    seasonId: seasonId || null,
    gameStatus: "scheduled",
    createdBy: session?.user?.id || null
  }).returning();
  return game;
});
const updateGameScoreSchema = object({
  gameId: string().uuid(),
  homeScore: number().int().min(0),
  awayScore: number().int().min(0),
  status: _enum(["scheduled", "in_progress", "completed", "postponed", "cancelled"]).optional()
});
const updateGameScore_createServerFn_handler = createServerRpc("ffe1ce42ba802b0ff706685c82ca46cbba68bc27453efef781e240db2c21894d", (opts, signal) => updateGameScore.__executeServer(opts, signal));
const updateGameScore = createServerFn({
  method: "POST"
}).inputValidator((data) => updateGameScoreSchema.parse(data)).handler(updateGameScore_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [game] = await db.select().from(events).where(eq(events.id, data.gameId)).limit(1);
  if (!game) {
    throw new Error("Game not found");
  }
  if (game.type !== "game") {
    throw new Error("Event is not a game");
  }
  const [updated] = await db.update(events).set({
    homeScore: data.homeScore,
    awayScore: data.awayScore,
    gameStatus: data.status || "completed",
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(events.id, data.gameId)).returning();
  return updated;
});
const getGamesSchema = object({
  seasonId: string().uuid().optional(),
  ageGroup: string().optional(),
  status: _enum(["scheduled", "in_progress", "completed", "postponed", "cancelled", "all"]).optional()
});
const getGames_createServerFn_handler = createServerRpc("befb000d2430cd0b18db28f1de1435c0b0ea80491c16de8e75f67f071fdfc7af", (opts, signal) => getGames.__executeServer(opts, signal));
const getGames = createServerFn({
  method: "GET"
}).inputValidator((data) => getGamesSchema.parse(data)).handler(getGames_createServerFn_handler, async ({
  data
}) => {
  const conditions = [eq(events.type, "game")];
  if (data.seasonId) {
    conditions.push(eq(events.seasonId, data.seasonId));
  }
  if (data.ageGroup) {
    conditions.push(eq(events.ageGroup, data.ageGroup));
  }
  if (data.status && data.status !== "all") {
    conditions.push(eq(events.gameStatus, data.status));
  }
  const result = await db.select().from(events).where(and(...conditions)).orderBy(events.date);
  return result;
});
const bulkScheduleGamesSchema = object({
  games: array(object({
    homeTeamId: string().uuid(),
    awayTeamId: string().uuid(),
    date: string(),
    time: string(),
    location: string()
  })),
  ageGroup: string().optional(),
  seasonId: string().uuid().optional()
});
const bulkScheduleGames_createServerFn_handler = createServerRpc("a802285cc15b4f5bed1ce9420d7e10f41977cb65d8e2af1a84cf8c625dcc8739", (opts, signal) => bulkScheduleGames.__executeServer(opts, signal));
const bulkScheduleGames = createServerFn({
  method: "POST"
}).inputValidator((data) => bulkScheduleGamesSchema.parse(data)).handler(bulkScheduleGames_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  await requireAdmin();
  const teamIds = [...new Set(data.games.flatMap((g) => [g.homeTeamId, g.awayTeamId]))];
  const allTeams = await db.select().from(teams).where(inArray(teams.id, teamIds));
  const teamMap = new Map(allTeams.map((t) => [t.id, t]));
  const gamesToInsert = data.games.map((game) => {
    const homeTeam = teamMap.get(game.homeTeamId);
    const awayTeam = teamMap.get(game.awayTeamId);
    if (!homeTeam || !awayTeam) {
      throw new Error(`Team not found for game: ${game.homeTeamId} vs ${game.awayTeamId}`);
    }
    const ageGroup = data.ageGroup || homeTeam.ageGroup || awayTeam.ageGroup;
    const seasonId = data.seasonId || homeTeam.seasonId || awayTeam.seasonId;
    return {
      title: `${homeTeam.name} vs ${awayTeam.name}`,
      type: "game",
      date: new Date(game.date),
      time: game.time,
      location: game.location,
      teamId: game.homeTeamId,
      teamName: homeTeam.name,
      awayTeamId: game.awayTeamId,
      awayTeamName: awayTeam.name,
      ageGroup: ageGroup || null,
      seasonId: seasonId || null,
      gameStatus: "scheduled",
      createdBy: session?.user?.id || null
    };
  });
  const inserted = await db.insert(events).values(gamesToInsert).returning();
  return {
    count: inserted.length,
    games: inserted
  };
});
const getStandingsSchema = object({
  seasonId: string().uuid().optional(),
  ageGroup: string()
});
const getStandings_createServerFn_handler = createServerRpc("d7653389330c3b474c9fe2bf049359efa65b845f113e9393cb2a27256afcea5a", (opts, signal) => getStandings.__executeServer(opts, signal));
const getStandings = createServerFn({
  method: "GET"
}).inputValidator((data) => getStandingsSchema.parse(data)).handler(getStandings_createServerFn_handler, async ({
  data
}) => {
  const conditions = [eq(events.type, "game"), eq(events.ageGroup, data.ageGroup), eq(events.gameStatus, "completed")];
  if (data.seasonId) {
    conditions.push(eq(events.seasonId, data.seasonId));
  }
  const games = await db.select().from(events).where(and(...conditions));
  const divisionTeams = await db.select().from(teams).where(data.seasonId ? and(eq(teams.ageGroup, data.ageGroup), eq(teams.seasonId, data.seasonId)) : eq(teams.ageGroup, data.ageGroup));
  const standings = /* @__PURE__ */ new Map();
  for (const team of divisionTeams) {
    standings.set(team.id, {
      teamId: team.id,
      teamName: team.name,
      wins: 0,
      losses: 0,
      ties: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    });
  }
  for (const game of games) {
    if (!game.teamId || !game.awayTeamId || game.homeScore === null || game.awayScore === null) {
      continue;
    }
    const homeStats = standings.get(game.teamId);
    const awayStats = standings.get(game.awayTeamId);
    if (homeStats) {
      homeStats.goalsFor += game.homeScore;
      homeStats.goalsAgainst += game.awayScore;
      if (game.homeScore > game.awayScore) {
        homeStats.wins++;
        homeStats.points += 3;
      } else if (game.homeScore < game.awayScore) {
        homeStats.losses++;
      } else {
        homeStats.ties++;
        homeStats.points += 1;
      }
    }
    if (awayStats) {
      awayStats.goalsFor += game.awayScore;
      awayStats.goalsAgainst += game.homeScore;
      if (game.awayScore > game.homeScore) {
        awayStats.wins++;
        awayStats.points += 3;
      } else if (game.awayScore < game.homeScore) {
        awayStats.losses++;
      } else {
        awayStats.ties++;
        awayStats.points += 1;
      }
    }
  }
  const sortedStandings = Array.from(standings.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const aDiff = a.goalsFor - a.goalsAgainst;
    const bDiff = b.goalsFor - b.goalsAgainst;
    if (bDiff !== aDiff) return bDiff - aDiff;
    return b.goalsFor - a.goalsFor;
  });
  return sortedStandings;
});
export {
  bulkScheduleGames_createServerFn_handler,
  cancelEvent_createServerFn_handler,
  createEvent_createServerFn_handler,
  deleteEvent_createServerFn_handler,
  getAvailableAgeGroups_createServerFn_handler,
  getEventsByAgeGroup_createServerFn_handler,
  getEventsByDateRange_createServerFn_handler,
  getEventsByTeam_createServerFn_handler,
  getEvents_createServerFn_handler,
  getFilteredEvents_createServerFn_handler,
  getGames_createServerFn_handler,
  getStandings_createServerFn_handler,
  getUpcomingEvents_createServerFn_handler,
  scheduleGame_createServerFn_handler,
  updateEvent_createServerFn_handler,
  updateGameScore_createServerFn_handler
};
