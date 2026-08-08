import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-16 md:py-24 border-b border-zinc-900 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="emerald" className="py-1 px-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1" />
              {profile.availability || 'Available for Senior UX Engineer & Frontend Architect roles'}
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 font-sans leading-[1.1]">
              Hi, I'm <span className="text-emerald-400">{profile.name}</span>.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-300 tracking-tight">
              {profile.title}
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            {profile.tagline}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button href="#projects" variant="primary" size="lg">
              View Selected Work
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Let's Talk
            </Button>
            {profile.socialLinks?.github && (
              <Button href={profile.socialLinks.github} external variant="ghost" size="lg">
                GitHub ↗
              </Button>
            )}
            {profile.socialLinks?.linkedin && (
              <Button href={profile.socialLinks.linkedin} external variant="ghost" size="lg">
                LinkedIn ↗
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
