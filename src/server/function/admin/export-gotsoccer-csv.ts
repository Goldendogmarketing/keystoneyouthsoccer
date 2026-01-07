import { createServerFn } from '@tanstack/react-start';
import { db } from '~/db/db';
import { registrations } from '~/db/schema/registrations.schema';
import { players } from '~/db/schema/players.schema';
import { guardians, emergencyContacts } from '~/db/schema/players.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';
import { z } from 'zod';

const exportCsvSchema = z.object({
  seasonId: z.string().optional(),
});

export const exportGotSoccerCsv = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => exportCsvSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Query registrations with all related data
    let query = db
      .select({
        registration: registrations,
        player: players,
        season: seasons,
      })
      .from(registrations)
      .innerJoin(players, eq(registrations.playerId, players.id))
      .innerJoin(seasons, eq(registrations.seasonId, seasons.id));

    // Filter by season if provided
    if (data.seasonId) {
      query = query.where(eq(registrations.seasonId, data.seasonId)) as any;
    }

    const registrationsData = await query;

    // Build CSV data
    const csvRows: string[][] = [];

    // CSV Header
    csvRows.push([
      // Player Info
      'Player First Name',
      'Player Last Name',
      'Date of Birth',
      'Gender',
      'Photo URL',
      // Guardian 1
      'Guardian 1 First Name',
      'Guardian 1 Last Name',
      'Guardian 1 Email',
      'Guardian 1 Phone',
      'Guardian 1 Relationship',
      'Guardian 1 Address',
      'Guardian 1 City',
      'Guardian 1 State',
      'Guardian 1 Zip',
      // Guardian 2
      'Guardian 2 First Name',
      'Guardian 2 Last Name',
      'Guardian 2 Email',
      'Guardian 2 Phone',
      'Guardian 2 Relationship',
      'Guardian 2 Address',
      'Guardian 2 City',
      'Guardian 2 State',
      'Guardian 2 Zip',
      // Emergency Contact 1
      'Emergency 1 First Name',
      'Emergency 1 Last Name',
      'Emergency 1 Phone',
      'Emergency 1 Relationship',
      // Emergency Contact 2
      'Emergency 2 First Name',
      'Emergency 2 Last Name',
      'Emergency 2 Phone',
      'Emergency 2 Relationship',
      // Medical Info
      'Allergies',
      'Medical Conditions',
      'Medications',
      'Insurance Provider',
      'Insurance Policy Number',
      // Registration Info
      'Season',
      'Registration Date',
      'Payment Status',
      'Amount',
      'Signature',
      'Signed Date',
    ]);

    // Process each registration
    for (const reg of registrationsData) {
      // Get guardians for this player
      const playerGuardians = await db
        .select()
        .from(guardians)
        .where(eq(guardians.playerId, reg.player.id))
        .orderBy(guardians.isPrimary)
        .limit(2);

      // Get emergency contacts for this player
      const playerEmergencyContacts = await db
        .select()
        .from(emergencyContacts)
        .where(eq(emergencyContacts.playerId, reg.player.id))
        .orderBy(emergencyContacts.isPrimary)
        .limit(2);

      const guardian1 = playerGuardians[0];
      const guardian2 = playerGuardians[1];
      const emergency1 = playerEmergencyContacts[0];
      const emergency2 = playerEmergencyContacts[1];

      // Build row
      const row = [
        // Player Info
        reg.player.firstName,
        reg.player.lastName,
        reg.player.dateOfBirth,
        reg.player.gender,
        reg.player.photoUrl || '',
        // Guardian 1
        guardian1?.firstName || '',
        guardian1?.lastName || '',
        guardian1?.email || '',
        guardian1?.phone || '',
        guardian1?.relationship || '',
        guardian1?.address || '',
        guardian1?.city || '',
        guardian1?.state || '',
        guardian1?.zipCode || '',
        // Guardian 2
        guardian2?.firstName || '',
        guardian2?.lastName || '',
        guardian2?.email || '',
        guardian2?.phone || '',
        guardian2?.relationship || '',
        guardian2?.address || '',
        guardian2?.city || '',
        guardian2?.state || '',
        guardian2?.zipCode || '',
        // Emergency Contact 1
        emergency1?.firstName || '',
        emergency1?.lastName || '',
        emergency1?.phone || '',
        emergency1?.relationship || '',
        // Emergency Contact 2
        emergency2?.firstName || '',
        emergency2?.lastName || '',
        emergency2?.phone || '',
        emergency2?.relationship || '',
        // Medical Info
        reg.registration.allergies || '',
        reg.registration.medicalConditions || '',
        reg.registration.medications || '',
        reg.registration.insuranceProvider || '',
        reg.registration.insurancePolicyNumber || '',
        // Registration Info
        reg.season.name,
        reg.registration.createdAt,
        reg.registration.paymentStatus,
        reg.registration.amount,
        reg.registration.parentSignature || '',
        reg.registration.signatureDate || '',
      ];

      csvRows.push(row);
    }

    // Convert to CSV string
    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    return {
      csv: csvContent,
      filename: `gotsoccer_export_${data.seasonId || 'all'}_${new Date().toISOString().split('T')[0]}.csv`,
      count: registrationsData.length,
    };
  });
