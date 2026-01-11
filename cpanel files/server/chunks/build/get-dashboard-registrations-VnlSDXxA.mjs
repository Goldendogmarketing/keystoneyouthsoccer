import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { r as registrations } from "./registrations.schema-HrLjAyw2.mjs";
import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
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
import "./users.schema-CUS3FIEB.mjs";
const getDashboardRegistrations_createServerFn_handler = createServerRpc("f71bc694ce7412b4c9d3457f1a5fb6ed21543db26beddb65c47bdf2c3137546e", (opts, signal) => getDashboardRegistrations.__executeServer(opts, signal));
const getDashboardRegistrations = createServerFn({
  method: "GET"
}).handler(getDashboardRegistrations_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const userRegistrations = await db.select({
    registration: registrations,
    player: {
      id: players.id,
      firstName: players.firstName,
      lastName: players.lastName
    },
    season: {
      name: seasons.name
    }
  }).from(registrations).innerJoin(players, eq(registrations.playerId, players.id)).innerJoin(seasons, eq(registrations.seasonId, seasons.id)).where(eq(players.parentUserId, session.user.id)).orderBy(registrations.createdAt);
  return userRegistrations;
});
export {
  getDashboardRegistrations_createServerFn_handler
};
