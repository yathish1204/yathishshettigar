import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'zinc' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'zinc', className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors';
  const variants = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    zinc: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/60',
    outline: 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700/80',
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
