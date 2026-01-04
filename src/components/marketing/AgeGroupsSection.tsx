import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { ArrowRight } from 'lucide-react';

const ageGroups = [
  { name: 'U6 Coed League', slug: 'u6', ages: 'Ages 4-5', birthYears: 'Birth Years 2020 & 2021', description: 'Introduction to soccer basics and fun!' },
  { name: 'U8 Coed League', slug: 'u8', ages: 'Ages 6-7', birthYears: 'Birth Years 2018 & 2019', description: 'Building coordination and teamwork' },
  { name: 'U10 Coed League', slug: 'u10', ages: 'Ages 8-9', birthYears: 'Birth Years 2016 & 2017', description: 'Developing fundamental skills' },
  { name: '12U Coed League', slug: '12u', ages: 'Ages 10-12', birthYears: 'Birth Years 2013 - 2015', description: 'Teamwork and strategy development' },
  { name: '15U Coed League', slug: '15u', ages: 'Ages 12-15', birthYears: 'Birth Years 2011 - 2013', description: 'Competitive play and advanced tactics' },
  { name: 'High School Coed League', slug: 'high-school', ages: 'Ages 15-18', birthYears: 'Birth Years 2007 - 2010', description: 'Elite youth soccer competition' },
];

export function AgeGroupsSection() {
  return (
    <section id="programs" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Programs for Every Age
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Co-ed leagues designed to match your child's age and skill level
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ageGroups.map((group) => (
            <Link key={group.slug} to="/divisions/$slug" params={{ slug: group.slug }}>
              <Card className="group h-full enterprise-card border-l-4 border-l-primary/20 transition-all duration-300 hover:border-l-primary hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold tracking-tight">{group.name}</h3>
                    <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {group.ages}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{group.birthYears}</p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary transition-all group-hover:text-primary">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
