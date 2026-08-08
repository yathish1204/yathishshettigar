import React from 'react';
import { Experience } from '@/types';
import { Badge } from '@/components/Badge';
import { formatYearRange } from '@/utils/format';

export interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="relative pl-6 md:pl-8 border-l border-zinc-800 pb-12 last:pb-0 group">
      {/* Timeline Bullet Node */}
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-500 group-hover:scale-125 transition-transform" />

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
        <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
          {experience.role} <span className="text-emerald-400 font-medium">@ {experience.company}</span>
        </h3>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800 self-start md:self-auto">
          {formatYearRange(experience.startDate, experience.endDate, experience.current)}
        </span>
      </div>

      {experience.location && (
        <div className="text-xs text-zinc-500 font-mono mb-4">{experience.location}</div>
      )}

      <p className="text-zinc-300 text-base leading-relaxed mb-4">{experience.summary}</p>

      {/* Accomplishments & Responsibilities */}
      {experience.achievements && experience.achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-2">Key Accomplishments</h4>
          <ul className="space-y-1.5 list-disc list-inside text-sm text-zinc-400">
            {experience.achievements.map((ach, idx) => (
              <li key={idx} className="leading-relaxed">
                {ach}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="zinc">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
