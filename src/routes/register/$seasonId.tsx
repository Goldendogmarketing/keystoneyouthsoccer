import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SinglePageRegistration } from '~/components/registration/SinglePageRegistration';
import { getSeasonForRegistration } from '~/server/function/seasons';
import { queryOptions } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { AlertCircle, Calendar, Clock } from 'lucide-react';

// Query options for season data
const seasonQueryOptions = (seasonId: string) =>
  queryOptions({
    queryKey: ['season', 'registration', seasonId],
    queryFn: () => getSeasonForRegistration({ data: { seasonId } }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const Route = createFileRoute('/register/$seasonId')({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(seasonQueryOptions(params.seasonId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { seasonId } = Route.useParams();
  const { data } = useSuspenseQuery(seasonQueryOptions(seasonId));

  // Handle season not found
  if (data.error || !data.season) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              Season Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The season you're looking for doesn't exist or is no longer available.
            </p>
            <Button onClick={() => navigate({ to: '/register' })}>
              View Available Seasons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { season, registrationStatus } = data;

  // Handle registration not yet open
  if (registrationStatus.notYetOpen) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              Registration Opens Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Registration for <strong>{season.name}</strong> hasn't opened yet.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm">
                <Calendar className="mr-2 inline h-4 w-4" />
                Registration opens: <strong>{formatDate(season.registrationOpenDate)}</strong>
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate({ to: '/register' })}>
              View Other Seasons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle registration closed
  if (registrationStatus.isClosed) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card className="border-orange-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-6 w-6" />
              Registration Closed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Registration for <strong>{season.name}</strong> has ended.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm">
                Registration closed on: <strong>{formatDate(season.registrationCloseDate)}</strong>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Please contact us if you have questions or need assistance.
            </p>
            <Button variant="outline" onClick={() => navigate({ to: '/register' })}>
              View Other Seasons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle registration not currently open (admin disabled)
  if (!registrationStatus.isOpen && !registrationStatus.isLate) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
              Registration Temporarily Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Registration for <strong>{season.name}</strong> is currently unavailable.
              Please check back later or contact us for more information.
            </p>
            <Button variant="outline" onClick={() => navigate({ to: '/register' })}>
              View Other Seasons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Late registration notice */}
      {registrationStatus.isLate && (
        <div className="bg-orange-50 border-b border-orange-200 py-3">
          <div className="container mx-auto px-4">
            <p className="text-center text-orange-800">
              <AlertCircle className="mr-2 inline h-4 w-4" />
              Late registration - A ${season.lateFee.toFixed(2)} late fee has been added.
            </p>
          </div>
        </div>
      )}

      <SinglePageRegistration
        seasonId={season.id}
        seasonName={season.name}
        baseRegistrationFee={registrationStatus.totalFee}
        onSuccess={(registrationData) => {
          console.log('Registration successful:', registrationData);
          navigate({
            to: '/register/success',
            search: { confirmationNumber: registrationData.confirmationNumber },
          });
        }}
      />
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
