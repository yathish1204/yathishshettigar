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
    <div className="w-full rounded-2xl bg-zinc-950 border border-zinc-800/80 p-6 md:p-8 shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-zinc-800/80">
        {METHOD_STEPS.map((method, idx) => (
          <div
            key={method.step}
            className={`flex flex-col justify-between ${
              idx === 0 ? 'lg:pr-6' : idx === METHOD_STEPS.length - 1 ? 'lg:pl-6' : 'lg:px-6'
            }`}
          >
            <div>
              {/* Step number + top line */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-orange-500 tracking-wider">
                  {method.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-zinc-100 mb-3 font-sans tracking-tight">
                {method.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                {method.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
