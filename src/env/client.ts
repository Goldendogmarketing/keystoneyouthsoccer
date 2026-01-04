import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_BASE_URL: z.url().default('http://localhost:3000'),
    VITE_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  },
  runtimeEnv: import.meta.env,
});
