import { queryOptions } from '@tanstack/react-query';
import {
  getEvents,
  getEventsByDateRange,
  getUpcomingEvents,
  getFilteredEvents,
  getEventsByTeam,
  getEventsByAgeGroup,
  getAvailableAgeGroups,
  getGames,
  getStandings,
} from '~/server/function/events';

export type EventFilters = {
  startDate?: string;
  endDate?: string;
  teamId?: string;
  ageGroup?: string;
  seasonId?: string;
  type?: 'game' | 'practice' | 'event' | 'meeting' | 'tournament' | 'all';
  includeCancelled?: boolean;
};

export const eventsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['events'],
      queryFn: async ({ signal }) => await getEvents({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  filtered: (filters: EventFilters) =>
    queryOptions({
      queryKey: ['events', 'filtered', filters],
      queryFn: async ({ signal }) => await getFilteredEvents({ data: filters, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  byDateRange: (startDate: string, endDate: string) =>
    queryOptions({
      queryKey: ['events', 'range', startDate, endDate],
      queryFn: async ({ signal }) => await getEventsByDateRange({ data: { startDate, endDate }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  byTeam: (teamId: string, includeAway = true) =>
    queryOptions({
      queryKey: ['events', 'team', teamId, includeAway],
      queryFn: async ({ signal }) => await getEventsByTeam({ data: { teamId, includeAway }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  byAgeGroup: (ageGroup: string, seasonId?: string) =>
    queryOptions({
      queryKey: ['events', 'ageGroup', ageGroup, seasonId],
      queryFn: async ({ signal }) => await getEventsByAgeGroup({ data: { ageGroup, seasonId }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  upcoming: () =>
    queryOptions({
      queryKey: ['events', 'upcoming'],
      queryFn: async ({ signal }) => await getUpcomingEvents({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),

  ageGroups: () =>
    queryOptions({
      queryKey: ['events', 'ageGroups'],
      queryFn: async ({ signal }) => await getAvailableAgeGroups({ signal }),
      staleTime: 1000 * 60 * 10, // 10 minutes
    }),
};

export type GameFilters = {
  seasonId?: string;
  ageGroup?: string;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'postponed' | 'cancelled' | 'all';
};

export const gamesQueries = {
  all: (filters: GameFilters = {}) =>
    queryOptions({
      queryKey: ['games', filters],
      queryFn: async ({ signal }) => await getGames({ data: filters, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),

  standings: (ageGroup: string, seasonId?: string) =>
    queryOptions({
      queryKey: ['games', 'standings', ageGroup, seasonId],
      queryFn: async ({ signal }) => await getStandings({ data: { ageGroup, seasonId }, signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
};
