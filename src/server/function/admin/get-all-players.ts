import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { players } from '~/db/schema/players.schema';
import { users } from '~/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

export const getAllPlayers = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allPlayers = await db
    .select({
      player: players,
      parent: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(players)
    .innerJoin(users, eq(players.parentUserId, users.id))
    .orderBy(players.lastName, players.firstName);

  return allPlayers;
});
