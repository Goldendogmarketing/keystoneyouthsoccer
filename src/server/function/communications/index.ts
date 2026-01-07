import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { emailTemplates } from '~/db/schema/email-templates.schema';
import { messageLogs } from '~/db/schema/message-logs.schema';
import { teams } from '~/db/schema/teams.schema';
import { seasons } from '~/db/schema/seasons.schema';
import { eq, desc } from 'drizzle-orm';
import { requireAdmin, getSession } from '~/lib/auth/middleware';

// Get all email templates
export const getEmailTemplates = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db.select().from(emailTemplates).orderBy(emailTemplates.name);

  return result;
});

// Get active email templates
export const getActiveEmailTemplates = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db
    .select()
    .from(emailTemplates)
    .where(eq(emailTemplates.isActive, true))
    .orderBy(emailTemplates.name);

  return result;
});

const createTemplateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  subject: z.string().min(1),
  body: z.string().min(1),
  variables: z.string().optional(),
});

export const createEmailTemplate = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createTemplateSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [template] = await db
      .insert(emailTemplates)
      .values({
        name: data.name,
        slug: data.slug,
        subject: data.subject,
        body: data.body,
        variables: data.variables || null,
      })
      .returning();

    return template;
  });

const updateTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  variables: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateEmailTemplate = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateTemplateSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const { id, ...updateData } = data;

    const [updated] = await db
      .update(emailTemplates)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(emailTemplates.id, id))
      .returning();

    if (!updated) {
      throw new Error('Template not found');
    }

    return updated;
  });

const deleteTemplateSchema = z.object({
  id: z.string().uuid(),
});

export const deleteEmailTemplate = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteTemplateSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const [deleted] = await db
      .delete(emailTemplates)
      .where(eq(emailTemplates.id, data.id))
      .returning();

    if (!deleted) {
      throw new Error('Template not found');
    }

    return { success: true };
  });

// Get message logs
export const getMessageLogs = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db.select().from(messageLogs).orderBy(desc(messageLogs.sentAt)).limit(50);

  return result;
});

// Get teams for recipient selection
export const getTeamsForMessages = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db.select({ id: teams.id, name: teams.name }).from(teams).orderBy(teams.name);

  return result;
});

// Get seasons for recipient selection
export const getSeasonsForMessages = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db
    .select({ id: seasons.id, name: seasons.name })
    .from(seasons)
    .orderBy(desc(seasons.startDate));

  return result;
});

const sendMessageSchema = z.object({
  type: z.enum(['email', 'sms']),
  subject: z.string().optional(),
  body: z.string().min(1),
  recipientType: z.enum(['all', 'team', 'season', 'individual']),
  teamId: z.string().uuid().optional(),
  seasonId: z.string().uuid().optional(),
  recipientEmail: z.string().email().optional(),
  recipientPhone: z.string().optional(),
});

export const sendMessage = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => sendMessageSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession();
    await requireAdmin();

    // In production, this would actually send the email/SMS
    // For now, we'll just log it to the database as "sent"

    // Calculate recipient count (placeholder - would query actual recipients in production)
    let recipientCount = 1;
    if (data.recipientType === 'all') {
      recipientCount = 156; // Placeholder
    } else if (data.recipientType === 'team') {
      recipientCount = 15; // Placeholder
    } else if (data.recipientType === 'season') {
      recipientCount = 50; // Placeholder
    }

    const [log] = await db
      .insert(messageLogs)
      .values({
        type: data.type,
        subject: data.subject || null,
        body: data.body,
        recipientType: data.recipientType,
        teamId: data.teamId || null,
        seasonId: data.seasonId || null,
        recipientEmail: data.recipientEmail || null,
        recipientPhone: data.recipientPhone || null,
        recipientCount,
        status: 'sent', // Would be 'pending' in production until actually sent
        sentBy: session?.user?.id || null,
      })
      .returning();

    return log;
  });

// Get message stats
export const getMessageStats = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  // Get counts for this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const allLogs = await db.select().from(messageLogs);

  const thisMonthLogs = allLogs.filter((log) => new Date(log.sentAt) >= startOfMonth);

  const emailCount = thisMonthLogs.filter((log) => log.type === 'email').length;
  const smsCount = thisMonthLogs.filter((log) => log.type === 'sms').length;
  const totalRecipients = thisMonthLogs.reduce((sum, log) => sum + log.recipientCount, 0);

  return {
    emailsSentThisMonth: emailCount,
    smsSentThisMonth: smsCount,
    totalRecipientsThisMonth: totalRecipients,
  };
});
