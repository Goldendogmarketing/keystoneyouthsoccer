import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { teams, teamRoster, coaches } from '~/db/schema/teams.schema';
import { players } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { users } from '~/db/schema/users.schema';
import { eq, desc, and, inArray, sql } from 'drizzle-orm';
import { requireAdmin, getSession } from '~/lib/auth/middleware';

// Get all teams
export const getTeams = createServerFn({ method: 'GET' }).handler(async () => {
  const result = await db
    .select({
      id: teams.id,
      name: teams.name,
      seasonId: teams.seasonId,
      ageGroup: teams.ageGroup,
      coachId: teams.coachId,
      photoUrl: teams.photoUrl,
      isChampion: teams.isChampion,
      championYear: teams.championYear,
      description: teams.description,
      createdAt: teams.createdAt,
    })
    .from(teams)
    .orderBy(teams.ageGroup, teams.name);

  return result;
});

// Get teams with roster counts
export const getTeamsWithCounts = createServerFn({ method: 'GET' }).handler(async () => {
  const teamsData = await db.select().from(teams).orderBy(teams.ageGroup, teams.name);

  // Get roster counts for each team
  const rosterCounts = await db
    .select({
      teamId: teamRoster.teamId,
      count: sql<number>`count(*)::int`,
    })
    .from(teamRoster)
    .groupBy(teamRoster.teamId);

  const countMap = new Map(rosterCounts.map((r) => [r.teamId, r.count]));

  return teamsData.map((team) => ({
    ...team,
    rosterCount: countMap.get(team.id) || 0,
  }));
});

// Get teams by season
const getTeamsBySeasonSchema = z.object({
  seasonId: z.string().uuid(),
});

export const getTeamsBySeason = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getTeamsBySeasonSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await db
      .select()
      .from(teams)
      .where(eq(teams.seasonId, data.seasonId))
      .orderBy(teams.ageGroup, teams.name);

    return result;
  });

// Get teams by age group
const getTeamsByAgeGroupSchema = z.object({
  ageGroup: z.string(),
  seasonId: z.string().uuid().optional(),
});

export const getTeamsByAgeGroup = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getTeamsByAgeGroupSchema.parse(data))
  .handler(async ({ data }) => {
    const conditions = [eq(teams.ageGroup, data.ageGroup)];

    if (data.seasonId) {
      conditions.push(eq(teams.seasonId, data.seasonId));
    }

    const result = await db
      .select()
      .from(teams)
      .where(and(...conditions))
      .orderBy(teams.name);

    return result;
  });

// Get single team with details
const getTeamSchema = z.object({
  teamId: z.string().uuid(),
});

export const getTeam = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getTeamSchema.parse(data))
  .handler(async ({ data }) => {
    const [team] = await db.select().from(teams).where(eq(teams.id, data.teamId)).limit(1);

    if (!team) {
      throw new Error('Team not found');
    }

    // Get season info
    const [season] = team.seasonId
      ? await db.select().from(seasons).where(eq(seasons.id, team.seasonId)).limit(1)
      : [null];

    // Get coach info
    const [coach] = team.coachId ? await db.select().from(users).where(eq(users.id, team.coachId)).limit(1) : [null];

    // Get roster
    const roster = await db
      .select({
        id: teamRoster.id,
        playerId: teamRoster.playerId,
        jerseyNumber: teamRoster.jerseyNumber,
        position: teamRoster.position,
        joinedAt: teamRoster.joinedAt,
        player: {
          id: players.id,
          firstName: players.firstName,
          lastName: players.lastName,
          dateOfBirth: players.dateOfBirth,
          gender: players.gender,
        },
      })
      .from(teamRoster)
      .innerJoin(players, eq(teamRoster.playerId, players.id))
      .where(eq(teamRoster.teamId, data.teamId))
      .orderBy(players.lastName, players.firstName);

    return {
      ...team,
      season,
      coach: coach ? { id: coach.id, name: coach.name, email: coach.email } : null,
      roster,
    };
  });

// Create team
const createTeamSchema = z.object({
  name: z.string().min(1),
  seasonId: z.string().uuid(),
  ageGroup: z.string(),
  coachId: z.string().uuid().optional(),
  description: z.string().optional(),
  photoUrl: z.string().url().optional(),
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
        coachId: data.coachId || null,
        description: data.description || null,
        photoUrl: data.photoUrl || null,
      })
      .returning();

    return team;
  });

// Update team
const updateTeamSchema = z.object({
  teamId: z.string().uuid(),
  name: z.string().min(1).optional(),
  ageGroup: z.string().optional(),
  coachId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  photoUrl: z.string().url().optional().nullable(),
  isChampion: z.boolean().optional(),
  championYear: z.number().int().optional().nullable(),
});

export const updateTeam = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateTeamSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { teamId, ...updateData } = data;

    const [updated] = await db.update(teams).set(updateData).where(eq(teams.id, teamId)).returning();

    if (!updated) {
      throw new Error('Team not found');
    }

    return updated;
  });

// Delete team
const deleteTeamSchema = z.object({
  teamId: z.string().uuid(),
});

export const deleteTeam = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteTeamSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // This will cascade delete roster entries due to foreign key constraint
    const [deleted] = await db.delete(teams).where(eq(teams.id, data.teamId)).returning();

    if (!deleted) {
      throw new Error('Team not found');
    }

    return { success: true };
  });

// ============================================
// Roster management
// ============================================

