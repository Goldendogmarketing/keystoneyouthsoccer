import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getScheduleGames, type ScheduleGame } from '~/server/function/games/get-schedule-games';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { cn } from '~/lib/utils';

export const Route = createFileRoute('/(marketing)/schedule')({
  component: SchedulePage,
});

function SchedulePage() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ['schedule-games'],
    queryFn: async () => await getScheduleGames(),
  });

  const leagues = data?.leagues || [];
  const season = data?.season;

  // Auto-select first league if none selected
  const activeLeague = selectedLeague || leagues[0]?.ageGroup || null;
  const currentLeagueData = leagues.find((l) => l.ageGroup === activeLeague);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Game Schedule
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {season ? `${season.name} Season Schedule` : 'View all upcoming games and results'}
            </p>
          </div>
        </div>
      </section>

      {/* League Navigation */}
      <section className="border-b bg-card sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {leagues.map((league) => (
              <Button
                key={league.ageGroup}
                variant={activeLeague === league.ageGroup ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLeague(league.ageGroup)}
                className="whitespace-nowrap"
              >
                {league.ageGroup}
              </Button>
            ))}
            {leagues.length === 0 && !isLoading && (
              <p className="text-muted-foreground">No leagues available</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : currentLeagueData ? (
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Team Legend */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Teams</h3>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {currentLeagueData.teams.map((team) => (
                      <div key={team.id} className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: team.color }}
                        />
                        <span className="text-sm truncate">{team.name}</span>
                      </div>
                    ))}
                    {currentLeagueData.teams.length === 0 && (
                      <p className="text-sm text-muted-foreground">No teams yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Calendar View */}
              <div className="lg:col-span-3">
                <ScheduleCalendar
                  games={currentLeagueData.games}
                  currentMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Schedule Available</h3>
              <p className="text-muted-foreground">
                The schedule for this season hasn't been posted yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

interface ScheduleCalendarProps {
  games: ScheduleGame[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

function ScheduleCalendar({ games, currentMonth, onMonthChange }: ScheduleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get calendar days for current month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Create array of days
  const days: (number | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Get games for a specific date
  const getGamesForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return games.filter((game) => game.scheduledAt.startsWith(dateStr));
  };

  // Navigate months
  const prevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get games for selected date
  const selectedDateGames = selectedDate
    ? games.filter((game) => game.scheduledAt.startsWith(selectedDate))
    : [];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayGames = getGamesForDate(day);
              const isSelected = selectedDate === dateStr;
              const isToday =
                new Date().toISOString().split('T')[0] === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={cn(
                    'aspect-square p-1 rounded-lg border transition-all relative',
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent hover:bg-muted',
                    isToday && !isSelected && 'border-primary/50'
                  )}
                >
                  <span
                    className={cn(
                      'text-sm',
                      isToday && 'font-bold text-primary'
                    )}
                  >
                    {day}
                  </span>

                  {/* Game indicators */}
                  {dayGames.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-0.5 flex-wrap">
                      {dayGames.slice(0, 3).map((game) => (
                        <div
                          key={game.id}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: game.homeTeam?.color || '#6B7280',
                          }}
                        />
                      ))}
                      {dayGames.length > 3 && (
                        <span className="text-[8px] text-muted-foreground">
                          +{dayGames.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Games */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">
              Games on {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
          </CardHeader>
          <CardContent>
            {selectedDateGames.length > 0 ? (
              <div className="space-y-3">
                {selectedDateGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No games scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Games List */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Upcoming Games</h3>
        </CardHeader>
        <CardContent>
          {games.filter((g) => g.status === 'scheduled' && new Date(g.scheduledAt) >= new Date()).length > 0 ? (
            <div className="space-y-3">
              {games
                .filter((g) => g.status === 'scheduled' && new Date(g.scheduledAt) >= new Date())
                .slice(0, 5)
                .map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No upcoming games scheduled.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function GameCard({ game }: { game: ScheduleGame }) {
  const gameDate = new Date(game.scheduledAt);
  const isCompleted = game.status === 'completed';

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border">
      {/* Teams */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="h-3 w-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: game.homeTeam?.color || '#6B7280' }}
          />
          <span className="font-medium truncate">
            {game.homeTeam?.name || 'TBD'}
          </span>
          {isCompleted && (
            <span className="font-bold text-sm">{game.homeScore}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: game.awayTeam?.color || '#6B7280' }}
          />
          <span className="font-medium truncate">
            {game.awayTeam?.name || 'TBD'}
          </span>
          {isCompleted && (
            <span className="font-bold text-sm">{game.awayScore}</span>
          )}
        </div>
      </div>

      {/* Time & Location */}
      <div className="text-right text-sm flex-shrink-0">
        <div className="flex items-center justify-end gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {gameDate.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="flex items-center justify-end gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate max-w-24">{game.field || game.location}</span>
        </div>
      </div>

      {/* Status badge */}
      {isCompleted && (
        <div className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Final
        </div>
      )}
    </div>
  );
}
