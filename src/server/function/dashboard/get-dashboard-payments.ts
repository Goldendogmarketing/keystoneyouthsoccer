import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq, or } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';

export const getDashboardPayments = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const payments = await db
    .select({
      id: registrations.id,
      amount: registrations.amount,
      paymentStatus: registrations.paymentStatus,
      paymentIntentId: registrations.paymentIntentId,
      createdAt: registrations.createdAt,
      player: {
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
    .where(
      eq(players.parentUserId, session.user.id),
      or(eq(registrations.paymentStatus, 'paid'), eq(registrations.paymentStatus, 'pending_payment')),
    )
    .orderBy(registrations.createdAt);

  return payments;
});
