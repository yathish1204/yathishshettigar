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
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95';

  const variants = {
    primary:
      'bg-[#B45309] text-white hover:bg-[#92400e] dark:bg-[#FBBF24] dark:text-zinc-950 dark:hover:bg-[#f59e0b] font-semibold border-2 border-[#B45309] dark:border-[#FBBF24] shadow-lg shadow-[#B45309]/20 dark:shadow-[#FBBF24]/20',
    secondary:
      'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/60',
    outline:
      'border-2 border-[#B45309] text-[#B45309] dark:border-[#FBBF24] dark:text-[#FBBF24] hover:bg-[#B45309] hover:text-white dark:hover:bg-[#FBBF24] dark:hover:text-zinc-950 font-bold bg-transparent shadow-sm',
    ghost:
      'text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] hover:bg-zinc-800/60 bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
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
          {...(props as any)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...(props as any)}>
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
