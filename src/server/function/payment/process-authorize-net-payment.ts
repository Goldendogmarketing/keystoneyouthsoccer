import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { guestRegistrations } from '~/db/schema/guest-registrations.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq } from 'drizzle-orm';
import { env } from '~/env/server';
import { processPayment } from '~/lib/payment/authorize-net';
import { resend, FROM_EMAIL } from '~/lib/email/resend';
import { PaymentReceipt } from '~/lib/email/templates/PaymentReceipt';
import { render } from '@react-email/components';

const processPaymentSchema = z.object({
  registrationId: z.string().uuid(),
  email: z.string().email(),

  // Card details (only required for live payment)
  cardNumber: z.string().optional(),
  expirationDate: z.string().optional(), // MMYY format
  cardCode: z.string().optional(),

  // Billing info
  billingFirstName: z.string(),
  billingLastName: z.string(),
  billingAddress: z.string(),
  billingCity: z.string(),
  billingState: z.string(),
  billingZip: z.string(),

  // Amount
  amount: z.number().positive(),

  // Test mode flag
  useTestMode: z.boolean().optional(),
});

// Check if we're in test/bypass mode
function isTestModeEnabled(): boolean {
  // Enable test mode if:
  // 1. PAYMENT_TEST_MODE env is explicitly set to 'true'
  // 2. Authorize.net credentials are not configured
  const testModeEnv = process.env.PAYMENT_TEST_MODE === 'true';
  const authNetConfigured = !!(env.AUTHORIZE_NET_API_LOGIN_ID && env.AUTHORIZE_NET_TRANSACTION_KEY);

  return testModeEnv || !authNetConfigured;
}

// Process payment through Authorize.net (or test mode)
export const processAuthorizeNetPayment = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => {
    return z.object({ data: processPaymentSchema }).parse(input);
  })
  .handler(async ({ data }) => {
    const paymentData = data.data;

    // Get registration
    const [registration] = await db
      .select()
      .from(guestRegistrations)
      .where(eq(guestRegistrations.id, paymentData.registrationId))
      .limit(1);

    if (!registration) {
      throw new Error('Registration not found');
    }

    // Verify email matches
    if (registration.parentEmail.toLowerCase() !== paymentData.email.toLowerCase()) {
      throw new Error('Email does not match registration');
    }

    // Check if already paid
    if (registration.paymentStatus === 'paid') {
      throw new Error('Registration has already been paid');
    }

    const now = new Date();
    const isTestMode = paymentData.useTestMode || isTestModeEnabled();

    let paymentResult: {
      success: boolean;
      transactionId?: string;
      errorMessage?: string;
    };

    if (isTestMode) {
      // TEST MODE: Simulate successful payment
      console.log('[TEST MODE] Simulating payment for registration:', registration.id);
      console.log('[TEST MODE] Amount:', paymentData.amount);

      // Generate fake transaction ID
      paymentResult = {
        success: true,
        transactionId: `TEST-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      };
    } else {
      // LIVE MODE: Process through Authorize.net
      if (!paymentData.cardNumber || !paymentData.expirationDate || !paymentData.cardCode) {
        throw new Error('Card details are required for live payment processing');
      }

      if (!env.AUTHORIZE_NET_API_LOGIN_ID || !env.AUTHORIZE_NET_TRANSACTION_KEY) {
        throw new Error('Authorize.net is not configured. Please contact support.');
      }

      paymentResult = await processPayment(
        {
          apiLoginId: env.AUTHORIZE_NET_API_LOGIN_ID,
          transactionKey: env.AUTHORIZE_NET_TRANSACTION_KEY,
          environment: env.AUTHORIZE_NET_ENVIRONMENT || 'sandbox',
        },
        {
          cardNumber: paymentData.cardNumber,
          expirationDate: paymentData.expirationDate,
          cardCode: paymentData.cardCode,
          amount: paymentData.amount,
          customerEmail: paymentData.email,
          customerFirstName: paymentData.billingFirstName,
          customerLastName: paymentData.billingLastName,
          billingAddress: {
            address: paymentData.billingAddress,
            city: paymentData.billingCity,
            state: paymentData.billingState,
            zip: paymentData.billingZip,
          },
          description: `Keystone Youth Soccer Registration - ${registration.confirmationNumber}`,
          invoiceNumber: registration.confirmationNumber,
        }
      );
    }

    if (!paymentResult.success) {
      // Update registration with failed payment status
      await db
        .update(guestRegistrations)
        .set({
          paymentStatus: 'failed',
          updatedAt: now,
        })
        .where(eq(guestRegistrations.id, registration.id));

      throw new Error(paymentResult.errorMessage || 'Payment processing failed');
    }

    // Update registration as paid
    await db
      .update(guestRegistrations)
      .set({
        status: 'paid',
        paymentStatus: 'paid',
        paymentIntentId: paymentResult.transactionId,
        paidAt: now,
        updatedAt: now,
      })
      .where(eq(guestRegistrations.id, registration.id));

    console.log(`Registration ${registration.id} marked as paid. Transaction: ${paymentResult.transactionId}`);

    // Get season name for email
    const [season] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.id, registration.seasonId))
      .limit(1);

    // Send payment receipt email
    const paymentDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

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
            amount={paymentData.amount}
            registrationId={registration.confirmationNumber}
            paymentDate={paymentDate}
          />
        ),
      });
      console.log(`Payment receipt email sent to ${registration.parentEmail}`);
    } catch (emailError) {
      console.error('Failed to send payment receipt email:', emailError);
      // Don't fail the payment if email fails
    }

    return {
      success: true,
      transactionId: paymentResult.transactionId,
      confirmationNumber: registration.confirmationNumber,
      isTestMode,
    };
  });

// Check if test mode is active (for client to know)
export const checkPaymentTestMode = createServerFn({ method: 'GET' }).handler(async () => {
  return {
    isTestMode: isTestModeEnabled(),
    message: isTestModeEnabled()
      ? 'Payment is in TEST MODE - no real charges will be made'
      : 'Live payment processing is active',
  };
});
