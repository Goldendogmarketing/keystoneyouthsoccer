import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq, Y as or } from "./db-COtzJr4P.mjs";
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
const getDashboardPayments_createServerFn_handler = createServerRpc("202b93ba162f52067a1349aa56b6ff90af509ee6d2432830b5f17a120817708f", (opts, signal) => getDashboardPayments.__executeServer(opts, signal));
const getDashboardPayments = createServerFn({
  method: "GET"
}).handler(getDashboardPayments_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const payments = await db.select({
    id: registrations.id,
    amount: registrations.amount,
    paymentStatus: registrations.paymentStatus,
    paymentIntentId: registrations.paymentIntentId,
    createdAt: registrations.createdAt,
    player: {
      firstName: players.firstName,
      lastName: players.lastName
    },
    season: {
      name: seasons.name
    }
  }).from(registrations).innerJoin(players, eq(registrations.playerId, players.id)).innerJoin(seasons, eq(registrations.seasonId, seasons.id)).where(eq(players.parentUserId, session.user.id), or(eq(registrations.paymentStatus, "paid"), eq(registrations.paymentStatus, "pending_payment"))).orderBy(registrations.createdAt);
  return payments;
});
export {
  getDashboardPayments_createServerFn_handler
};
