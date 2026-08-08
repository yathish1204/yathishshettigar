import React from 'react';
import { Button } from '@/components/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryHref?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this section.',
  retryHref,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 my-8">
      <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800/80 flex items-center justify-center text-red-400 font-bold mb-4">
        !
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mb-6">{message}</p>
      {retryHref && (
        <Button href={retryHref} variant="outline" size="sm">
          Return Home
        </Button>
      )}
    </div>
  );
}
