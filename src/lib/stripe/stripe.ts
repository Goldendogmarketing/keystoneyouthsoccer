import Stripe from 'stripe';
import { env } from '~/env/server';

// Server-side Stripe client
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
