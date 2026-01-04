import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import {
  ArrowRight,
  Heart,
  Trophy,
  Users,
  Star,
  Award,
  Building2,
  Mail,
  Phone,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const Route = createFileRoute('/(marketing)/sponsors')({
  component: SponsorsPage,
});

// Current sponsors data
const currentSponsors = {
  platinum: [
    { name: 'Trevor Waters Realty', logoUrl: '', websiteUrl: 'https://www.trevorwatersrealty.com/' },
  ],
  gold: [
    { name: 'Lake Area Title Services, Inc', logoUrl: '', websiteUrl: 'https://www.latsikh.com/' },
    { name: 'HCA Construction & Roofing', logoUrl: '', websiteUrl: 'https://hcaconstructionandroofingfl.com/Middleburg' },
    { name: 'Florida Youth Soccer Association', logoUrl: '', websiteUrl: 'https://www.fysa.com/' },
  ],
  silver: [
    { name: 'Elite Web Design Pros', logoUrl: '', websiteUrl: 'https://elitewebdesignpros.com/' },
    { name: "Johnny's BBQ & Catering", logoUrl: '', websiteUrl: 'https://www.johnnysbbqcatering.com/' },
    { name: 'Whitton Roofing', logoUrl: '', websiteUrl: '' },
    { name: 'Companion Animal Clinic', logoUrl: '', websiteUrl: '' },
    { name: 'Guessford Elevators', logoUrl: '', websiteUrl: '' },
  ],
  bronze: [
    { name: 'Whitetail Construction', logoUrl: '', websiteUrl: '' },
    { name: 'Genesis Door', logoUrl: '', websiteUrl: '' },
    { name: 'BCR INC', logoUrl: '', websiteUrl: '' },
    { name: 'Legacy Home Health Care', logoUrl: '', websiteUrl: '' },
    { name: 'Keystone Plumbing', logoUrl: '', websiteUrl: '' },
    { name: 'Golden Dog Property', logoUrl: '', websiteUrl: '' },
    { name: 'Lake Region Monitor', logoUrl: '', websiteUrl: '' },
    { name: 'Three Sisters Coffee', logoUrl: '', websiteUrl: '' },
    { name: 'Knights of Columbus', logoUrl: '', websiteUrl: '' },
    { name: 'Covenant Roofing', logoUrl: '', websiteUrl: '' },
    { name: 'Shor E Nuff Fishing', logoUrl: '', websiteUrl: '' },
    { name: 'Preferred Property Mortgage', logoUrl: '', websiteUrl: '' },
    { name: 'Keystone Sporting Goods', logoUrl: '', websiteUrl: '' },
  ],
};

const sponsorshipTiers = [
  {
    name: 'Platinum',
    price: '$2,500',
    color: 'bg-gradient-to-br from-slate-100 to-slate-300',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-400',
    icon: Sparkles,
    benefits: [
      'Premium logo placement on all team jerseys',
      'Large banner at Twin Lakes Park fields',
      'Featured sponsor on website homepage',
      'Social media spotlight (monthly)',
      'Recognition at all games and events',
      'VIP seating at season tournaments',
      '10 complimentary season passes',
    ],
  },
  {
    name: 'Gold',
    price: '$1,500',
    color: 'bg-gradient-to-br from-yellow-100 to-yellow-300',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-500',
    icon: Trophy,
    benefits: [
      'Logo on select team jerseys',
      'Medium banner at fields',
      'Logo on website sponsors page',
      'Social media recognition (quarterly)',
      'Recognition at home games',
      '5 complimentary season passes',
    ],
  },
  {
    name: 'Silver',
    price: '$750',
    color: 'bg-gradient-to-br from-gray-100 to-gray-300',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-400',
    icon: Award,
    benefits: [
      'Logo on website sponsors page',
      'Small banner at fields',
      'Social media mention',
      'Recognition in newsletter',
      '2 complimentary season passes',
    ],
  },
  {
    name: 'Bronze',
    price: '$250',
    color: 'bg-gradient-to-br from-orange-100 to-orange-200',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-400',
    icon: Star,
    benefits: [
      'Name listed on website',
      'Recognition in season program',
      'Thank you on social media',
      '1 complimentary season pass',
    ],
  },
];

function SponsorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Community Partners</span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Our Sponsors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Thank you to the amazing local businesses and organizations that support
              Keystone Youth Soccer and help us develop young athletes in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Current Sponsors Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Thank You to Our Sponsors
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              These generous partners make youth soccer possible in Keystone Heights
            </p>
          </div>

          {/* Platinum Sponsors */}
          {currentSponsors.platinum.length > 0 && (
            <div className="mb-16">
              <div className="mb-8 flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-slate-500" />
                <h3 className="text-2xl font-bold text-slate-700">Platinum Sponsors</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {currentSponsors.platinum.map((sponsor) => {
                  const CardWrapper = sponsor.websiteUrl ? 'a' : 'div';
                  const linkProps = sponsor.websiteUrl ? { href: sponsor.websiteUrl, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <CardWrapper
                      key={sponsor.name}
                      {...linkProps}
                      className={`group flex h-40 w-72 items-center justify-center rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl ${sponsor.websiteUrl ? 'cursor-pointer' : ''}`}
                    >
                      {sponsor.logoUrl ? (
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-xl font-bold text-slate-600 text-center group-hover:text-primary">{sponsor.name}</span>
                      )}
                    </CardWrapper>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gold Sponsors */}
          {currentSponsors.gold.length > 0 && (
            <div className="mb-16">
              <div className="mb-8 flex items-center justify-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <h3 className="text-xl font-bold text-yellow-700">Gold Sponsors</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {currentSponsors.gold.map((sponsor) => {
                  const CardWrapper = sponsor.websiteUrl ? 'a' : 'div';
                  const linkProps = sponsor.websiteUrl ? { href: sponsor.websiteUrl, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <CardWrapper
                      key={sponsor.name}
                      {...linkProps}
                      className={`group flex h-32 w-56 items-center justify-center rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg ${sponsor.websiteUrl ? 'cursor-pointer' : ''}`}
                    >
                      {sponsor.logoUrl ? (
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-lg font-semibold text-yellow-700 text-center group-hover:text-primary">{sponsor.name}</span>
                      )}
                    </CardWrapper>
                  );
                })}
              </div>
            </div>
          )}

          {/* Silver Sponsors */}
          {currentSponsors.silver.length > 0 && (
            <div className="mb-16">
              <div className="mb-8 flex items-center justify-center gap-3">
                <Award className="h-5 w-5 text-gray-500" />
                <h3 className="text-xl font-bold text-gray-600">Silver Sponsors</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {currentSponsors.silver.map((sponsor) => {
                  const CardWrapper = sponsor.websiteUrl ? 'a' : 'div';
                  const linkProps = sponsor.websiteUrl ? { href: sponsor.websiteUrl, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <CardWrapper
                      key={sponsor.name}
                      {...linkProps}
                      className={`group flex h-24 w-44 items-center justify-center rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-3 shadow transition-all hover:scale-105 hover:shadow-md ${sponsor.websiteUrl ? 'cursor-pointer' : ''}`}
                    >
                      {sponsor.logoUrl ? (
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-center text-sm font-semibold text-gray-600 group-hover:text-primary">{sponsor.name}</span>
                      )}
                    </CardWrapper>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bronze Sponsors */}
          {currentSponsors.bronze.length > 0 && (
            <div>
              <div className="mb-8 flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-orange-500" />
                <h3 className="text-xl font-bold text-orange-700">Bronze Sponsors</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {currentSponsors.bronze.map((sponsor) => {
                  const TagWrapper = sponsor.websiteUrl ? 'a' : 'span';
                  const linkProps = sponsor.websiteUrl ? { href: sponsor.websiteUrl, target: '_blank', rel: 'noopener noreferrer' } : {};
                  return (
                    <TagWrapper
                      key={sponsor.name}
                      {...linkProps}
                      className={`group rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-2 text-sm font-medium text-orange-700 transition-all hover:scale-105 hover:shadow-md hover:text-primary ${sponsor.websiteUrl ? 'cursor-pointer' : ''}`}
                    >
                      {sponsor.name}
                    </TagWrapper>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Opportunities Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Partner With Us</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Sponsorship Opportunities
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join our community of sponsors and make a lasting impact on youth athletics
              while gaining valuable exposure for your business.
            </p>
          </div>

          {/* Sponsorship Tiers */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sponsorshipTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative overflow-hidden border-2 ${tier.borderColor} transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`${tier.color} px-6 py-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-bold ${tier.textColor}`}>{tier.name}</h3>
                    <tier.icon className={`h-6 w-6 ${tier.textColor}`} />
                  </div>
                  <div className={`mt-2 text-3xl font-bold ${tier.textColor}`}>{tier.price}</div>
                  <div className={`text-sm ${tier.textColor} opacity-80`}>per season</div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Sponsor Section */}
          <div className="mt-20">
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-8 text-center text-2xl font-bold">Why Sponsor Keystone Youth Soccer?</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-background p-6 text-center shadow-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Community Reach</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with 500+ families in the Keystone Heights area who attend games and events
                  </p>
                </div>
                <div className="rounded-xl bg-background p-6 text-center shadow-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <Heart className="h-7 w-7 text-success" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Support Youth</h4>
                  <p className="text-sm text-muted-foreground">
                    Help provide equipment, fields, and programs that develop young athletes
                  </p>
                </div>
                <div className="rounded-xl bg-background p-6 text-center shadow-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                    <Trophy className="h-7 w-7 text-secondary" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">Brand Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Gain exposure through jerseys, banners, website, and social media
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Become a Sponsor?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Contact us today to discuss sponsorship opportunities and how we can
              partner together to support youth soccer in Keystone Heights.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-lg font-semibold text-primary hover:bg-white/90"
              >
                <a href="mailto:sponsors@keystoneyouthsoccer.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border-2 border-white/30 text-lg font-semibold text-white hover:bg-white/10"
              >
                <a href="tel:+13522467776">
                  <Phone className="mr-2 h-5 w-5" />
                  352-246-7776
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Or download our{' '}
              <a href="#" className="underline hover:text-white">
                Sponsorship Information Packet (PDF)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-6 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
