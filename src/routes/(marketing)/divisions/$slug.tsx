import { createFileRoute } from '@tanstack/react-router';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Users, Clock, Target, Star, CheckCircle } from 'lucide-react';

const divisionsData: Record<string, {
  name: string;
  ages: string;
  birthYears: string;
  description: string;
  overview: string;
  expectations: string[];
  tips: string[];
  schedule: { practices: string; games: string };
  teamSize: string;
  seasonLength: string;
}> = {
  'u6': {
    name: 'U6 Coed League',
    ages: 'Ages 4-5',
    birthYears: 'Birth Years 2020 & 2021',
    description: 'Introduction to soccer basics and fun!',
    overview: 'Our youngest division focuses on making soccer fun while introducing basic skills. Players learn coordination, teamwork, and the joy of being part of a team in a supportive, low-pressure environment.',
    expectations: [
      'Focus on fun and participation over competition',
      'Learning basic ball control and dribbling',
      'Introduction to teamwork concepts',
      'Short practices with lots of variety',
      'Small-sided games (3v3 or 4v4)',
      'All players get equal playing time',
    ],
    tips: [
      'Encourage your child and celebrate effort, not just goals',
      'Keep it fun - avoid putting pressure on performance',
      'Make sure they have proper shin guards and cleats',
      'Bring plenty of water and healthy snacks',
      'Arrive 10-15 minutes early for warm-up',
      'Be patient - attention spans are short at this age!',
    ],
    schedule: { practices: '1x per week (45 min)', games: '1x per week (Saturday)' },
    teamSize: '6-8 players',
    seasonLength: '8-10 weeks',
  },
  'u8': {
    name: 'U8 Coed League',
    ages: 'Ages 6-7',
    birthYears: 'Birth Years 2018 & 2019',
    description: 'Building coordination and teamwork',
    overview: 'The U8 division continues developing soccer fundamentals with a focus on coordination and basic teamwork. Players start learning simple passing and begin to understand playing together as a team.',
    expectations: [
      'Continued focus on fun with more structure',
      'Developing coordination and motor skills',
      'Introduction to basic passing',
      'Learning to play as part of a team',
      'Small-sided games (4v4)',
      'Equal playing time for all players',
    ],
    tips: [
      'Practice kicking and passing at home',
      'Encourage playing with friends outside of practice',
      'Make sure equipment fits properly',
      'Positive reinforcement goes a long way',
      'Help them understand being a good teammate',
      'Keep expectations age-appropriate',
    ],
    schedule: { practices: '1x per week (1 hour)', games: '1x per week (Saturday)' },
    teamSize: '8-10 players',
    seasonLength: '8-10 weeks',
  },
  'u10': {
    name: 'U10 Coed League',
    ages: 'Ages 8-9',
    birthYears: 'Birth Years 2016 & 2017',
    description: 'Developing fundamental skills',
    overview: 'The U10 division builds on basic skills with more structured training. Players develop better ball control, passing, and begin understanding positions and basic tactics.',
    expectations: [
      'More structured practices with skill development focus',
      'Introduction to positions and basic formations',
      'Learning to pass and receive the ball',
      'Small-sided games (5v5 or 6v6)',
      'Emphasis on sportsmanship and teamwork',
      'Beginning to understand game strategy',
    ],
    tips: [
      'Practice basic skills at home - juggling, passing against a wall',
      'Watch soccer together to learn the game',
      'Encourage communication with teammates',
      'Help them understand their position responsibilities',
      'Proper hydration is crucial - water before, during, and after',
      'Support the coach and avoid sideline coaching',
    ],
    schedule: { practices: '2x per week (1 hour)', games: '1x per week (Saturday)' },
    teamSize: '10-12 players',
    seasonLength: '10 weeks',
  },
  '12u': {
    name: '12U Coed League',
    ages: 'Ages 10-12',
    birthYears: 'Birth Years 2013 - 2015',
    description: 'Teamwork and strategy development',
    overview: '12U players begin to understand the tactical side of soccer. Training focuses on technical skills, positional play, and teamwork while maintaining a fun, developmental environment.',
    expectations: [
      'Full field play with standard positions',
      'Advanced skill development and technique',
      'Understanding of team tactics and formations',
      'Competitive games with standings',
      'Building leadership skills',
      'Physical conditioning introduction',
    ],
    tips: [
      'Encourage watching professional soccer for tactical understanding',
      'Work on weak foot development at home',
      'Proper nutrition becomes more important',
      'Help them set personal goals for improvement',
      'Encourage them to ask coaches questions',
      'Balance soccer with rest and other activities',
    ],
    schedule: { practices: '2x per week (1.5 hours)', games: '1x per week (Saturday)' },
    teamSize: '14-16 players',
    seasonLength: '10-12 weeks',
  },
  '15u': {
    name: '15U Coed League',
    ages: 'Ages 12-15',
    birthYears: 'Birth Years 2011 - 2013',
    description: 'Competitive play and advanced tactics',
    overview: 'The 15U division emphasizes competitive play and advanced tactical understanding. Players refine their technical skills while learning complex team strategies and developing leadership abilities.',
    expectations: [
      'High-level tactical training and game analysis',
      'Position-specific skill development',
      'Competitive league play with playoffs',
      'Physical fitness and conditioning emphasis',
      'Development of soccer IQ',
      'Leadership opportunities on and off the field',
    ],
    tips: [
      'Proper warm-up and cool-down routines are essential',
      'Consider position-specific training videos',
      'Sleep is crucial for recovery and growth',
      'Balanced diet with proper protein intake',
      'Mental preparation before games',
      'Encourage them to analyze their own performance',
    ],
    schedule: { practices: '2-3x per week (1.5 hours)', games: '1-2x per week' },
    teamSize: '16-18 players',
    seasonLength: '12 weeks',
  },
  'high-school': {
    name: 'High School Coed League',
    ages: 'Ages 15-18',
    birthYears: 'Birth Years 2007 - 2010',
    description: 'Elite youth soccer competition',
    overview: 'Our elite division for high school age players. This league offers competitive soccer with advanced training, tactical sophistication, and opportunities to develop skills for potential college play.',
    expectations: [
      'Professional-level training environment',
      'Advanced tactical systems and set pieces',
      'Strength and conditioning programs',
      'Video analysis of games',
      'Leadership development program',
      'Tournament participation opportunities',
    ],
    tips: [
      'Maintain consistent training even outside practice',
      'Focus on injury prevention and recovery',
      'Nutrition timing around training is important',
      'Balance academics with athletic commitments',
      'Consider college soccer opportunities',
      'Work on mental toughness and resilience',
    ],
    schedule: { practices: '2-3x per week (2 hours)', games: '1-2x per week' },
    teamSize: '18-22 players',
    seasonLength: '12-14 weeks',
  },
};

