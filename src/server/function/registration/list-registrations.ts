import { createServerFn } from '@tanstack/react-start';
import { db, registrations, players, seasons } from '~/db';
import { eq } from 'drizzle-orm';
import { requireAuth } from '~/lib/auth/middleware';

export const listRegistrations = createServerFn({ method: 'GET' }).handler(
  async ({ context }) => {
    // Get authenticated user
    const session = await requireAuth({ context });

    // Get all registrations for the user with player and season data
    const userRegistrations = await db
      .select({
        registration: registrations,
        player: players,
        season: seasons,
      })
      .from(registrations)
      .innerJoin(players, eq(registrations.playerId, players.id))
      .innerJoin(seasons, eq(registrations.seasonId, seasons.id))
      .where(eq(registrations.parentUserId, session.user.id))
      .orderBy(registrations.createdAt);

    return userRegistrations;
  },
);
