import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { events } from '~/db/schema/events.schema';
import { teams } from '~/db/schema/teams.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq, desc, and, gte, lte, or, inArray, isNull } from 'drizzle-orm';
import { requireAdmin, getSession } from '~/lib/auth/middleware';

// Get all events
export const getEvents = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db.select().from(events).orderBy(desc(events.date));

  return result;
});

// Get events with filters
const getFilteredEventsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  teamId: z.string().uuid().optional(),
  ageGroup: z.string().optional(),
  seasonId: z.string().uuid().optional(),
  type: z.enum(['game', 'practice', 'event', 'meeting', 'tournament', 'all']).optional(),
  includeCancelled: z.boolean().optional(),
});

export const getFilteredEvents = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getFilteredEventsSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const conditions: ReturnType<typeof eq>[] = [];

    // Date range filter
    if (data.startDate) {
      conditions.push(gte(events.date, new Date(data.startDate)));
    }
    if (data.endDate) {
      conditions.push(lte(events.date, new Date(data.endDate)));
    }

    // Team filter - match either home or away team
    if (data.teamId) {
      conditions.push(or(eq(events.teamId, data.teamId), eq(events.awayTeamId, data.teamId))!);
    }

    // Age group / division filter
    if (data.ageGroup) {
      conditions.push(eq(events.ageGroup, data.ageGroup));
    }

    // Season filter
    if (data.seasonId) {
      conditions.push(eq(events.seasonId, data.seasonId));
    }

    // Event type filter
    if (data.type && data.type !== 'all') {
      conditions.push(eq(events.type, data.type));
    }

    // Cancelled filter
    if (!data.includeCancelled) {
      conditions.push(eq(events.isCancelled, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db.select().from(events).where(whereClause).orderBy(events.date);

    return result;
  });

// Get events for a date range
const getEventsByDateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const getEventsByDateRange = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getEventsByDateRangeSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    const result = await db
      .select()
      .from(events)
      .where(and(gte(events.date, start), lte(events.date, end)))
      .orderBy(events.date);

    return result;
  });

// Get upcoming events (public)
export const getUpcomingEvents = createServerFn({ method: 'GET' }).handler(async () => {
  const now = new Date();

  const result = await db
    .select()
    .from(events)
    .where(and(gte(events.date, now), eq(events.isCancelled, false)))
    .orderBy(events.date)
    .limit(10);

  return result;
});

// Get events by team (for team schedule view)
const getEventsByTeamSchema = z.object({
  teamId: z.string().uuid(),
  includeAway: z.boolean().optional(),
});

export const getEventsByTeam = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getEventsByTeamSchema.parse(data))
  .handler(async ({ data }) => {
    const teamCondition = data.includeAway
      ? or(eq(events.teamId, data.teamId), eq(events.awayTeamId, data.teamId))
      : eq(events.teamId, data.teamId);

    const result = await db
      .select()
      .from(events)
      .where(and(teamCondition!, eq(events.isCancelled, false)))
      .orderBy(events.date);

    return result;
  });

// Get events by age group / division
const getEventsByAgeGroupSchema = z.object({
  ageGroup: z.string(),
  seasonId: z.string().uuid().optional(),
});

export const getEventsByAgeGroup = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getEventsByAgeGroupSchema.parse(data))
  .handler(async ({ data }) => {
    const conditions = [eq(events.ageGroup, data.ageGroup), eq(events.isCancelled, false)];

    if (data.seasonId) {
      conditions.push(eq(events.seasonId, data.seasonId));
    }

    const result = await db
      .select()
      .from(events)
      .where(and(...conditions))
      .orderBy(events.date);

    return result;
  });

// Get all available age groups (for filter dropdown)
export const getAvailableAgeGroups = createServerFn({ method: 'GET' }).handler(async () => {
  // Get unique age groups from teams
  const teamAgeGroups = await db
    .selectDistinct({ ageGroup: teams.ageGroup })
    .from(teams)
    .where(teams.ageGroup);

  // Standard age groups
  const standardAgeGroups = ['U6', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18'];

  // Merge and dedupe
  const fromTeams = teamAgeGroups.map((t) => t.ageGroup).filter(Boolean);
  const allGroups = [...new Set([...standardAgeGroups, ...fromTeams])];

  // Sort by age number
  return allGroups.sort((a, b) => {
    const numA = parseInt(a.replace('U', ''));
    const numB = parseInt(b.replace('U', ''));
    return numA - numB;
  });
});

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['game', 'practice', 'event', 'meeting', 'tournament']),
  date: z.string(), // ISO date string
  endDate: z.string().optional(),
  time: z.string().min(1),
  location: z.string().min(1),
  teamId: z.string().uuid().optional(),
  teamName: z.string().optional(),
  awayTeamId: z.string().uuid().optional(),
  awayTeamName: z.string().optional(),
  opponent: z.string().optional(),
  ageGroup: z.string().optional(),
  seasonId: z.string().uuid().optional(),
  isAllDay: z.boolean().optional(),
});

