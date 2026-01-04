import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getDashboardRegistrations } from '~/server/function/dashboard/get-dashboard-registrations';
import { RegistrationCard } from '~/components/dashboard/RegistrationCard';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { FileText } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/dashboard/registrations')({
  component: RegistrationsPage,
});

function RegistrationsPage() {
  const { data: registrations, isLoading } = useQuery({
    queryKey: ['dashboard-registrations'],
    queryFn: async () => await getDashboardRegistrations(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Registrations</h1>
        <p className="text-muted-foreground">View and manage your player registrations</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading registrations...</div>
        </div>
      ) : registrations && registrations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {registrations.map((item) => (
            <RegistrationCard
              key={item.registration.id}
              registration={{
                id: item.registration.id,
                status: item.registration.status,
                paymentStatus: item.registration.paymentStatus,
                amount: item.registration.amount,
                createdAt: item.registration.createdAt,
              }}
              player={{
                firstName: item.player.firstName,
                lastName: item.player.lastName,
              }}
              season={{
                name: item.season.name,
              }}
            />
          ))}
        </div>
      ) : (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            No registrations yet. Start by registering a player for the current season.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
