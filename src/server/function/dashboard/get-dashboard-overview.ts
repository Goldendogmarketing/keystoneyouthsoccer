import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { eq, count } from 'drizzle-orm';
import { getSession } from '~/lib/auth/middleware';

export const getDashboardOverview = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Get total players
  const [playerCount] = await db
    .select({ count: count() })
    .from(players)
    .where(eq(players.parentUserId, session.user.id));

  // Get active registrations (paid status)
  const [activeRegistrationCount] = await db
    .select({ count: count() })
    .from(registrations)
    .innerJoin(players, eq(registrations.playerId, players.id))
    .where(eq(players.parentUserId, session.user.id))
    .where(eq(registrations.status, 'paid'));

  // Get pending payments
  const [pendingPaymentCount] = await db
    .select({ count: count() })
    .from(registrations)
    .innerJoin(players, eq(registrations.playerId, players.id))
    .where(eq(players.parentUserId, session.user.id))
    .where(eq(registrations.paymentStatus, 'pending_payment'));

  return {
    totalPlayers: playerCount?.count || 0,
    activeRegistrations: activeRegistrationCount?.count || 0,
    pendingPayments: pendingPaymentCount?.count || 0,
  };
});
