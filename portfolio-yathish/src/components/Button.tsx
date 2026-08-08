import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary:
      'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-semibold shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all',
    secondary:
      'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/60 active:scale-[0.98] transition-all',
    outline:
      'border border-zinc-700 text-zinc-200 hover:border-emerald-500 hover:text-emerald-400 bg-transparent active:scale-[0.98] transition-all',
    ghost:
      'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
