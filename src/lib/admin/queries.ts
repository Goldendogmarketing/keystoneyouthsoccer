import { queryOptions } from '@tanstack/react-query';
import {
  getAllUsers,
  getAdminUsers,
  getPendingAdmins,
  searchUsers,
  checkMasterAdmin,
  getUserStats,
} from '~/server/function/admin/user-management';

export const adminUsersQueries = {
  all: () =>
    queryOptions({
      queryKey: ['admin', 'users'],
      queryFn: async ({ signal }) => await getAllUsers({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  admins: () =>
    queryOptions({
      queryKey: ['admin', 'users', 'admins'],
      queryFn: async ({ signal }) => await getAdminUsers({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  pending: () =>
    queryOptions({
      queryKey: ['admin', 'users', 'pending'],
      queryFn: async ({ signal }) => await getPendingAdmins({ signal }),
      staleTime: 1000 * 30, // 30 seconds
    }),

  search: (query: string, role?: 'parent' | 'admin' | 'coach' | 'all') =>
    queryOptions({
      queryKey: ['admin', 'users', 'search', query, role],
      queryFn: async ({ signal }) => await searchUsers({ data: { query, role }, signal }),
      staleTime: 1000 * 30, // 30 seconds
      enabled: query.length >= 1,
    }),

  isMasterAdmin: () =>
    queryOptions({
      queryKey: ['admin', 'isMasterAdmin'],
      queryFn: async ({ signal }) => await checkMasterAdmin({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),

  stats: () =>
    queryOptions({
      queryKey: ['admin', 'users', 'stats'],
      queryFn: async ({ signal }) => await getUserStats({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
};
