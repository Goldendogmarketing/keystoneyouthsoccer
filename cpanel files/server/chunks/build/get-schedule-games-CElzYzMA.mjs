import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { g as games } from "./schedules.schema-tGM50Roh.mjs";
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
const TEAM_COLORS = [
  "#3B82F6",
  // Blue
  "#EF4444",
  // Red
  "#10B981",
  // Green
  "#F59E0B",
  // Amber
  "#8B5CF6",
  // Purple
  "#EC4899",
  // Pink
  "#06B6D4",
  // Cyan
  "#F97316",
  // Orange
  "#6366F1",
  // Indigo
  "#84CC16",
  // Lime
  "#14B8A6",
  // Teal
  "#A855F7"
  // Violet
];
const getScheduleGames_createServerFn_handler = createServerRpc("1f58016084030aaf026c40fb370b68de1276598da27814922740992da993655c", (opts, signal) => getScheduleGames.__executeServer(opts, signal));
const getScheduleGames = createServerFn({
  method: "GET"
}).handler(getScheduleGames_createServerFn_handler, async () => {
  try {
    const [activeSeason] = await db.select().from(seasons).where(eq(seasons.isActive, true)).limit(1);
    if (!activeSeason) {
      return {
        leagues: [],
        season: null
      };
    }
    const teamsList = await db.select().from(teams).where(eq(teams.seasonId, activeSeason.id));
    const teamsByAgeGroup = /* @__PURE__ */ new Map();
    const teamColorMap = /* @__PURE__ */ new Map();
    teamsList.forEach((team) => {
      if (!teamsByAgeGroup.has(team.ageGroup)) {
        teamsByAgeGroup.set(team.ageGroup, []);
      }
      teamsByAgeGroup.get(team.ageGroup).push(team);
    });
    teamsByAgeGroup.forEach((teamsInGroup) => {
      teamsInGroup.forEach((team, index) => {
        teamColorMap.set(team.id, TEAM_COLORS[index % TEAM_COLORS.length]);
      });
    });
    const gamesList = await db.select().from(games).where(eq(games.seasonId, activeSeason.id));
    const leagues = [];
    const ageGroups = ["U6", "U8", "U10", "12U", "15U", "High School"];
    ageGroups.forEach((ageGroup) => {
      const teamsInLeague = teamsList.filter((t) => t.ageGroup === ageGroup);
      if (teamsInLeague.length === 0) return;
      const teamIds = teamsInLeague.map((t) => t.id);
      const leagueGames = gamesList.filter((g) => g.homeTeamId && teamIds.includes(g.homeTeamId) || g.awayTeamId && teamIds.includes(g.awayTeamId));
      const formattedGames = leagueGames.map((game) => {
        const homeTeam = teamsList.find((t) => t.id === game.homeTeamId);
        const awayTeam = teamsList.find((t) => t.id === game.awayTeamId);
        return {
          id: game.id,
          homeTeam: homeTeam ? {
            id: homeTeam.id,
            name: homeTeam.name,
            color: teamColorMap.get(homeTeam.id) || "#6B7280"
          } : null,
          awayTeam: awayTeam ? {
            id: awayTeam.id,
            name: awayTeam.name,
            color: teamColorMap.get(awayTeam.id) || "#6B7280"
          } : null,
          scheduledAt: game.scheduledAt.toISOString(),
          location: game.location,
          field: game.field,
          type: game.type || "regular",
          status: game.status || "scheduled",
          homeScore: game.homeScore,
          awayScore: game.awayScore
        };
      });
      leagues.push({
        ageGroup,
        teams: teamsInLeague.map((t) => ({
          id: t.id,
          name: t.name,
          color: teamColorMap.get(t.id) || "#6B7280"
        })),
        games: formattedGames.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      });
    });
    return {
      leagues,
      season: {
        id: activeSeason.id,
        name: activeSeason.name,
        startDate: activeSeason.startDate,
        endDate: activeSeason.endDate
      }
    };
  } catch (error) {
    console.error("Error fetching schedule games:", error);
    return {
      leagues: [],
      season: null
    };
  }
});
export {
  getScheduleGames_createServerFn_handler
};
