import React from 'react';
import { Certification } from '@/types';
import { formatMonthYear } from '@/utils/format';

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const imgSrc = certification.thumbnail || certification.certificateImage;
  const displayDate = formatMonthYear(certification.issueDate);
  const targetUrl = certification.credentialUrl || '#';

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 text-white border border-zinc-200/90 dark:border-zinc-800/90 hover:border-[#B45309]/50 dark:hover:border-[#FBBF24]/50 hover:shadow-2xl hover:shadow-[#B45309]/10 dark:hover:shadow-[#FBBF24]/10 transition-all duration-300 cursor-pointer block"
    >
      {/* Top Thumbnail Section (Slightly Reduced Height Aspect Ratio) */}
      <div className="relative w-full aspect-[16/7.5] bg-white dark:bg-zinc-100 overflow-hidden flex items-center justify-center">
        {/* Featured Glassmorphism Golden Star Badge at Top Right */}
        {certification.featured && (
          <div
            title="Featured Certification"
            aria-label="Featured certification"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/50 text-amber-400 font-bold text-lg flex items-center justify-center shadow-lg backdrop-blur-md z-10"
          >
            <span aria-hidden="true">★</span>
          </div>
        )}

        {/* Thumbnail Image or Fallback Preview Text */}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={certification.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-center p-4 group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-sans tracking-tight block">
              Course Certificate
            </span>
          </div>
        )}

        {/* Bottom-Right Year/Date Badge */}
        <div
          title={`Issue Date: ${displayDate}`}
          aria-label={`Issue date: ${displayDate}`}
          className="absolute bottom-0 right-0 px-3.5 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono text-xs font-bold rounded-tl-xl shadow-lg z-10 border-t border-l border-zinc-100 dark:border-zinc-800"
        >
          {displayDate}
        </div>
      </div>

      {/* Bottom Content Section: Title with Slant Arrow & Issuer */}
      <div className="p-4 flex flex-col gap-1 bg-zinc-100 dark:bg-zinc-900">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="text-base font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-[#B45309] dark:group-hover:text-[#FBBF24] transition-colors line-clamp-1 min-w-0 flex-1"
            title={certification.name}
          >
            {certification.name}
          </h3>

          {/* Accent Vector Right Slant-Up Arrow on Hover */}
          <svg
            className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        <p
          title={`Issuer: ${certification.issuer}`}
          className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-500 font-sans"
        >
          {certification.issuer}
        </p>
      </div>
    </a>
  );
}
