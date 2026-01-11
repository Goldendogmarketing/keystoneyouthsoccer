import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { seasons } from '~/db/schema/seasons.schema';
import { eq, and, gte, lte } from 'drizzle-orm';

// Public function - get season for registration (no auth required)
export const getSeasonForRegistration = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => {
    return z.object({ seasonId: z.string().uuid() }).parse(data);
  })
  .handler(async ({ data }) => {
    const [season] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.id, data.seasonId))
      .limit(1);

    if (!season) {
      return { error: 'Season not found', season: null };
    }

    const today = new Date().toISOString().split('T')[0];
    const registrationOpen = season.registrationOpenDate <= today;
    const registrationClosed = season.registrationCloseDate < today;
    const isLateRegistration = season.registrationCloseDate < today && season.isActive;

    // Calculate if late fee applies (registration closed but season still active)
    const lateFeeApplies = isLateRegistration && parseFloat(season.lateFee || '0') > 0;

    return {
      error: null,
      season: {
        id: season.id,
        name: season.name,
        seasonType: season.seasonType,
        year: season.year,
        startDate: season.startDate,
        endDate: season.endDate,
        registrationOpenDate: season.registrationOpenDate,
        registrationCloseDate: season.registrationCloseDate,
        isActive: season.isActive,
        isRegistrationOpen: season.isRegistrationOpen,
        registrationFee: parseFloat(season.registrationFee),
        lateFee: parseFloat(season.lateFee || '0'),
        description: season.description,
        ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : [],
      },
      registrationStatus: {
        isOpen: registrationOpen && !registrationClosed && season.isRegistrationOpen,
        notYetOpen: !registrationOpen,
        isClosed: registrationClosed && !season.isActive,
        isLate: lateFeeApplies,
        totalFee: lateFeeApplies
          ? parseFloat(season.registrationFee) + parseFloat(season.lateFee || '0')
          : parseFloat(season.registrationFee),
      },
    };
  });

// Get all seasons (for admin)
export const getSeasons = createServerFn({ method: 'GET' }).handler(async () => {
  const allSeasons = await db
    .select()
    .from(seasons)
    .orderBy(seasons.startDate);

  return {
    seasons: allSeasons.map(season => ({
      id: season.id,
      name: season.name,
      seasonType: season.seasonType,
      year: season.year,
      startDate: season.startDate,
      endDate: season.endDate,
      registrationOpenDate: season.registrationOpenDate,
      registrationCloseDate: season.registrationCloseDate,
      isActive: season.isActive,
      isRegistrationOpen: season.isRegistrationOpen,
      registrationFee: parseFloat(season.registrationFee),
      lateFee: parseFloat(season.lateFee || '0'),
      description: season.description,
      ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : [],
    })),
  };
});

// Public function - get all active seasons for registration
export const getActiveSeasons = createServerFn({ method: 'GET' }).handler(async () => {
  const today = new Date().toISOString().split('T')[0];

  const activeSeasons = await db
    .select()
    .from(seasons)
    .where(
      and(
        eq(seasons.isActive, true),
        eq(seasons.isRegistrationOpen, true)
      )
    )
    .orderBy(seasons.startDate);

  return activeSeasons.map(season => ({
    id: season.id,
    name: season.name,
    seasonType: season.seasonType,
    year: season.year,
    startDate: season.startDate,
    endDate: season.endDate,
    registrationOpenDate: season.registrationOpenDate,
    registrationCloseDate: season.registrationCloseDate,
    registrationFee: parseFloat(season.registrationFee),
    lateFee: parseFloat(season.lateFee || '0'),
    description: season.description,
    ageGroups: season.ageGroups ? JSON.parse(season.ageGroups) : [],
  }));
});
