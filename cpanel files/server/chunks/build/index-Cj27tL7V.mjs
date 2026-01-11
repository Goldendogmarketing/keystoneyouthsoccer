import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { ax as object, az as db, y as eq, _ as desc, ay as string, aA as boolean$1 } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { t as teams, a as teamRoster } from "./teams.schema-COiQqDMX.mjs";
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
import "./users.schema-CUS3FIEB.mjs";
import "./players.schema-DU3TqpAa.mjs";
const getLeagues_createServerFn_handler = createServerRpc("dce4e780b2d1b0961e60e11de28fa3be666e03cba86c73885e404864978c6fd4", (opts, signal) => getLeagues.__executeServer(opts, signal));
const getLeagues = createServerFn({
  method: "GET"
}).handler(getLeagues_createServerFn_handler, async () => {
  await requireAdmin();
  const allSeasons = await db.select().from(seasons).orderBy(desc(seasons.startDate));
  const teamsData = await db.select().from(teams);
  const rosterData = await db.select().from(teamRoster);
  const seasonsWithCounts = allSeasons.map((season) => {
    const seasonTeams = teamsData.filter((t) => t.seasonId === season.id);
    const teamIds = seasonTeams.map((t) => t.id);
    const playerCount = rosterData.filter((r) => teamIds.includes(r.teamId)).length;
    const divisions = seasonTeams.reduce((acc, team) => {
      if (!acc[team.ageGroup]) {
        acc[team.ageGroup] = {
          ageGroup: team.ageGroup,
          teamCount: 0
        };
      }
      acc[team.ageGroup].teamCount++;
      return acc;
    }, {});
    return {
      ...season,
      teamCount: seasonTeams.length,
      playerCount,
      divisions: Object.values(divisions).sort((a, b) => {
        const aNum = parseInt(a.ageGroup.replace("U", "")) || 0;
        const bNum = parseInt(b.ageGroup.replace("U", "")) || 0;
        return aNum - bNum;
      })
    };
  });
  return seasonsWithCounts;
});
const getTeamsBySeasonSchema = object({
  seasonId: string().uuid()
});
const getTeamsBySeason_createServerFn_handler = createServerRpc("885d1d22f9753ba40273a8a260f178e9393a031e8108d13d72ab33b84a546f26", (opts, signal) => getTeamsBySeason.__executeServer(opts, signal));
const getTeamsBySeason = createServerFn({
  method: "GET"
}).inputValidator((data) => getTeamsBySeasonSchema.parse(data)).handler(getTeamsBySeason_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const teamsData = await db.select().from(teams).where(eq(teams.seasonId, data.seasonId)).orderBy(teams.ageGroup, teams.name);
  return teamsData;
});
const createLeagueSchema = object({
  name: string().min(1),
  startDate: string(),
  endDate: string(),
  registrationOpenDate: string(),
  registrationCloseDate: string(),
  registrationFee: string(),
  description: string().optional(),
  ageGroups: string().optional()
  // JSON string
});
const createLeague_createServerFn_handler = createServerRpc("cb444d590d3990c578021458c43590a68fcd6c064c672043dd06185c179c7d75", (opts, signal) => createLeague.__executeServer(opts, signal));
const createLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => createLeagueSchema.parse(data)).handler(createLeague_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [league] = await db.insert(seasons).values({
    name: data.name,
    startDate: data.startDate,
    endDate: data.endDate,
    registrationOpenDate: data.registrationOpenDate,
    registrationCloseDate: data.registrationCloseDate,
    registrationFee: data.registrationFee,
    description: data.description || null,
    ageGroups: data.ageGroups || null,
    isActive: false
  }).returning();
  return league;
});
const updateLeagueSchema = object({
  id: string().uuid(),
  name: string().min(1).optional(),
  startDate: string().optional(),
  endDate: string().optional(),
  registrationOpenDate: string().optional(),
  registrationCloseDate: string().optional(),
  registrationFee: string().optional(),
  description: string().optional(),
  ageGroups: string().optional(),
  isActive: boolean$1().optional()
});
const updateLeague_createServerFn_handler = createServerRpc("82ea961d57259ddbe5da0963ed04149971fbb45d20e4c8691e86939ce098557a", (opts, signal) => updateLeague.__executeServer(opts, signal));
const updateLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => updateLeagueSchema.parse(data)).handler(updateLeague_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const {
    id,
    ...updateData
  } = data;
  const [updated] = await db.update(seasons).set(updateData).where(eq(seasons.id, id)).returning();
  if (!updated) {
    throw new Error("League not found");
  }
  return updated;
});
const deleteLeagueSchema = object({
  id: string().uuid()
});
const deleteLeague_createServerFn_handler = createServerRpc("9ac42f0414f55b5dada3cf4ba118347a9f813b4c488fdb9cc40276ffeb9f334d", (opts, signal) => deleteLeague.__executeServer(opts, signal));
const deleteLeague = createServerFn({
  method: "POST"
}).inputValidator((data) => deleteLeagueSchema.parse(data)).handler(deleteLeague_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [deleted] = await db.delete(seasons).where(eq(seasons.id, data.id)).returning();
  if (!deleted) {
    throw new Error("League not found");
  }
  return {
    success: true
  };
});
const toggleLeagueActiveSchema = object({
  id: string().uuid()
});
const toggleLeagueActive_createServerFn_handler = createServerRpc("f636f6348e5bd43fef037bce6bd1a42fe45c226286a1bf703838361283ca22f8", (opts, signal) => toggleLeagueActive.__executeServer(opts, signal));
const toggleLeagueActive = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleLeagueActiveSchema.parse(data)).handler(toggleLeagueActive_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [current] = await db.select().from(seasons).where(eq(seasons.id, data.id)).limit(1);
  if (!current) {
    throw new Error("League not found");
  }
  const [updated] = await db.update(seasons).set({
    isActive: !current.isActive
  }).where(eq(seasons.id, data.id)).returning();
  return updated;
});
const createTeamSchema = object({
  name: string().min(1),
  seasonId: string().uuid(),
  ageGroup: string().min(1),
  description: string().optional()
});
const createTeam_createServerFn_handler = createServerRpc("6ba3fac31ffa5df97b34ab4285fdb89d088156882590f8e0ab52ebe0f7e4adc1", (opts, signal) => createTeam.__executeServer(opts, signal));
const createTeam = createServerFn({
  method: "POST"
}).inputValidator((data) => createTeamSchema.parse(data)).handler(createTeam_createServerFn_handler, async ({
  data
}) => {
  await requireAdmin();
  const [team] = await db.insert(teams).values({
    name: data.name,
    seasonId: data.seasonId,
    ageGroup: data.ageGroup,
    description: data.description || null
  }).returning();
  return team;
});
export {
  createLeague_createServerFn_handler,
  createTeam_createServerFn_handler,
  deleteLeague_createServerFn_handler,
  getLeagues_createServerFn_handler,
  getTeamsBySeason_createServerFn_handler,
  toggleLeagueActive_createServerFn_handler,
  updateLeague_createServerFn_handler
};
