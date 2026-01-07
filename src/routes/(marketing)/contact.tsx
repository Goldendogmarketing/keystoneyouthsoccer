import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Users,
  HelpCircle,
  CalendarDays,
} from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/(marketing)/contact')({
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <MessageSquare className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Get In Touch</span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Have questions about registration, programs, or volunteering?
              We're here to help. Reach out to the Keystone Youth Soccer team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Phone Card */}
            <Card className="group text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                  <Phone className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold">Phone</h3>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+13522467776"
                  className="text-lg font-medium text-primary hover:underline"
                >
                  352-246-7776
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  Call or text us anytime
                </p>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="group text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 transition-colors group-hover:bg-success">
                  <Mail className="h-7 w-7 text-success transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold">Email</h3>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@keystoneyouthsoccer.com"
                  className="text-lg font-medium text-success hover:underline"
                >
                  info@keystoneyouthsoccer.com
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="group text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 transition-colors group-hover:bg-secondary">
                  <MapPin className="h-7 w-7 text-secondary transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold">Location</h3>
              </CardHeader>
              <CardContent>
                <a
                  href="https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656"
                  onClick={(e) => {
                    if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                      e.preventDefault();
                      window.open('https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656', '_blank');
                    }
                  }}
                  className="text-base font-medium text-secondary hover:underline"
                >
                  6065 Twin Lakes Rd<br />
                  Keystone Heights, FL 32656
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  Twin Lakes Park
                </p>
              </CardContent>
            </Card>

            {/* Hours Card */}
            <Card className="group text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 transition-colors group-hover:bg-orange-500">
                  <Clock className="h-7 w-7 text-orange-500 transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold">Office Hours</h3>
              </CardHeader>
              <CardContent>
                <p className="text-base font-medium">
                  Mon - Fri: 9am - 5pm
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Games on Saturdays
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Links Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Send Us a Message</h2>
              <p className="mb-8 text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <Card className="border-success/50 bg-success/10 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-success">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="(352) 555-1234"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="">Select a topic...</option>
                            <option value="registration">Registration Question</option>
                            <option value="programs">Programs & Age Groups</option>
                            <option value="schedule">Schedule & Games</option>
                            <option value="volunteer">Volunteer / Coach</option>
                            <option value="sponsorship">Sponsorship</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Links & FAQ */}
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Quick Links</h2>
              <p className="mb-8 text-muted-foreground">
                Find answers to common questions or jump to what you need.
              </p>

              <div className="space-y-4">
                <Card className="group transition-all hover:shadow-md">
                  <Link to="/register" className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                      <CalendarDays className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary">Register for a Season</h3>
                      <p className="text-sm text-muted-foreground">Sign up your child for upcoming programs</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </Card>

                <Card className="group transition-all hover:shadow-md">
                  <Link to="/about" className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 transition-colors group-hover:bg-success">
                      <Users className="h-6 w-6 text-success transition-colors group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-success">About Our Club</h3>
                      <p className="text-sm text-muted-foreground">Learn about our history and mission</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-success" />
                  </Link>
                </Card>

                <Card className="group transition-all hover:shadow-md">
                  <Link to="/sponsors" className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary">
                      <HelpCircle className="h-6 w-6 text-secondary transition-colors group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-secondary">Become a Sponsor</h3>
                      <p className="text-sm text-muted-foreground">Support youth soccer in our community</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-secondary" />
                  </Link>
                </Card>
              </div>

              {/* FAQ Preview */}
              <div className="mt-8 rounded-xl bg-background p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary">When does registration open?</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Registration typically opens 6-8 weeks before each season. Spring registration opens in February, Fall registration opens in August.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">What ages do you serve?</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We have programs for children ages 4-18, organized into age-appropriate divisions from U6 through High School.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Do you need volunteers?</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Yes! We're always looking for coaches, referees, and event volunteers. No experience necessary - we provide training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Find Us at Twin Lakes Park</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our home fields are located at Twin Lakes Park in Keystone Heights
            </p>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/hero-aerial.jpg"
                alt="Aerial view of Twin Lakes Park soccer fields"
                className="w-full object-cover"
              />
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8"
            >
              <a
                href="https://maps.apple.com/?daddr=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656"
                onClick={(e) => {
                  if (!/iPhone|iPad|iPod|Mac/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    window.open('https://www.google.com/maps/dir/?api=1&destination=6065+Twin+Lakes+Rd,+Keystone+Heights,+FL+32656', '_blank');
                  }
                }}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="bg-muted/30 py-12">
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
