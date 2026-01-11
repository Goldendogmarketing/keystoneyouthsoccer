import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { r as registrations } from "./registrations.schema-HrLjAyw2.mjs";
import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { g as getSession } from "./middleware-BXaiHw3P.mjs";
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
const getDashboardOverview_createServerFn_handler = createServerRpc("b5546efabdcf52d9cb1b19bd6fda7c334c93222a76e46fbd1dcda86daaaa6b5f", (opts, signal) => getDashboardOverview.__executeServer(opts, signal));
const getDashboardOverview = createServerFn({
  method: "GET"
}).handler(getDashboardOverview_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [playerCount] = await db.select({
    count: count()
  }).from(players).where(eq(players.parentUserId, session.user.id));
  const [activeRegistrationCount] = await db.select({
    count: count()
  }).from(registrations).innerJoin(players, eq(registrations.playerId, players.id)).where(eq(players.parentUserId, session.user.id)).where(eq(registrations.status, "paid"));
  const [pendingPaymentCount] = await db.select({
    count: count()
  }).from(registrations).innerJoin(players, eq(registrations.playerId, players.id)).where(eq(players.parentUserId, session.user.id)).where(eq(registrations.paymentStatus, "pending_payment"));
  return {
    totalPlayers: playerCount?.count || 0,
    activeRegistrations: activeRegistrationCount?.count || 0,
    pendingPayments: pendingPaymentCount?.count || 0
  };
});
export {
  getDashboardOverview_createServerFn_handler
};
