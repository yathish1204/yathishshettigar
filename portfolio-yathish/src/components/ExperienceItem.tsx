'use client';

import React, { useRef, useEffect } from 'react';
import { Experience } from '@/types';
import { Badge } from '@/components/Badge';
import { formatYearRange } from '@/utils/format';

export interface ExperienceItemProps {
  experience: Experience;
  isOpen?: boolean;
  isLatest?: boolean;
  onToggle?: () => void;
}

export function ExperienceItem({
  experience,
  isOpen = false,
  isLatest = false,
  onToggle,
}: ExperienceItemProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const active = onToggle !== undefined ? isOpen : internalOpen;
  const itemRef = useRef<HTMLDivElement>(null);

  // Pulse animation for latest employer (either explicitly set or default top entry)
  const shouldPulse =
    experience.isLatestEmployer !== undefined ? Boolean(experience.isLatestEmployer) : isLatest;

  const toggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  // IntersectionObserver auto-scroll into viewport when expanded
  useEffect(() => {
    if (active && itemRef.current) {
      const timer = setTimeout(() => {
        if (!itemRef.current) return;
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry.isIntersecting || entry.intersectionRatio < 0.85) {
              const yOffset = -100; // Account for fixed header offset
              const element = itemRef.current;
              if (element) {
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }
            observer.disconnect();
          },
          { threshold: [0.85] }
        );
        observer.observe(itemRef.current);
      }, 120);

      return () => clearTimeout(timer);
    }
  }, [active]);

  // Parse Summary into bulleted point lines
  const summaryPoints = React.useMemo(() => {
    if (!experience.summary) return [];
    return experience.summary
      .split('\n')
      .map((line) => line.replace(/^[\s•\-*]+/, '').trim())
      .filter(Boolean);
  }, [experience.summary]);

  const bodyId = `exp-body-${experience._id || experience.company.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <article ref={itemRef} className="relative group transition-colors">
      {/* Stepper Node with Horizontally-Centered Alignment & Pulsing Ring for Latest Employer */}
      <div className="absolute -left-6 md:-left-8 top-3.5 -translate-x-1/2 flex items-center justify-center z-20" aria-hidden="true">
        {shouldPulse && (
          <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#9D5AF9]/60 dark:bg-[#BF6BFA]/50 animate-ping opacity-75" />
        )}
        <div
          className={`relative w-4 h-4 rounded-full transition-all duration-300 bg-gradient-to-r from-[#9D5AF9] to-[#123FD9] dark:from-[#BF6BFA] dark:to-[#53B9F6] shadow-md shadow-[#9D5AF9]/30 dark:shadow-[#BF6BFA]/30 ${
            active
              ? 'scale-125 ring-2 ring-[#B45309] dark:ring-[#FBBF24]'
              : shouldPulse
              ? 'scale-110'
              : 'opacity-80 group-hover:scale-125'
          }`}
        />
      </div>

      {/* Accordion Item Container (Only Border Bottom with padding, active highlight) */}
      <div
        className={`pb-6 md:pb-8 mb-6 md:mb-8 transition-all duration-200 border-b ${
          active
            ? 'border-[#B45309] dark:border-[#FBBF24]'
            : 'border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
        }`}
      >
        {/* Accordion Header (Clickable Trigger) */}
        <button
          type="button"
          onClick={toggle}
          className="w-full text-left flex flex-col gap-2 focus:outline-none group/btn cursor-pointer"
          aria-expanded={active}
          aria-controls={bodyId}
        >
          {/* Line 1: Company name, location ---- Start & End date + Chevron icon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 w-full">
            <div className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 flex-wrap group-hover/btn:text-[#B45309] dark:group-hover/btn:text-[#FBBF24] transition-colors">
              <span>{experience.company}</span>
              {experience.location && (
                <span className="text-xs sm:text-sm font-normal text-zinc-500 dark:text-zinc-400">
                  • {experience.location}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 justify-between sm:justify-start w-full sm:w-auto shrink-0">
              <span
                className={`text-xs font-mono px-3 py-1 rounded-md border font-medium transition-colors ${
                  active
                    ? 'text-[#B45309] dark:text-[#FBBF24] bg-[#B45309]/10 dark:bg-[#FBBF24]/10 border-[#B45309]/30 dark:border-[#FBBF24]/30'
                    : 'text-zinc-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {formatYearRange(experience.startDate, experience.endDate, experience.current)}
              </span>

              <div
                className={`p-1 rounded-md transition-all duration-200 ${
                  active
                    ? 'text-[#B45309] dark:text-[#FBBF24] rotate-180'
                    : 'text-zinc-400 dark:text-zinc-500 group-hover/btn:text-[#B45309] dark:group-hover/btn:text-[#FBBF24]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Line 2: Role */}
          <div
            className={`text-sm sm:text-base font-semibold transition-colors ${
              active
                ? 'text-[#B45309] dark:text-[#FBBF24]'
                : 'text-zinc-700 dark:text-zinc-300 group-hover/btn:text-[#B45309] dark:group-hover/btn:text-[#FBBF24]'
            }`}
          >
            {experience.role}
          </div>
        </button>

        {/* Accordion Body (Expanded Content) */}
        {active && (
          <div id={bodyId} role="region" aria-label={`${experience.company} role details`} className="pt-5 space-y-5 animate-fadeIn">
            {/* Summary rendered as Bulleted Points */}
            {summaryPoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Summary
                </h4>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans break-words whitespace-normal max-w-full">
                  {summaryPoints.map((point, idx) => (
                    <li key={idx} className="break-words max-w-full leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Tags */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5">
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="zinc">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
