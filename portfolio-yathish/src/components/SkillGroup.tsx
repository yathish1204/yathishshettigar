'use client';

import React from 'react';
import { Skill, SkillCategory } from '@/types';
import { TechIcon } from '@/components/TechIcon';

export interface SkillGroupProps {
  category: SkillCategory;
  skills: Skill[];
}

function getProficiencyDetails(prof?: number | string) {
  if (prof === undefined || prof === null || prof === '') return { activeStep: 3, label: 'Proficient' };
  const p = Number(prof);
  if (isNaN(p)) return { activeStep: 3, label: 'Proficient' };

  // Explicit Discrete Levels 1, 2, 3, 4
  if (p === 1) return { activeStep: 1, label: 'Basic' };
  if (p === 2) return { activeStep: 2, label: 'Intermediate' };
  if (p === 3) return { activeStep: 3, label: 'Proficient' };
  if (p === 4) return { activeStep: 4, label: 'Advanced' };

  // Continuous percentage ranges
  if (p > 0 && p <= 25) return { activeStep: 1, label: 'Basic' };
  if (p > 25 && p <= 50) return { activeStep: 2, label: 'Intermediate' };
  if (p > 50 && p <= 75) return { activeStep: 3, label: 'Proficient' };
  if (p > 75) return { activeStep: 4, label: 'Advanced' };

  return { activeStep: 3, label: 'Proficient' };
}

