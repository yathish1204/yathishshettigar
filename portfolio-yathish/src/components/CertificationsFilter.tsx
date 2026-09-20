'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function FilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const categories = ['All', 'AI', 'UI', 'Development', 'Others'];

  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    const queryString = params.toString();
    router.push(`/certifications${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  return (
    <div className="flex flex-nowrap items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-none pb-0.5" role="tablist" aria-label="Filter certifications">

      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleFilterChange(cat)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
              isActive
                ? 'bg-[#B45309] text-white border-[#B45309] dark:bg-[#FBBF24] dark:text-zinc-950 dark:border-[#FBBF24] shadow-md shadow-[#B45309]/10 dark:shadow-[#FBBF24]/10'
                : 'bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export function CertificationsFilter() {
  return (
    <Suspense fallback={<div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-xl" />}>
      <FilterButtons />
    </Suspense>
  );
}
