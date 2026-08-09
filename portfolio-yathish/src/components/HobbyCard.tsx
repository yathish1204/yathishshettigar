import React from 'react';
import { Hobby } from '@/types';

export interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-emerald-500/40 transition-all hover:scale-[1.02] shadow-sm dark:shadow-none flex items-center gap-3.5 group cursor-default">
      {/* Vertically Aligned Icon */}
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shrink-0 text-base">
        {hobby.icon || '✦'}
      </div>

      {/* Vertically Aligned Text Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate" title={hobby.name}>
          {hobby.name}
        </h3>
        <p
          className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-1 truncate mt-0.5"
          title={hobby.description}
        >
          {hobby.description}
        </p>
      </div>
    </div>
  );
}
