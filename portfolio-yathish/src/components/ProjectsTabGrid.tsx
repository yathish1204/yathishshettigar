'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { PageHeader } from '@/components/PageHeader';

export interface ProjectsTabGridProps {
  projects: Project[];
}

export function ProjectsTabGrid({ projects }: ProjectsTabGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'corporate' ? 'corporate' : 'personal';

  const [activeTab, setActiveTab] = useState<'personal' | 'corporate'>(initialTab);

  // Sync tab with URL search parameter when searchParams change
  useEffect(() => {
    const currentTabParam = searchParams.get('tab');
    if (currentTabParam === 'corporate' && activeTab !== 'corporate') {
      setActiveTab('corporate');
    } else if (currentTabParam !== 'corporate' && activeTab !== 'personal') {
      setActiveTab('personal');
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: 'personal' | 'corporate') => {
    setActiveTab(tab);
    if (tab === 'corporate') {
      router.push('/projects?tab=corporate', { scroll: false });
    } else {
      router.push('/projects', { scroll: false });
    }
  };

  const personalProjects = (projects || []).filter((p) => !p.isCorporateProject);
  const corporateProjects = (projects || []).filter((p) => p.isCorporateProject);

  const displayedProjects = activeTab === 'personal' ? personalProjects : corporateProjects;

  const tabSwitcherAction = (
    <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <button
        type="button"
        onClick={() => handleTabChange('personal')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
          activeTab === 'personal'
            ? 'bg-white dark:bg-zinc-800 text-[#B45309] dark:text-[#FBBF24] shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
      >
        Personal ({personalProjects.length})
      </button>
      <button
        type="button"
        onClick={() => handleTabChange('corporate')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
          activeTab === 'corporate'
            ? 'bg-white dark:bg-zinc-800 text-[#B45309] dark:text-[#FBBF24] shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
      >
        Corporate Project ({corporateProjects.length})
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header and Tab Switcher aligned in the SAME row */}
      <PageHeader
        eyebrow="Case Study Portfolio"
        title="Featured Projects & Work"
        action={tabSwitcherAction}
        backHref={activeTab === 'corporate' ? undefined : '/'}
        backTooltip={activeTab === 'corporate' ? 'Back to Projects' : 'Back Home'}
        onBack={activeTab === 'corporate' ? () => handleTabChange('personal') : undefined}
      />

      {/* Grid of Projects */}
      {displayedProjects.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
            No {activeTab === 'personal' ? 'personal' : 'corporate'} projects found in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project._id || project.slug} project={project} priority={index < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
