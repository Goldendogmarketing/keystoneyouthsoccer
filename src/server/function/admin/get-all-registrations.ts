import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { users } from '~/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

export const getAllRegistrations = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allRegistrations = await db
    .select({
      registration: registrations,
      player: {
        id: players.id,
        firstName: players.firstName,
        lastName: players.lastName,
        dateOfBirth: players.dateOfBirth,
        gender: players.gender,
      },
      season: {
        id: seasons.id,
        name: seasons.name,
      },
      parent: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(registrations)
    .innerJoin(players, eq(registrations.playerId, players.id))
    .innerJoin(seasons, eq(registrations.seasonId, seasons.id))
    .innerJoin(users, eq(players.parentUserId, users.id))
    .orderBy(registrations.createdAt);

  return allRegistrations;
});
