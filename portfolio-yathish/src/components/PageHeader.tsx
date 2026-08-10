import React from 'react';
import Link from 'next/link';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  backHref?: string;
  backTooltip?: string;
  onBack?: () => void;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  backHref = '/',
  backTooltip = 'Back Home',
  onBack,
}: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10 space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Back Button with Dynamic Tooltip and Handler/Href */}
          <div className="relative group shrink-0">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label={backTooltip}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#B45309] dark:hover:border-[#FBBF24] hover:text-[#B45309] dark:hover:text-[#FBBF24] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
            ) : (
              <Link
                href={backHref}
                aria-label={backTooltip}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#B45309] dark:hover:border-[#FBBF24] hover:text-[#B45309] dark:hover:text-[#FBBF24] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>
            )}

            {/* Hover Tooltip */}
            <div className="absolute left-0 top-full mt-2 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
              {backTooltip}
            </div>
          </div>

          {/* Eyebrow & Title in the same header row */}
          <div className="min-w-0 py-0.5">
            {eyebrow && (
              <span className="inline-block text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gradient-accent mb-0.5 pb-0.5">
                {eyebrow}
              </span>
            )}
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
              {title}
            </h1>
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
