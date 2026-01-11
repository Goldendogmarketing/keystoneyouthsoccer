import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq, B as gte } from "./db-COtzJr4P.mjs";
import { r as registrations } from "./registrations.schema-HrLjAyw2.mjs";
import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
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
const getAdminStats_createServerFn_handler = createServerRpc("803b5106941e8bcd09627784f4f3d57113ddc4dbeb194503db7a2db04c3f4bd6", (opts, signal) => getAdminStats.__executeServer(opts, signal));
const getAdminStats = createServerFn({
  method: "GET"
}).handler(getAdminStats_createServerFn_handler, async () => {
  await requireAdmin();
  const [totalRegistrations] = await db.select({
    count: count()
  }).from(registrations);
  const [totalPlayers] = await db.select({
    count: count()
  }).from(players);
  const [totalUsers] = await db.select({
    count: count()
  }).from(users);
  const [totalTeams] = await db.select({
    count: count()
  }).from(teams);
  const [pendingPayments] = await db.select({
    count: count()
  }).from(registrations).where(eq(registrations.paymentStatus, "pending_payment"));
  const [paidRegistrations] = await db.select({
    count: count()
  }).from(registrations).where(eq(registrations.paymentStatus, "paid"));
  const sevenDaysAgo = /* @__PURE__ */ new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [recentRegistrations] = await db.select({
    count: count()
  }).from(registrations).where(gte(registrations.createdAt, sevenDaysAgo.toISOString()));
  const allPaidRegistrations = await db.select({
    amount: registrations.amount
  }).from(registrations).where(eq(registrations.paymentStatus, "paid"));
  const totalRevenue = allPaidRegistrations.reduce((sum, reg) => sum + parseFloat(reg.amount), 0);
  return {
    totalRegistrations: totalRegistrations?.count || 0,
    totalPlayers: totalPlayers?.count || 0,
    totalUsers: totalUsers?.count || 0,
    totalTeams: totalTeams?.count || 0,
    pendingPayments: pendingPayments?.count || 0,
    paidRegistrations: paidRegistrations?.count || 0,
    recentRegistrations: recentRegistrations?.count || 0,
    totalRevenue
  };
});
export {
  getAdminStats_createServerFn_handler
};
