import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { guestRegistrations } from '~/db/schema/guest-registrations.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq } from 'drizzle-orm';
import { sendRegistrationConfirmation } from '../email/send-emails';
import { nanoid } from 'nanoid';

// Additional player schema
const additionalPlayerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().min(1),
  uniformSize: z.string().min(1),
  isReturningPlayer: z.boolean(),
  requestedTeam: z.string().optional(),
});

const createGuestRegistrationSchema = z.object({
  seasonId: z.string().uuid(),

  // Parent/Guardian
  parentGuardianName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),

  // Player
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().min(1),

  // Address
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(5),

  // Optional fields
  isReturningPlayer: z.boolean(),
  requestedTeam: z.string().optional(),
  uniformSize: z.string().min(1),
  volunteerRole: z.string().optional(),
  comments: z.string().optional(),

  // Additional players
  additionalPlayers: z.array(additionalPlayerSchema).optional(),

  // Agreements & signature
  agreeToTerms: z.boolean(),
  signature: z.string().min(1),

  // Amount
  amount: z.number().positive(),
});

// Generate a confirmation number
function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = nanoid(6).toUpperCase();
  return `KYS-${timestamp}-${random}`;
}

// Parse parent name into first/last
function parseParentName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  const lastName = parts.pop() || '';
  const firstName = parts.join(' ');
  return { firstName, lastName };
}

// Public function - no auth required for guest registrations
export const createGuestRegistration = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => {
    return z.object({ data: createGuestRegistrationSchema }).parse(input);
  })
  .handler(async ({ data }) => {
    const formData = data.data;

    // Get season to verify it exists and is open
    const [season] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.id, formData.seasonId))
      .limit(1);

    if (!season) {
      throw new Error('Season not found');
    }

    if (!season.isActive || !season.isRegistrationOpen) {
      throw new Error('Registration is not currently open for this season');
    }

    const confirmationNumber = generateConfirmationNumber();
    const { firstName: parentFirstName, lastName: parentLastName } = parseParentName(formData.parentGuardianName);
    const now = new Date();

    // Create the primary registration
    const [registration] = await db
      .insert(guestRegistrations)
      .values({
        // Player Info
        playerFirstName: formData.firstName,
        playerLastName: formData.lastName,
        playerDateOfBirth: formData.dateOfBirth,
        playerGender: formData.gender,

        // Parent/Guardian Info
        parentFirstName,
        parentLastName,
        parentEmail: formData.email,
        parentPhone: formData.phone,
        parentAddress: formData.streetAddress,
        parentCity: formData.city,
        parentState: formData.state,
        parentZipCode: formData.zipCode,

        // Emergency Contacts - use parent as primary emergency
        emergency1Name: formData.parentGuardianName,
        emergency1Phone: formData.phone,
        emergency1Relationship: 'Parent/Guardian',

        // Season
        seasonId: formData.seasonId,

        // Payment & Status
        status: 'draft',
        paymentStatus: 'pending',
        amount: formData.amount.toString(),

        // Waivers & Signatures
        electronicSignature: formData.signature,
        signedAt: now,
        waiverAccepted: formData.agreeToTerms,
        photoReleaseAccepted: formData.agreeToTerms,
        codeOfConductAccepted: formData.agreeToTerms,

        // Metadata
        confirmationNumber,
        notes: [
          formData.isReturningPlayer ? `Returning player from team: ${formData.requestedTeam || 'Not specified'}` : 'New player',
          formData.uniformSize ? `Uniform size: ${formData.uniformSize}` : '',
          formData.volunteerRole ? `Volunteer interest: ${formData.volunteerRole}` : '',
          formData.comments ? `Comments: ${formData.comments}` : '',
        ].filter(Boolean).join('\n'),
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Create registrations for additional players
    const additionalRegistrations = [];
    if (formData.additionalPlayers && formData.additionalPlayers.length > 0) {
      for (const player of formData.additionalPlayers) {
        const additionalConfirmation = generateConfirmationNumber();
        const [additionalReg] = await db
          .insert(guestRegistrations)
          .values({
            // Player Info
            playerFirstName: player.firstName,
            playerLastName: player.lastName,
            playerDateOfBirth: player.dateOfBirth,
            playerGender: player.gender,

            // Parent/Guardian Info (same as primary)
            parentFirstName,
            parentLastName,
            parentEmail: formData.email,
            parentPhone: formData.phone,
            parentAddress: formData.streetAddress,
            parentCity: formData.city,
            parentState: formData.state,
            parentZipCode: formData.zipCode,

            // Emergency Contacts
            emergency1Name: formData.parentGuardianName,
            emergency1Phone: formData.phone,
            emergency1Relationship: 'Parent/Guardian',

            // Season
            seasonId: formData.seasonId,

            // Payment & Status
            status: 'draft',
            paymentStatus: 'pending',
            amount: '0', // Additional players tracked separately or as part of main payment

            // Waivers & Signatures
            electronicSignature: formData.signature,
            signedAt: now,
            waiverAccepted: formData.agreeToTerms,
            photoReleaseAccepted: formData.agreeToTerms,
            codeOfConductAccepted: formData.agreeToTerms,

            // Metadata
            confirmationNumber: additionalConfirmation,
            notes: [
              player.isReturningPlayer ? `Returning player from team: ${player.requestedTeam || 'Not specified'}` : 'New player',
              player.uniformSize ? `Uniform size: ${player.uniformSize}` : '',
              `Sibling registration - primary confirmation: ${confirmationNumber}`,
            ].filter(Boolean).join('\n'),
            createdAt: now,
            updatedAt: now,
          })
          .returning();

        additionalRegistrations.push(additionalReg);
      }
    }

    // Send registration confirmation email
    try {
      await sendRegistrationConfirmation({
        data: {
          email: formData.email,
          parentName: formData.parentGuardianName,
          playerName: `${formData.firstName} ${formData.lastName}`,
          seasonName: season.name,
          registrationId: confirmationNumber,
        },
      });
    } catch (error) {
      console.error('Failed to send registration confirmation email:', error);
      // Don't fail the registration if email fails
    }

    return {
      registration,
      additionalRegistrations,
      confirmationNumber,
      totalPlayers: 1 + additionalRegistrations.length,
    };
  });
