import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';

export const getDashboardRegistrations = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userRegistrations = await db
    .select({
      registration: registrations,
      player: {
        id: players.id,
        firstName: players.firstName,
        lastName: players.lastName,
      },
      season: {
        name: seasons.name,
      },
    })
    .from(registrations)
    .innerJoin(players, eq(registrations.playerId, players.id))
    .innerJoin(seasons, eq(registrations.seasonId, seasons.id))
    .where(eq(players.parentUserId, session.user.id))
    .orderBy(registrations.createdAt);

  return userRegistrations;
});
