import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { players } from '~/db/schema/players.schema';
import { eq } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';

export const getPlayers = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userPlayers = await db
    .select()
    .from(players)
    .where(eq(players.parentUserId, session.user.id))
    .orderBy(players.createdAt);

  return userPlayers;
});
