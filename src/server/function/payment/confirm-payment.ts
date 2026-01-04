import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db, registrations } from '~/db';
import { eq } from 'drizzle-orm';
import { requireAuth } from '~/lib/auth/middleware';

const confirmPaymentSchema = z.object({
  registrationId: z.string().uuid(),
});

export const confirmPayment = createServerFn({ method: 'POST' })
  .validator((data: unknown) => confirmPaymentSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Verify user is authenticated
    const session = await requireAuth({ context });

    // Get registration
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

    // Update registration status
    await db
      .update(registrations)
      .set({
        status: 'paid',
        paymentStatus: 'paid',
        paidAt: new Date(),
      })
      .where(eq(registrations.id, registration.id));

    return { success: true };
  });
