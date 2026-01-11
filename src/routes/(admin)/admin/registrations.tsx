import { createFileRoute, ClientOnly } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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
  Download,
  Filter,
  Search,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  UserCheck,
  UserX,
  ChevronDown,
  Eye,
  UserPlus,
  Loader2,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { crmQueries } from '~/lib/crm/queries';
import { leaguesQueries } from '~/lib/leagues/queries';
import {
  exportRegistrationsCsv,
  assignToTeam,
  bulkAssignToTeam,
  updateRegistration,
} from '~/server/function/crm';

export const Route = createFileRoute('/(admin)/admin/registrations')({
  component: AdminRegistrationsPage,
});

// Format date consistently to avoid hydration issues
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Format datetime consistently to avoid hydration issues
function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${month}/${day}/${year}, ${hour12}:${minutes} ${ampm}`;
}

const AGE_GROUPS = ['U6', 'U8', 'U10', 'U12', 'U14', 'U16+'];
const STATUSES = [
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-700' },
  { value: 'pending_payment', label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-700' },
];

function AdminRegistrationsPage() {
  const queryClient = useQueryClient();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [teamFilter, setTeamFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [bulkTeamId, setBulkTeamId] = useState('');

  // Detail view
  const [selectedRegistration, setSelectedRegistration] = useState<string | null>(null);

  // Queries
  const { data: stats, isLoading: statsLoading } = useQuery(crmQueries.stats());
  const { data: leagues = [] } = useQuery(leaguesQueries.all());

  const filters = {
    seasonId: selectedSeason || undefined,
    status: selectedStatus || undefined,
    ageGroup: selectedAgeGroup || undefined,
    search: searchQuery || undefined,
    teamAssigned: teamFilter === 'assigned' ? true : teamFilter === 'unassigned' ? false : undefined,
  };

  const { data: registrations = [], isLoading: registrationsLoading } = useQuery(
    crmQueries.registrations(filters)
  );

  // Get teams for assignment based on active season
  const activeSeason = leagues.find((l) => l.isActive);
  const { data: teams = [] } = useQuery({
    queryKey: ['teams-for-assignment', activeSeason?.id],
    queryFn: async () => {
      if (!activeSeason?.id) return [];
      const { getTeamsForAssignment } = await import('~/server/function/crm');
      return await getTeamsForAssignment({ data: { seasonId: activeSeason.id } });
    },
    enabled: !!activeSeason?.id,
  });

  // Mutations
  const exportMutation = useMutation({
    mutationFn: async () => {
      return await exportRegistrationsCsv({ data: { seasonId: selectedSeason || undefined } });
    },
    onSuccess: (data) => {
      const blob = new Blob([data.csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ registrationId, teamId }: { registrationId: string; teamId: string | null }) => {
      return await assignToTeam({ data: { registrationId, teamId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm'] });
    },
  });

  const bulkAssignMutation = useMutation({
    mutationFn: async ({ registrationIds, teamId }: { registrationIds: string[]; teamId: string }) => {
      return await bulkAssignToTeam({ data: { registrationIds, teamId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm'] });
      setSelectedIds(new Set());
      setShowBulkAssign(false);
      setBulkTeamId('');
    },
  });

  const handleSelectAll = () => {
    if (selectedIds.size === registrations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(registrations.map((r) => r.registration.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkAssign = () => {
    if (bulkTeamId && selectedIds.size > 0) {
      bulkAssignMutation.mutate({
        registrationIds: Array.from(selectedIds),
        teamId: bulkTeamId,
      });
    }
  };

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (paymentStatus === 'paid') {
      return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
    }
    if (paymentStatus === 'pending') {
      return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
    if (paymentStatus === 'failed') {
      return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSeason('');
    setSelectedStatus('');
    setSelectedAgeGroup('');
    setTeamFilter('');
  };

  const hasFilters = searchQuery || selectedSeason || selectedStatus || selectedAgeGroup || teamFilter;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registration CRM</h1>
        <p className="mt-2 text-muted-foreground">
          Manage player registrations, team assignments, and export data
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Total Registrations</CardDescription>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalRegistrations ?? 0}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats?.activeSeason || 'All seasons'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Paid</CardDescription>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats?.paidRegistrations ?? 0}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats?.pendingRegistrations ?? 0} pending payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Revenue</CardDescription>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(stats?.totalRevenue ?? 0).toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">From paid registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Team Assignment</CardDescription>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.assignedToTeam ?? 0}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats?.unassigned ?? 0} players need assignment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Age Group Breakdown */}
      {stats?.ageGroups && Object.keys(stats.ageGroups).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Players by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(stats.ageGroups)
                .sort(([a], [b]) => {
                  const numA = parseInt(a.replace('U', '')) || 0;
                  const numB = parseInt(b.replace('U', '')) || 0;
                  return numA - numB;
                })
                .map(([ageGroup, count]) => (
                  <div key={ageGroup} className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                    <span className="font-bold text-primary">{ageGroup}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="font-semibold">{count} players</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or confirmation #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {hasFilters && <span className="ml-2 rounded-full bg-primary px-2 text-xs text-white">!</span>}
            </Button>
            {selectedIds.size > 0 && (
              <Button variant="outline" onClick={() => setShowBulkAssign(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign {selectedIds.size} to Team
              </Button>
            )}
            <Button onClick={() => exportMutation.mutate()} disabled={exportMutation.isPending}>
              {exportMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card>
            <CardContent className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2">
                  <Label>Season</Label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All Seasons</option>
                    {leagues.map((league) => (
                      <option key={league.id} value={league.id}>
                        {league.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Status</Label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Age Group</Label>
                  <select
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All Age Groups</option>
                    {AGE_GROUPS.map((ag) => (
                      <option key={ag} value={ag}>
                        {ag}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Team Status</Label>
                  <select
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    <option value="assigned">Assigned to Team</option>
                    <option value="unassigned">Unassigned</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="ghost" onClick={clearFilters} className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bulk Assign Dialog */}
      <Dialog open={showBulkAssign} onOpenChange={setShowBulkAssign}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Players to Team</DialogTitle>
            <DialogDescription>
              Assign {selectedIds.size} selected players to a team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Team</Label>
              <select
                value={bulkTeamId}
                onChange={(e) => setBulkTeamId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Choose a team...</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.ageGroup})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkAssign(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkAssign} disabled={!bulkTeamId || bulkAssignMutation.isPending}>
              {bulkAssignMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assign to Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Registrations Table */}
      {registrationsLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ) : registrations.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Registrations ({registrations.length})</CardTitle>
            <CardDescription>Click on a row to view details or assign to a team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === registrations.length && registrations.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="p-3 text-left text-sm font-semibold">Player</th>
                    <th className="p-3 text-left text-sm font-semibold">Parent/Guardian</th>
                    <th className="p-3 text-left text-sm font-semibold">Age Group</th>
                    <th className="p-3 text-left text-sm font-semibold">Team</th>
                    <th className="p-3 text-left text-sm font-semibold">Season</th>
                    <th className="p-3 text-left text-sm font-semibold">Status</th>
                    <th className="p-3 text-left text-sm font-semibold">Date</th>
                    <th className="p-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr
                      key={reg.registration.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(reg.registration.id)}
                          onChange={() => handleSelectOne(reg.registration.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          {reg.registration.playerFirstName} {reg.registration.playerLastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {reg.registration.confirmationNumber}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          {reg.registration.parentFirstName} {reg.registration.parentLastName}
                        </div>
                        <div className="text-xs text-muted-foreground">{reg.registration.parentEmail}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{reg.registration.ageGroup || 'N/A'}</Badge>
                      </td>
                      <td className="p-3">
                        {reg.team ? (
                          <Badge className="bg-blue-100 text-blue-700">{reg.team.name}</Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Unassigned
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 text-sm">{reg.season?.name || 'N/A'}</td>
                      <td className="p-3">
                        {getStatusBadge(reg.registration.status, reg.registration.paymentStatus || 'pending')}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(reg.registration.createdAt)}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRegistration(reg.registration.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!reg.team && reg.registration.paymentStatus === 'paid' && (
                            <select
                              className="text-xs rounded border px-2 py-1"
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  assignMutation.mutate({
                                    registrationId: reg.registration.id,
                                    teamId: e.target.value,
                                  });
                                }
                              }}
                            >
                              <option value="">Assign...</option>
                              {teams
                                .filter((t) => t.ageGroup === reg.registration.ageGroup)
                                .map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name}
                                  </option>
                                ))}
                            </select>
                          )}
                        </div>
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
            {hasFilters ? 'No registrations found matching your filters.' : 'No registrations found.'}
          </CardContent>
        </Card>
      )}

      {/* Registration Detail Dialog */}
      <Dialog open={!!selectedRegistration} onOpenChange={() => setSelectedRegistration(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <RegistrationDetailView
              registrationId={selectedRegistration}
              teams={teams}
              onClose={() => setSelectedRegistration(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RegistrationDetailView({
  registrationId,
  teams,
  onClose,
}: {
  registrationId: string;
  teams: { id: string; name: string; ageGroup: string }[];
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(crmQueries.registrationDetails(registrationId));

  const assignMutation = useMutation({
    mutationFn: async ({ registrationId, teamId }: { registrationId: string; teamId: string | null }) => {
      return await assignToTeam({ data: { registrationId, teamId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm'] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-8 text-muted-foreground">Registration not found</div>;
  }

  const { registration, season, team } = data;

  return (
    <div className="space-y-6">
      {/* Confirmation & Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Confirmation #</p>
          <p className="font-mono font-bold">{registration.confirmationNumber}</p>
        </div>
        <Badge
          className={
            registration.paymentStatus === 'paid'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }
        >
          {registration.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
        </Badge>
      </div>

      {/* Player Info */}
      <div>
        <h4 className="font-semibold mb-2">Player Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium">
              {registration.playerFirstName} {registration.playerLastName}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Date of Birth</p>
            <p className="font-medium">{registration.playerDateOfBirth}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Gender</p>
            <p className="font-medium capitalize">{registration.playerGender}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Age Group</p>
            <p className="font-medium">{registration.ageGroup || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Team Assignment */}
      <div>
        <h4 className="font-semibold mb-2">Team Assignment</h4>
        <div className="flex items-center gap-4">
          {team ? (
            <Badge className="bg-blue-100 text-blue-700">{team.name}</Badge>
          ) : (
            <Badge variant="outline">Unassigned</Badge>
          )}
          <select
            className="text-sm rounded border px-3 py-2"
            value={team?.id || ''}
            onChange={(e) => {
              assignMutation.mutate({
                registrationId: registration.id,
                teamId: e.target.value || null,
              });
            }}
          >
            <option value="">No Team</option>
            {teams
              .filter((t) => t.ageGroup === registration.ageGroup)
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.ageGroup})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Parent Info */}
      <div>
        <h4 className="font-semibold mb-2">Parent/Guardian</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium">
              {registration.parentFirstName} {registration.parentLastName}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{registration.parentEmail}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{registration.parentPhone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium">
              {registration.parentAddress}, {registration.parentCity}, {registration.parentState}{' '}
              {registration.parentZipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div>
        <h4 className="font-semibold mb-2">Emergency Contacts</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Primary</p>
            <p className="font-medium">{registration.emergency1Name}</p>
            <p className="text-muted-foreground">{registration.emergency1Phone}</p>
          </div>
          {registration.emergency2Name && (
            <div>
              <p className="text-muted-foreground">Secondary</p>
              <p className="font-medium">{registration.emergency2Name}</p>
              <p className="text-muted-foreground">{registration.emergency2Phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Medical Info */}
      {(registration.allergies || registration.medicalConditions) && (
        <div>
          <h4 className="font-semibold mb-2">Medical Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {registration.allergies && (
              <div>
                <p className="text-muted-foreground">Allergies</p>
                <p className="font-medium">{registration.allergies}</p>
              </div>
            )}
            {registration.medicalConditions && (
              <div>
                <p className="text-muted-foreground">Medical Conditions</p>
                <p className="font-medium">{registration.medicalConditions}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Season & Payment */}
      <div>
        <h4 className="font-semibold mb-2">Registration Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Season</p>
            <p className="font-medium">{season?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-medium">${registration.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Registered</p>
            <p className="font-medium">{formatDateTime(registration.createdAt)}</p>
          </div>
          {registration.paidAt && (
            <div>
              <p className="text-muted-foreground">Paid At</p>
              <p className="font-medium">{formatDateTime(registration.paidAt)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
