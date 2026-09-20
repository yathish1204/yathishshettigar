import React from 'react';
import { MethodStep } from '@/types';
import { METHODOLOGY_STEPS } from '@/constants/data';

export type { MethodStep };
export const METHOD_STEPS: MethodStep[] = METHODOLOGY_STEPS;



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
