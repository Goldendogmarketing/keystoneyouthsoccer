import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAllPlayers } from '~/server/function/admin/get-all-players';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Search, Users, UserPlus, Download } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/(admin)/admin/players')({
  component: AdminPlayersPage,
});

function AdminPlayersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: players, isLoading } = useQuery({
    queryKey: ['admin-players'],
    queryFn: async () => await getAllPlayers(),
  });

  const filteredPlayers = players?.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.player.firstName.toLowerCase().includes(query) ||
      p.player.lastName.toLowerCase().includes(query) ||
      p.parent.name?.toLowerCase().includes(query) ||
      p.parent.email.toLowerCase().includes(query)
    );
  });

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate stats
  const totalPlayers = players?.length || 0;
  const maleCount = players?.filter((p) => p.player.gender === 'male').length || 0;
  const femaleCount = players?.filter((p) => p.player.gender === 'female').length || 0;
  const averageAge = players?.length
    ? Math.round(
        players.reduce((sum, p) => sum + calculateAge(p.player.dateOfBirth), 0) / players.length
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Players</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all registered players in the system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Total Players</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPlayers}</div>
            <p className="mt-1 text-xs text-muted-foreground">Registered players</p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Male</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <UserPlus className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{maleCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalPlayers > 0 ? Math.round((maleCount / totalPlayers) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Female</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <UserPlus className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{femaleCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalPlayers > 0 ? Math.round((femaleCount / totalPlayers) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Average Age</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <span className="text-lg font-semibold text-accent">#</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageAge}</div>
            <p className="mt-1 text-xs text-muted-foreground">Years old</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search players by name or parent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="hover-gold-bg">
          <Download className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </div>

      {/* Players Table */}
      {isLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="text-muted-foreground">Loading players...</div>
            </div>
          </CardContent>
        </Card>
      ) : filteredPlayers && filteredPlayers.length > 0 ? (
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle>Player Directory ({filteredPlayers.length})</CardTitle>
            <CardDescription>Complete list of all registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 text-left text-sm font-semibold">Name</th>
                    <th className="p-4 text-left text-sm font-semibold">Age</th>
                    <th className="p-4 text-left text-sm font-semibold">Gender</th>
                    <th className="p-4 text-left text-sm font-semibold">Date of Birth</th>
                    <th className="p-4 text-left text-sm font-semibold">Parent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((p) => (
                    <tr
                      key={p.player.id}
                      className="border-b border-border transition-colors hover:bg-muted/50 hover-gold-bg"
                    >
                      <td className="p-4 text-sm">
                        <div className="font-medium">
                          {p.player.firstName} {p.player.lastName}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <span className="font-semibold">{calculateAge(p.player.dateOfBirth)}</span>
                      </td>
                      <td className="p-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                          {p.player.gender}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(p.player.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm">
                        <div className="font-medium">{p.parent.name}</div>
                        <div className="text-xs text-muted-foreground">{p.parent.email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchQuery ? 'No players found matching your search.' : 'No players registered yet.'}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
