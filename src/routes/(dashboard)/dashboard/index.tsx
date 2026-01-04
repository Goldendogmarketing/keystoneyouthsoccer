import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview } from '~/server/function/dashboard/get-dashboard-overview';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Users, FileText, DollarSign, Calendar } from 'lucide-react';

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: async () => await getDashboardOverview(),
  });

  const statCards = [
    {
      title: 'Total Players',
      value: stats?.totalPlayers || 0,
      icon: Users,
      description: 'Registered players',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Registrations',
      value: stats?.activeRegistrations || 0,
      icon: FileText,
      description: 'Current season',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Payments',
      value: stats?.pendingPayments || 0,
      icon: DollarSign,
      description: 'Requires attention',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your players.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
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
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="outline" className="h-auto flex-col items-start p-6">
            <Link to="/dashboard/my-players">
              <Users className="mb-2 h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Manage Players</div>
                <div className="text-sm text-muted-foreground">Add or edit player profiles</div>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto flex-col items-start p-6">
            <Link to="/register">
              <FileText className="mb-2 h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">New Registration</div>
                <div className="text-sm text-muted-foreground">Register for upcoming season</div>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto flex-col items-start p-6">
            <Link to="/dashboard/registrations">
              <FileText className="mb-2 h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">View Registrations</div>
                <div className="text-sm text-muted-foreground">Check registration status</div>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto flex-col items-start p-6">
            <Link to="/dashboard/schedule">
              <Calendar className="mb-2 h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">View Schedule</div>
                <div className="text-sm text-muted-foreground">See upcoming games and practices</div>
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Pending Payments Alert */}
      {stats && stats.pendingPayments > 0 && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-900">Action Required: Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-yellow-900">
              You have {stats.pendingPayments} registration{stats.pendingPayments > 1 ? 's' : ''} with pending
              payments.
            </p>
            <Button asChild>
              <Link to="/dashboard/registrations">Complete Payments</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
