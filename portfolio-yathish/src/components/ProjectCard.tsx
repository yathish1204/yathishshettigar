'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { formatMonthYear } from '@/utils/format';

export interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayYear = formatMonthYear(project.year);

  // Close modal on Escape key press and manage body overflow lock
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Corporate Project Card UI
  if (project.isCorporateProject) {
    const summaryText = project.shortDescription || project.description || '';
    const hasLongSummary =
      summaryText.length > 45 ||
      Boolean(project.description && project.description !== project.shortDescription) ||
      Boolean(project.responsibilities && project.responsibilities.length > 0) ||
      Boolean(project.challenge || project.solution || project.outcome);

    return (
      <>
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800/80 shadow-md h-full space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
          <div className="space-y-3">
            {/* Header row: Title + Year */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans leading-snug min-w-0 flex items-center gap-1.5">
                <span>{project.title}</span>
                {project.featured && (
                  <span className="ml-1 text-amber-400 font-bold shrink-0" aria-label="Featured Project" title="Featured Project">
                    ★
                  </span>
                )}
              </h3>
              <span className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500 shrink-0 pt-0.5">
                {displayYear}
              </span>
            </div>

            {/* Role & Client Subtitle */}
            {(project.role || project.client) && (
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {project.role}{project.client ? ` • ${project.client}` : ''}
              </p>
            )}

            {/* Summary Text with inline Read More button */}
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal min-w-0 break-words [overflow-wrap:anywhere]">
              <span className="line-clamp-1 inline">
                {summaryText}
              </span>
              {hasLongSummary && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center text-xs font-mono font-bold text-[#B45309] dark:text-[#FBBF24] hover:underline cursor-pointer ml-1.5 shrink-0 transition-colors align-baseline whitespace-nowrap"
                >
                  Read More →
                </button>
              )}
            </div>
          </div>

          {/* Tools & Technology Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Tools & Technology
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 break-words"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertically Scrollable Corporate Project Details Modal */}
        {isModalOpen && (
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-fade-in no-scrollbar"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.slug || project._id}`}
          >
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 shadow-2xl space-y-6 my-auto"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.stopPropagation();
                const container = e.currentTarget;
                container.scrollTop += e.deltaY;
              }}
            >
              {/* Modal Header: Title & Close Button */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 min-w-0">
                <div className="min-w-0 flex-1">
                  <h2
                    id={`modal-title-${project.slug || project._id}`}
                    className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-sans flex items-center gap-2 break-words"
                  >
                    {project.featured && (
                      <span className="text-amber-400 font-bold shrink-0" aria-label="Featured Project" title="Featured Project">
                        ★
                      </span>
                    )}
                    <span className="break-words [overflow-wrap:anywhere]">{project.title}</span>
                  </h2>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1 break-words">
                    {project.role} {project.client ? `• ${project.client}` : ''} ({displayYear})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* 1. Full Summary / Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-accent">
                  Project Overview & Summary
                </h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-line break-words [overflow-wrap:anywhere]">
                  {project.description || project.shortDescription}
                </p>
              </div>

              {/* 2. Tools & Technology Used */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-accent">
                    Tools & Technology Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[#B45309] dark:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Other Project Details in Order */}
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-xs font-mono">
                <div>
                  <span className="block text-zinc-400 uppercase text-[10px]">Role</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{project.role}</span>
                </div>
                <div>
                  <span className="block text-zinc-400 uppercase text-[10px]">Client / Org</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{project.client || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-zinc-400 uppercase text-[10px]">Duration</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{project.duration || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-zinc-400 uppercase text-[10px]">Date</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{displayYear}</span>
                </div>
              </div>

              {/* Key Responsibilities */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Key Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    {project.responsibilities.map((resp, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenge & Research */}
              {(project.challenge || project.research) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.challenge && (
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                        Challenge
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.research && (
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
                        UX Research
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {project.research}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Design Process & Solution */}
              {(project.designProcess || project.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.designProcess && (
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                        Design Process
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {project.designProcess}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                        Architectural Solution
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Outcome & Metrics */}
              {project.outcome && (
                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-[#B45309]/20 dark:border-[#FBBF24]/20 space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#B45309] dark:text-[#FBBF24]">
                    Measurable Outcome & Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed font-semibold">
                    {project.outcome}
                  </p>
                </div>
              )}

              
            </div>
          </div>
        )}
      </>
    );
  }

  // Personal Project Interactive Card UI
  const techList =
    project.technologies && project.technologies.length > 0
      ? project.technologies.slice(0, 3).join(' • ')
      : project.role || 'UX & Frontend';

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim());
  const internalHref = `/projects/${project.slug || project._id}`;

  const cardClasses =
    'group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/80 overflow-hidden hover:border-[#B45309]/60 dark:hover:border-[#FBBF24]/60 transition-all duration-300 shadow-md dark:shadow-xl h-full cursor-pointer';

  const cardInnerContent = (
    <>
      {/* 16:8 Aspect Ratio Thumbnail Container */}
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <Image
          src={project.thumbnail || 'https://res.cloudinary.com/ddzrfwfsl/image/upload/v1786337057/yathish-hero-poster-img_1_qfd3fd.png'}
          alt={`Thumbnail for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-60 dark:opacity-80" />

        {/* Featured Glassmorphism Golden Star Badge */}
        {project.featured && (
          <div
            title="Featured Case Study"
            aria-label="Featured case study"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/50 text-amber-400 font-bold text-lg flex items-center justify-center shadow-lg backdrop-blur-md z-10"
          >
            <span aria-hidden="true">★</span>
          </div>
        )}

        {/* Year Badge */}
        <div
          title={`Production Date: ${displayYear}`}
          aria-label={`Production date: ${displayYear}`}
          className="absolute bottom-0 right-0 text-xs font-mono font-bold text-zinc-200 dark:bg-zinc-900 px-3 py-1 rounded-tl-xl border-t border-l border-zinc-800/80 backdrop-blur-md shadow-md z-10"
        >
          {displayYear}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-1.5 justify-start">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#B45309] dark:group-hover:text-[#FBBF24] transition-colors line-clamp-1 truncate min-w-0">
            {project.title}
          </h3>
          <svg
            className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        <p
          title={`Skill Set: ${techList}`}
          className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-500 line-clamp-1 truncate"
        >
          {techList}
        </p>

        <p
          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2"
          title={project.shortDescription}
        >
          {project.shortDescription}
        </p>
      </div>
    </>
  );

  if (hasLiveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit live site for ${project.title}`}
        aria-label={`Open live site for ${project.title} in new tab`}
        className={cardClasses}
      >
        {cardInnerContent}
      </a>
    );
  }

  return (
    <Link
      href={internalHref}
      title={`View case study for ${project.title}`}
      aria-label={`View case study for ${project.title}`}
      className={cardClasses}
    >
      {cardInnerContent}
    </Link>
  );
}
