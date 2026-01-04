import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/register/success')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    registrationId: (search.registrationId as string) || '',
  }),
});

function RouteComponent() {
  const { registrationId } = Route.useSearch();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Registration Submitted!</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>Your registration has been successfully submitted.</p>
            <p className="mt-2">Registration ID: {registrationId}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold">Next Steps:</h3>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm">
              <li>Complete payment to confirm your registration</li>
              <li>Check your email for confirmation and payment instructions</li>
              <li>Team assignments will be sent 2 weeks before the season starts</li>
              <li>Bring your player to the first practice!</li>
            </ol>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/">Return Home</Link>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Questions? Contact us at 352.473.7777 or via email
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
