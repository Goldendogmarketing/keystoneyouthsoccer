import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { az as db, y as eq } from "./db-COtzJr4P.mjs";
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
import "./users.schema-CUS3FIEB.mjs";
const getPlayers_createServerFn_handler = createServerRpc("28e52e52c279cab55987489b3a1d4381b712869b124bd35357c40bb8dfc4a7d2", (opts, signal) => getPlayers.__executeServer(opts, signal));
const getPlayers = createServerFn({
  method: "GET"
}).handler(getPlayers_createServerFn_handler, async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const userPlayers = await db.select().from(players).where(eq(players.parentUserId, session.user.id)).orderBy(players.createdAt);
  return userPlayers;
});
export {
  getPlayers_createServerFn_handler
};
