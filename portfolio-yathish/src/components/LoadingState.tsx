import React from 'react';

export function LoadingState({ message = 'Loading content...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-mono text-zinc-400">{message}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 animate-pulse">
      <div className="w-full aspect-video bg-zinc-800/60 rounded-xl mb-4" />
      <div className="h-4 bg-zinc-800/60 rounded w-1/3 mb-2" />
      <div className="h-6 bg-zinc-800/60 rounded w-3/4 mb-4" />
      <div className="h-4 bg-zinc-800/60 rounded w-full mb-2" />
      <div className="h-4 bg-zinc-800/60 rounded w-5/6 mb-6" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-zinc-800/60 rounded-full" />
        <div className="h-6 w-16 bg-zinc-800/60 rounded-full" />
      </div>
    </div>
  );
}
