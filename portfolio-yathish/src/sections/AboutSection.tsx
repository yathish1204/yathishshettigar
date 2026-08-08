import React from 'react';
import { Profile } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About Me"
              title="UX Design + Frontend Architecture"
              description="Connecting human-centered product thinking with strict frontend engineering rigor."
            />

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Core Positioning
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Human-Centered UX & Usability Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Next.js App Router & Server Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Design System Primitives & Automated Tokens
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Web Accessibility (WCAG 2.1 AA) & Performance
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
            <p>{profile.longBio}</p>
            <p>
              I believe that brilliant design is only as effective as the engineering behind it. By keeping performance, accessibility, and clean component interfaces at the foundation of development, I build web applications that look extraordinary, load fast, and remain maintainable over time.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/about" variant="outline" size="md">
                Read Full Methodology
              </Button>
              <Button href="/contact" variant="primary" size="md">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