export const createEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createEventSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    const [event] = await db
      .insert(events)
      .values({
        title: data.title,
        description: data.description || null,
        type: data.type,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
        time: data.time,
        location: data.location,
        teamId: data.teamId || null,
        teamName: data.teamName || null,
        awayTeamId: data.awayTeamId || null,
        awayTeamName: data.awayTeamName || null,
        opponent: data.opponent || null,
        ageGroup: data.ageGroup || null,
        seasonId: data.seasonId || null,
        isAllDay: data.isAllDay || false,
        createdBy: session?.user?.id || null,
      })
      .returning();

    return event;
  });

const updateEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['game', 'practice', 'event', 'meeting', 'tournament']).optional(),
  date: z.string().optional(),
  endDate: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  teamId: z.string().uuid().optional().nullable(),
  teamName: z.string().optional().nullable(),
  awayTeamId: z.string().uuid().optional().nullable(),
  awayTeamName: z.string().optional().nullable(),
  opponent: z.string().optional().nullable(),
  ageGroup: z.string().optional().nullable(),
  seasonId: z.string().uuid().optional().nullable(),
  homeScore: z.number().int().optional().nullable(),
  awayScore: z.number().int().optional().nullable(),
  gameStatus: z.enum(['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled']).optional(),
  isAllDay: z.boolean().optional(),
  isCancelled: z.boolean().optional(),
});

export const updateEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, date, endDate, ...rest } = data;

    const updateData: Record<string, unknown> = { ...rest, updatedAt: new Date() };
    if (date !== undefined) {
      updateData.date = new Date(date);
    }
    if (endDate !== undefined) {
      updateData.endDate = endDate ? new Date(endDate) : null;
    }

    const [updated] = await db.update(events).set(updateData).where(eq(events.id, id)).returning();

    if (!updated) {
      throw new Error('Event not found');
    }

    return updated;
  });

const deleteEventSchema = z.object({
  id: z.string().uuid(),
});

export const deleteEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db.delete(events).where(eq(events.id, data.id)).returning();

    if (!deleted) {
      throw new Error('Event not found');
    }

    return { success: true };
  });

const cancelEventSchema = z.object({
  id: z.string().uuid(),
});

export const cancelEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => cancelEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [updated] = await db
      .update(events)
      .set({ isCancelled: true, updatedAt: new Date() })
      .where(eq(events.id, data.id))
      .returning();

    if (!updated) {
      throw new Error('Event not found');
    }

    return updated;
  });

// ============================================
// Game-specific server functions
// ============================================

// Schedule a game between two teams
const scheduleGameSchema = z.object({
  homeTeamId: z.string().uuid(),
  awayTeamId: z.string().uuid(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  ageGroup: z.string().optional(),
  seasonId: z.string().uuid().optional(),
  description: z.string().optional(),
});

export const scheduleGame = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => scheduleGameSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    // Get team names for display
    const [homeTeam] = await db.select().from(teams).where(eq(teams.id, data.homeTeamId)).limit(1);
    const [awayTeam] = await db.select().from(teams).where(eq(teams.id, data.awayTeamId)).limit(1);

    if (!homeTeam || !awayTeam) {
      throw new Error('One or both teams not found');
    }

    // Auto-detect age group from teams if not provided
    const ageGroup = data.ageGroup || homeTeam.ageGroup || awayTeam.ageGroup;
    const seasonId = data.seasonId || homeTeam.seasonId || awayTeam.seasonId;

    const title = `${homeTeam.name} vs ${awayTeam.name}`;

    const [game] = await db
      .insert(events)
      .values({
        title,
        description: data.description || null,
        type: 'game',
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        teamId: data.homeTeamId,
        teamName: homeTeam.name,
        awayTeamId: data.awayTeamId,
        awayTeamName: awayTeam.name,
        ageGroup: ageGroup || null,
        seasonId: seasonId || null,
        gameStatus: 'scheduled',
        createdBy: session?.user?.id || null,
      })
      .returning();

    return game;
  });

// Update game score
const updateGameScoreSchema = z.object({
  gameId: z.string().uuid(),
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled']).optional(),
});

export const updateGameScore = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateGameScoreSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [game] = await db.select().from(events).where(eq(events.id, data.gameId)).limit(1);

    if (!game) {
      throw new Error('Game not found');
    }

    if (game.type !== 'game') {
      throw new Error('Event is not a game');
    }

    const [updated] = await db
      .update(events)
      .set({
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        gameStatus: data.status || 'completed',
        updatedAt: new Date(),
      })
      .where(eq(events.id, data.gameId))
      .returning();

    return updated;
  });

// Get games for a season/division
const getGamesSchema = z.object({
  seasonId: z.string().uuid().optional(),
  ageGroup: z.string().optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'postponed', 'cancelled', 'all']).optional(),
});

export const getGames = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getGamesSchema.parse(data))
  .handler(async ({ data }) => {
    const conditions = [eq(events.type, 'game')];

    if (data.seasonId) {
      conditions.push(eq(events.seasonId, data.seasonId));
    }

    if (data.ageGroup) {
      conditions.push(eq(events.ageGroup, data.ageGroup));
    }

    if (data.status && data.status !== 'all') {
      conditions.push(eq(events.gameStatus, data.status));
    }

    const result = await db
      .select()
      .from(events)
      .where(and(...conditions))
      .orderBy(events.date);

    return result;
  });

