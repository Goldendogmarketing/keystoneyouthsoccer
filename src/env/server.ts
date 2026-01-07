import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    MY_SECRET_VAR: z.string().url().optional(),
    DATABASE_URL: z.string().optional(),
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    // Supabase
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_ANON_KEY: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    // Authorize.net
    AUTHORIZE_NET_API_LOGIN_ID: z.string().optional(),
    AUTHORIZE_NET_TRANSACTION_KEY: z.string().optional(),
    AUTHORIZE_NET_ENVIRONMENT: z.enum(['sandbox', 'production']).optional(),
    // Twilio (SMS)
    TWILIO_ACCOUNT_SID: z.string().optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    TWILIO_PHONE_NUMBER: z.string().optional(),
  },
  runtimeEnv: process.env,
});
