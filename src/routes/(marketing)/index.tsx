import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Hero } from '~/components/marketing/Hero';
import { ScrollingTicker } from '~/components/marketing/ScrollingTicker';
import { WhyJoinSection } from '~/components/marketing/WhyJoinSection';
import { AgeGroupsSection } from '~/components/marketing/AgeGroupsSection';
import { getTickerGames } from '~/server/function/games/get-ticker-games';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Calendar, MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/(marketing)/')({
  component: Home,
});

function Home() {
  // Fetch ticker games
  const { data: tickerItems = [] } = useQuery({
    queryKey: ['ticker-games'],
    queryFn: async () => {
      try {
        return await getTickerGames();
      } catch (error) {
        console.error('Failed to fetch ticker games:', error);
        return [];
      }
    },
    refetchInterval: 60000, // Refresh every minute
    retry: false, // Don't retry on error
  });

  return (
    <div className="min-h-screen">
      {/* Scrolling Ticker */}
      {tickerItems.length > 0 && <ScrollingTicker items={tickerItems} />}

      {/* Hero Section */}
      <Hero />

      {/* Why Join Section */}
      <WhyJoinSection />

      {/* Age Groups */}
      <AgeGroupsSection />

      {/* Professional CTA Section - Solid Colors */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-semibold text-primary">Limited Spots Available</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Ready to Join the
                <br />
                Keystone Family?
              </h2>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Registration for Spring 2026 is now open. Secure your child's spot today—our teams
                fill up fast.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="group bg-primary text-lg font-semibold text-white shadow-lg hover:bg-primary/90"
                >
                  <Link to="/register">
                    Register Your Child
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 text-lg font-semibold hover-gold-bg"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>500+ Happy Families</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Dedicated Coaches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section - Professional Cards */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Important Information
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about our Spring 2026 season
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Season Dates Card */}
            <Card className="group enterprise-card hover-gold-bg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Calendar className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">Season Dates</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Spring 2026 Season</div>
                  <div className="text-sm text-muted-foreground">April 1 - June 30, 2026</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Training Schedule</div>
                  <div className="text-sm text-muted-foreground">
                    Games & practices twice weekly
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-primary hover-gold">
                  View full schedule
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="group enterprise-card hover-gold-bg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 transition-colors group-hover:bg-success">
                  <MapPin className="h-6 w-6 text-success transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">Location</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Twin Lakes Park</div>
                  <div className="text-sm text-muted-foreground">
                    6065 Twin Lakes Rd
                    <br />
                    Keystone Heights, FL 32656
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-success hover-gold">
                  Get directions
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="group enterprise-card hover-gold-bg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary">
                  <Phone className="h-6 w-6 text-secondary transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">Contact Us</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Phone</div>
                  <div className="text-sm text-muted-foreground">352.473.7777</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">
                    info@keystoneyouthsoccer.com
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Hours</div>
                  <div className="text-sm text-muted-foreground">Monday-Friday, 9am-5pm</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
