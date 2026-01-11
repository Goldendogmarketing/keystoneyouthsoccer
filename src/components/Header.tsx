import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '~/components/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouterState();
  const navigate = useNavigate();
  const isHomePage = router.location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToPrograms = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById('programs');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate({ to: '/' }).then(() => {
        setTimeout(() => {
          const element = document.getElementById('programs');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/#programs', onClick: scrollToPrograms },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/85 backdrop-blur-md shadow-lg' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="group flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 transition-transform group-hover:scale-105 md:h-14 md:w-14">
              <span className="text-3xl md:text-4xl">⚽</span>
            </div>
            <span className="hidden text-base font-semibold text-white drop-shadow-md sm:inline md:text-lg">
              Keystone Youth Soccer Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={item.onClick}
                className="group relative px-4 py-2 text-base font-medium text-white/90 drop-shadow-md transition-colors duration-200 hover:text-sky-300"
              >
                {item.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 origin-left scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden bg-white text-primary font-semibold hover:bg-white/90 md:inline-flex">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden border border-white/30 text-white hover:bg-white/20 md:inline-flex"
            >
              <Link to="/dashboard">Sign In</Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/20 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-white/20 bg-primary/90 backdrop-blur-xl lg:hidden">
          <div className="container mx-auto space-y-1 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.onClick) item.onClick(e);
                }}
                className="group relative block rounded-lg px-4 py-3 text-lg font-medium text-white/90 transition-colors duration-200 hover:bg-sky-500/20 hover:text-sky-300"
              >
                {item.name}
                <span className="absolute bottom-2 left-4 right-4 h-0.5 origin-left scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <div className="space-y-2 pt-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-primary font-semibold hover:bg-white/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/dashboard">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
