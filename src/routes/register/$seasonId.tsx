import { createFileRoute } from '@tanstack/react-router';
import { RegistrationWizard } from '~/components/registration/RegistrationWizard';

export const Route = createFileRoute('/register/$seasonId')({
  component: RouteComponent,
});

// Mock season lookup - will be replaced with actual DB query in Phase 4
function getMockSeason(seasonId: string) {
  return {
    id: seasonId,
    name: 'Spring 2026',
    registrationFee: 125,
    isActive: true,
  };
}

function RouteComponent() {
  const { seasonId } = Route.useParams();
  const season = getMockSeason(seasonId);

  if (!season.isActive) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Registration Closed</h1>
        <p className="mt-4 text-muted-foreground">
          Registration for this season is currently closed. Please check back later or contact us
          for more information.
        </p>
      </div>
    );
  }

  return (
    <RegistrationWizard
      seasonId={season.id}
      seasonName={season.name}
      registrationFee={season.registrationFee}
    />
  );
}
