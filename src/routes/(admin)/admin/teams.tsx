import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAllTeams } from '~/server/function/admin/get-all-teams';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Plus, Users, Edit } from 'lucide-react';

export const Route = createFileRoute('/(admin)/admin/teams')({
  component: AdminTeamsPage,
});

function AdminTeamsPage() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ['admin-teams'],
    queryFn: async () => await getAllTeams(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams Management</h1>
          <p className="text-muted-foreground">Manage teams and rosters ({teams?.length || 0} teams)</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading teams...</div>
        </div>
      ) : teams && teams.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.ageGroup}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Division</span>
                  <Badge variant="outline">{team.division || 'Not assigned'}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Season</span>
                  <span>{team.season || 'Not assigned'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Head Coach</span>
                  <span>{team.headCoach || 'Not assigned'}</span>
                </div>
                <div className="flex items-center gap-2 border-t pt-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {team.rosterCount} player{team.rosterCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Roster
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">No teams created yet.</div>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
