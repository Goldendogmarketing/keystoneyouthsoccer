import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { players } from '~/db/schema/players.schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';
import { z } from 'zod';

const updatePlayerSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  dateOfBirth: z.string().min(1).optional(),
  gender: z.enum(['male', 'female']).optional(),
  photoUrl: z.string().optional(),
});

export const updatePlayer = createServerFn({ method: 'POST' })
  .validator((data: unknown) => updatePlayerSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const { id, ...updateData } = data;

    const [updatedPlayer] = await db
      .update(players)
      .set(updateData)
      .where(and(eq(players.id, id), eq(players.parentUserId, session.user.id)))
      .returning();

    if (!updatedPlayer) {
      throw new Error('Player not found or unauthorized');
    }

    return updatedPlayer;
  });
