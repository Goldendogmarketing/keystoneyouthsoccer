import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { players, guardians, emergencyContacts } from '~/db/schema/players.schema';
import { getSession } from '~/lib/auth/middleware';
import { z } from 'zod';

const createPlayerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().min(1),
  gender: z.enum(['male', 'female']),
  photoUrl: z.string().optional(),
  guardians: z
    .array(
      z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        relationship: z.string().min(1),
        address: z.string().min(5),
        city: z.string().min(2),
        state: z.string().length(2),
        zipCode: z.string().min(5),
      }),
    )
    .min(1)
    .max(2),
  emergencyContacts: z
    .array(
      z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        phone: z.string().min(10),
        relationship: z.string().min(1),
      }),
    )
    .min(1)
    .max(2),
});

export const createPlayer = createServerFn({ method: 'POST' })
  .validator((data: unknown) => createPlayerSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Create player
    const [player] = await db
      .insert(players)
      .values({
        parentUserId: session.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        photoUrl: data.photoUrl,
      })
      .returning();

    // Create guardians
    if (data.guardians.length > 0) {
      await db.insert(guardians).values(
        data.guardians.map((guardian, index) => ({
          playerId: player.id,
          firstName: guardian.firstName,
          lastName: guardian.lastName,
          email: guardian.email,
          phone: guardian.phone,
          relationship: guardian.relationship,
          address: guardian.address,
          city: guardian.city,
          state: guardian.state,
          zipCode: guardian.zipCode,
          isPrimary: index === 0,
        })),
      );
    }

    // Create emergency contacts
    if (data.emergencyContacts.length > 0) {
      await db.insert(emergencyContacts).values(
        data.emergencyContacts.map((contact, index) => ({
          playerId: player.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          relationship: contact.relationship,
          isPrimary: index === 0,
        })),
      );
    }

    return player;
  });
