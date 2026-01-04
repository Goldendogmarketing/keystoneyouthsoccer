import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { users } from '~/db/schema/users.schema';
import { teams } from '~/db/schema/teams.schema';
import { count, eq, gte } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

export const getAdminStats = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  // Get total registrations
  const [totalRegistrations] = await db.select({ count: count() }).from(registrations);

  // Get total players
  const [totalPlayers] = await db.select({ count: count() }).from(players);

  // Get total users (parents)
  const [totalUsers] = await db.select({ count: count() }).from(users);

  // Get total teams
  const [totalTeams] = await db.select({ count: count() }).from(teams);

  // Get pending payments
  const [pendingPayments] = await db
    .select({ count: count() })
    .from(registrations)
    .where(eq(registrations.paymentStatus, 'pending_payment'));

  // Get paid registrations
  const [paidRegistrations] = await db
    .select({ count: count() })
    .from(registrations)
    .where(eq(registrations.paymentStatus, 'paid'));

  // Get recent registrations (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [recentRegistrations] = await db
    .select({ count: count() })
    .from(registrations)
    .where(gte(registrations.createdAt, sevenDaysAgo.toISOString()));

  // Calculate total revenue
  const allPaidRegistrations = await db
    .select({ amount: registrations.amount })
    .from(registrations)
    .where(eq(registrations.paymentStatus, 'paid'));

  const totalRevenue = allPaidRegistrations.reduce((sum, reg) => sum + parseFloat(reg.amount), 0);

  return {
    totalRegistrations: totalRegistrations?.count || 0,
    totalPlayers: totalPlayers?.count || 0,
    totalUsers: totalUsers?.count || 0,
    totalTeams: totalTeams?.count || 0,
    pendingPayments: pendingPayments?.count || 0,
    paidRegistrations: paidRegistrations?.count || 0,
    recentRegistrations: recentRegistrations?.count || 0,
    totalRevenue,
  };
});
