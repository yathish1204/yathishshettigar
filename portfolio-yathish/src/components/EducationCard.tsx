import React from 'react';
import { Education } from '@/types';

export interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none hover:border-emerald-500/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {education.degree} in <span className="text-emerald-600 dark:text-emerald-400 font-medium">{education.field}</span>
        </h3>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {education.startDate} — {education.endDate || 'Present'}
        </span>
      </div>

      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">{education.institution}</div>

      {education.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{education.description}</p>
      )}
    </div>
  );
}
