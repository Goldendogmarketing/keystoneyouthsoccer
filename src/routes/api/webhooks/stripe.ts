import { createFileRoute } from '@tanstack/react-router';
import { stripe } from '~/lib/stripe/stripe';
import { db } from '~/db/db';
import { guestRegistrations } from '~/db/schema/guest-registrations.schema';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { users } from '~/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { env } from '~/env/server';
import { resend, FROM_EMAIL } from '~/lib/email/resend';
import { PaymentReceipt } from '~/lib/email/templates/PaymentReceipt';
import { render } from '@react-email/components';
import type Stripe from 'stripe';

export const Route = createFileRoute('/api/webhooks/stripe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature) {
          return new Response('Missing stripe-signature header', { status: 400 });
        }

        if (!env.STRIPE_WEBHOOK_SECRET) {
          console.error('STRIPE_WEBHOOK_SECRET not configured');
          return new Response('Webhook secret not configured', { status: 500 });
        }

        let event: Stripe.Event;

        try {
          event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
          );
        } catch (err) {
          console.error('Webhook signature verification failed:', err);
          return new Response(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            status: 400,
          });
        }

        // Handle the event
        try {
          switch (event.type) {
            case 'payment_intent.succeeded':
              await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
              break;

            case 'payment_intent.payment_failed':
              await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
              break;

            default:
              console.log(`Unhandled event type: ${event.type}`);
          }
        } catch (err) {
          console.error(`Error processing webhook event ${event.type}:`, err);
          return new Response('Webhook handler error', { status: 500 });
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const { registrationId, registrationType } = paymentIntent.metadata;

  if (!registrationId) {
    console.log('No registrationId in payment intent metadata');
    return;
  }

  const now = new Date();
  const paymentDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (registrationType === 'guest') {
    // Update guest registration
    const [registration] = await db
      .select()
      .from(guestRegistrations)
      .where(eq(guestRegistrations.id, registrationId))
      .limit(1);

    if (!registration) {
      console.error(`Guest registration ${registrationId} not found`);
      return;
    }

    // Update status
    await db
      .update(guestRegistrations)
      .set({
        status: 'paid',
        paymentStatus: 'paid',
        paidAt: now,
        updatedAt: now,
      })
      .where(eq(guestRegistrations.id, registrationId));

    console.log(`Guest registration ${registrationId} marked as paid`);

    // Get season name for email
    const [season] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.id, registration.seasonId))
      .limit(1);

    // Send payment receipt email
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: registration.parentEmail,
        subject: `Payment Confirmed - ${registration.playerFirstName} ${registration.playerLastName} Registration`,
        html: await render(
          <PaymentReceipt
            parentName={`${registration.parentFirstName} ${registration.parentLastName}`}
            playerName={`${registration.playerFirstName} ${registration.playerLastName}`}
            seasonName={season?.name || 'Soccer Season'}
            amount={parseFloat(registration.amount)}
            registrationId={registration.confirmationNumber}
            paymentDate={paymentDate}
          />
        ),
      });
      console.log(`Payment receipt email sent to ${registration.parentEmail}`);
    } catch (emailError) {
      console.error('Failed to send payment receipt email:', emailError);
      // Don't fail the webhook if email fails
    }
  } else {
    // Update authenticated user registration
    const [registration] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId))
      .limit(1);

    if (!registration) {
      console.error(`Registration ${registrationId} not found`);
      return;
    }

    // Update status
    await db
      .update(registrations)
      .set({
        status: 'paid',
        paymentStatus: 'paid',
        paidAt: now,
        updatedAt: now,
      })
      .where(eq(registrations.id, registrationId));

    console.log(`Registration ${registrationId} marked as paid`);

    // Get player, user, and season for email
    const [player] = await db
      .select()
      .from(players)
      .where(eq(players.id, registration.playerId))
      .limit(1);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, registration.parentUserId))
      .limit(1);

    const [season] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.id, registration.seasonId))
      .limit(1);

    if (user && player) {
      // Send payment receipt email
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: `Payment Confirmed - ${player.firstName} ${player.lastName} Registration`,
          html: await render(
            <PaymentReceipt
              parentName={user.name}
              playerName={`${player.firstName} ${player.lastName}`}
              seasonName={season?.name || 'Soccer Season'}
              amount={parseFloat(registration.amount)}
              registrationId={registration.id}
              paymentDate={paymentDate}
            />
          ),
        });
        console.log(`Payment receipt email sent to ${user.email}`);
      } catch (emailError) {
        console.error('Failed to send payment receipt email:', emailError);
        // Don't fail the webhook if email fails
      }
    }
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const { registrationId, registrationType } = paymentIntent.metadata;

  if (!registrationId) {
    console.log('No registrationId in payment intent metadata');
    return;
  }

  const now = new Date();

  if (registrationType === 'guest') {
    await db
      .update(guestRegistrations)
      .set({
        paymentStatus: 'failed',
        updatedAt: now,
      })
      .where(eq(guestRegistrations.id, registrationId));
  } else {
    await db
      .update(registrations)
      .set({
        paymentStatus: 'failed',
        updatedAt: now,
      })
      .where(eq(registrations.id, registrationId));
  }

  console.log(`Payment failed for registration ${registrationId}`);
}
