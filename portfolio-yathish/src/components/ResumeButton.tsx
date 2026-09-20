'use client';

import React from 'react';
import { Button } from '@/components/Button';

export function ResumeButton() {
  const handleViewResume = () => {
    const link = document.createElement('a');
    link.href = '/api/resume?download=true';
    link.download = 'Yathish_Shettigar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="outline"
      size="md"
      href="/api/resume"
      external
      onClick={handleViewResume}
      className="relative overflow-hidden group cursor-pointer"
    >
      {/* Shiny Light Beam */}
      <span className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-lg">
        <span className="absolute top-0 -left-[100%] w-16 h-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/60 to-transparent skew-x-[-25deg] blur-[3px] animate-shine" />
      </span>
      <svg className="w-4 h-4 text-current relative z-10 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l4.414 4.414a1 1 0 01.586 1.414V19a2 2 0 01-2 2z" />
      </svg>
      <span className="relative z-10 font-bold">View Resume</span>
    </Button>
  );
}
