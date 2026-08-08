import React from 'react';
import { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';

export interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
        <p className="text-zinc-400">No published projects found at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project._id || project.slug} project={project} priority={index < 2} />
      ))}
    </div>
  );
}
