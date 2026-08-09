import React from 'react';
import { Hobby } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { HobbyCard } from '@/components/HobbyCard';

export function HobbiesSection({ hobbies }: { hobbies: Hobby[] }) {
  return (
    <section id="hobbies" className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Code"
          title="Interests & Personal Pursuits"
          description="Personal projects, UX research experiments, and open-source contributions."
        />

        {/* 4 Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hobbies.map((hobby) => (
            <HobbyCard key={hobby._id || hobby.name} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
}
