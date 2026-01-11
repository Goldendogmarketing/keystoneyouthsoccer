import { c as createServerRpc, a as createServerFn } from "./server.mjs";
import { ax as object, ay as string, aB as _enum, az as db, y as eq, _ as desc, aD as number } from "./db-COtzJr4P.mjs";
import { s as seasons } from "./seasons.schema-C1OD7NZb.mjs";
import { t as teams } from "./teams.schema-COiQqDMX.mjs";
import { g as games } from "./schedules.schema-tGM50Roh.mjs";
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
import "./players.schema-DU3TqpAa.mjs";
const getAllGames_createServerFn_handler = createServerRpc("d127262fe30605b507707ab315c22964386e48315d66fdf846f5877e2752983a", (opts, signal) => getAllGames.__executeServer(opts, signal));
const getAllGames = createServerFn({
  method: "GET"
}).handler(getAllGames_createServerFn_handler, async () => {
  try {
    const gamesList = await db.select({
      id: games.id,
      seasonId: games.seasonId,
      homeTeamId: games.homeTeamId,
      awayTeamId: games.awayTeamId,
      scheduledAt: games.scheduledAt,
      location: games.location,
      field: games.field,
      type: games.type,
      status: games.status,
      homeScore: games.homeScore,
      awayScore: games.awayScore,
      notes: games.notes,
      createdAt: games.createdAt
    }).from(games).orderBy(desc(games.scheduledAt));
    const teamsList = await db.select().from(teams);
    const teamsMap = new Map(teamsList.map((t) => [t.id, t]));
    const seasonsList = await db.select().from(seasons);
    const seasonsMap = new Map(seasonsList.map((s) => [s.id, s]));
    return gamesList.map((game) => ({
      ...game,
      scheduledAt: game.scheduledAt.toISOString(),
      createdAt: game.createdAt.toISOString(),
      homeTeam: game.homeTeamId ? teamsMap.get(game.homeTeamId) : null,
      awayTeam: game.awayTeamId ? teamsMap.get(game.awayTeamId) : null,
      season: game.seasonId ? seasonsMap.get(game.seasonId) : null
    }));
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
});
const getGamesBySeason_createServerFn_handler = createServerRpc("44e6dec7bd934360898697b7ea6abdb4945b02ac37f37af9570e9cbf832e810f", (opts, signal) => getGamesBySeason.__executeServer(opts, signal));
const getGamesBySeason = createServerFn({
  method: "GET"
}).validator(object({
  seasonId: string().uuid()
})).handler(getGamesBySeason_createServerFn_handler, async ({
  data
}) => {
  try {
    const gamesList = await db.select().from(games).where(eq(games.seasonId, data.seasonId)).orderBy(desc(games.scheduledAt));
    const teamsList = await db.select().from(teams).where(eq(teams.seasonId, data.seasonId));
    const teamsMap = new Map(teamsList.map((t) => [t.id, t]));
    return gamesList.map((game) => ({
      ...game,
      scheduledAt: game.scheduledAt.toISOString(),
      createdAt: game.createdAt.toISOString(),
      homeTeam: game.homeTeamId ? teamsMap.get(game.homeTeamId) : null,
      awayTeam: game.awayTeamId ? teamsMap.get(game.awayTeamId) : null
    }));
  } catch (error) {
    console.error("Error fetching games by season:", error);
    return [];
  }
});
const createGame_createServerFn_handler = createServerRpc("cb3f2f87dc758d2edd735e6db3d5d6203bec710091f0976b3e4fcfa19502e0bb", (opts, signal) => createGame.__executeServer(opts, signal));
const createGame = createServerFn({
  method: "POST"
}).validator(object({
  seasonId: string().uuid(),
  homeTeamId: string().uuid().optional(),
  awayTeamId: string().uuid().optional(),
  scheduledAt: string(),
  location: string().min(1),
  field: string().optional(),
  type: _enum(["regular", "playoff", "tournament"]).default("regular"),
  notes: string().optional()
})).handler(createGame_createServerFn_handler, async ({
  data
}) => {
  try {
    const [newGame] = await db.insert(games).values({
      seasonId: data.seasonId,
      homeTeamId: data.homeTeamId || null,
      awayTeamId: data.awayTeamId || null,
      scheduledAt: new Date(data.scheduledAt),
      location: data.location,
      field: data.field || null,
      type: data.type,
      notes: data.notes || null
    }).returning();
    return {
      success: true,
      game: newGame
    };
  } catch (error) {
    console.error("Error creating game:", error);
    return {
      success: false,
      error: "Failed to create game"
    };
  }
});
const updateGame_createServerFn_handler = createServerRpc("6f164556ea0eb95de9349fd13f53dd3cf0cf0b73b0efee06323e2e3944f6abe2", (opts, signal) => updateGame.__executeServer(opts, signal));
const updateGame = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid(),
  homeTeamId: string().uuid().optional().nullable(),
  awayTeamId: string().uuid().optional().nullable(),
  scheduledAt: string().optional(),
  location: string().min(1).optional(),
  field: string().optional().nullable(),
  type: _enum(["regular", "playoff", "tournament"]).optional(),
  status: _enum(["scheduled", "in_progress", "completed", "cancelled"]).optional(),
  homeScore: number().int().min(0).optional().nullable(),
  awayScore: number().int().min(0).optional().nullable(),
  notes: string().optional().nullable()
})).handler(updateGame_createServerFn_handler, async ({
  data
}) => {
  try {
    const updateData = {};
    if (data.homeTeamId !== void 0) updateData.homeTeamId = data.homeTeamId;
    if (data.awayTeamId !== void 0) updateData.awayTeamId = data.awayTeamId;
    if (data.scheduledAt) updateData.scheduledAt = new Date(data.scheduledAt);
    if (data.location) updateData.location = data.location;
    if (data.field !== void 0) updateData.field = data.field;
    if (data.type) updateData.type = data.type;
    if (data.status) updateData.status = data.status;
    if (data.homeScore !== void 0) updateData.homeScore = data.homeScore;
    if (data.awayScore !== void 0) updateData.awayScore = data.awayScore;
    if (data.notes !== void 0) updateData.notes = data.notes;
    const [updatedGame] = await db.update(games).set(updateData).where(eq(games.id, data.id)).returning();
    return {
      success: true,
      game: updatedGame
    };
  } catch (error) {
    console.error("Error updating game:", error);
    return {
      success: false,
      error: "Failed to update game"
    };
  }
});
const deleteGame_createServerFn_handler = createServerRpc("4d0dd3b55c37e2c19fd04f18d02e7d93f74c488492993379d71453764dc35cd2", (opts, signal) => deleteGame.__executeServer(opts, signal));
const deleteGame = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid()
})).handler(deleteGame_createServerFn_handler, async ({
  data
}) => {
  try {
    await db.delete(games).where(eq(games.id, data.id));
    return {
      success: true
    };
  } catch (error) {
    console.error("Error deleting game:", error);
    return {
      success: false,
      error: "Failed to delete game"
    };
  }
});
const updateGameScore_createServerFn_handler = createServerRpc("f825f33c417f2f95f632fe4486ae3ceb1009ccb33180041b974a4aec9f5028ea", (opts, signal) => updateGameScore.__executeServer(opts, signal));
const updateGameScore = createServerFn({
  method: "POST"
}).validator(object({
  id: string().uuid(),
  homeScore: number().int().min(0),
  awayScore: number().int().min(0),
  status: _enum(["scheduled", "in_progress", "completed", "cancelled"]).default("completed")
})).handler(updateGameScore_createServerFn_handler, async ({
  data
}) => {
  try {
    const [updatedGame] = await db.update(games).set({
      homeScore: data.homeScore,
      awayScore: data.awayScore,
      status: data.status
    }).where(eq(games.id, data.id)).returning();
    return {
      success: true,
      game: updatedGame
    };
  } catch (error) {
    console.error("Error updating game score:", error);
    return {
      success: false,
      error: "Failed to update game score"
    };
  }
});
export {
  createGame_createServerFn_handler,
  deleteGame_createServerFn_handler,
  getAllGames_createServerFn_handler,
  getGamesBySeason_createServerFn_handler,
  updateGameScore_createServerFn_handler,
  updateGame_createServerFn_handler
};
