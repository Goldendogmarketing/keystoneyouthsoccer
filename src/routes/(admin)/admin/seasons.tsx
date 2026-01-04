import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAllSeasons } from '~/server/function/admin/get-all-seasons';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Plus, Calendar, DollarSign, Users, Edit } from 'lucide-react';

export const Route = createFileRoute('/(admin)/admin/seasons')({
  component: AdminSeasonsPage,
});

function AdminSeasonsPage() {
  const { data: seasons, isLoading } = useQuery({
    queryKey: ['admin-seasons'],
    queryFn: async () => await getAllSeasons(),
  });

  const isSeasonActive = (season: any) => {
    const now = new Date();
    const start = new Date(season.startDate);
    const end = new Date(season.endDate);
    return now >= start && now <= end;
  };

  const isRegistrationOpen = (season: any) => {
    if (!season.registrationStartDate || !season.registrationEndDate) return false;
    const now = new Date();
    const start = new Date(season.registrationStartDate);
    const end = new Date(season.registrationEndDate);
    return now >= start && now <= end;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Seasons Management</h1>
          <p className="text-muted-foreground">Manage soccer seasons and registration periods ({seasons?.length || 0} seasons)</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Season
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading seasons...</div>
        </div>
      ) : seasons && seasons.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {seasons.map((season) => (
            <Card key={season.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{season.name}</CardTitle>
                    <div className="mt-2 flex gap-2">
                      {isSeasonActive(season) && <Badge className="bg-green-500">Active Season</Badge>}
                      {isRegistrationOpen(season) && <Badge className="bg-blue-500">Registration Open</Badge>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Season:</span>
                    <span>
                      {new Date(season.startDate).toLocaleDateString()} -{' '}
                      {new Date(season.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  {season.registrationStartDate && season.registrationEndDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Registration:</span>
                      <span>
                        {new Date(season.registrationStartDate).toLocaleDateString()} -{' '}
                        {new Date(season.registrationEndDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Registration Fee:</span>
                    <span className="font-semibold">${parseFloat(season.registrationFee).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Registrations:</span>
                    <span>{season.registrationCount}</span>
                  </div>
                </div>
                {season.description && (
                  <p className="text-sm text-muted-foreground">{season.description}</p>
                )}
                <div className="flex gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Registrations
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Season
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">No seasons created yet.</div>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Season
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
