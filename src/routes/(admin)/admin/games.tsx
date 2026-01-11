import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Badge } from '~/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Plus,
  Calendar,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Trophy,
  Loader2,
  Filter,
  CheckCircle,
  XCircle,
  PlayCircle,
} from 'lucide-react';
import { getAllGames, createGame, updateGame, deleteGame, updateGameScore } from '~/server/function/games';
import { getAllTeams } from '~/server/function/admin/get-all-teams';
import { getSeasons } from '~/server/function/seasons';

export const Route = createFileRoute('/(admin)/admin/games')({
  component: AdminGames,
});

interface GameFormData {
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledAt: string;
  scheduledTime: string;
  location: string;
  field: string;
  type: 'regular' | 'playoff' | 'tournament';
  notes: string;
}

const initialFormData: GameFormData = {
  seasonId: '',
  homeTeamId: '',
  awayTeamId: '',
  scheduledAt: '',
  scheduledTime: '10:00',
  location: '',
  field: '',
  type: 'regular',
  notes: '',
};

interface ScoreFormData {
  homeScore: string;
  awayScore: string;
}

function AdminGames() {
  const queryClient = useQueryClient();

  // Queries
  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: ['admin-games'],
    queryFn: async () => await getAllGames(),
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['admin-teams'],
    queryFn: async () => await getAllTeams(),
  });

  const { data: seasonsData } = useQuery({
    queryKey: ['seasons'],
    queryFn: async () => await getSeasons(),
  });

  const seasons = seasonsData?.seasons || [];

  // State
  const [showForm, setShowForm] = useState(false);
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scoringGameId, setScoringGameId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GameFormData>(initialFormData);
  const [scoreData, setScoreData] = useState<ScoreFormData>({ homeScore: '0', awayScore: '0' });
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAgeGroup, setFilterAgeGroup] = useState<string>('all');

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (data: GameFormData) => {
      const scheduledAt = `${data.scheduledAt}T${data.scheduledTime}:00`;
      return await createGame({
        data: {
          seasonId: data.seasonId,
          homeTeamId: data.homeTeamId || undefined,
          awayTeamId: data.awayTeamId || undefined,
          scheduledAt,
          location: data.location,
          field: data.field || undefined,
          type: data.type,
          notes: data.notes || undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: GameFormData }) => {
      const scheduledAt = `${data.scheduledAt}T${data.scheduledTime}:00`;
      return await updateGame({
        data: {
          id,
          homeTeamId: data.homeTeamId || null,
          awayTeamId: data.awayTeamId || null,
          scheduledAt,
          location: data.location,
          field: data.field || null,
          type: data.type,
          notes: data.notes || null,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteGame({ data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] });
    },
  });

  const scoreMutation = useMutation({
    mutationFn: async ({ id, homeScore, awayScore }: { id: string; homeScore: number; awayScore: number }) => {
      return await updateGameScore({
        data: {
          id,
          homeScore,
          awayScore,
          status: 'completed',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] });
      setShowScoreForm(false);
      setScoringGameId(null);
      setScoreData({ homeScore: '0', awayScore: '0' });
    },
  });

  // Helpers
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleEdit = (game: (typeof games)[0]) => {
    const date = new Date(game.scheduledAt);
    setEditingId(game.id);
    setFormData({
      seasonId: game.seasonId,
      homeTeamId: game.homeTeamId || '',
      awayTeamId: game.awayTeamId || '',
      scheduledAt: date.toISOString().split('T')[0],
      scheduledTime: date.toTimeString().slice(0, 5),
      location: game.location,
      field: game.field || '',
      type: game.type as 'regular' | 'playoff' | 'tournament',
      notes: game.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleScoreEdit = (game: (typeof games)[0]) => {
    setScoringGameId(game.id);
    setScoreData({
      homeScore: String(game.homeScore || 0),
      awayScore: String(game.awayScore || 0),
    });
    setShowScoreForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoringGameId) {
      scoreMutation.mutate({
        id: scoringGameId,
        homeScore: parseInt(scoreData.homeScore) || 0,
        awayScore: parseInt(scoreData.awayScore) || 0,
      });
    }
  };

  // Filter teams by selected season
  const filteredTeams = formData.seasonId
    ? teams.filter((t) => t.seasonId === formData.seasonId)
    : teams;

  // Get unique age groups from teams
  const ageGroups = [...new Set(teams.map((t) => t.ageGroup))].sort();

  // Filter games
  const filteredGames = games.filter((game) => {
    if (filterSeason !== 'all' && game.seasonId !== filterSeason) return false;
    if (filterStatus !== 'all' && game.status !== filterStatus) return false;
    if (filterAgeGroup !== 'all') {
      const homeTeamAgeGroup = game.homeTeam?.ageGroup;
      const awayTeamAgeGroup = game.awayTeam?.ageGroup;
      if (homeTeamAgeGroup !== filterAgeGroup && awayTeamAgeGroup !== filterAgeGroup) return false;
    }
    return true;
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  // Stats
  const scheduledCount = games.filter((g) => g.status === 'scheduled').length;
  const completedCount = games.filter((g) => g.status === 'completed').length;
  const cancelledCount = games.filter((g) => g.status === 'cancelled').length;

  if (gamesLoading) {
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
          <h1 className="text-3xl font-bold">Game Schedule</h1>
          <p className="text-muted-foreground">Manage games and record scores</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(initialFormData);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Games</p>
                <p className="text-2xl font-bold">{games.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{scheduledCount}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">{cancelledCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterSeason} onValueChange={setFilterSeason}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Seasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                {seasons.map((season) => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Age Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Age Groups</SelectItem>
                {ageGroups.map((ag) => (
                  <SelectItem key={ag} value={ag}>
                    {ag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Games List */}
      <div className="space-y-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onScore={handleScoreEdit}
            />
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No games found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Game
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Game Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Game' : 'Add New Game'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update game details' : 'Schedule a new game between two teams'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seasonId">Season *</Label>
              <Select
                value={formData.seasonId}
                onValueChange={(value) => setFormData({ ...formData, seasonId: value, homeTeamId: '', awayTeamId: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.id} value={season.id}>
                      {season.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="homeTeamId">Home Team</Label>
                <Select
                  value={formData.homeTeamId}
                  onValueChange={(value) => setFormData({ ...formData, homeTeamId: value })}
                  disabled={!formData.seasonId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select home team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">TBD</SelectItem>
                    {filteredTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name} ({team.ageGroup})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="awayTeamId">Away Team</Label>
                <Select
                  value={formData.awayTeamId}
                  onValueChange={(value) => setFormData({ ...formData, awayTeamId: value })}
                  disabled={!formData.seasonId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select away team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">TBD</SelectItem>
                    {filteredTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name} ({team.ageGroup})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Date *</Label>
                <Input
                  id="scheduledAt"
                  type="date"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledTime">Time *</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Main Soccer Complex"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <Input
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  placeholder="e.g., Field A"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Game Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as 'regular' | 'playoff' | 'tournament' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Season</SelectItem>
                  <SelectItem value="playoff">Playoff</SelectItem>
                  <SelectItem value="tournament">Tournament</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
                rows={2}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !formData.seasonId}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingId ? 'Save Changes' : 'Add Game'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Score Dialog */}
      <Dialog open={showScoreForm} onOpenChange={(open) => !open && setShowScoreForm(false)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Record Game Score</DialogTitle>
            <DialogDescription>Enter the final score for this game</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScoreSubmit} className="space-y-4">
            {scoringGameId && (() => {
              const game = games.find((g) => g.id === scoringGameId);
              if (!game) return null;
              return (
                <div className="text-center py-2 text-muted-foreground">
                  {game.homeTeam?.name || 'TBD'} vs {game.awayTeam?.name || 'TBD'}
                </div>
              );
            })()}
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="homeScore">Home Score</Label>
                <Input
                  id="homeScore"
                  type="number"
                  min="0"
                  value={scoreData.homeScore}
                  onChange={(e) => setScoreData({ ...scoreData, homeScore: e.target.value })}
                  className="text-center text-2xl font-bold h-14"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="awayScore">Away Score</Label>
                <Input
                  id="awayScore"
                  type="number"
                  min="0"
                  value={scoreData.awayScore}
                  onChange={(e) => setScoreData({ ...scoreData, awayScore: e.target.value })}
                  className="text-center text-2xl font-bold h-14"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowScoreForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={scoreMutation.isPending}>
                {scoreMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Score
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface GameCardProps {
  game: {
    id: string;
    scheduledAt: string;
    location: string;
    field: string | null;
    type: string | null;
    status: string | null;
    homeScore: number | null;
    awayScore: number | null;
    homeTeam: { id: string; name: string; ageGroup: string } | null;
    awayTeam: { id: string; name: string; ageGroup: string } | null;
    season: { id: string; name: string } | null;
  };
  onEdit: (game: GameCardProps['game']) => void;
  onDelete: (id: string) => void;
  onScore: (game: GameCardProps['game']) => void;
}

function GameCard({ game, onEdit, onDelete, onScore }: GameCardProps) {
  const gameDate = new Date(game.scheduledAt);
  const isCompleted = game.status === 'completed';
  const isCancelled = game.status === 'cancelled';
  const isPast = gameDate < new Date() && !isCompleted && !isCancelled;

  const getStatusBadge = () => {
    switch (game.status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">In Progress</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Cancelled</Badge>;
      default:
        return isPast
          ? <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Needs Score</Badge>
          : <Badge variant="outline">Scheduled</Badge>;
    }
  };

  const getTypeBadge = () => {
    switch (game.type) {
      case 'playoff':
        return <Badge variant="secondary">Playoff</Badge>;
      case 'tournament':
        return <Badge variant="secondary">Tournament</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={isCancelled ? 'opacity-60' : ''}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Teams */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge()}
              {getTypeBadge()}
              {game.homeTeam?.ageGroup && (
                <Badge variant="outline">{game.homeTeam.ageGroup}</Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[120px]">
                <p className="font-semibold">{game.homeTeam?.name || 'TBD'}</p>
                <p className="text-xs text-muted-foreground">Home</p>
                {isCompleted && (
                  <p className="text-3xl font-bold mt-1">{game.homeScore}</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-muted-foreground">vs</p>
              </div>
              <div className="text-center min-w-[120px]">
                <p className="font-semibold">{game.awayTeam?.name || 'TBD'}</p>
                <p className="text-xs text-muted-foreground">Away</p>
                {isCompleted && (
                  <p className="text-3xl font-bold mt-1">{game.awayScore}</p>
                )}
              </div>
            </div>
          </div>

          {/* Date/Time/Location */}
          <div className="flex flex-col gap-1 text-sm text-muted-foreground md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Calendar className="h-4 w-4" />
              <span>
                {gameDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Clock className="h-4 w-4" />
              <span>
                {gameDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <MapPin className="h-4 w-4" />
              <span>{game.location}{game.field ? ` - ${game.field}` : ''}</span>
            </div>
            {game.season && (
              <div className="text-xs mt-1">
                <span className="text-muted-foreground/70">{game.season.name}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 md:flex-col">
            {(game.status === 'scheduled' || isPast) && !isCancelled && (
              <Button variant="outline" size="sm" onClick={() => onScore(game)}>
                <Trophy className="mr-2 h-4 w-4" />
                Score
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onEdit(game)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(game.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
