import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '~/db/db';
import { env } from '~/env/server';
import * as schema from '~/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  secret: env.BETTER_AUTH_SECRET || 'dev-secret-min-32-chars-long-for-preview-mode',
  baseURL: env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: [env.BETTER_AUTH_URL || 'http://localhost:3000'],
  advanced: {
    database: {
      generateId: false, // Let PostgreSQL generate UUIDs
    },
  },
});

export type Session = typeof auth.$Infer.Session;
