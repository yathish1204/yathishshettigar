import React from 'react';
import { Hobby } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { HobbyCard } from '@/components/HobbyCard';

export function HobbiesSection({ hobbies }: { hobbies: Hobby[] }) {
  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobbies" className="py-20 md:py-28 border-b border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Code"
          title="Personal Interests & Creative Pursuits"
          description="Supporting interests and creative endeavors outside day-to-day engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbies.map((hobby) => (
            <HobbyCard key={hobby._id || hobby.name} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
