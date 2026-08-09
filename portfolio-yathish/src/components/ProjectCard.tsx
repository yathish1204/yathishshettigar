import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';

export interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const techList =
    project.technologies && project.technologies.length > 0
      ? project.technologies.slice(0, 3).join(' • ')
      : project.role || 'UX & Frontend';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/80 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-md dark:shadow-xl h-full cursor-pointer"
    >
      {/* 16:8 Aspect Ratio Thumbnail Container */}
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <Image
          src={project.thumbnail}
          alt={`Thumbnail for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-60 dark:opacity-80" />

        {/* Featured Glassmorphism Golden Star Badge (Top Right over Thumbnail) */}
        {project.featured && (
          <div
            title="Featured Case Study"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/50 text-amber-400 font-bold text-lg flex items-center justify-center shadow-lg backdrop-blur-md z-10"
          >
            ★
          </div>
        )}

        {/* Year Badge Flushed to Bottom Right with Top-Left Border Radius */}
        <div
          title={`Production Year: ${project.year}`}
          className="absolute bottom-0 right-0 text-xs font-mono font-bold text-zinc-200 dark:bg-zinc-900 px-3 py-1 rounded-tl-xl border-t border-l border-zinc-800/80 backdrop-blur-md shadow-md z-10"
        >
          {project.year}
        </div>
      </div>

      {/* Content Aligned to Start */}
      <div className="flex flex-col flex-1 p-5 gap-1.5 justify-start">
        {/* Title with Accent Color Hover Right Slant Arrow */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 truncate min-w-0">
            {project.title}
          </h3>
          {/* Accent Vector Right Slant-Up Arrow on Hover */}
          <svg
            className="w-4 h-4 text-emerald-500 dark:text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        {/* Accent Color Subtitle / Tech string */}
        <p
          title={`Skill Set: ${techList}`}
          className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-500 line-clamp-1 truncate"
        >
          {techList}
        </p>

        {/* Short Description (Truncated to 2 lines with title attribute hover tooltip) */}
        <p
          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2"
          title={project.shortDescription}
        >
          {project.shortDescription}
        </p>
      </div>
    </Link>
  );
}
