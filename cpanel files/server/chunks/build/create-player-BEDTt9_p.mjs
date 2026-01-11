import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { ax as object, az as db, aC as array, ay as string, aB as _enum } from "./db-COtzJr4P.mjs";
import { p as players, g as guardians, e as emergencyContacts } from "./players.schema-DU3TqpAa.mjs";
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
const createPlayerSchema = object({
  firstName: string().min(2),
  lastName: string().min(2),
  dateOfBirth: string().min(1),
  gender: _enum(["male", "female"]),
  photoUrl: string().optional(),
  guardians: array(object({
    firstName: string().min(2),
    lastName: string().min(2),
    email: string().email(),
    phone: string().min(10),
    relationship: string().min(1),
    address: string().min(5),
    city: string().min(2),
    state: string().length(2),
    zipCode: string().min(5)
  })).min(1).max(2),
  emergencyContacts: array(object({
    firstName: string().min(2),
    lastName: string().min(2),
    phone: string().min(10),
    relationship: string().min(1)
  })).min(1).max(2)
});
const createPlayer_createServerFn_handler = createServerRpc("90df1dfd59e8e91808cd03f42d0903675614a82e723cc7887622af93f4100380", (opts, signal) => createPlayer.__executeServer(opts, signal));
const createPlayer = createServerFn({
  method: "POST"
}).inputValidator((data) => createPlayerSchema.parse(data)).handler(createPlayer_createServerFn_handler, async ({
  data
}) => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const [player] = await db.insert(players).values({
    parentUserId: session.user.id,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    photoUrl: data.photoUrl
  }).returning();
  if (data.guardians.length > 0) {
    await db.insert(guardians).values(data.guardians.map((guardian, index) => ({
      playerId: player.id,
      firstName: guardian.firstName,
      lastName: guardian.lastName,
      email: guardian.email,
      phone: guardian.phone,
      relationship: guardian.relationship,
      address: guardian.address,
      city: guardian.city,
      state: guardian.state,
      zipCode: guardian.zipCode,
      isPrimary: index === 0
    })));
  }
  if (data.emergencyContacts.length > 0) {
    await db.insert(emergencyContacts).values(data.emergencyContacts.map((contact, index) => ({
      playerId: player.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      relationship: contact.relationship,
      isPrimary: index === 0
    })));
  }
  return player;
});
export {
  createPlayer_createServerFn_handler
};
