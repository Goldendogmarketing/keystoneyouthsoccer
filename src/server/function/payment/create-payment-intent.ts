import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { stripe } from '~/lib/stripe/stripe';
import { db, registrations } from '~/db';
import { eq } from 'drizzle-orm';
import { requireAuth } from '~/lib/auth/middleware';

const createPaymentIntentSchema = z.object({
  registrationId: z.string().uuid(),
  amount: z.number().positive(),
});

export const createPaymentIntent = createServerFn({ method: 'POST' })
  .validator((data: unknown) => createPaymentIntentSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Verify user is authenticated
    const session = await requireAuth({ context });

    // Get registration and verify ownership
    const [registration] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, data.registrationId))
      .limit(1);

    if (!registration) {
      throw new Error('Registration not found');
    }

    if (registration.parentUserId !== session.user.id) {
      throw new Error('Unauthorized');
    }

    // Check if payment already exists
    if (registration.paymentIntentId && registration.paymentStatus === 'paid') {
      throw new Error('Registration has already been paid');
    }

    // Create or retrieve payment intent
    let paymentIntent;
    if (registration.paymentIntentId) {
      // Retrieve existing payment intent
      paymentIntent = await stripe.paymentIntents.retrieve(registration.paymentIntentId);
    } else {
      // Create new payment intent
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          registrationId: registration.id,
          userId: session.user.id,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Update registration with payment intent ID
      await db
        .update(registrations)
        .set({ paymentIntentId: paymentIntent.id })
        .where(eq(registrations.id, registration.id));
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  });
