import { createServerFn } from '@tanstack/react-start';
import { db, games, teams, seasons } from '~/db';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';

// Get all games with team details
export const getAllGames = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const gamesList = await db
      .select({
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
        createdAt: games.createdAt,
      })
      .from(games)
      .orderBy(desc(games.scheduledAt));

    // Get all teams for lookup
    const teamsList = await db.select().from(teams);
    const teamsMap = new Map(teamsList.map((t) => [t.id, t]));

    // Get all seasons for lookup
    const seasonsList = await db.select().from(seasons);
    const seasonsMap = new Map(seasonsList.map((s) => [s.id, s]));

    return gamesList.map((game) => ({
      ...game,
      scheduledAt: game.scheduledAt.toISOString(),
      createdAt: game.createdAt.toISOString(),
      homeTeam: game.homeTeamId ? teamsMap.get(game.homeTeamId) : null,
      awayTeam: game.awayTeamId ? teamsMap.get(game.awayTeamId) : null,
      season: game.seasonId ? seasonsMap.get(game.seasonId) : null,
    }));
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
});

// Get games by season
export const getGamesBySeason = createServerFn({ method: 'GET' })
  .validator(z.object({ seasonId: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      const gamesList = await db
        .select()
        .from(games)
        .where(eq(games.seasonId, data.seasonId))
        .orderBy(desc(games.scheduledAt));

      const teamsList = await db
        .select()
        .from(teams)
        .where(eq(teams.seasonId, data.seasonId));
      const teamsMap = new Map(teamsList.map((t) => [t.id, t]));

      return gamesList.map((game) => ({
        ...game,
        scheduledAt: game.scheduledAt.toISOString(),
        createdAt: game.createdAt.toISOString(),
        homeTeam: game.homeTeamId ? teamsMap.get(game.homeTeamId) : null,
        awayTeam: game.awayTeamId ? teamsMap.get(game.awayTeamId) : null,
      }));
    } catch (error) {
      console.error('Error fetching games by season:', error);
      return [];
    }
  });

// Create a new game
export const createGame = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      seasonId: z.string().uuid(),
      homeTeamId: z.string().uuid().optional(),
      awayTeamId: z.string().uuid().optional(),
      scheduledAt: z.string(),
      location: z.string().min(1),
      field: z.string().optional(),
      type: z.enum(['regular', 'playoff', 'tournament']).default('regular'),
      notes: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    try {
      const [newGame] = await db
        .insert(games)
        .values({
          seasonId: data.seasonId,
          homeTeamId: data.homeTeamId || null,
          awayTeamId: data.awayTeamId || null,
          scheduledAt: new Date(data.scheduledAt),
          location: data.location,
          field: data.field || null,
          type: data.type,
          notes: data.notes || null,
        })
        .returning();

      return { success: true, game: newGame };
    } catch (error) {
      console.error('Error creating game:', error);
      return { success: false, error: 'Failed to create game' };
    }
  });

// Update a game
export const updateGame = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      id: z.string().uuid(),
      homeTeamId: z.string().uuid().optional().nullable(),
      awayTeamId: z.string().uuid().optional().nullable(),
      scheduledAt: z.string().optional(),
      location: z.string().min(1).optional(),
      field: z.string().optional().nullable(),
      type: z.enum(['regular', 'playoff', 'tournament']).optional(),
      status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
      homeScore: z.number().int().min(0).optional().nullable(),
      awayScore: z.number().int().min(0).optional().nullable(),
      notes: z.string().optional().nullable(),
    })
  )
  .handler(async ({ data }) => {
    try {
      const updateData: Record<string, unknown> = {};

      if (data.homeTeamId !== undefined) updateData.homeTeamId = data.homeTeamId;
      if (data.awayTeamId !== undefined) updateData.awayTeamId = data.awayTeamId;
      if (data.scheduledAt) updateData.scheduledAt = new Date(data.scheduledAt);
      if (data.location) updateData.location = data.location;
      if (data.field !== undefined) updateData.field = data.field;
      if (data.type) updateData.type = data.type;
      if (data.status) updateData.status = data.status;
      if (data.homeScore !== undefined) updateData.homeScore = data.homeScore;
      if (data.awayScore !== undefined) updateData.awayScore = data.awayScore;
      if (data.notes !== undefined) updateData.notes = data.notes;

      const [updatedGame] = await db
        .update(games)
        .set(updateData)
        .where(eq(games.id, data.id))
        .returning();

      return { success: true, game: updatedGame };
    } catch (error) {
      console.error('Error updating game:', error);
      return { success: false, error: 'Failed to update game' };
    }
  });

// Delete a game
export const deleteGame = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await db.delete(games).where(eq(games.id, data.id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting game:', error);
      return { success: false, error: 'Failed to delete game' };
    }
  });

// Update game score (for completed games)
export const updateGameScore = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      id: z.string().uuid(),
      homeScore: z.number().int().min(0),
      awayScore: z.number().int().min(0),
      status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default('completed'),
    })
  )
  .handler(async ({ data }) => {
    try {
      const [updatedGame] = await db
        .update(games)
        .set({
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          status: data.status,
        })
        .where(eq(games.id, data.id))
        .returning();

      return { success: true, game: updatedGame };
    } catch (error) {
      console.error('Error updating game score:', error);
      return { success: false, error: 'Failed to update game score' };
    }
  });
