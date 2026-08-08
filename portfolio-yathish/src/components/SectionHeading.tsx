import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