export function SkillGroup({ category, skills }: SkillGroupProps) {
  const [activeSkill, setActiveSkill] = React.useState<string | null>(null);
  const [tooltipAlignment, setTooltipAlignment] = React.useState<Record<string, 'start' | 'end' | 'center'>>({});
  const chipRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Close popovers when clicking/tapping outside
  React.useEffect(() => {
    if (!activeSkill) return;

    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.group\\/chip')) {
        setActiveSkill(null);
      }
    };

    // Use a tiny timeout so the event that opened the chip propagates before registering outside click listeners
    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [activeSkill]);

  const handleMouseEnterOrClick = (skillKey: string) => {
    const el = chipRefs.current[skillKey];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const padding = 16; // minimum margin from screen edges
    const halfTooltipWidth = 128; // 256px wide tooltip / 2
    const centerX = rect.left + rect.width / 2;

    let align: 'start' | 'end' | 'center' = 'center';
    if (centerX - halfTooltipWidth < padding) {
      align = 'start';
    } else if (centerX + halfTooltipWidth > viewportWidth - padding) {
      align = 'end';
    }

    setTooltipAlignment((prev) => (prev[skillKey] === align ? prev : { ...prev, [skillKey]: align }));
  };

  const steps = [
    { level: 1, name: 'Basic' },
    { level: 2, name: 'Intermediate' },
    { level: 3, name: 'Proficient' },
    { level: 4, name: 'Advanced' },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:py-2 md:px-6 relative">
      {/* Mobile Transparent Backdrop to ensure 100% reliable 1-tap dismiss outside active chip */}
      {activeSkill && (
        <div
          onClick={() => setActiveSkill(null)}
          className="fixed inset-0 z-40 md:hidden bg-transparent"
          aria-hidden="true"
        />
      )}

      {/* Category Heading */}
      <div className="flex items-center justify-between md:border-b md:border-zinc-200 md:dark:border-zinc-800/80 md:pb-2.5">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
          <span>{category}</span>
        </h3>
        <span
          aria-label={`${skills?.length || 0} skills`}
          className="text-[11px] font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold px-2 py-0.5 rounded bg-[#B45309]/10 dark:bg-[#FBBF24]/10 border border-[#B45309]/20 dark:border-[#FBBF24]/20"
        >
          {skills?.length || 0}
        </span>
      </div>

      {/* Skill Chips with Popovers */}
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1" role="list" aria-label={`${category} skills`}>
          {skills.map((skill) => {
            const svgIcon = TechIcon({ name: skill.name });
            const { activeStep, label } = getProficiencyDetails(skill.proficiency);
            const years = skill.yearsOfExperience || 3;
            const skillKey = skill._id || skill.name;
            const isClicked = activeSkill === skillKey;

            return (
              <div
                key={skillKey}
                ref={(el) => { chipRefs.current[skillKey] = el; }}
                onMouseEnter={() => handleMouseEnterOrClick(skillKey)}
                className="relative group/chip"
                role="listitem"
              >
                {/* Skill Chip Trigger */}
                <div
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name}: ${label} level, ${years} ${years === 1 ? 'year' : 'years'} experience`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMouseEnterOrClick(skillKey);
                    setActiveSkill((prev) => (prev === skillKey ? null : skillKey));
                  }}
                  className={`bg-zinc-100 dark:bg-zinc-900/90 border text-zinc-900 dark:text-zinc-100 px-3 py-1.5 rounded-xl shadow-sm text-xs sm:text-sm font-medium flex items-center gap-2 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] transition-all md:hover:scale-105 active:scale-95 cursor-pointer ${
                    isClicked
                      ? 'border-[#B45309] dark:border-[#FBBF24] bg-zinc-200/85 dark:bg-zinc-800 z-50 relative'
                      : 'border-zinc-200/90 dark:border-zinc-800/90 hover:border-[#B45309]/50 dark:hover:border-[#FBBF24]/50'
                  }`}
                >
                  {skill.icon ? (
                    <img
                      src={skill.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-4 h-4 object-contain shrink-0 rounded-sm"
                    />
                  ) : svgIcon ? (
                    svgIcon
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] dark:bg-[#FBBF24] shrink-0 group-hover/chip:scale-125 transition-transform" aria-hidden="true" />
                  )}
                  <span>{skill.name}</span>
                </div>

                {/* Popover Box: Positions below chip (top-full) on mobile to prevent covering category titles, and above (bottom-full) on desktop */}
                <div
                  aria-hidden={!isClicked}
                  className={`absolute top-full mt-2.5 md:top-auto md:bottom-full md:mt-0 md:mb-3 w-64 p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80 shadow-2xl backdrop-blur-xl transition-all duration-200 z-50 transform ${
                    tooltipAlignment[skillKey] === 'start'
                      ? 'left-0 translate-x-0 origin-top-left md:origin-bottom-left md:left-1/2 md:-translate-x-1/2 md:right-auto'
                      : tooltipAlignment[skillKey] === 'end'
                      ? 'right-0 left-auto translate-x-0 origin-top-right md:origin-bottom-right md:left-1/2 md:-translate-x-1/2 md:right-auto'
                      : 'left-1/2 -translate-x-1/2 origin-top md:origin-bottom'
                  } ${
                    isClicked
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-1 pointer-events-none md:group-hover/chip:opacity-100 md:group-hover/chip:translate-y-0 md:group-hover/chip:pointer-events-auto'
                  }`}
                >
                  {/* Popover Header: Skill Title & Experience Years */}
                  <div className="flex items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2.5">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white font-sans">{skill.name}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-gray-300/10 dark:bg-gray-500/30 text-[#555] dark:text-white whitespace-nowrap">
                      {years} {years === 1 ? 'Year' : 'Years'}
                    </span>
                  </div>

                  {/* 4-Step Horizontal Stepper */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="text-[#B45309] dark:text-[#FBBF24] font-bold uppercase tracking-wider">{label}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                      {steps.map((step) => {
                        const isActive = step.level <= activeStep;
                        return (
                          <div key={step.name} className="flex flex-col items-center gap-1">
                            <div
                              className={`h-1.5 w-full rounded-full transition-colors ${
                                isActive
                                  ? 'bg-[#B45309] dark:bg-[#FBBF24] shadow-sm shadow-[#B45309]/20'
                                  : 'bg-zinc-200 dark:bg-zinc-800'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Arrow Pointer: points UP towards chip on mobile, points DOWN on desktop */}
                  <div className={`absolute bottom-full -mb-[1px] md:bottom-auto md:top-full md:-mt-[1px] border-4 border-transparent border-b-white dark:border-b-zinc-900/95 md:border-b-transparent md:border-t-white md:dark:border-t-zinc-900/95 ${
                    tooltipAlignment[skillKey] === 'start'
                      ? 'left-6 translate-x-0 md:left-1/2 md:-translate-x-1/2'
                      : tooltipAlignment[skillKey] === 'end'
                      ? 'right-6 left-auto translate-x-0 md:left-1/2 md:-translate-x-1/2'
                      : 'left-1/2 -translate-x-1/2'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="pt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 italic">
          No skills added yet.
        </div>
      )}
    </div>
  );
}
