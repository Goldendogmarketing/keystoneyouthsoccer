import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { teams, teamRoster } from '~/db/schema/teams.schema';
import { players } from '~/db/schema/players.schema';
import { eq, count } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

export const getAllTeams = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allTeams = await db.select().from(teams).orderBy(teams.name);

  // Get roster count for each team
  const teamsWithCounts = await Promise.all(
    allTeams.map(async (team) => {
      const [rosterCount] = await db
        .select({ count: count() })
        .from(teamRoster)
        .where(eq(teamRoster.teamId, team.id));

      return {
        ...team,
        rosterCount: rosterCount?.count || 0,
      };
    }),
  );

  return teamsWithCounts;
});
