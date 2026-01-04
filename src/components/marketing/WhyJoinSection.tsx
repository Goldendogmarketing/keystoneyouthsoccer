import { Shield, Heart, Star, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent } from '~/components/ui/card';

const benefits = [
  {
    icon: Shield,
    title: 'Dedicated Coaches',
    description: 'Certified coaches dedicated to developing skills and building confidence',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Heart,
    title: 'Safe Environment',
    description: 'Background-checked staff and comprehensive safety protocols',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: Star,
    title: 'Skill Development',
    description: 'Age-appropriate training that builds technique, teamwork, and sportsmanship',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Zap,
    title: 'Competitive Play',
    description: 'Exciting games and tournaments to put skills into action',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export function WhyJoinSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Why Choose Keystone Youth Soccer?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We're more than just a soccer league—we're a community dedicated to developing young
            athletes both on and off the field.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="group enterprise-card hover-gold-bg"
              >
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bgColor} transition-colors group-hover:bg-${benefit.color.replace('text-', '')}`}>
                    <Icon className={`h-6 w-6 ${benefit.color} transition-colors group-hover:text-white`} />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
