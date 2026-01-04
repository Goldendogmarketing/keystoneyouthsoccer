import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { schedules } from '~/db/schema/schedules.schema';
import { teams } from '~/db/schema/teams.schema';
import { teamRoster } from '~/db/schema/teams.schema';
import { players } from '~/db/schema/players.schema';
import { eq, gte } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';

export const getPlayerSchedule = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Get all games for teams that the user's players are on
  const userSchedule = await db
    .select({
      schedule: schedules,
      team: {
        id: teams.id,
        name: teams.name,
        ageGroup: teams.ageGroup,
      },
      player: {
        id: players.id,
        firstName: players.firstName,
        lastName: players.lastName,
      },
    })
    .from(schedules)
    .innerJoin(teams, eq(schedules.teamId, teams.id))
    .innerJoin(teamRoster, eq(teams.id, teamRoster.teamId))
    .innerJoin(players, eq(teamRoster.playerId, players.id))
    .where(eq(players.parentUserId, session.user.id))
    .where(gte(schedules.gameDate, new Date().toISOString()))
    .orderBy(schedules.gameDate);

  return userSchedule;
});
