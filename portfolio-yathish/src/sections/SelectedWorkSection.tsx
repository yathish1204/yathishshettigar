import React from 'react';
import { Project } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Button } from '@/components/Button';

export function SelectedWorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 md:py-28 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow="Case Studies"
            title="Selected Work"
            description="Real-world case studies demonstrating UX engineering capability, architecture, and measurable outcomes."
            className="mb-0 max-w-2xl"
          />
          <Button href="/projects" variant="outline" size="md" className="self-start md:self-auto">
            View All Projects ({projects.length})
          </Button>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
