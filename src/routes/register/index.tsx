import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
});

// Mock season data - will be replaced with actual DB query in Phase 4
const MOCK_SEASONS = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Spring 2026',
    registrationFee: 125,
    registrationOpenDate: '2026-01-01',
    registrationCloseDate: '2026-03-15',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    isActive: true,
    ageGroups: 'Ages 4-18 Co-ed',
  },
];

function RouteComponent() {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_SEASONS.filter((s) => s.isActive).map((season) => (
            <Card key={season.id}>
              <CardHeader>
                <h2 className="text-2xl font-bold">{season.name}</h2>
                <p className="text-muted-foreground">{season.ageGroups}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Season Dates</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(season.startDate).toLocaleDateString()} -{' '}
                    {new Date(season.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Registration Closes</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(season.registrationCloseDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    ${season.registrationFee.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">per player</p>
                </div>
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

        {/* Info Section */}
        <div className="mt-12 rounded-lg bg-muted p-6">
          <h3 className="text-xl font-semibold">What to Expect</h3>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>✓ 5-minute registration process</li>
            <li>✓ Auto-save your progress at each step</li>
            <li>✓ Secure online payment</li>
            <li>✓ Instant email confirmation</li>
            <li>✓ Team assignments sent before season starts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
