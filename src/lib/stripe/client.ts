import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env/client';

// Client-side Stripe.js instance
export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY);
