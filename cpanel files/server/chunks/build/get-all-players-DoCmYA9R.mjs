import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
import { p as players } from "./players.schema-DU3TqpAa.mjs";
import { users } from "./users.schema-CUS3FIEB.mjs";
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
const getAllPlayers_createServerFn_handler = createServerRpc("cf6b519c28a7185c535ef2ecc880f9acdf3283dc72c040a449a8f6e9ee918fcd", (opts, signal) => getAllPlayers.__executeServer(opts, signal));
const getAllPlayers = createServerFn({
  method: "GET"
}).handler(getAllPlayers_createServerFn_handler, async () => {
  await requireAdmin();
  const allPlayers = await db.select({
    player: players,
    parent: {
      id: users.id,
      name: users.name,
      email: users.email
    }
  }).from(players).innerJoin(users, eq(players.parentUserId, users.id)).orderBy(players.lastName, players.firstName);
  return allPlayers;
});
export {
  getAllPlayers_createServerFn_handler
};
