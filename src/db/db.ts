import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '~/env/server';

// Create PostgreSQL connection (fallback to dummy connection if DATABASE_URL not set)
const connectionString = env.DATABASE_URL || 'postgresql://localhost:5432/dummy';
const client = postgres(connectionString, { prepare: false });

// Create Drizzle database instance
export const db = drizzle({ client });
