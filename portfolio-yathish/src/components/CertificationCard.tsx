import React from 'react';
import { Certification } from '@/types';

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const imgSrc = certification.thumbnail || certification.certificateImage;
  const issueYear = certification.issueDate ? certification.issueDate.slice(0, 4) : '2024';
  const targetUrl = certification.credentialUrl || '#';

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 text-white border border-zinc-800/90 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer block"
    >
      {/* Top Thumbnail Section (Slightly Reduced Height Aspect Ratio) */}
      <div className="relative w-full aspect-[16/7.5] bg-white dark:bg-zinc-100 overflow-hidden flex items-center justify-center p-4">
        {/* Featured Glassmorphism Golden Star Badge at Top Right */}
        {certification.featured && (
          <div
            title="Featured Certification"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/50 text-amber-400 font-bold text-lg flex items-center justify-center shadow-lg backdrop-blur-md z-10"
          >
            ★
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
          <div className="text-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-sans tracking-tight block">
              Course Certificate
            </span>
          </div>
        )}

        {/* Bottom-Right Year Badge */}
        <div
          title={`Issue Year: ${issueYear}`}
          className="absolute bottom-0 right-0 px-3.5 py-1 bg-white dark:bg-zinc-900 text-white font-mono text-xs font-bold rounded-tl-xl shadow-lg z-10 border-t border-l border-zinc-800"
        >
          {issueYear}
        </div>
      </div>

      {/* Bottom Content Section: Title with Slant Arrow & Issuer */}
      <div className="p-4 flex flex-col gap-1 bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="text-base font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors line-clamp-1 min-w-0 flex-1"
            title={certification.name}
          >
            {certification.name}
          </h3>

          {/* Accent Vector Right Slant-Up Arrow on Hover */}
          <svg
            className="w-4 h-4 text-emerald-500 dark:text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
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
