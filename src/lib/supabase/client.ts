/**
 * Supabase Client Configuration
 *
 * This module provides Supabase client instances for the application.
 * The database connection uses Drizzle ORM with the Supabase PostgreSQL database.
 *
 * Environment variables required:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_ANON_KEY: Your Supabase anonymous key
 * - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key (for server-side admin operations)
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '~/env/server';

// Create Supabase client for general use (uses anon key)
export function getSupabaseClient(): SupabaseClient | null {
  const url = env.SUPABASE_URL;
  const anonKey = env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn('Supabase credentials not configured');
    return null;
  }

  return createClient(url, anonKey);
}

// Create Supabase admin client (uses service role key for server-side operations)
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = env.SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.warn('Supabase admin credentials not configured');
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Lazy singleton instances
let supabaseClient: SupabaseClient | null = null;
let supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseClient) {
    supabaseClient = getSupabaseClient();
  }
  return supabaseClient;
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseAdmin) {
    supabaseAdmin = getSupabaseAdmin();
  }
  return supabaseAdmin;
}
