import { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import {
  Home,
  Users,
  FileText,
  CreditCard,
  Calendar,
  User,
  LogOut,
  ArrowLeft,
  CheckSquare,
  Moon,
  Sun,
  Shield,
  Gamepad2,
  Layers,
  Megaphone,
  Settings,
  BarChart,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { signOut } from '~/lib/auth/client';
import { useTheme } from '~/components/theme-provider';
import { getSession } from '~/lib/auth/middleware';

const parentNavigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Players', href: '/dashboard/my-players', icon: Users },
  { name: 'Registrations', href: '/dashboard/registrations', icon: FileText },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'To-Do List', href: '/dashboard/todos', icon: CheckSquare },
  { name: 'Account', href: '/dashboard/account', icon: User },
];

const adminNavigation = [
  { name: 'All Registrations', href: '/admin/registrations', icon: FileText },
  { name: 'All Players', href: '/admin/players', icon: Users },
  { name: 'Teams', href: '/admin/teams', icon: Shield },
  { name: 'Games', href: '/admin/games', icon: Gamepad2 },
  { name: 'Leagues', href: '/admin/leagues', icon: Layers },
  { name: 'Seasons', href: '/admin/seasons', icon: Calendar },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { name: 'Reports', href: '/admin/reports', icon: BarChart },
];

export function DashboardSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { theme, setTheme } = useTheme();
  const [session, setSession] = useState<{ user?: { role?: string; name?: string; email?: string } } | null>(null);

  useEffect(() => {
    getSession().then(setSession).catch(() => setSession(null));
  }, []);

  const isAdmin = session?.user?.role === 'admin';
  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

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
              {isAdmin ? 'Admin Dashboard' : 'Parent Dashboard'}
            </span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b border-border/40 p-4">
        <div className={cn(
          "rounded-lg p-3",
          isAdmin
            ? "bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20"
            : "bg-muted/50"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
              isAdmin ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
              {isAdmin ? <Settings className="h-5 w-5" /> : userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-medium truncate", isAdmin && "text-primary")}>
                {isAdmin ? 'Administrator' : userName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {isAdmin ? 'Full Access' : userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* Parent Navigation - shown to all */}
        <div className="space-y-1">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isAdmin ? 'Personal' : 'Navigation'}
          </p>
          {parentNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href ||
              (currentPath.startsWith(item.href + '/') && item.href !== '/dashboard');

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
                <Icon className={cn('h-5 w-5', isActive ? 'text-primary-foreground' : 'text-foreground/50 group-hover:text-accent')} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Admin Navigation - only shown to admins */}
        {isAdmin && (
          <div className="space-y-1">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Administration
            </p>
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href ||
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
                  <Icon className={cn('h-5 w-5', isActive ? 'text-primary-foreground' : 'text-foreground/50 group-hover:text-accent')} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Quick Actions */}
      <div className="border-t border-border/40 p-4 space-y-2">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start hover-gold-bg"
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-start hover-gold-bg"
        >
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
