import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import {
  Plus,
  Layers,
  Edit,
  Trash2,
  Users,
  Shield,
  Calendar,
  ChevronRight,
  Settings,
  Loader2,
} from 'lucide-react';
import { leaguesQueries } from '~/lib/leagues/queries';
import { createLeague, updateLeague, deleteLeague, toggleLeagueActive } from '~/server/function/leagues';

export const Route = createFileRoute('/(admin)/admin/leagues')({
  component: AdminLeagues,
});

interface FormData {
  name: string;
  startDate: string;
  endDate: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  registrationFee: string;
  description: string;
}

const initialFormData: FormData = {
  name: '',
  startDate: '',
  endDate: '',
  registrationOpenDate: '',
  registrationCloseDate: '',
  registrationFee: '75.00',
  description: '',
};

function AdminLeagues() {
  const queryClient = useQueryClient();
  const { data: leagues = [], isLoading } = useQuery(leaguesQueries.all());

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await createLeague({
        data: {
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          registrationOpenDate: data.registrationOpenDate,
          registrationCloseDate: data.registrationCloseDate,
          registrationFee: data.registrationFee,
          description: data.description || undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      return await updateLeague({
        data: {
          id,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          registrationOpenDate: data.registrationOpenDate,
          registrationCloseDate: data.registrationCloseDate,
          registrationFee: data.registrationFee,
          description: data.description || undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteLeague({ data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      return await toggleLeagueActive({ data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleEdit = (league: (typeof leagues)[0]) => {
    setEditingId(league.id);
    setFormData({
      name: league.name,
      startDate: league.startDate,
      endDate: league.endDate,
      registrationOpenDate: league.registrationOpenDate,
      registrationCloseDate: league.registrationCloseDate,
      registrationFee: league.registrationFee,
      description: league.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this league? This will also delete all associated teams.')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const activeLeagues = leagues.filter((l) => l.isActive);
  const pastLeagues = leagues.filter((l) => !l.isActive);
  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leagues</h1>
          <p className="text-muted-foreground">Manage leagues, divisions, and team assignments</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData(initialFormData); }}>
          <Plus className="mr-2 h-4 w-4" />
          Create League
        </Button>
      </div>

      {/* Create/Edit League Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit League' : 'Create New League'}</DialogTitle>
            <DialogDescription>Set up a new league for an upcoming season</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">League Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Spring 2026"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Season Start</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Season End</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="registrationOpenDate">Registration Opens</Label>
                <Input
                  id="registrationOpenDate"
                  type="date"
                  value={formData.registrationOpenDate}
                  onChange={(e) => setFormData({ ...formData, registrationOpenDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationCloseDate">Registration Closes</Label>
                <Input
                  id="registrationCloseDate"
                  type="date"
                  value={formData.registrationCloseDate}
                  onChange={(e) => setFormData({ ...formData, registrationCloseDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationFee">Registration Fee ($)</Label>
              <Input
                id="registrationFee"
                type="number"
                step="0.01"
                value={formData.registrationFee}
                onChange={(e) => setFormData({ ...formData, registrationFee: e.target.value })}
                placeholder="75.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="League description..."
                rows={2}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingId ? 'Save Changes' : 'Create League'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Active Leagues */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Active Leagues
        </h2>

        {activeLeagues.length > 0 ? (
          <div className="space-y-4">
            {activeLeagues.map((league) => (
              <Card key={league.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        {league.name}
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Active</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {new Date(league.startDate).toLocaleDateString()} -{' '}
                        {new Date(league.endDate).toLocaleDateString()}
                        {' • '}${league.registrationFee} registration
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(league)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleMutation.mutate(league.id)}
                        disabled={toggleMutation.isPending}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Layers className="h-4 w-4" />
                        <span className="text-sm">Age Groups</span>
                      </div>
                      <span className="text-2xl font-bold">{league.divisions.length}</span>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm">Teams</span>
                      </div>
                      <span className="text-2xl font-bold">{league.teamCount}</span>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Players</span>
                      </div>
                      <span className="text-2xl font-bold">{league.playerCount}</span>
                    </div>
                  </div>

                  {/* Divisions */}
                  {league.divisions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Age Groups</h4>
                      </div>
                      <div className="divide-y rounded-lg border">
                        {league.divisions.map((division) => (
                          <div key={division.ageGroup} className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{division.ageGroup}</span>
                              </div>
                              <div>
                                <p className="font-medium">{division.ageGroup} Division</p>
                                <p className="text-sm text-muted-foreground">{division.teamCount} teams</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Manage Teams
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {league.divisions.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground border rounded-lg">
                      No teams registered yet
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-6 pt-4 border-t">
                    <Button variant="outline" className="flex-1" disabled>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Schedule
                    </Button>
                    <Button variant="outline" className="flex-1" disabled>
                      <Users className="mr-2 h-4 w-4" />
                      Team Assignments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center">
                <Layers className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No active leagues</p>
                <Button variant="outline" className="mt-4" onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create League
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Leagues */}
      {pastLeagues.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            Past / Inactive Leagues
          </h2>

          <div className="space-y-4">
            {pastLeagues.map((league) => (
              <Card key={league.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        {league.name}
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">Inactive</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {new Date(league.startDate).toLocaleDateString()} -{' '}
                        {new Date(league.endDate).toLocaleDateString()}
                        {' • '}{league.divisions.length} age groups • {league.teamCount} teams •{' '}
                        {league.playerCount} players
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMutation.mutate(league.id)}
                        disabled={toggleMutation.isPending}
                      >
                        Activate
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(league)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(league.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setExpandedLeague(expandedLeague === league.id ? null : league.id)}
                  >
                    View Age Groups & Stats
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${expandedLeague === league.id ? 'rotate-90' : ''}`}
                    />
                  </Button>

                  {expandedLeague === league.id && (
                    <div className="mt-4 space-y-2">
                      {league.divisions.length > 0 ? (
                        league.divisions.map((division) => (
                          <div
                            key={division.ageGroup}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted"
                          >
                            <span className="font-medium">{division.ageGroup} Division</span>
                            <span className="text-sm text-muted-foreground">{division.teamCount} teams</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">No teams were registered</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