// Bulk schedule games (for generating schedules)
const bulkScheduleGamesSchema = z.object({
  games: z.array(
    z.object({
      homeTeamId: z.string().uuid(),
      awayTeamId: z.string().uuid(),
      date: z.string(),
      time: z.string(),
      location: z.string(),
    })
  ),
  ageGroup: z.string().optional(),
  seasonId: z.string().uuid().optional(),
});

export const bulkScheduleGames = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => bulkScheduleGamesSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    // Get all team info
    const teamIds = [...new Set(data.games.flatMap((g) => [g.homeTeamId, g.awayTeamId]))];
    const allTeams = await db.select().from(teams).where(inArray(teams.id, teamIds));
    const teamMap = new Map(allTeams.map((t) => [t.id, t]));

    const gamesToInsert = data.games.map((game) => {
      const homeTeam = teamMap.get(game.homeTeamId);
      const awayTeam = teamMap.get(game.awayTeamId);

      if (!homeTeam || !awayTeam) {
        throw new Error(`Team not found for game: ${game.homeTeamId} vs ${game.awayTeamId}`);
      }

      const ageGroup = data.ageGroup || homeTeam.ageGroup || awayTeam.ageGroup;
      const seasonId = data.seasonId || homeTeam.seasonId || awayTeam.seasonId;

      return {
        title: `${homeTeam.name} vs ${awayTeam.name}`,
        type: 'game' as const,
        date: new Date(game.date),
        time: game.time,
        location: game.location,
        teamId: game.homeTeamId,
        teamName: homeTeam.name,
        awayTeamId: game.awayTeamId,
        awayTeamName: awayTeam.name,
        ageGroup: ageGroup || null,
        seasonId: seasonId || null,
        gameStatus: 'scheduled' as const,
        createdBy: session?.user?.id || null,
      };
    });

    const inserted = await db.insert(events).values(gamesToInsert).returning();

    return { count: inserted.length, games: inserted };
  });

// Get team standings (wins/losses/ties) for a season/division
const getStandingsSchema = z.object({
  seasonId: z.string().uuid().optional(),
  ageGroup: z.string(),
});

export const getStandings = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getStandingsSchema.parse(data))
  .handler(async ({ data }) => {
    // Get all completed games for this division
    const conditions = [eq(events.type, 'game'), eq(events.ageGroup, data.ageGroup), eq(events.gameStatus, 'completed')];

    if (data.seasonId) {
      conditions.push(eq(events.seasonId, data.seasonId));
    }

    const games = await db
      .select()
      .from(events)
      .where(and(...conditions));

    // Get all teams in this division
    const divisionTeams = await db
      .select()
      .from(teams)
      .where(
        data.seasonId ? and(eq(teams.ageGroup, data.ageGroup), eq(teams.seasonId, data.seasonId)) : eq(teams.ageGroup, data.ageGroup)
      );

    // Calculate standings
    const standings = new Map<
      string,
      {
        teamId: string;
        teamName: string;
        wins: number;
        losses: number;
        ties: number;
        goalsFor: number;
        goalsAgainst: number;
        points: number;
      }
    >();

    // Initialize standings for all teams
    for (const team of divisionTeams) {
      standings.set(team.id, {
        teamId: team.id,
        teamName: team.name,
        wins: 0,
        losses: 0,
        ties: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      });
    }

    // Process each game
    for (const game of games) {
      if (!game.teamId || !game.awayTeamId || game.homeScore === null || game.awayScore === null) {
        continue;
      }

      const homeStats = standings.get(game.teamId);
      const awayStats = standings.get(game.awayTeamId);

      if (homeStats) {
        homeStats.goalsFor += game.homeScore;
        homeStats.goalsAgainst += game.awayScore;
        if (game.homeScore > game.awayScore) {
          homeStats.wins++;
          homeStats.points += 3;
        } else if (game.homeScore < game.awayScore) {
          homeStats.losses++;
        } else {
          homeStats.ties++;
          homeStats.points += 1;
        }
      }

      if (awayStats) {
        awayStats.goalsFor += game.awayScore;
        awayStats.goalsAgainst += game.homeScore;
        if (game.awayScore > game.homeScore) {
          awayStats.wins++;
          awayStats.points += 3;
        } else if (game.awayScore < game.homeScore) {
          awayStats.losses++;
        } else {
          awayStats.ties++;
          awayStats.points += 1;
        }
      }
    }

    // Sort by points (desc), then goal difference (desc), then goals for (desc)
    const sortedStandings = Array.from(standings.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const aDiff = a.goalsFor - a.goalsAgainst;
      const bDiff = b.goalsFor - b.goalsAgainst;
      if (bDiff !== aDiff) return bDiff - aDiff;
      return b.goalsFor - a.goalsFor;
    });

    return sortedStandings;
  });
