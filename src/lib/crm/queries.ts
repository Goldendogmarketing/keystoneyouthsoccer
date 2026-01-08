import { queryOptions } from '@tanstack/react-query';
import {
  getGuestRegistrations,
  getRegistrationDetails,
  getCrmStats,
  getTeamsForAssignment,
} from '~/server/function/crm';

interface RegistrationFilters {
  seasonId?: string;
  status?: string;
  ageGroup?: string;
  search?: string;
  teamAssigned?: boolean;
}

export const crmQueries = {
  registrations: (filters: RegistrationFilters = {}) =>
    queryOptions({
      queryKey: ['crm', 'registrations', filters],
      queryFn: async ({ signal }) => await getGuestRegistrations({ data: filters, signal }),
      staleTime: 1000 * 30, // 30 seconds
    }),
  registrationDetails: (id: string) =>
    queryOptions({
      queryKey: ['crm', 'registration', id],
      queryFn: async ({ signal }) => await getRegistrationDetails({ data: { id }, signal }),
      staleTime: 1000 * 60, // 1 minute
      enabled: !!id,
    }),
  stats: () =>
    queryOptions({
      queryKey: ['crm', 'stats'],
      queryFn: async ({ signal }) => await getCrmStats({ signal }),
      staleTime: 1000 * 30, // 30 seconds
    }),
  teamsForAssignment: (seasonId: string, ageGroup?: string) =>
    queryOptions({
      queryKey: ['crm', 'teams', seasonId, ageGroup],
      queryFn: async ({ signal }) =>
        await getTeamsForAssignment({ data: { seasonId, ageGroup }, signal }),
      staleTime: 1000 * 60, // 1 minute
      enabled: !!seasonId,
    }),
};
