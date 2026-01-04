import { createServerFn } from '@tanstack/react-start';
import { db, games, teams } from '~/db';
import { eq, and, gte, lte, inArray } from 'drizzle-orm';

export const getTickerGames = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const sevenDaysAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Get recent results (completed games from last 3 days)
    const recentGames = await db
      .select()
      .from(games)
      .where(
        and(
          eq(games.status, 'completed'),
          gte(games.scheduledAt, threeDaysAgo),
          lte(games.scheduledAt, now),
        ),
      )
      .limit(10);

    // Get upcoming games (next 7 days)
    const upcomingGamesList = await db
      .select()
      .from(games)
      .where(and(eq(games.status, 'scheduled'), gte(games.scheduledAt, now), lte(games.scheduledAt, sevenDaysAhead)))
      .limit(10);

  // Get all unique team IDs
  const teamIds = [
    ...recentGames.map((g) => g.homeTeamId).filter(Boolean),
    ...recentGames.map((g) => g.awayTeamId).filter(Boolean),
    ...upcomingGamesList.map((g) => g.homeTeamId).filter(Boolean),
    ...upcomingGamesList.map((g) => g.awayTeamId).filter(Boolean),
  ].filter((id, index, self) => self.indexOf(id) === index);

  // Fetch all teams in one query
  const teamsMap = new Map();
  if (teamIds.length > 0) {
    const teamsList = await db.select().from(teams).where(inArray(teams.id, teamIds));
    teamsList.forEach((team) => {
      teamsMap.set(team.id, team);
    });
  }

  // Format for ticker
  const tickerItems = [
    ...recentGames.map((game) => ({
      id: game.id,
      type: 'result' as const,
      homeTeam: teamsMap.get(game.homeTeamId)?.name || 'TBD',
      awayTeam: teamsMap.get(game.awayTeamId)?.name || 'TBD',
      homeScore: game.homeScore,
      awayScore: game.awayScore,
    })),
    ...upcomingGamesList.map((game) => {
      const scheduledDate = game.scheduledAt instanceof Date ? game.scheduledAt : new Date(game.scheduledAt);
      return {
        id: game.id,
        type: 'upcoming' as const,
        homeTeam: teamsMap.get(game.homeTeamId)?.name || 'TBD',
        awayTeam: teamsMap.get(game.awayTeamId)?.name || 'TBD',
        time: scheduledDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
        location: game.location,
      };
    }),
  ];

    return tickerItems;
  } catch (error) {
    // If database query fails (e.g., table doesn't exist), return empty array
    // This allows the page to load even if games data isn't available
    console.error('Error fetching ticker games:', error);
    return [];
  }
});
