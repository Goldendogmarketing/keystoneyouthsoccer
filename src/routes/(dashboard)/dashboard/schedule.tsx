import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getPlayerSchedule } from '~/server/function/dashboard/get-player-schedule';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/dashboard/schedule')({
  component: SchedulePage,
});

function SchedulePage() {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ['player-schedule'],
    queryFn: async () => await getPlayerSchedule(),
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'game':
        return 'bg-blue-500';
      case 'practice':
        return 'bg-green-500';
      case 'tournament':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Schedule</h1>
        <p className="text-muted-foreground">Upcoming games and practices for your players</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading schedule...</div>
        </div>
      ) : schedule && schedule.length > 0 ? (
        <div className="space-y-4">
          {schedule.map((event) => {
            const { date, time } = formatDateTime(event.schedule.gameDate);
            return (
              <Card key={event.schedule.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className={getEventTypeColor(event.schedule.eventType)}>
                          {event.schedule.eventType.charAt(0).toUpperCase() + event.schedule.eventType.slice(1)}
                        </Badge>
                        {event.schedule.homeTeam === event.team.name && <Badge variant="outline">Home</Badge>}
                        {event.schedule.awayTeam === event.team.name && <Badge variant="outline">Away</Badge>}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {event.schedule.homeTeam} vs {event.schedule.awayTeam}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {event.player.firstName} {event.player.lastName} • {event.team.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{time}</span>
                  </div>
                  {event.schedule.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.schedule.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.team.ageGroup}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            No upcoming games or practices scheduled yet. Check back later or contact your coach.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
