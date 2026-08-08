import React from 'react';
import { Skill, SkillCategory } from '@/types';
import { Badge } from '@/components/Badge';

export interface SkillGroupProps {
  category: SkillCategory;
  skills: Skill[];
}

export function SkillGroup({ category, skills }: SkillGroupProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
      <h3 className="text-lg font-bold text-zinc-100 mb-4 border-b border-zinc-800 pb-3 flex items-center justify-between">
        <span>{category}</span>
        <span className="text-xs font-mono text-emerald-400 font-normal">{skills.length} Skills</span>
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <div key={skill._id || skill.name} className="flex items-center gap-1.5">
            <Badge variant="emerald" className="py-1 px-3 text-xs md:text-sm font-normal">
              {skill.name}
              {skill.yearsOfExperience && (
                <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                  {skill.yearsOfExperience}y
                </span>
              )}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
