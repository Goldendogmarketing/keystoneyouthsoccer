import { queryOptions } from '@tanstack/react-query';
import {
  getEmailTemplates,
  getActiveEmailTemplates,
  getMessageLogs,
  getTeamsForMessages,
  getSeasonsForMessages,
  getMessageStats,
} from '~/server/function/communications';

export const communicationsQueries = {
  templates: () =>
    queryOptions({
      queryKey: ['communications', 'templates'],
      queryFn: async ({ signal }) => await getEmailTemplates({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  activeTemplates: () =>
    queryOptions({
      queryKey: ['communications', 'templates', 'active'],
      queryFn: async ({ signal }) => await getActiveEmailTemplates({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  logs: () =>
    queryOptions({
      queryKey: ['communications', 'logs'],
      queryFn: async ({ signal }) => await getMessageLogs({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
  teams: () =>
    queryOptions({
      queryKey: ['communications', 'teams'],
      queryFn: async ({ signal }) => await getTeamsForMessages({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  seasons: () =>
    queryOptions({
      queryKey: ['communications', 'seasons'],
      queryFn: async ({ signal }) => await getSeasonsForMessages({ signal }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  stats: () =>
    queryOptions({
      queryKey: ['communications', 'stats'],
      queryFn: async ({ signal }) => await getMessageStats({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
};