export const Route = createFileRoute('/(marketing)/divisions/$slug')({
  component: DivisionPage,
});

function DivisionPage() {
  const { slug } = Route.useParams();
  const division = divisionsData[slug];

  if (!division) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Division not found</h1>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 pt-32">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="mb-6 inline-flex items-center text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                {division.ages}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                {division.birthYears}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {division.name}
            </h1>
            <p className="text-xl text-white/80">
              {division.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-sm text-muted-foreground">Team Size</div>
                <div className="font-semibold">{division.teamSize}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-sm text-muted-foreground">Practices</div>
                <div className="font-semibold">{division.schedule.practices}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-sm text-muted-foreground">Games</div>
                <div className="font-semibold">{division.schedule.games}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-sm text-muted-foreground">Season</div>
                <div className="font-semibold">{division.seasonLength}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expectations & Tips */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Expectations */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">What to Expect</h2>
                <p className="text-muted-foreground">
                  Here's what players and parents can expect from the {division.name} division
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {division.expectations.map((expectation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{expectation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Tips for Success</h2>
                <p className="text-muted-foreground">
                  Help your child get the most out of their soccer experience
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {division.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Join {division.name}?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Registration for Spring 2026 is now open. Secure your child's spot today!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-white">
              <Link to="/register">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">View All Divisions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
