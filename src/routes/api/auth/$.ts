import { createFileRoute } from '@tanstack/react-router';
import { auth } from '~/lib/auth/auth';

// Catch-all route for Better Auth API endpoints
export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return auth.handler(request);
      },
      POST: async ({ request }) => {
        return auth.handler(request);
      },
    },
  },
});
