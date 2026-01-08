import { createServerFn } from '@tanstack/react-start';
import { auth } from './auth';

/**
 * Server function to get the current session
 */
export const getSession = createServerFn({ method: 'GET' }).handler(async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers,
  });

  return session;
});

/**
 * Server function to check if user is authenticated
 * Throws error if not authenticated
 */
export const requireAuth = createServerFn({ method: 'GET' }).handler(async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers,
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
});

/**
 * Server function to check if user has admin role
 */
export const requireAdmin = createServerFn({ method: 'GET' }).handler(async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers,
  });

  if (!session || session.user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  return session;
});

/**
 * Server function to check if user is a master admin
 * Master admins can manage other admin accounts
 */
export const requireMasterAdmin = createServerFn({ method: 'GET' }).handler(async (ctx) => {
  const session = await auth.api.getSession({
    headers: ctx.request.headers,
  });

  if (!session || session.user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  // Check if user is master admin (need to query DB for this)
  const { db } = await import('~/db/db');
  const { users } = await import('~/db/schema/users.schema');
  const { eq } = await import('drizzle-orm');

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  if (!user?.isMasterAdmin) {
    throw new Error('Forbidden: Master admin access required');
  }

  return { ...session, isMasterAdmin: true };
});
