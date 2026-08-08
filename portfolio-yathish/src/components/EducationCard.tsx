import React from 'react';
import { Education } from '@/types';

export interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
        <h3 className="text-xl font-bold text-zinc-100">
          {education.degree} in <span className="text-emerald-400 font-medium">{education.field}</span>
        </h3>
        <span className="text-xs font-mono text-zinc-400">
          {education.startDate} — {education.endDate || 'Present'}
        </span>
      </div>

      <div className="text-sm font-medium text-zinc-300 mb-3">{education.institution}</div>

      {education.description && (
        <p className="text-sm text-zinc-400 leading-relaxed">{education.description}</p>
      )}
    </div>
  );
}
