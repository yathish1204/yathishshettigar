import React from 'react';
import { Hobby } from '@/types';

export interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-default bg-zinc-200/90 dark:bg-zinc-800/80">
      {/* Accent Gradient Border Layer (Reveals smoothly on Hover) */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#9D5AF9] to-[#123FD9] dark:from-[#BF6BFA] dark:to-[#53B9F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Inner Content Card (Concentric 14.5px radius sitting over gradient) */}
      <div className="relative z-10 p-4 rounded-[14.5px] bg-white dark:bg-zinc-900 flex items-center gap-3.5 h-full">
        {/* Golden Yellow Icon with no padding or border */}
        <div className="text-xl sm:text-2xl text-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
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
    </div>
  );
}
