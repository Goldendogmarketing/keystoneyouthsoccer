import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { r as registrations } from "./registrations.schema-HrLjAyw2.mjs";
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
import "./players.schema-DU3TqpAa.mjs";
import "./users.schema-CUS3FIEB.mjs";
const getAllSeasons_createServerFn_handler = createServerRpc("ed35cc5e8fb46c34de706ed51a1b995a3afa7b4485ed6edad19d4626e2fc69dc", (opts, signal) => getAllSeasons.__executeServer(opts, signal));
const getAllSeasons = createServerFn({
  method: "GET"
}).handler(getAllSeasons_createServerFn_handler, async () => {
  await requireAdmin();
  const allSeasons = await db.select().from(seasons).orderBy(seasons.startDate);
  const seasonsWithCounts = await Promise.all(allSeasons.map(async (season) => {
    const [registrationCount] = await db.select({
      count: count()
    }).from(registrations).where(eq(registrations.seasonId, season.id));
    return {
      ...season,
      registrationCount: registrationCount?.count || 0
    };
  }));
  return seasonsWithCounts;
});
export {
  getAllSeasons_createServerFn_handler
};
