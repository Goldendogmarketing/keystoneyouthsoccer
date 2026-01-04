import { createServerFn } from '@tanstack/start/server';
import { db } from '~/db/db';
import { seasons } from '~/db/schema/seasons.schema';
import { registrations } from '~/db/schema/registrations.schema';
import { eq, count } from 'drizzle-orm';
import { requireAdmin } from '~/lib/auth/middleware';

export const getAllSeasons = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allSeasons = await db.select().from(seasons).orderBy(seasons.startDate);

  // Get registration count for each season
  const seasonsWithCounts = await Promise.all(
    allSeasons.map(async (season) => {
      const [registrationCount] = await db
        .select({ count: count() })
        .from(registrations)
        .where(eq(registrations.seasonId, season.id));

      return {
        ...season,
        registrationCount: registrationCount?.count || 0,
      };
    }),
  );

  return seasonsWithCounts;
});
