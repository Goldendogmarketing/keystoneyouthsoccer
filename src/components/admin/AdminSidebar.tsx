import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
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
  LogOut,
  ArrowLeft,
  Settings,
  CalendarDays,
  Megaphone,
  MessageSquare,
  Layers,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { signOut } from '~/lib/auth/client';

const navigationSections = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', href: '/admin', icon: Home },
      { name: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
      { name: 'Reports', href: '/admin/reports', icon: BarChart },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Registrations', href: '/admin/registrations', icon: FileText },
      { name: 'Players', href: '/admin/players', icon: Users },
      { name: 'Teams', href: '/admin/teams', icon: Shield },
      { name: 'Leagues', href: '/admin/leagues', icon: Layers },
      { name: 'Seasons', href: '/admin/seasons', icon: Calendar },
    ],
  },
  {
    title: 'Organization',
    items: [
      { name: 'Tournaments', href: '/admin/tournaments', icon: Trophy },
      { name: 'Sponsors', href: '/admin/sponsors', icon: Heart },
      { name: 'Board Members', href: '/admin/board-members', icon: UserCircle },
    ],
  },
  {
    title: 'Content & Communication',
    items: [
      { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
      { name: 'Communications', href: '/admin/communications', icon: MessageSquare },
      { name: 'Content', href: '/admin/content', icon: FileCode },
      { name: 'Emails', href: '/admin/emails', icon: Mail },
    ],
  },
];

export function AdminSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex h-full flex-col border-r border-border/40 bg-card/30 backdrop-blur-sm">
      {/* Logo/Header */}
      <div className="border-b border-border/40 p-6">
        <Link to="/" className="group flex items-center gap-3 transition-all hover:opacity-80">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success transition-transform group-hover:scale-105">
            <span className="text-3xl">⚽</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">Keystone Youth</span>
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              Admin Dashboard
            </span>
          </div>
        </Link>
      </div>

      {/* Admin Badge */}
      <div className="border-b border-border/40 p-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-success/10 p-3 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              <Settings className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary">Administrator</p>
              <p className="text-xs text-muted-foreground truncate">Full Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.href ||
                (currentPath.startsWith(item.href + '/') && item.href !== '/admin');

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground/70 hover:bg-muted hover:text-foreground hover-gold',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-foreground/50 group-hover:text-accent',
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="border-t border-border/40 p-4 space-y-2">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </p>
        <Button asChild variant="outline" size="sm" className="w-full justify-start hover-gold-bg">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Website
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
