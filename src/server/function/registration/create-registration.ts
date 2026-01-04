import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db, players, guardians, emergencyContacts, registrations } from '~/db';
import { requireAuth } from '~/lib/auth/middleware';
import { sendRegistrationConfirmation } from '../email/send-emails';

const createRegistrationSchema = z.object({
  seasonId: z.string().uuid(),
  playerData: z.object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    gender: z.enum(['male', 'female']),
    photoUrl: z.string().optional(),
    allergies: z.string().optional(),
    medicalConditions: z.string().optional(),
    medicalNotes: z.string().optional(),
    insuranceProvider: z.string(),
    insurancePolicyNumber: z.string(),
    physicianName: z.string(),
    physicianPhone: z.string(),
  }),
  guardiansData: z.array(
    z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string(),
      email: z.string(),
      isPrimary: z.boolean(),
      address: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
    }),
  ),
  emergencyContactsData: z.array(
    z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string(),
      email: z.string().optional(),
      priority: z.enum(['primary', 'secondary']),
    }),
  ),
  electronicSignature: z.string(),
  amount: z.number(),
});

export const createRegistration = createServerFn({ method: 'POST' })
  .validator((data: unknown) => createRegistrationSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Get authenticated user
    const session = await requireAuth({ context });

    // Create player
    const [player] = await db
      .insert(players)
      .values({
        ...data.playerData,
        parentUserId: session.user.id,
      })
      .returning();

    // Create guardians
    if (data.guardiansData.length > 0) {
      await db.insert(guardians).values(
        data.guardiansData.map((guardian) => ({
          ...guardian,
          playerId: player.id,
        })),
      );
    }

    // Create emergency contacts
    if (data.emergencyContactsData.length > 0) {
      await db.insert(emergencyContacts).values(
        data.emergencyContactsData.map((contact) => ({
          ...contact,
          playerId: player.id,
        })),
      );
    }

    // Create registration
    const [registration] = await db
      .insert(registrations)
      .values({
        playerId: player.id,
        seasonId: data.seasonId,
        parentUserId: session.user.id,
        status: 'pending_payment',
        paymentStatus: 'pending',
        amount: data.amount.toString(),
        electronicSignature: data.electronicSignature,
        signedAt: new Date(),
      })
      .returning();

    // Send registration confirmation email
    try {
      await sendRegistrationConfirmation({
        data: {
          email: session.user.email,
          parentName: session.user.name,
          playerName: `${player.firstName} ${player.lastName}`,
          seasonName: 'Spring 2026', // TODO: Get from season data
          registrationId: registration.id,
        },
      });
    } catch (error) {
      console.error('Failed to send registration confirmation email:', error);
      // Don't fail the registration if email fails
    }

    return {
      registration,
      player,
    };
  });
