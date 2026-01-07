import { queryOptions } from '@tanstack/react-query';
import { getAnnouncements, getActiveAnnouncements } from '~/server/function/announcements';

export const announcementsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['announcements'],
      queryFn: async ({ signal }) => await getAnnouncements({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
  active: () =>
    queryOptions({
      queryKey: ['announcements', 'active'],
      queryFn: async ({ signal }) => await getActiveAnnouncements({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
};
