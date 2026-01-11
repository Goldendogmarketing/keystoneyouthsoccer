import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { t as teams, a as teamRoster } from "./teams.schema-COiQqDMX.mjs";
import { r as requireAdmin } from "./middleware-BXaiHw3P.mjs";
import { c as count } from "./aggregate-BaXeGeea.mjs";
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
const getAllTeams_createServerFn_handler = createServerRpc("8fbb7096f990d5418855f64a3d9d7c96343bcd980ce4927b67042572606f64de", (opts, signal) => getAllTeams.__executeServer(opts, signal));
const getAllTeams = createServerFn({
  method: "GET"
}).handler(getAllTeams_createServerFn_handler, async () => {
  await requireAdmin();
  const allTeams = await db.select().from(teams).orderBy(teams.name);
  const teamsWithCounts = await Promise.all(allTeams.map(async (team) => {
    const [rosterCount] = await db.select({
      count: count()
    }).from(teamRoster).where(eq(teamRoster.teamId, team.id));
    return {
      ...team,
      rosterCount: rosterCount?.count || 0
    };
  }));
  return teamsWithCounts;
});
export {
  getAllTeams_createServerFn_handler
};
