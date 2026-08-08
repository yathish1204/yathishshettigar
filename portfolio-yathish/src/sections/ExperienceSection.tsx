import React from 'react';
import { Experience } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { ExperienceItem } from '@/components/ExperienceItem';
import { Button } from '@/components/Button';

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow="Career Timeline"
            title="Work Experience"
            description="Accomplishment-oriented work history across senior engineering and UX leadership roles."
            className="mb-0 max-w-2xl"
          />
          <Button href="/experience" variant="outline" size="md" className="self-start md:self-auto">
            Full Experience History
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-2">
          {experiences.map((exp) => (
            <ExperienceItem key={exp._id || exp.company} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
