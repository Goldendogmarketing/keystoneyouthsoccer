import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '~/db/db';
import { users } from '~/db/schema/users.schema';
import { eq, desc, and, or, ilike, ne } from 'drizzle-orm';
import { requireAdmin, requireMasterAdmin, getSession } from '~/lib/auth/middleware';

// Get all users (admin view)
export const getAllUsers = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      phone: users.phone,
      role: users.role,
      isMasterAdmin: users.isMasterAdmin,
      isApproved: users.isApproved,
      approvedAt: users.approvedAt,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return result;
});

// Get all admin users
export const getAdminUsers = createServerFn({ method: 'GET' }).handler(async () => {
  await requireMasterAdmin();

  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      phone: users.phone,
      role: users.role,
      isMasterAdmin: users.isMasterAdmin,
      isApproved: users.isApproved,
      approvedAt: users.approvedAt,
      approvedBy: users.approvedBy,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.role, 'admin'))
    .orderBy(desc(users.createdAt));

  return result;
});

// Get pending admin approval requests
export const getPendingAdmins = createServerFn({ method: 'GET' }).handler(async () => {
  await requireMasterAdmin();

  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      phone: users.phone,
      role: users.role,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(and(eq(users.role, 'admin'), eq(users.isApproved, false)))
    .orderBy(users.createdAt);

  return result;
});

// Search users
const searchUsersSchema = z.object({
  query: z.string().min(1),
  role: z.enum(['parent', 'admin', 'coach', 'all']).optional(),
});

export const searchUsers = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => searchUsersSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    const searchPattern = `%${data.query}%`;

    let whereClause = or(ilike(users.email, searchPattern), ilike(users.name, searchPattern));

    if (data.role && data.role !== 'all') {
      whereClause = and(whereClause, eq(users.role, data.role));
    }

    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        role: users.role,
        isApproved: users.isApproved,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(whereClause)
      .orderBy(desc(users.createdAt))
      .limit(50);

    return result;
  });

// Approve admin user
const approveAdminSchema = z.object({
  userId: z.string().uuid(),
});

export const approveAdmin = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => approveAdminSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireMasterAdmin();

    // Check if user exists and is an admin
    const [targetUser] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);

    if (!targetUser) {
      throw new Error('User not found');
    }

    if (targetUser.role !== 'admin') {
      throw new Error('User is not an admin');
    }

    if (targetUser.isApproved) {
      throw new Error('User is already approved');
    }

    const [updated] = await db
      .update(users)
      .set({
        isApproved: true,
        approvedBy: session.user.id,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, data.userId))
      .returning();

    return updated;
  });

// Revoke admin access
const revokeAdminSchema = z.object({
  userId: z.string().uuid(),
});

export const revokeAdmin = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => revokeAdminSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireMasterAdmin();

    // Check if user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);

    if (!targetUser) {
      throw new Error('User not found');
    }

    // Prevent revoking own access
    if (targetUser.id === session.user.id) {
      throw new Error('Cannot revoke your own admin access');
    }

    // Prevent revoking master admin access
    if (targetUser.isMasterAdmin) {
      throw new Error('Cannot revoke master admin access');
    }

    const [updated] = await db
      .update(users)
      .set({
        role: 'parent',
        isApproved: false,
        approvedBy: null,
        approvedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, data.userId))
      .returning();

    return updated;
  });

// Update user role
const updateUserRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['parent', 'admin', 'coach']),
});

export const updateUserRole = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateUserRoleSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireMasterAdmin();

    // Check if user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);

    if (!targetUser) {
      throw new Error('User not found');
    }

    // Prevent modifying own role
    if (targetUser.id === session.user.id) {
      throw new Error('Cannot modify your own role');
    }

    // Prevent modifying master admin
    if (targetUser.isMasterAdmin && data.role !== 'admin') {
      throw new Error('Cannot change master admin role');
    }

    const updateData: Record<string, unknown> = {
      role: data.role,
      updatedAt: new Date(),
    };

    // If promoting to admin, set as pending approval
    if (data.role === 'admin' && targetUser.role !== 'admin') {
      updateData.isApproved = false;
    }

    // If demoting from admin, clear approval
    if (data.role !== 'admin' && targetUser.role === 'admin') {
      updateData.isApproved = false;
      updateData.approvedBy = null;
      updateData.approvedAt = null;
    }

    const [updated] = await db.update(users).set(updateData).where(eq(users.id, data.userId)).returning();

    return updated;
  });

// Create admin user (master admin only)
const createAdminUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
  autoApprove: z.boolean().optional(),
});

export const createAdminUser = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createAdminUserSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireMasterAdmin();

    // Check if email already exists
    const [existing] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);

    if (existing) {
      throw new Error('User with this email already exists');
    }

    const [newUser] = await db
      .insert(users)
      .values({
        email: data.email,
        name: data.name,
        phone: data.phone || null,
        role: 'admin',
        isApproved: data.autoApprove || false,
        approvedBy: data.autoApprove ? session.user.id : null,
        approvedAt: data.autoApprove ? new Date() : null,
        emailVerified: false,
      })
      .returning();

    return newUser;
  });

// Delete user (master admin only)
const deleteUserSchema = z.object({
  userId: z.string().uuid(),
});

export const deleteUser = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => deleteUserSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await requireMasterAdmin();

    // Check if user exists
    const [targetUser] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);

    if (!targetUser) {
      throw new Error('User not found');
    }

    // Prevent deleting self
    if (targetUser.id === session.user.id) {
      throw new Error('Cannot delete your own account');
    }

    // Prevent deleting master admin
    if (targetUser.isMasterAdmin) {
      throw new Error('Cannot delete master admin account');
    }

    await db.delete(users).where(eq(users.id, data.userId));

    return { success: true };
  });

// Check if current user is master admin
export const checkMasterAdmin = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await getSession();

  if (!session) {
    return { isMasterAdmin: false };
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  return { isMasterAdmin: user?.isMasterAdmin || false };
});

// Get user stats for admin dashboard
export const getUserStats = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin();

  const allUsers = await db.select().from(users);

  const stats = {
    totalUsers: allUsers.length,
    parents: allUsers.filter((u) => u.role === 'parent').length,
    admins: allUsers.filter((u) => u.role === 'admin').length,
    coaches: allUsers.filter((u) => u.role === 'coach').length,
    pendingAdmins: allUsers.filter((u) => u.role === 'admin' && !u.isApproved).length,
    approvedAdmins: allUsers.filter((u) => u.role === 'admin' && u.isApproved).length,
    masterAdmins: allUsers.filter((u) => u.isMasterAdmin).length,
  };

  return stats;
});
