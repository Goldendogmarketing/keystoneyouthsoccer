import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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
} from 'lucide-react';

export const Route = createFileRoute('/(admin)/admin/leagues')({
  component: AdminLeagues,
});

interface Division {
  id: string;
  name: string;
  ageGroup: string;
  teamCount: number;
}

interface League {
  id: string;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  divisions: Division[];
  teamCount: number;
  playerCount: number;
}

// Sample leagues - will be replaced with database data
const sampleLeagues: League[] = [
  {
    id: '1',
    name: 'Spring 2026',
    season: 'Spring',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    isActive: true,
    divisions: [
      { id: '1', name: 'U6 Division', ageGroup: 'U6', teamCount: 6 },
      { id: '2', name: 'U8 Division', ageGroup: 'U8', teamCount: 8 },
      { id: '3', name: 'U10 Division', ageGroup: 'U10', teamCount: 6 },
      { id: '4', name: 'U12 Division', ageGroup: 'U12', teamCount: 4 },
    ],
    teamCount: 24,
    playerCount: 288,
  },
  {
    id: '2',
    name: 'Fall 2025',
    season: 'Fall',
    startDate: '2025-09-01',
    endDate: '2025-11-30',
    isActive: false,
    divisions: [
      { id: '5', name: 'U6 Division', ageGroup: 'U6', teamCount: 5 },
      { id: '6', name: 'U8 Division', ageGroup: 'U8', teamCount: 7 },
      { id: '7', name: 'U10 Division', ageGroup: 'U10', teamCount: 5 },
    ],
    teamCount: 17,
    playerCount: 204,
  },
];

function AdminLeagues() {
  const [leagues, setLeagues] = useState<League[]>(sampleLeagues);
  const [showForm, setShowForm] = useState(false);
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    season: 'Spring',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeague: League = {
      id: Date.now().toString(),
      ...formData,
      isActive: false,
      divisions: [],
      teamCount: 0,
      playerCount: 0,
    };
    setLeagues([newLeague, ...leagues]);
    setShowForm(false);
    setFormData({ name: '', season: 'Spring', startDate: '', endDate: '' });
  };

  const handleToggleActive = (id: string) => {
    setLeagues(leagues.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this league?')) {
      setLeagues(leagues.filter((l) => l.id !== id));
    }
  };

  const activeLeagues = leagues.filter((l) => l.isActive);
  const pastLeagues = leagues.filter((l) => !l.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leagues</h1>
          <p className="text-muted-foreground">Manage leagues, divisions, and team assignments</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create League
        </Button>
      </div>

      {/* Create League Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New League</CardTitle>
            <CardDescription>Set up a new league for an upcoming season</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <select
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create League</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

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
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                          Active
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {new Date(league.startDate).toLocaleDateString()} - {new Date(league.endDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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
                        <span className="text-sm">Divisions</span>
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Divisions</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Division
                      </Button>
                    </div>
                    <div className="divide-y rounded-lg border">
                      {league.divisions.map((division) => (
                        <div key={division.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{division.ageGroup}</span>
                            </div>
                            <div>
                              <p className="font-medium">{division.name}</p>
                              <p className="text-sm text-muted-foreground">{division.teamCount} teams</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Manage Teams
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-6 pt-4 border-t">
                    <Button variant="outline" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Schedule
                    </Button>
                    <Button variant="outline" className="flex-1">
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
            Past Leagues
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
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          Completed
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {new Date(league.startDate).toLocaleDateString()} - {new Date(league.endDate).toLocaleDateString()}
                        {' • '}{league.divisions.length} divisions • {league.teamCount} teams • {league.playerCount} players
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleActive(league.id)}>
                        Reactivate
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(league.id)}
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
                    View Divisions & Stats
                    <ChevronRight className={`h-4 w-4 transition-transform ${expandedLeague === league.id ? 'rotate-90' : ''}`} />
                  </Button>

                  {expandedLeague === league.id && (
                    <div className="mt-4 space-y-2">
                      {league.divisions.map((division) => (
                        <div key={division.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="font-medium">{division.name}</span>
                          <span className="text-sm text-muted-foreground">{division.teamCount} teams</span>
                        </div>
                      ))}
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
