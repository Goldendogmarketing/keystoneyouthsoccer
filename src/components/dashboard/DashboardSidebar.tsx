import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { Home, Users, FileText, CreditCard, Calendar, User, LogOut, ArrowLeft, CheckSquare } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { signOut } from '~/lib/auth/client';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Players', href: '/dashboard/my-players', icon: Users },
  { name: 'Registrations', href: '/dashboard/registrations', icon: FileText },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'To-Do List', href: '/dashboard/todos', icon: CheckSquare },
  { name: 'Account', href: '/dashboard/account', icon: User },
];

export function DashboardSidebar() {
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
              Parent Dashboard
            </span>
          </div>
        </Link>
      </div>

      {/* User Info (if available) */}
      <div className="border-b border-border/40 p-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Parent Account</p>
              <p className="text-xs text-muted-foreground truncate">parent@email.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        {navigation.map((item) => {
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
      </nav>

      {/* Quick Actions */}
      <div className="border-t border-border/40 p-4 space-y-2">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </p>
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
