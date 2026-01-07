import { queryOptions } from '@tanstack/react-query';
import { getEvents, getEventsByDateRange, getUpcomingEvents } from '~/server/function/events';

export const eventsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['events'],
      queryFn: async ({ signal }) => await getEvents({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
  byDateRange: (startDate: string, endDate: string) =>
    queryOptions({
      queryKey: ['events', 'range', startDate, endDate],
      queryFn: async ({ signal }) =>
        await getEventsByDateRange({ data: { startDate, endDate }, signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
  upcoming: () =>
    queryOptions({
      queryKey: ['events', 'upcoming'],
      queryFn: async ({ signal }) => await getUpcomingEvents({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
};
