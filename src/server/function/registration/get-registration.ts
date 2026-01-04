import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db, registrations, players, guardians, emergencyContacts } from '~/db';
import { eq } from 'drizzle-orm';
import { requireAuth } from '~/lib/auth/middleware';

const getRegistrationSchema = z.object({
  registrationId: z.string().uuid(),
});

export const getRegistration = createServerFn({ method: 'GET' })
  .validator((data: unknown) => getRegistrationSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Get authenticated user
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

    // Verify ownership
    if (registration.parentUserId !== session.user.id) {
      throw new Error('Unauthorized');
    }

    // Get player data
    const [player] = await db
      .select()
      .from(players)
      .where(eq(players.id, registration.playerId))
      .limit(1);

    // Get guardians
    const playerGuardians = await db
      .select()
      .from(guardians)
      .where(eq(guardians.playerId, registration.playerId));

    // Get emergency contacts
    const contacts = await db
      .select()
      .from(emergencyContacts)
      .where(eq(emergencyContacts.playerId, registration.playerId));

    return {
      registration,
      player,
      guardians: playerGuardians,
      emergencyContacts: contacts,
    };
  });
