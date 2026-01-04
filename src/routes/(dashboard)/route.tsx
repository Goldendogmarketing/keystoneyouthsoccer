import { createFileRoute, Outlet } from '@tanstack/react-router';
import { DashboardSidebar } from '~/components/dashboard/DashboardSidebar';
import { MobileNav } from '~/components/mobile/MobileNav';
import { Home, Users, FileText, CreditCard, Calendar, User, LogOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Players', href: '/dashboard/my-players', icon: Users },
  { name: 'Registrations', href: '/dashboard/registrations', icon: FileText },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Account', href: '/dashboard/account', icon: User },
];

export const Route = createFileRoute('/(dashboard)')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background md:flex-row">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-border/40 bg-card/50 backdrop-blur-xl p-4 md:hidden">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success">
            <span className="text-2xl">⚽</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">Keystone Youth</span>
            <span className="text-xs text-muted-foreground leading-tight">Parent Dashboard</span>
          </div>
        </Link>
        <MobileNav navigation={navigation} title="Dashboard" subtitle="Parent Dashboard" />
      </header>

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden md:block md:w-64 lg:w-72">
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/30">
        <div className="container mx-auto p-6 md:p-8 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
