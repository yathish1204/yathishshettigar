import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'zinc' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'zinc', className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  const variants = {
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    zinc: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
    outline: 'bg-transparent text-zinc-400 border-zinc-700/80',
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
