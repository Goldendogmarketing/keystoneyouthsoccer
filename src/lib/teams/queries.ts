import { queryOptions } from '@tanstack/react-query';
import {
  getTeams,
  getTeamsWithCounts,
  getTeamsBySeason,
  getTeamsByAgeGroup,
  getTeam,
  getAvailablePlayers,
  getAvailableCoaches,
  getTeamStats,
} from '~/server/function/teams';

export const teamsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['teams'],
      queryFn: async ({ signal }) => await getTeams({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  withCounts: () =>
    queryOptions({
      queryKey: ['teams', 'withCounts'],
      queryFn: async ({ signal }) => await getTeamsWithCounts({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  bySeason: (seasonId: string) =>
    queryOptions({
      queryKey: ['teams', 'season', seasonId],
      queryFn: async ({ signal }) => await getTeamsBySeason({ data: { seasonId }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  byAgeGroup: (ageGroup: string, seasonId?: string) =>
    queryOptions({
      queryKey: ['teams', 'ageGroup', ageGroup, seasonId],
      queryFn: async ({ signal }) => await getTeamsByAgeGroup({ data: { ageGroup, seasonId }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  detail: (teamId: string) =>
    queryOptions({
      queryKey: ['teams', 'detail', teamId],
      queryFn: async ({ signal }) => await getTeam({ data: { teamId }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  availablePlayers: (seasonId: string, ageGroup?: string) =>
    queryOptions({
      queryKey: ['teams', 'availablePlayers', seasonId, ageGroup],
      queryFn: async ({ signal }) => await getAvailablePlayers({ data: { seasonId, ageGroup }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  availableCoaches: () =>
    queryOptions({
      queryKey: ['teams', 'availableCoaches'],
      queryFn: async ({ signal }) => await getAvailableCoaches({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),

  stats: () =>
    queryOptions({
      queryKey: ['teams', 'stats'],
      queryFn: async ({ signal }) => await getTeamStats({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
};
