import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  if (action) {
    return (
      <div
        className={cn(
          'mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 w-full',
          align === 'center' ? 'text-center max-w-3xl mx-auto' : '',
          className
        )}
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <span aria-hidden="true" className="inline-block text-xs font-bold uppercase tracking-widest text-gradient-accent mb-2 pb-0.5">
              {eyebrow}
            </span>
          )}
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-[1.25] pb-1 pt-0.5">
            {title}
          </h2>
        </div>
        <div className="shrink-0 self-start md:self-auto">
          {action}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <span aria-hidden="true" className="inline-block text-xs font-bold uppercase tracking-widest text-gradient-accent mb-2 pb-0.5">
          {eyebrow}
        </span>
      )}
      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-[1.25] pb-1 pt-0.5">
        {title}
      </h2>
    </div>
  );
}
