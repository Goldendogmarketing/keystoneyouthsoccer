import { createAuthClient } from 'better-auth/client';
import { env } from '~/env/client';

export const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
});

// Helper hooks for client-side auth
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  $fetch,
} = authClient;
