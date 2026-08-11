import React from 'react';
import { Skill, SkillCategory } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { SkillGroup } from '@/components/SkillGroup';

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const mainCategories: { key: SkillCategory; title: SkillCategory; legacyMatches: string[] }[] = [
    {
      key: 'UX & Product Development',
      title: 'UX & Product Development',
      legacyMatches: ['UX & Product Development', 'UX / Product Design'],
    },
    {
      key: 'Front End Development',
      title: 'Front End Development',
      legacyMatches: ['Front End Development', 'Frontend', 'Motion / Interaction'],
    },
    {
      key: 'Tools & Technology',
      title: 'Tools & Technology',
      legacyMatches: ['Tools & Technology', 'Backend', 'Database', 'Tools'],
    },
  ];

  const grouped = mainCategories.map((col) => {
    const colSkills = skills.filter((s) => col.legacyMatches.includes(s.category));
    return {
      title: col.title,
      skills: colSkills,
    };
  });

  return (
    <section id="skills" className="py-12 md:py-16 border-b border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Technologies"
          description="Comprehensive technical toolkit spanning product design, modern frontend frameworks, and scalable infrastructure."
        />

        {/* 3 Column Layout separated by vertical lines on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3  divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800/80">
          {grouped.map((col) => (
            <div key={col.title} className="py-4 md:py-0">
              <SkillGroup category={col.title} skills={col.skills} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
