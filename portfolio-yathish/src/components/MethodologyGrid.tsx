import React from 'react';

export interface MethodStep {
  step: string;
  title: string;
  description: string;
  tags: string[];
}

export const METHOD_STEPS: MethodStep[] = [
  {
    step: '01',
    title: 'Discover',
    description:
      'Stakeholder interviews, usability testing, journey mapping and competitive teardowns to find the real problem before a pixel exists.',
    tags: ['User interviews', 'Journey maps', 'Heuristic audit'],
  },
  {
    step: '02',
    title: 'Define',
    description:
      'Information architecture, task flows and jobs-to-be-done framing that turn messy research into a defensible product direction.',
    tags: ['IA & flows', 'JTBD framing', 'Success metrics'],
  },
  {
    step: '03',
    title: 'Design',
    description:
      'Wireframes to high-fidelity systems: tokens, components, motion specs and accessible states documented for engineering.',
    tags: ['Design system', 'Prototypes', 'A11y specs'],
  },
  {
    step: '04',
    title: 'Develop',
    description:
      'Production React and TypeScript — component libraries, performance budgets and design-to-code parity enforced in review.',
    tags: ['React + TS', 'Component library', 'Perf budgets'],
  },
];

export function MethodologyGrid() {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 p-5 sm:p-6 md:p-8 shadow-md dark:shadow-2xl transition-colors">
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-zinc-200 dark:lg:divide-zinc-800/80" aria-label="UX Engineering Methodology steps">
        {METHOD_STEPS.map((method, idx) => (
          <li
            key={method.step}
            className={`flex flex-col justify-between border-b sm:border-b-0 border-zinc-100 dark:border-zinc-900 pb-6 sm:pb-0 ${
              idx === 0
                ? 'lg:pr-6'
                : idx === METHOD_STEPS.length - 1
                ? 'lg:pl-6 border-b-0 pb-0'
                : 'lg:px-6'
            }`}
          >
            <div>
              {/* Step number badge */}
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-xs font-mono font-bold text-[#B45309] dark:text-[#FBBF24] tracking-wider" aria-hidden="true">
                  {method.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 sm:mb-3 font-sans tracking-tight">
                {method.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                {method.description}
              </p>
            </div>

          </li>
        ))}
      </ol>
    </div>
  );
}
