import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAllRegistrations } from '~/server/function/admin/get-all-registrations';
import { exportGotSoccerCsv } from '~/server/function/admin/export-gotsoccer-csv';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Download, Filter, Search, FileText, TrendingUp } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { useState } from 'react';

export const Route = createFileRoute('/(admin)/admin/registrations')({
  component: AdminRegistrationsPage,
});

function AdminRegistrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: registrations, isLoading } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => await getAllRegistrations(),
  });

  const exportMutation = useMutation({
    mutationFn: exportGotSoccerCsv,
    onSuccess: (data) => {
      // Create blob and download
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

  const handleExport = () => {
    exportMutation.mutate({});
  };

  const filteredRegistrations = registrations?.filter((reg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reg.player.firstName.toLowerCase().includes(query) ||
      reg.player.lastName.toLowerCase().includes(query) ||
      reg.parent.name?.toLowerCase().includes(query) ||
      reg.parent.email.toLowerCase().includes(query) ||
      reg.season.name.toLowerCase().includes(query)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success text-success-foreground';
      case 'pending_payment':
        return 'bg-accent text-accent-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending_payment':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  // Calculate stats
  const totalRegistrations = registrations?.length || 0;
  const paidRegistrations = registrations?.filter((r) => r.registration.paymentStatus === 'paid').length || 0;
  const totalRevenue = registrations
    ?.filter((r) => r.registration.paymentStatus === 'paid')
    ?.reduce((sum, r) => sum + parseFloat(r.registration.amount), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Registrations</h1>
        <p className="mt-2 text-muted-foreground">
          Manage player registrations and export data to GotSoccer
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Total Registrations</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRegistrations}</div>
            <p className="mt-1 text-xs text-muted-foreground">Active this season</p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Paid</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{paidRegistrations}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalRegistrations > 0 ? Math.round((paidRegistrations / totalRegistrations) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Total Revenue</CardDescription>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <span className="text-lg font-semibold text-accent">$</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">From paid registrations</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by player, parent, or season..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover-gold-bg">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={handleExport} disabled={exportMutation.isPending} className="btn-primary">
            <Download className="mr-2 h-4 w-4" />
            {exportMutation.isPending ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>

      {/* Registrations Table */}
      {isLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="text-muted-foreground">Loading registrations...</div>
            </div>
          </CardContent>
        </Card>
      ) : filteredRegistrations && filteredRegistrations.length > 0 ? (
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle>Registration Records ({filteredRegistrations.length})</CardTitle>
            <CardDescription>All player registrations across all seasons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 text-left text-sm font-semibold">Player</th>
                    <th className="p-4 text-left text-sm font-semibold">Parent</th>
                    <th className="p-4 text-left text-sm font-semibold">Season</th>
                    <th className="p-4 text-left text-sm font-semibold">Date</th>
                    <th className="p-4 text-left text-sm font-semibold">Amount</th>
                    <th className="p-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (
                    <tr
                      key={reg.registration.id}
                      className="border-b border-border transition-colors hover:bg-muted/50 hover-gold-bg"
                    >
                      <td className="p-4 text-sm">
                        <div className="font-medium">
                          {reg.player.firstName} {reg.player.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(reg.player.dateOfBirth).toLocaleDateString()} • {reg.player.gender}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="font-medium">{reg.parent.name}</div>
                        <div className="text-xs text-muted-foreground">{reg.parent.email}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="font-medium">{reg.season.name}</div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(reg.registration.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm">
                        <span className="font-semibold">${parseFloat(reg.registration.amount).toFixed(2)}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(reg.registration.paymentStatus)}>
                          {getStatusText(reg.registration.paymentStatus)}
                        </Badge>
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
            {searchQuery ? 'No registrations found matching your search.' : 'No registrations found.'}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
