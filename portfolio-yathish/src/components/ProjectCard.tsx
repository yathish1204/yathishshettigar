import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { Badge } from '@/components/Badge';

export interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-xl">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        <Image
          src={project.thumbnail}
          alt={`Thumbnail for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

        {project.featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="emerald" className="shadow-lg backdrop-blur-md">
              Featured Case Study
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-400 bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800 backdrop-blur-md">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div className="text-xs font-mono text-emerald-400 mb-2">{project.role}</div>

        <h3 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-3">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none focus:underline">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 line-clamp-3 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="zinc">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>

        {/* Action Link */}
        <div className="mt-auto flex items-center text-sm font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
          Read Case Study
          <svg
            className="w-4 h-4 ml-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
