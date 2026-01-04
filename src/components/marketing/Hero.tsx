import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { ArrowRight, Users, Trophy, Calendar, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-aerial.jpg')`,
        }}
      />
      {/* Dark overlay with primary color tint for text readability */}
      <div className="absolute inset-0 bg-primary/50" />

      <div className="container relative mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-36">
        <div className="mx-auto max-w-4xl">
          {/* Main Content - Centered */}
          <div className="space-y-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-sm shadow-lg">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span className="text-sm font-semibold text-white drop-shadow-md">
                Spring 2026 Registration Open
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl [text-shadow:_0_2px_12px_rgb(0_0_0_/_40%)]">
                Building Young Athletes
                <br />
                Through Soccer
              </h1>
              <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white drop-shadow-md md:text-xl [text-shadow:_0_1px_8px_rgb(0_0_0_/_40%)]">
                Dedicated coaches, character development, and competitive play for ages 4-18.
                Join Keystone Youth Soccer's Spring 2026 season.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="group bg-white text-lg font-semibold text-primary shadow-xl hover:bg-white/95"
              >
                <Link to="/register">
                  Register Your Player
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border-2 border-white/30 bg-transparent text-lg font-semibold text-white hover:bg-white/10"
              >
                <a href="#programs">View Programs</a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm font-medium text-white drop-shadow-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-lg" />
                <span>500+ Players</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-lg" />
                <span>20+ Years</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-lg" />
                <span>Professional Coaches</span>
              </div>
            </div>
          </div>

          {/* Stats Grid - Below Main Content */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center">
                <Users className="h-6 w-6 text-white/60" />
              </div>
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="text-sm text-white/60">Active Players</div>
            </div>

            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white/60" />
              </div>
              <div className="text-4xl font-bold text-white">12</div>
              <div className="text-sm text-white/60">Championships</div>
            </div>

            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white/60" />
              </div>
              <div className="text-4xl font-bold text-white">20+</div>
              <div className="text-sm text-white/60">Years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
