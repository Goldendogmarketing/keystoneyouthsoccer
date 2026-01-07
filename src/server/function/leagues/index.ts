import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { seasons } from '~/db/schema/seasons.schema';
import { teams, teamRoster } from '~/db/schema/teams.schema';
import { eq, desc, sql } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

// Get all seasons (leagues) with team and player counts
export const getLeagues = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allSeasons = await db.select().from(seasons).orderBy(desc(seasons.startDate));

  // Get team counts per season
  const teamsData = await db.select().from(teams);

  // Get player counts per team
  const rosterData = await db.select().from(teamRoster);

  // Calculate counts for each season
  const seasonsWithCounts = allSeasons.map((season) => {
    const seasonTeams = teamsData.filter((t) => t.seasonId === season.id);
    const teamIds = seasonTeams.map((t) => t.id);
    const playerCount = rosterData.filter((r) => teamIds.includes(r.teamId)).length;

    // Group teams by age group to get "divisions"
    const divisions = seasonTeams.reduce(
      (acc, team) => {
        if (!acc[team.ageGroup]) {
          acc[team.ageGroup] = { ageGroup: team.ageGroup, teamCount: 0 };
        }
        acc[team.ageGroup].teamCount++;
        return acc;
      },
      {} as Record<string, { ageGroup: string; teamCount: number }>
    );

    return {
      ...season,
      teamCount: seasonTeams.length,
      playerCount,
      divisions: Object.values(divisions).sort((a, b) => {
        // Sort by age group number (U6, U8, U10, etc.)
        const aNum = parseInt(a.ageGroup.replace('U', '')) || 0;
        const bNum = parseInt(b.ageGroup.replace('U', '')) || 0;
        return aNum - bNum;
      }),
    };
  });

  return seasonsWithCounts;
});

// Get teams for a specific season
const getTeamsBySeasonSchema = z.object({
  seasonId: z.string().uuid(),
});

export const getTeamsBySeason = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getTeamsBySeasonSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const teamsData = await db
      .select()
      .from(teams)
      .where(eq(teams.seasonId, data.seasonId))
      .orderBy(teams.ageGroup, teams.name);

    return teamsData;
  });

const createLeagueSchema = z.object({
  name: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  registrationOpenDate: z.string(),
  registrationCloseDate: z.string(),
  registrationFee: z.string(),
  description: z.string().optional(),
  ageGroups: z.string().optional(), // JSON string
});

export const createLeague = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createLeagueSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [league] = await db
      .insert(seasons)
      .values({
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationOpenDate: data.registrationOpenDate,
        registrationCloseDate: data.registrationCloseDate,
        registrationFee: data.registrationFee,
        description: data.description || null,
        ageGroups: data.ageGroups || null,
        isActive: false,
      })
      .returning();

    return league;
  });

const updateLeagueSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  registrationOpenDate: z.string().optional(),
  registrationCloseDate: z.string().optional(),
  registrationFee: z.string().optional(),
  description: z.string().optional(),
  ageGroups: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateLeague = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateLeagueSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, ...updateData } = data;

    const [updated] = await db.update(seasons).set(updateData).where(eq(seasons.id, id)).returning();

    if (!updated) {
      throw new Error('League not found');
    }

    return updated;
  });

const deleteLeagueSchema = z.object({
  id: z.string().uuid(),
});

export const deleteLeague = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteLeagueSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db.delete(seasons).where(eq(seasons.id, data.id)).returning();

    if (!deleted) {
      throw new Error('League not found');
    }

    return { success: true };
  });

const toggleLeagueActiveSchema = z.object({
  id: z.string().uuid(),
});

export const toggleLeagueActive = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => toggleLeagueActiveSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Get current state
    const [current] = await db.select().from(seasons).where(eq(seasons.id, data.id)).limit(1);

    if (!current) {
      throw new Error('League not found');
    }

    // Toggle
    const [updated] = await db
      .update(seasons)
      .set({ isActive: !current.isActive })
      .where(eq(seasons.id, data.id))
      .returning();

    return updated;
  });

// Create a team in a season
const createTeamSchema = z.object({
  name: z.string().min(1),
  seasonId: z.string().uuid(),
  ageGroup: z.string().min(1),
  description: z.string().optional(),
});

export const createTeam = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createTeamSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [team] = await db
      .insert(teams)
      .values({
        name: data.name,
        seasonId: data.seasonId,
        ageGroup: data.ageGroup,
        description: data.description || null,
      })
      .returning();

    return team;
  });
