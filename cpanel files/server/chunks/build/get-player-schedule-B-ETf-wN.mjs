import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq, B as gte } from "./db-COtzJr4P.mjs";
import { s as schedules } from "./schedules.schema-tGM50Roh.mjs";
import { t as teams, a as teamRoster } from "./teams.schema-COiQqDMX.mjs";
import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { g as getSession } from "./middleware-BXaiHw3P.mjs";
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
const getPlayerSchedule_createServerFn_handler = createServerRpc("a721d45d6d185a17bada63139cac8fe3b646365e6fad3dbd2a07af3e4906f41a", (opts, signal) => getPlayerSchedule.__executeServer(opts, signal));
const getPlayerSchedule = createServerFn({
  method: "GET"
}).handler(getPlayerSchedule_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const userSchedule = await db.select({
    schedule: schedules,
    team: {
      id: teams.id,
      name: teams.name,
      ageGroup: teams.ageGroup
    },
    player: {
      id: players.id,
      firstName: players.firstName,
      lastName: players.lastName
    }
  }).from(schedules).innerJoin(teams, eq(schedules.teamId, teams.id)).innerJoin(teamRoster, eq(teams.id, teamRoster.teamId)).innerJoin(players, eq(teamRoster.playerId, players.id)).where(eq(players.parentUserId, session.user.id)).where(gte(schedules.gameDate, (/* @__PURE__ */ new Date()).toISOString())).orderBy(schedules.gameDate);
  return userSchedule;
});
export {
  getPlayerSchedule_createServerFn_handler
};
