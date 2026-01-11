import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryOptions } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Calendar, DollarSign, Users, Loader2 } from 'lucide-react';
import { getActiveSeasons } from '~/server/function/seasons';

// Query options for active seasons
const activeSeasonsQueryOptions = () =>
  queryOptions({
    queryKey: ['seasons', 'active'],
    queryFn: () => getActiveSeasons(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const Route = createFileRoute('/register/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(activeSeasonsQueryOptions());
  },
  component: RouteComponent,
  pendingComponent: LoadingComponent,
});

function LoadingComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function RouteComponent() {
  const { data: seasons } = useSuspenseQuery(activeSeasonsQueryOptions());

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Youth Soccer Registration</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join Keystone Youth Soccer and give your child an exciting season of fun, teamwork, and
            skill development!
          </p>
        </div>

        {seasons.length === 0 ? (
          <Card className="mx-auto max-w-md">
            <CardContent className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">No Open Registrations</h2>
              <p className="mt-2 text-muted-foreground">
                There are no seasons with open registration at this time.
                Please check back later or contact us for more information.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seasons.map((season) => (
              <Card key={season.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{season.name}</h2>
                      {season.ageGroups && season.ageGroups.length > 0 && (
                        <p className="text-muted-foreground">
                          Ages: {season.ageGroups.join(', ')}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Open
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Season:</span>
                    <span>
                      {formatDate(season.startDate)} - {formatDate(season.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Registration Closes:</span>
                    <span>{formatDate(season.registrationCloseDate)}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-3xl font-bold text-primary">
                      ${season.registrationFee.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">per player</p>
                    {season.lateFee > 0 && (
                      <p className="text-xs text-orange-600 mt-1">
                        Late fee: ${season.lateFee.toFixed(2)} after registration closes
                      </p>
                    )}
                  </div>
                  {season.description && (
                    <p className="text-sm text-muted-foreground pt-2">
                      {season.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/register/$seasonId" params={{ seasonId: season.id }}>
                      Register Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Have questions? Contact us at{' '}
            <a href="mailto:info@keystoneyouthsoccer.org" className="text-primary hover:underline">
              info@keystoneyouthsoccer.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
