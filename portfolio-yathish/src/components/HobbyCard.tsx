import React from 'react';
import { Hobby } from '@/types';

export interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 font-bold mb-4">
          ★
        </div>

        <h3 className="text-lg font-bold text-zinc-100 mb-2">{hobby.name}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{hobby.description}</p>
      </div>
    </div>
  );
}
