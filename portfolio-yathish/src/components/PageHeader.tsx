'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    if (onBack) {
      e.preventDefault();
      onBack();
      return;
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('navigating_back', 'true');
    }

    // If backHref contains a section anchor (e.g. /#projects, /#about), push hash route directly
    if (backHref && backHref.includes('#')) {
      e.preventDefault();
      router.push(backHref);
      return;
    }

    // If we have an internal referrer, go back in history to natively restore scroll position
    if (
      typeof window !== 'undefined' &&
      document.referrer &&
      document.referrer.includes(window.location.host)
    ) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <header className="sticky top-[72px] z-30 bg-slate-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 sm:py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 transition-all shadow-sm dark:shadow-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        {/* Top/Left Section: Back Button + Title Block */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
          {/* Back Button with Dynamic Tooltip and Handler/Href */}
          <div className="relative group shrink-0">
            {onBack ? (
              <button
                type="button"
                onClick={handleBack}
                aria-label={backTooltip}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#B45309] dark:hover:border-[#FBBF24] hover:text-[#B45309] dark:hover:text-[#FBBF24] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
            ) : (
              <Link
                href={backHref}
                onClick={handleBack}
                aria-label={backTooltip}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#B45309] dark:hover:border-[#FBBF24] hover:text-[#B45309] dark:hover:text-[#FBBF24] flex items-center justify-center transition-all shadow-sm cursor-pointer"
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
          <div className="min-w-0 flex-1">
            {eyebrow && (
              <span className="hidden sm:block text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gradient-accent mb-0.5">
                {eyebrow}
              </span>
            )}
            <h1 className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-tight truncate sm:break-words">
              {title}
            </h1>
          </div>
        </div>

        {/* Action (Horizontally Scrollable Filter / Tab Switcher) */}
        {action && (
          <div className="w-full md:w-auto shrink-0 overflow-x-auto scrollbar-none flex items-center pt-0.5 md:pt-0">
            {action}
          </div>
        )}
      </div>

      {description && (
        <p className="hidden md:block text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-2 font-sans max-w-3xl">
          {description}
        </p>
      )}
    </header>
  );
}
