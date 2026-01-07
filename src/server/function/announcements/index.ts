import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { announcements } from '~/db/schema/announcements.schema';
import { eq, desc } from 'drizzle-orm';
import { requireAdmin, getSession } from '~/lib/auth/middleware';

// Get all announcements
export const getAnnouncements = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.createdAt));

  return result;
});

// Get active announcements (for public display)
export const getActiveAnnouncements = createServerFn({ method: 'GET' }).handler(async () => {
  const now = new Date();

  const result = await db
    .select()
    .from(announcements)
    .where(eq(announcements.isActive, true))
    .orderBy(desc(announcements.createdAt));

  // Filter by date range in JS since SQL date comparison can be tricky with nulls
  return result.filter((a) => {
    if (a.startDate && new Date(a.startDate) > now) return false;
    if (a.endDate && new Date(a.endDate) < now) return false;
    return true;
  });
});

const createAnnouncementSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['info', 'warning', 'success', 'urgent']),
  linkUrl: z.string().optional(),
  linkText: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const createAnnouncement = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createAnnouncementSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    const [announcement] = await db
      .insert(announcements)
      .values({
        title: data.title,
        message: data.message,
        type: data.type,
        linkUrl: data.linkUrl || null,
        linkText: data.linkText || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        createdBy: session?.user?.id || null,
        isActive: true,
      })
      .returning();

    return announcement;
  });

const updateAnnouncementSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  message: z.string().min(1).optional(),
  type: z.enum(['info', 'warning', 'success', 'urgent']).optional(),
  linkUrl: z.string().optional(),
  linkText: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateAnnouncement = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateAnnouncementSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, startDate, endDate, ...rest } = data;

    const updateData: Record<string, unknown> = { ...rest, updatedAt: new Date() };
    if (startDate !== undefined) {
      updateData.startDate = startDate ? new Date(startDate) : null;
    }
    if (endDate !== undefined) {
      updateData.endDate = endDate ? new Date(endDate) : null;
    }

    const [updated] = await db
      .update(announcements)
      .set(updateData)
      .where(eq(announcements.id, id))
      .returning();

    if (!updated) {
      throw new Error('Announcement not found');
    }

    return updated;
  });

const deleteAnnouncementSchema = z.object({
  id: z.string().uuid(),
});

export const deleteAnnouncement = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteAnnouncementSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db
      .delete(announcements)
      .where(eq(announcements.id, data.id))
      .returning();

    if (!deleted) {
      throw new Error('Announcement not found');
    }

    return { success: true };
  });

const toggleAnnouncementSchema = z.object({
  id: z.string().uuid(),
});

export const toggleAnnouncementActive = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => toggleAnnouncementSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    // Get current state
    const [current] = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, data.id))
      .limit(1);

    if (!current) {
      throw new Error('Announcement not found');
    }

    // Toggle
    const [updated] = await db
      .update(announcements)
      .set({ isActive: !current.isActive, updatedAt: new Date() })
      .where(eq(announcements.id, data.id))
      .returning();

    return updated;
  });
