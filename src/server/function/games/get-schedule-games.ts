import { createServerFn } from '@tanstack/react-start';
import { db, games, teams, seasons } from '~/db';
import { eq, and, gte, inArray } from 'drizzle-orm';

// Team colors for visual distinction
const TEAM_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#84CC16', // Lime
  '#14B8A6', // Teal
  '#A855F7', // Violet
];

export interface ScheduleGame {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    color: string;
  } | null;
  awayTeam: {
    id: string;
    name: string;
    color: string;
  } | null;
  scheduledAt: string;
  location: string;
  field: string | null;
  type: string;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
}

export interface LeagueSchedule {
  ageGroup: string;
  teams: {
    id: string;
    name: string;
    color: string;
  }[];
  games: ScheduleGame[];
}

export const getScheduleGames = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    // Get the active season
    const [activeSeason] = await db
      .select()
      .from(seasons)
      .where(eq(seasons.isActive, true))
      .limit(1);

    if (!activeSeason) {
      return { leagues: [], season: null };
    }

    // Get all teams for this season
    const teamsList = await db
      .select()
      .from(teams)
      .where(eq(teams.seasonId, activeSeason.id));

    // Create a map of teams with colors assigned by age group
    const teamsByAgeGroup = new Map<string, typeof teamsList>();
    const teamColorMap = new Map<string, string>();

    teamsList.forEach((team) => {
      if (!teamsByAgeGroup.has(team.ageGroup)) {
        teamsByAgeGroup.set(team.ageGroup, []);
      }
      teamsByAgeGroup.get(team.ageGroup)!.push(team);
    });

    // Assign colors to teams within each age group
    teamsByAgeGroup.forEach((teamsInGroup) => {
      teamsInGroup.forEach((team, index) => {
        teamColorMap.set(team.id, TEAM_COLORS[index % TEAM_COLORS.length]);
      });
    });

    // Get all games for this season
    const gamesList = await db
      .select()
      .from(games)
      .where(eq(games.seasonId, activeSeason.id));

    // Build the leagues response
    const leagues: LeagueSchedule[] = [];
    const ageGroups = ['U6', 'U8', 'U10', '12U', '15U', 'High School'];

    ageGroups.forEach((ageGroup) => {
      const teamsInLeague = teamsList.filter((t) => t.ageGroup === ageGroup);
      if (teamsInLeague.length === 0) return;

      const teamIds = teamsInLeague.map((t) => t.id);

      // Get games where either home or away team is in this league
      const leagueGames = gamesList.filter(
        (g) =>
          (g.homeTeamId && teamIds.includes(g.homeTeamId)) ||
          (g.awayTeamId && teamIds.includes(g.awayTeamId))
      );

      const formattedGames: ScheduleGame[] = leagueGames.map((game) => {
        const homeTeam = teamsList.find((t) => t.id === game.homeTeamId);
        const awayTeam = teamsList.find((t) => t.id === game.awayTeamId);

        return {
          id: game.id,
          homeTeam: homeTeam
            ? {
                id: homeTeam.id,
                name: homeTeam.name,
                color: teamColorMap.get(homeTeam.id) || '#6B7280',
              }
            : null,
          awayTeam: awayTeam
            ? {
                id: awayTeam.id,
                name: awayTeam.name,
                color: teamColorMap.get(awayTeam.id) || '#6B7280',
              }
            : null,
          scheduledAt: game.scheduledAt.toISOString(),
          location: game.location,
          field: game.field,
          type: game.type || 'regular',
          status: game.status || 'scheduled',
          homeScore: game.homeScore,
          awayScore: game.awayScore,
        };
      });

      leagues.push({
        ageGroup,
        teams: teamsInLeague.map((t) => ({
          id: t.id,
          name: t.name,
          color: teamColorMap.get(t.id) || '#6B7280',
        })),
        games: formattedGames.sort(
          (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
        ),
      });
    });

    return {
      leagues,
      season: {
        id: activeSeason.id,
        name: activeSeason.name,
        startDate: activeSeason.startDate,
        endDate: activeSeason.endDate,
      },
    };
  } catch (error) {
    console.error('Error fetching schedule games:', error);
    return { leagues: [], season: null };
  }
});
