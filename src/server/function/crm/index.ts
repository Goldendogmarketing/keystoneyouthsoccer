import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { guestRegistrations } from '~/db/schema/guest-registrations.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { teams } from '~/db/schema/teams.schema';
import { eq, desc, and, or, ilike, sql } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

// Helper to calculate age group from DOB
function calculateAgeGroup(dateOfBirth: string, seasonStartDate: string): string {
  const dob = new Date(dateOfBirth);
  const seasonStart = new Date(seasonStartDate);
  const cutoffYear = seasonStart.getFullYear();
  // Age as of Jan 1 of the season year
  const age = cutoffYear - dob.getFullYear();

  if (age <= 6) return 'U6';
  if (age <= 8) return 'U8';
  if (age <= 10) return 'U10';
  if (age <= 12) return 'U12';
  if (age <= 14) return 'U14';
  return 'U16+';
}

// Helper to generate confirmation number
function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KYS-${timestamp}-${random}`;
}

// Get all guest registrations with filters
const getGuestRegistrationsSchema = z.object({
  seasonId: z.string().uuid().optional(),
  status: z.string().optional(),
  ageGroup: z.string().optional(),
  search: z.string().optional(),
  teamAssigned: z.boolean().optional(),
});

export const getGuestRegistrations = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getGuestRegistrationsSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    let query = db
      .select({
        registration: guestRegistrations,
        season: seasons,
        team: teams,
      })
      .from(guestRegistrations)
      .leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id))
      .leftJoin(teams, eq(guestRegistrations.teamId, teams.id))
      .orderBy(desc(guestRegistrations.createdAt));

    // Apply filters in memory for now (complex queries can be optimized later)
    const results = await query;

    let filtered = results;

    if (data.seasonId) {
      filtered = filtered.filter((r) => r.registration.seasonId === data.seasonId);
    }

    if (data.status) {
      filtered = filtered.filter((r) => r.registration.status === data.status);
    }

    if (data.ageGroup) {
      filtered = filtered.filter((r) => r.registration.ageGroup === data.ageGroup);
    }

    if (data.teamAssigned !== undefined) {
      if (data.teamAssigned) {
        filtered = filtered.filter((r) => r.registration.teamId !== null);
      } else {
        filtered = filtered.filter((r) => r.registration.teamId === null);
      }
    }

    if (data.search) {
      const search = data.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.registration.playerFirstName.toLowerCase().includes(search) ||
          r.registration.playerLastName.toLowerCase().includes(search) ||
          r.registration.parentEmail.toLowerCase().includes(search) ||
          r.registration.parentFirstName.toLowerCase().includes(search) ||
          r.registration.parentLastName.toLowerCase().includes(search) ||
          r.registration.confirmationNumber.toLowerCase().includes(search)
      );
    }

    return filtered;
  });

// Get single registration details
const getRegistrationDetailsSchema = z.object({
  id: z.string().uuid(),
});

export const getRegistrationDetails = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getRegistrationDetailsSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [result] = await db
      .select({
        registration: guestRegistrations,
        season: seasons,
        team: teams,
      })
      .from(guestRegistrations)
      .leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id))
      .leftJoin(teams, eq(guestRegistrations.teamId, teams.id))
      .where(eq(guestRegistrations.id, data.id))
      .limit(1);

    if (!result) {
      throw new Error('Registration not found');
    }

    return result;
  });

// Create guest registration (public - no auth required)
const createGuestRegistrationSchema = z.object({
  // Player
  playerFirstName: z.string().min(1),
  playerLastName: z.string().min(1),
  playerDateOfBirth: z.string(),
  playerGender: z.enum(['male', 'female']),
  // Parent
  parentFirstName: z.string().min(1),
  parentLastName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
  parentAddress: z.string().min(1),
  parentCity: z.string().min(1),
  parentState: z.string().min(1),
  parentZipCode: z.string().min(1),
  // Secondary Guardian (optional)
  guardian2FirstName: z.string().optional(),
  guardian2LastName: z.string().optional(),
  guardian2Email: z.string().optional(),
  guardian2Phone: z.string().optional(),
  guardian2Relationship: z.string().optional(),
  // Emergency Contacts
  emergency1Name: z.string().min(1),
  emergency1Phone: z.string().min(1),
  emergency1Relationship: z.string().min(1),
  emergency2Name: z.string().optional(),
  emergency2Phone: z.string().optional(),
  emergency2Relationship: z.string().optional(),
  // Medical
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  physicianName: z.string().optional(),
  physicianPhone: z.string().optional(),
  // Season
  seasonId: z.string().uuid(),
  // Waivers
  electronicSignature: z.string().min(1),
  waiverAccepted: z.boolean(),
  photoReleaseAccepted: z.boolean(),
  codeOfConductAccepted: z.boolean(),
});

export const createGuestRegistration = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createGuestRegistrationSchema.parse(data))
  .handler(async ({ data }) => {
    // No auth required - public registration

    // Get season info for fee and age group calculation
    const [season] = await db.select().from(seasons).where(eq(seasons.id, data.seasonId)).limit(1);

    if (!season) {
      throw new Error('Season not found');
    }

    // Check if registration is open
    const now = new Date();
    const regOpen = new Date(season.registrationOpenDate);
    const regClose = new Date(season.registrationCloseDate);

    if (now < regOpen) {
      throw new Error('Registration has not opened yet');
    }

    if (now > regClose) {
      throw new Error('Registration has closed');
    }

    // Calculate age group
    const ageGroup = calculateAgeGroup(data.playerDateOfBirth, season.startDate);

    // Generate confirmation number
    const confirmationNumber = generateConfirmationNumber();

    // Create registration
    const [registration] = await db
      .insert(guestRegistrations)
      .values({
        ...data,
        ageGroup,
        confirmationNumber,
        amount: season.registrationFee,
        status: 'pending_payment',
        paymentStatus: 'pending',
        signedAt: new Date(),
      })
      .returning();

    return registration;
  });

// Update registration (admin)
const updateRegistrationSchema = z.object({
  id: z.string().uuid(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  teamId: z.string().uuid().optional().nullable(),
  notes: z.string().optional(),
});

export const updateRegistration = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateRegistrationSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, ...updateData } = data;

    const [updated] = await db
      .update(guestRegistrations)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(guestRegistrations.id, id))
      .returning();

    if (!updated) {
      throw new Error('Registration not found');
    }

    return updated;
  });

// Assign player to team
const assignToTeamSchema = z.object({
  registrationId: z.string().uuid(),
  teamId: z.string().uuid().nullable(),
});

export const assignToTeam = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => assignToTeamSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [updated] = await db
      .update(guestRegistrations)
      .set({ teamId: data.teamId, updatedAt: new Date() })
      .where(eq(guestRegistrations.id, data.registrationId))
      .returning();

    if (!updated) {
      throw new Error('Registration not found');
    }

    return updated;
  });

// Bulk assign to team
const bulkAssignToTeamSchema = z.object({
  registrationIds: z.array(z.string().uuid()),
  teamId: z.string().uuid(),
});

export const bulkAssignToTeam = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => bulkAssignToTeamSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const updated = await Promise.all(
      data.registrationIds.map(async (id) => {
        const [result] = await db
          .update(guestRegistrations)
          .set({ teamId: data.teamId, updatedAt: new Date() })
          .where(eq(guestRegistrations.id, id))
          .returning();
        return result;
      })
    );

    return { count: updated.length };
  });

// Export CSV
const exportCsvSchema = z.object({
  seasonId: z.string().uuid().optional(),
  format: z.enum(['standard', 'gotsoccer']).optional(),
});

export const exportRegistrationsCsv = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => exportCsvSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    let query = db
      .select({
        registration: guestRegistrations,
        season: seasons,
        team: teams,
      })
      .from(guestRegistrations)
      .leftJoin(seasons, eq(guestRegistrations.seasonId, seasons.id))
      .leftJoin(teams, eq(guestRegistrations.teamId, teams.id))
      .where(eq(guestRegistrations.paymentStatus, 'paid'))
      .orderBy(guestRegistrations.playerLastName);

    let results = await query;

    if (data.seasonId) {
      results = results.filter((r) => r.registration.seasonId === data.seasonId);
    }

    // Build CSV
    const headers = [
      'Confirmation #',
      'Player First Name',
      'Player Last Name',
      'Date of Birth',
      'Gender',
      'Age Group',
      'Team',
      'Parent First Name',
      'Parent Last Name',
      'Parent Email',
      'Parent Phone',
      'Address',
      'City',
      'State',
      'Zip',
      'Emergency Contact 1',
      'Emergency Phone 1',
      'Emergency Contact 2',
      'Emergency Phone 2',
      'Allergies',
      'Medical Conditions',
      'Insurance Provider',
      'Insurance Policy #',
      'Season',
      'Registration Date',
      'Payment Status',
      'Amount Paid',
    ];

    const rows = results.map((r) => [
      r.registration.confirmationNumber,
      r.registration.playerFirstName,
      r.registration.playerLastName,
      r.registration.playerDateOfBirth,
      r.registration.playerGender,
      r.registration.ageGroup || '',
      r.team?.name || 'Unassigned',
      r.registration.parentFirstName,
      r.registration.parentLastName,
      r.registration.parentEmail,
      r.registration.parentPhone,
      r.registration.parentAddress,
      r.registration.parentCity,
      r.registration.parentState,
      r.registration.parentZipCode,
      r.registration.emergency1Name,
      r.registration.emergency1Phone,
      r.registration.emergency2Name || '',
      r.registration.emergency2Phone || '',
      r.registration.allergies || '',
      r.registration.medicalConditions || '',
      r.registration.insuranceProvider || '',
      r.registration.insurancePolicyNumber || '',
      r.season?.name || '',
      new Date(r.registration.createdAt).toLocaleDateString(),
      r.registration.paymentStatus,
      r.registration.amount,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    return {
      csv: csvContent,
      filename: `registrations_${data.seasonId || 'all'}_${new Date().toISOString().split('T')[0]}.csv`,
      count: results.length,
    };
  });

// Get CRM stats
export const getCrmStats = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const all = await db.select().from(guestRegistrations);
  const allSeasons = await db.select().from(seasons);

  // Find current/active season
  const activeSeason = allSeasons.find((s) => s.isActive);
  const activeSeasonId = activeSeason?.id;

  const seasonRegistrations = activeSeasonId ? all.filter((r) => r.seasonId === activeSeasonId) : all;

  const totalRegistrations = seasonRegistrations.length;
  const paidRegistrations = seasonRegistrations.filter((r) => r.paymentStatus === 'paid').length;
  const pendingRegistrations = seasonRegistrations.filter((r) => r.paymentStatus === 'pending').length;
  const totalRevenue = seasonRegistrations
    .filter((r) => r.paymentStatus === 'paid')
    .reduce((sum, r) => sum + parseFloat(r.amount), 0);

  const assignedToTeam = seasonRegistrations.filter((r) => r.teamId !== null).length;
  const unassigned = seasonRegistrations.filter((r) => r.teamId === null && r.paymentStatus === 'paid').length;

  // Age group breakdown
  const ageGroups: Record<string, number> = {};
  seasonRegistrations
    .filter((r) => r.paymentStatus === 'paid')
    .forEach((r) => {
      const ag = r.ageGroup || 'Unknown';
      ageGroups[ag] = (ageGroups[ag] || 0) + 1;
    });

  return {
    totalRegistrations,
    paidRegistrations,
    pendingRegistrations,
    totalRevenue,
    assignedToTeam,
    unassigned,
    ageGroups,
    activeSeason: activeSeason?.name || null,
  };
});

// Get teams for assignment dropdown
const getTeamsForAssignmentSchema = z.object({
  seasonId: z.string().uuid(),
  ageGroup: z.string().optional(),
});

export const getTeamsForAssignment = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getTeamsForAssignmentSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    let teamsData = await db
      .select()
      .from(teams)
      .where(eq(teams.seasonId, data.seasonId))
      .orderBy(teams.ageGroup, teams.name);

    if (data.ageGroup) {
      teamsData = teamsData.filter((t) => t.ageGroup === data.ageGroup);
    }

    return teamsData;
  });
