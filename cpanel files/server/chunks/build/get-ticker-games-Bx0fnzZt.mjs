import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, v as and, y as eq, B as gte, K as lte, F as inArray } from "./db-COtzJr4P.mjs";
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
import "./seasons.schema-C1OD7NZb.mjs";
import "./users.schema-CUS3FIEB.mjs";
import "./players.schema-DU3TqpAa.mjs";
const getTickerGames_createServerFn_handler = createServerRpc("6daffac9f9b4a709c0170d9d88c5602c14256abbc549af82a8331ac1f923d9fe", (opts, signal) => getTickerGames.__executeServer(opts, signal));
const getTickerGames = createServerFn({
  method: "GET"
}).handler(getTickerGames_createServerFn_handler, async () => {
  try {
    const now = /* @__PURE__ */ new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1e3);
    const sevenDaysAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
    const recentGames = await db.select().from(games).where(and(eq(games.status, "completed"), gte(games.scheduledAt, threeDaysAgo), lte(games.scheduledAt, now))).limit(10);
    const upcomingGamesList = await db.select().from(games).where(and(eq(games.status, "scheduled"), gte(games.scheduledAt, now), lte(games.scheduledAt, sevenDaysAhead))).limit(10);
    const teamIds = [...recentGames.map((g) => g.homeTeamId).filter(Boolean), ...recentGames.map((g) => g.awayTeamId).filter(Boolean), ...upcomingGamesList.map((g) => g.homeTeamId).filter(Boolean), ...upcomingGamesList.map((g) => g.awayTeamId).filter(Boolean)].filter((id, index, self) => self.indexOf(id) === index);
    const teamsMap = /* @__PURE__ */ new Map();
    if (teamIds.length > 0) {
      const teamsList = await db.select().from(teams).where(inArray(teams.id, teamIds));
      teamsList.forEach((team) => {
        teamsMap.set(team.id, team);
      });
    }
    const tickerItems = [...recentGames.map((game) => ({
      id: game.id,
      type: "result",
      homeTeam: teamsMap.get(game.homeTeamId)?.name || "TBD",
      awayTeam: teamsMap.get(game.awayTeamId)?.name || "TBD",
      homeScore: game.homeScore,
      awayScore: game.awayScore
    })), ...upcomingGamesList.map((game) => {
      const scheduledDate = game.scheduledAt instanceof Date ? game.scheduledAt : new Date(game.scheduledAt);
      return {
        id: game.id,
        type: "upcoming",
        homeTeam: teamsMap.get(game.homeTeamId)?.name || "TBD",
        awayTeam: teamsMap.get(game.awayTeamId)?.name || "TBD",
        time: scheduledDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }),
        location: game.location
      };
    })];
    return tickerItems;
  } catch (error) {
    console.error("Error fetching ticker games:", error);
    return [];
  }
});
export {
  getTickerGames_createServerFn_handler
};
