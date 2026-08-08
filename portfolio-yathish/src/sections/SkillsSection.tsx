import React from 'react';
import { Skill, SkillCategory } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { SkillGroup } from '@/components/SkillGroup';

export function SkillsSection({ skills }: { skills: Skill[] }) {
  // Group skills by category
  const categories: SkillCategory[] = [
    'UX / Product Design',
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Motion / Interaction',
  ];

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical & Design Capabilities"
          title="Skills & Technologies"
          description="Categorized breakdown of UX design, frontend architecture, backend integration, and interaction tools."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const categorySkills = skills.filter((s) => s.category === cat);
            return <SkillGroup key={cat} category={cat} skills={categorySkills} />;
          })}
        </div>
      </div>
    </section>
  );
}
