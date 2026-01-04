import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '~/server/function/admin/get-admin-stats';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Users, FileText, DollarSign, Shield, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/(admin)/admin/')({
  component: AdminOverview,
});

function AdminOverview() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => await getAdminStats(),
  });

  const statCards = [
    {
      title: 'Total Registrations',
      value: stats?.totalRegistrations || 0,
      icon: FileText,
      description: 'All time',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Players',
      value: stats?.totalPlayers || 0,
      icon: Users,
      description: 'Registered players',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Parents',
      value: stats?.totalUsers || 0,
      icon: Users,
      description: 'User accounts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Teams',
      value: stats?.totalTeams || 0,
      icon: Shield,
      description: 'Active teams',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Pending Payments',
      value: stats?.pendingPayments || 0,
      icon: AlertCircle,
      description: 'Awaiting payment',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Paid Registrations',
      value: stats?.paidRegistrations || 0,
      icon: CheckCircle,
      description: 'Completed',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Recent Registrations',
      value: stats?.recentRegistrations || 0,
      icon: TrendingUp,
      description: 'Last 7 days',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Total Revenue',
      value: `$${(stats?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      description: 'All paid registrations',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of Keystone Youth Soccer operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/registrations" className="block rounded-lg border p-4 transition-colors hover:bg-muted">
              <div className="font-semibold">View All Registrations</div>
              <div className="text-sm text-muted-foreground">Manage player registrations</div>
            </a>
            <a href="/admin/teams" className="block rounded-lg border p-4 transition-colors hover:bg-muted">
              <div className="font-semibold">Manage Teams</div>
              <div className="text-sm text-muted-foreground">Create and organize teams</div>
            </a>
            <a href="/admin/seasons" className="block rounded-lg border p-4 transition-colors hover:bg-muted">
              <div className="font-semibold">Season Management</div>
              <div className="text-sm text-muted-foreground">Configure active seasons</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>{stats?.recentRegistrations || 0} new registrations this week</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span>{stats?.pendingPayments || 0} pending payments</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>${(stats?.totalRevenue || 0).toFixed(2)} total revenue</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Registration System</span>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Processing</span>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <span className="text-green-600">✓ Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
