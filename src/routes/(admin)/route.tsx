import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AdminSidebar } from '~/components/admin/AdminSidebar';
import { MobileNav } from '~/components/mobile/MobileNav';
import { requireAdmin } from '~/lib/auth/middleware';
import { Link } from '@tanstack/react-router';
import {
  Home,
  Users,
  FileText,
  Shield,
  Calendar,
  Trophy,
  Heart,
  FileCode,
  UserCircle,
  Mail,
  BarChart,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/admin', icon: Home },
  { name: 'Registrations', href: '/admin/registrations', icon: FileText },
  { name: 'Players', href: '/admin/players', icon: Users },
  { name: 'Teams', href: '/admin/teams', icon: Shield },
  { name: 'Seasons', href: '/admin/seasons', icon: Calendar },
  { name: 'Tournaments', href: '/admin/tournaments', icon: Trophy },
  { name: 'Sponsors', href: '/admin/sponsors', icon: Heart },
  { name: 'Content', href: '/admin/content', icon: FileCode },
  { name: 'Board Members', href: '/admin/board-members', icon: UserCircle },
  { name: 'Emails', href: '/admin/emails', icon: Mail },
  { name: 'Reports', href: '/admin/reports', icon: BarChart },
];

export const Route = createFileRoute('/(admin)')({
  beforeLoad: async () => {
    try {
      await requireAdmin();
    } catch (error) {
      // Redirect to sign-in if not admin
      throw redirect({
        to: '/auth/sign-in',
        search: {
          redirect: '/admin',
        },
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background md:flex-row">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-border/40 bg-card/50 backdrop-blur-xl p-4 md:hidden">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success">
            <span className="text-2xl">⚽</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">Keystone Admin</span>
            <span className="text-xs text-muted-foreground leading-tight">Admin Dashboard</span>
          </div>
        </Link>
        <MobileNav navigation={navigation} title="Admin" subtitle="Admin Dashboard" />
      </header>

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden md:block md:w-64 lg:w-72">
        <AdminSidebar />
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
