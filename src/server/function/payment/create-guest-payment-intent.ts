import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { stripe } from '~/lib/stripe/stripe';
import { db } from '~/db/db';
import { guestRegistrations } from '~/db/schema/guest-registrations.schema';
import { eq } from 'drizzle-orm';

const createGuestPaymentIntentSchema = z.object({
  registrationId: z.string().uuid(),
  amount: z.number().positive(),
  email: z.string().email(),
});

// Public function - no auth required for guest registrations
export const createGuestPaymentIntent = createServerFn({ method: 'POST' })
  .validator(z.object({ data: createGuestPaymentIntentSchema }))
  .handler(async ({ data }) => {
    const { registrationId, amount, email } = data.data;

    // Get registration
    const [registration] = await db
      .select()
      .from(guestRegistrations)
      .where(eq(guestRegistrations.id, registrationId))
      .limit(1);

    if (!registration) {
      throw new Error('Registration not found');
    }

    // Verify email matches (basic security check)
    if (registration.parentEmail.toLowerCase() !== email.toLowerCase()) {
      throw new Error('Email does not match registration');
    }

    // Check if already paid
    if (registration.paymentStatus === 'paid') {
      throw new Error('Registration has already been paid');
    }

    // Create or retrieve payment intent
    let paymentIntent;
    if (registration.paymentIntentId) {
      // Retrieve existing payment intent
      paymentIntent = await stripe.paymentIntents.retrieve(registration.paymentIntentId);

      // If it's already succeeded, don't create a new one
      if (paymentIntent.status === 'succeeded') {
        throw new Error('Payment has already been processed');
      }
    } else {
      // Create new payment intent
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        receipt_email: email,
        metadata: {
          registrationId: registration.id,
          confirmationNumber: registration.confirmationNumber,
          playerName: `${registration.playerFirstName} ${registration.playerLastName}`,
          registrationType: 'guest',
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Update registration with payment intent ID
      await db
        .update(guestRegistrations)
        .set({
          paymentIntentId: paymentIntent.id,
          status: 'pending_payment',
          updatedAt: new Date(),
        })
        .where(eq(guestRegistrations.id, registration.id));
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  });
