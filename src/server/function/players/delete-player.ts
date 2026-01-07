import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { players } from '~/db/schema/players.schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';
import { z } from 'zod';

const deletePlayerSchema = z.object({
  id: z.string(),
});

export const deletePlayer = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deletePlayerSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const [deletedPlayer] = await db
      .delete(players)
      .where(and(eq(players.id, data.id), eq(players.parentUserId, session.user.id)))
      .returning();

    if (!deletedPlayer) {
      throw new Error('Player not found or unauthorized');
    }

    return { success: true };
  });
