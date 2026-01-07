import { queryOptions } from '@tanstack/react-query';
import { getLeagues, getTeamsBySeason } from '~/server/function/leagues';

export const leaguesQueries = {
  all: () =>
    queryOptions({
      queryKey: ['leagues'],
      queryFn: async ({ signal }) => await getLeagues({ signal }),
      staleTime: 1000 * 60, // 1 minute
    }),
  teams: (seasonId: string) =>
    queryOptions({
      queryKey: ['leagues', 'teams', seasonId],
      queryFn: async ({ signal }) => await getTeamsBySeason({ data: { seasonId }, signal }),
      staleTime: 1000 * 60, // 1 minute
      enabled: !!seasonId,
    }),
};
