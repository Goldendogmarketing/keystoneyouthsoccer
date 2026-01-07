import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { events } from '~/db/schema/events.schema';
import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { requireAdmin, getSession } from '~/lib/auth/middleware';

// Get all events
export const getEvents = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db.select().from(events).orderBy(desc(events.date));

  return result;
});

// Get events for a date range
const getEventsByDateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const getEventsByDateRange = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => getEventsByDateRangeSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    const result = await db
      .select()
      .from(events)
      .where(and(gte(events.date, start), lte(events.date, end)))
      .orderBy(events.date);

    return result;
  });

// Get upcoming events (public)
export const getUpcomingEvents = createServerFn({ method: 'GET' }).handler(async () => {
  const now = new Date();

  const result = await db
    .select()
    .from(events)
    .where(and(gte(events.date, now), eq(events.isCancelled, false)))
    .orderBy(events.date)
    .limit(10);

  return result;
});

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['game', 'practice', 'event', 'meeting', 'tournament']),
  date: z.string(), // ISO date string
  endDate: z.string().optional(),
  time: z.string().min(1),
  location: z.string().min(1),
  teamId: z.string().uuid().optional(),
  teamName: z.string().optional(),
  opponent: z.string().optional(),
  isAllDay: z.boolean().optional(),
});

export const createEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createEventSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    const [event] = await db
      .insert(events)
      .values({
        title: data.title,
        description: data.description || null,
        type: data.type,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
        time: data.time,
        location: data.location,
        teamId: data.teamId || null,
        teamName: data.teamName || null,
        opponent: data.opponent || null,
        isAllDay: data.isAllDay || false,
        createdBy: session?.user?.id || null,
      })
      .returning();

    return event;
  });

const updateEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['game', 'practice', 'event', 'meeting', 'tournament']).optional(),
  date: z.string().optional(),
  endDate: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  teamId: z.string().uuid().optional(),
  teamName: z.string().optional(),
  opponent: z.string().optional(),
  isAllDay: z.boolean().optional(),
  isCancelled: z.boolean().optional(),
});

export const updateEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, date, endDate, ...rest } = data;

    const updateData: Record<string, unknown> = { ...rest, updatedAt: new Date() };
    if (date !== undefined) {
      updateData.date = new Date(date);
    }
    if (endDate !== undefined) {
      updateData.endDate = endDate ? new Date(endDate) : null;
    }

    const [updated] = await db.update(events).set(updateData).where(eq(events.id, id)).returning();

    if (!updated) {
      throw new Error('Event not found');
    }

    return updated;
  });

const deleteEventSchema = z.object({
  id: z.string().uuid(),
});

export const deleteEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db.delete(events).where(eq(events.id, data.id)).returning();

    if (!deleted) {
      throw new Error('Event not found');
    }

    return { success: true };
  });

const cancelEventSchema = z.object({
  id: z.string().uuid(),
});

export const cancelEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => cancelEventSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [updated] = await db
      .update(events)
      .set({ isCancelled: true, updatedAt: new Date() })
      .where(eq(events.id, data.id))
      .returning();

    if (!updated) {
      throw new Error('Event not found');
    }

    return updated;
  });
