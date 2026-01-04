import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import {
  ArrowRight,
  Quote,
  Heart,
  Target,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Star,
} from 'lucide-react';

export const Route = createFileRoute('/(marketing)/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Since 2002</span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Our Story
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              For over 20 years, Keystone Youth Soccer has been building character,
              fostering teamwork, and developing young athletes in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Testimonial Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-muted/50 to-muted shadow-xl">
              <CardContent className="p-0">
                <div className="grid gap-0 md:grid-cols-5">
                  {/* Photo Area */}
                  <div className="relative flex items-center justify-center bg-primary/10 p-8 md:col-span-2">
                    <div className="relative">
                      {/* Placeholder for founder photo */}
                      <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/30">
                        <Users className="h-20 w-20 text-primary/60" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-3 shadow-lg">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Quote Area */}
                  <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-12">
                    <Quote className="mb-4 h-10 w-10 text-primary/30" />
                    <blockquote className="mb-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                      "When I founded Keystone Youth Soccer in 2002, my vision was simple:
                      give every child in Keystone Heights the opportunity to learn, grow,
                      and fall in love with the beautiful game. Today, seeing hundreds of
                      young athletes develop not just as players, but as confident,
                      team-oriented individuals, is the greatest reward."
                    </blockquote>
                    <div className="border-l-4 border-primary pl-4">
                      <div className="text-lg font-semibold text-foreground">
                        Trevor Waters
                      </div>
                      <div className="text-muted-foreground">
                        Founder, Keystone Youth Soccer Club
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                What We Stand For
              </h2>
            </div>

            <div className="rounded-2xl bg-background p-8 shadow-lg md:p-12">
              <p className="text-center text-xl leading-relaxed text-foreground md:text-2xl">
                Keystone Youth Soccer Club is a non-profit organization dedicated to{' '}
                <span className="font-semibold text-primary">promoting physical fitness</span>,{' '}
                <span className="font-semibold text-primary">developing self and team pride</span>,{' '}
                and{' '}
                <span className="font-semibold text-primary">fostering community spirit</span>{' '}
                through the game of soccer.
              </p>
              <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-primary/30" />
              <p className="mt-8 text-center text-lg text-muted-foreground">
                We provide youth of all skill levels the opportunity to grow into
                responsible, confident young people while having fun and making lifelong friends.
              </p>
            </div>

            {/* Mission Pillars */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-background p-6 text-center shadow-md transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Character Development</h3>
                <p className="text-sm text-muted-foreground">
                  Building integrity, sportsmanship, and respect in every player
                </p>
              </div>

              <div className="rounded-xl bg-background p-6 text-center shadow-md transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                  <Users className="h-7 w-7 text-success" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Teamwork</h3>
                <p className="text-sm text-muted-foreground">
                  Teaching collaboration and communication on and off the field
                </p>
              </div>

              <div className="rounded-xl bg-background p-6 text-center shadow-md transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <Trophy className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Striving for personal bests while celebrating every achievement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club History Timeline */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Journey</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Club History
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/20 md:block hidden" />
              <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 md:hidden" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {/* 2002 - Founding */}
                <div className="relative flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center md:w-1/2 md:justify-end md:pr-12">
                    <div className="ml-12 md:ml-0 md:text-right">
                      <div className="text-2xl font-bold text-primary">2002</div>
                      <h3 className="mt-1 text-xl font-semibold">Club Founded</h3>
                      <p className="mt-2 text-muted-foreground">
                        Trevor Waters establishes Keystone Youth Soccer Club in Keystone Heights,
                        Florida with a vision to bring organized youth soccer to the community.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-lg">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>

                {/* Growth Years */}
                <div className="relative flex flex-col md:flex-row md:items-center">
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-success shadow-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center md:w-1/2 md:pl-12">
                    <div className="ml-12">
                      <div className="text-2xl font-bold text-success">2005-2010</div>
                      <h3 className="mt-1 text-xl font-semibold">Community Growth</h3>
                      <p className="mt-2 text-muted-foreground">
                        The club expands from a small group to hundreds of players.
                        New age divisions added to serve players from ages 4-18.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FYSA Affiliation */}
                <div className="relative flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center md:w-1/2 md:justify-end md:pr-12">
                    <div className="ml-12 md:ml-0 md:text-right">
                      <div className="text-2xl font-bold text-primary">2010s</div>
                      <h3 className="mt-1 text-xl font-semibold">FYSA Affiliation</h3>
                      <p className="mt-2 text-muted-foreground">
                        Official affiliation with Florida Youth Soccer Association,
                        bringing competitive play and regional tournaments.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary shadow-lg">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>

                {/* Today */}
                <div className="relative flex flex-col md:flex-row md:items-center">
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-lg">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center md:w-1/2 md:pl-12">
                    <div className="ml-12">
                      <div className="text-2xl font-bold text-primary">Today</div>
                      <h3 className="mt-1 text-xl font-semibold">500+ Strong</h3>
                      <p className="mt-2 text-muted-foreground">
                        Over 500 players across 35+ teams with dedicated volunteer coaches.
                        Training at Twin Lakes Park with spring and fall seasons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Our Home</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Twin Lakes Park
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Located in the heart of Keystone Heights, our home fields at Twin Lakes Park
                  provide the perfect environment for young athletes to learn and compete.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href="https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656"
                    onClick={(e) => {
                      if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                        e.preventDefault();
                        window.open('https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656', '_blank');
                      }
                    }}
                    className="flex items-start gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">6065 Twin Lakes Road</div>
                      <div className="text-muted-foreground">Keystone Heights, FL 32656</div>
                    </div>
                  </a>
                </div>
                <Button asChild className="mt-8 gap-2" size="lg">
                  <a
                    href="https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656"
                    onClick={(e) => {
                      if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                        e.preventDefault();
                        window.open('https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656', '_blank');
                      }
                    }}
                  >
                    Get Directions
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Aerial View of Twin Lakes Park */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/hero-aerial.jpg"
                  alt="Aerial view of Twin Lakes Park soccer fields"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Be Part of Our Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join the Keystone Youth Soccer family and give your child the gift of
              teamwork, fitness, and lifelong friendships.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-lg font-semibold text-primary hover:bg-white/90"
              >
                <Link to="/register">
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border-2 border-white/30 text-lg font-semibold text-white hover:bg-white/10"
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
