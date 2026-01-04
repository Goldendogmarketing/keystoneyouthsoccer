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
