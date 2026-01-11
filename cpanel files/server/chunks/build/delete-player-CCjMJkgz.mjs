import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { ax as object, az as db, v as and, y as eq, ay as string } from "./db-COtzJr4P.mjs";
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
const deletePlayerSchema = object({
  id: string()
});
const deletePlayer_createServerFn_handler = createServerRpc("4a4165c588a98d64015758a27896f41b9eb12cb679d09739c91fdd181e1ca5f7", (opts, signal) => deletePlayer.__executeServer(opts, signal));
const deletePlayer = createServerFn({
  method: "POST"
}).inputValidator((data) => deletePlayerSchema.parse(data)).handler(deletePlayer_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [deletedPlayer] = await db.delete(players).where(and(eq(players.id, data.id), eq(players.parentUserId, session.user.id))).returning();
  if (!deletedPlayer) {
    throw new Error("Player not found or unauthorized");
  }
  return {
    success: true
  };
});
export {
  deletePlayer_createServerFn_handler
};