// Add player to team roster
const addPlayerToRosterSchema = z.object({
  teamId: z.string().uuid(),
  playerId: z.string().uuid(),
  jerseyNumber: z.number().int().optional(),
  position: z.string().optional(),
});

export const addPlayerToRoster = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => addPlayerToRosterSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Check if player is already on this team
    const existing = await db
      .select()
      .from(teamRoster)
      .where(and(eq(teamRoster.teamId, data.teamId), eq(teamRoster.playerId, data.playerId)))
      .limit(1);

    if (existing.length > 0) {
      throw new Error('Player is already on this team');
    }

    const [entry] = await db
      .insert(teamRoster)
      .values({
        teamId: data.teamId,
        playerId: data.playerId,
        jerseyNumber: data.jerseyNumber || null,
        position: data.position || null,
      })
      .returning();

    return entry;
  });

// Remove player from team roster
const removePlayerFromRosterSchema = z.object({
  teamId: z.string().uuid(),
  playerId: z.string().uuid(),
});

export const removePlayerFromRoster = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => removePlayerFromRosterSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db
      .delete(teamRoster)
      .where(and(eq(teamRoster.teamId, data.teamId), eq(teamRoster.playerId, data.playerId)))
      .returning();

    if (!deleted) {
      throw new Error('Player not found on team roster');
    }

    return { success: true };
  });

// Update roster entry (jersey number, position)
const updateRosterEntrySchema = z.object({
  teamId: z.string().uuid(),
  playerId: z.string().uuid(),
  jerseyNumber: z.number().int().optional().nullable(),
  position: z.string().optional().nullable(),
});

export const updateRosterEntry = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateRosterEntrySchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { teamId, playerId, ...updateData } = data;

    const [updated] = await db
      .update(teamRoster)
      .set(updateData)
      .where(and(eq(teamRoster.teamId, teamId), eq(teamRoster.playerId, playerId)))
      .returning();

    if (!updated) {
      throw new Error('Roster entry not found');
    }

    return updated;
  });

// Bulk add players to team
const bulkAddPlayersToRosterSchema = z.object({
  teamId: z.string().uuid(),
  playerIds: z.array(z.string().uuid()),
});

export const bulkAddPlayersToRoster = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => bulkAddPlayersToRosterSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Get existing roster entries
    const existing = await db.select().from(teamRoster).where(eq(teamRoster.teamId, data.teamId));

    const existingPlayerIds = new Set(existing.map((e) => e.playerId));
    const newPlayerIds = data.playerIds.filter((id) => !existingPlayerIds.has(id));

    if (newPlayerIds.length === 0) {
      return { added: 0, skipped: data.playerIds.length };
    }

    const entries = newPlayerIds.map((playerId) => ({
      teamId: data.teamId,
      playerId,
    }));

    await db.insert(teamRoster).values(entries);

    return { added: newPlayerIds.length, skipped: data.playerIds.length - newPlayerIds.length };
  });

// Get available players (not on any team in this season)
const getAvailablePlayersSchema = z.object({
  seasonId: z.string().uuid(),
  ageGroup: z.string().optional(),
});

export const getAvailablePlayers = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getAvailablePlayersSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Get all teams in this season
    const seasonTeams = await db.select({ id: teams.id }).from(teams).where(eq(teams.seasonId, data.seasonId));

    const teamIds = seasonTeams.map((t) => t.id);

    // Get all players currently on teams in this season
    const assignedPlayers =
      teamIds.length > 0 ? await db.select({ playerId: teamRoster.playerId }).from(teamRoster).where(inArray(teamRoster.teamId, teamIds)) : [];

    const assignedPlayerIds = new Set(assignedPlayers.map((p) => p.playerId));

    // Get all players
    const allPlayers = await db.select().from(players).orderBy(players.lastName, players.firstName);

    // Filter to unassigned players
    const availablePlayers = allPlayers.filter((p) => !assignedPlayerIds.has(p.id));

    // Optionally filter by age group (would need to calculate based on DOB)
    // For now, return all unassigned players
    return availablePlayers;
  });

// ============================================
// Coach management
// ============================================

// Get available coaches
export const getAvailableCoaches = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const coachUsers = await db.select().from(users).where(eq(users.role, 'coach')).orderBy(users.name);

  return coachUsers;
});

// Assign coach to team
const assignCoachSchema = z.object({
  teamId: z.string().uuid(),
  coachId: z.string().uuid(),
});

export const assignCoach = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => assignCoachSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [updated] = await db.update(teams).set({ coachId: data.coachId }).where(eq(teams.id, data.teamId)).returning();

    if (!updated) {
      throw new Error('Team not found');
    }

    return updated;
  });

// Remove coach from team
const removeCoachSchema = z.object({
  teamId: z.string().uuid(),
});

export const removeCoach = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => removeCoachSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [updated] = await db.update(teams).set({ coachId: null }).where(eq(teams.id, data.teamId)).returning();

    if (!updated) {
      throw new Error('Team not found');
    }

    return updated;
  });

// ============================================
// Stats and helpers
// ============================================

// Get team stats summary
export const getTeamStats = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allTeams = await db.select().from(teams);

  // Group by age group
  const byAgeGroup = allTeams.reduce(
    (acc, team) => {
      const group = team.ageGroup || 'Unknown';
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get total roster count
  const rosterCount = await db.select({ count: sql<number>`count(*)::int` }).from(teamRoster);

  return {
    totalTeams: allTeams.length,
    byAgeGroup,
    totalPlayersAssigned: rosterCount[0]?.count || 0,
  };
});
