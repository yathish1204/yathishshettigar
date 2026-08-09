import React from 'react';

export function TechIcon({ name }: { name: string }) {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes('react')) {
    return (
      <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (normalized.includes('next')) {
    return (
      <svg className="w-4 h-4 text-zinc-900 dark:text-zinc-100 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.89 13.91l-4.57-6.42v6.42H10V8h1.49l4.57 6.42V8h1.33v7.91z" />
      </svg>
    );
  }

  if (normalized.includes('typescript') || normalized.includes('ts')) {
    return (
      <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <rect width="20" height="20" x="2" y="2" rx="4" fill="#3178C6" />
        <path d="M11.5 16.5h-2v-7h-2.5v-1.5h7v1.5h-2.5v7zm7-1.5c0 .9-.7 1.5-1.7 1.5-1.1 0-1.8-.7-1.8-1.7h1.4c.1.3.3.5.6.5.3 0 .5-.2.5-.5 0-.8-2-1-2-2.3 0-.9.7-1.5 1.7-1.5 1 0 1.6.6 1.7 1.4h-1.3c0-.3-.2-.4-.5-.4-.3 0-.4.2-.4.4 0 .7 2 .8 2 2.1z" fill="#FFF" />
      </svg>
    );
  }

  if (normalized.includes('tailwind')) {
    return (
      <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <svg className="w-4 h-4 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm0-8a4 4 0 0 1 4 4v4H8a4 4 0 1 1 0-8zm8 4a4 4 0 0 1-4 4H8V4a4 4 0 0 1 8 4zM8 16h4v4a4 4 0 1 1-4-4z" />
      </svg>
    );
  }

  if (normalized.includes('node')) {
    return (
      <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm-1 14.5l-4-2.3V9.6l4 2.3v4.6zm6-2.3l-4 2.3V11.9l4-2.3v4.6z" />
      </svg>
    );
  }

  if (normalized.includes('graphql')) {
    return (
      <svg className="w-4 h-4 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zM4.5 9l6.5-3.8L17.5 9v7.5L11 20.3 4.5 16.5V9z" />
      </svg>
    );
  }

  if (normalized.includes('git') || normalized.includes('github')) {
    return (
      <svg className="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    );
  }

  if (normalized.includes('docker')) {
    return (
      <svg className="w-4 h-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.98 11.08h2.12v2.11h-2.12zm-3.18 0h2.12v2.11h-2.12zm-3.18 0h2.12v2.11H7.62zm9.54-3.18h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H4.44zm12.72-3.18h2.12v2.12h-2.12zM23 13.2c-.37-.25-1.39-.77-2.88-.63-.44-1.2-1.42-2.22-2.47-2.76l-.42-.22-.3.35c-.83.98-1.1 2.45-.72 3.73-.25.13-.53.29-.83.47H.5v.76c0 3.6 2.31 6.55 6.35 6.55 5.07 0 8.89-2.35 11.23-6.66 1.3.1 3.51.05 4.92-1.59z" />
      </svg>
    );
  }

  if (normalized.includes('python')) {
    return (
      <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.89 2c-4.4 0-4.14 1.91-4.14 1.91v1.98h4.22v.6h-5.9S3.5 6.2 3.5 10.61c0 4.41 1.92 4.24 1.92 4.24h1.15v-1.64s-.06-1.92 1.88-1.92h3.24s1.82.03 1.82-1.76V5.77s.25-3.77-3.62-3.77zm-2.02 1.25a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54zM12.11 22c4.4 0 4.14-1.91 4.14-1.91v-1.98h-4.22v-.6h5.9s2.57.29 2.57-4.12c0-4.41-1.92-4.24-1.92-4.24h-1.15v1.64s.06 1.92-1.88 1.92h-3.24s-1.82-.03-1.82 1.76v3.76s-.25 3.77 3.62 3.77zm2.02-1.25a.77.77 0 1 1 0-1.54.77.77 0 0 1 0 1.54z" />
      </svg>
    );
  }

  if (normalized.includes('mongo')) {
    return (
      <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2s-5.5 6.5-5.5 11.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5C17.5 8.5 12 2 12 2zm0 15v-6.5c.83 0 1.5.67 1.5 1.5 0 1.66-1.5 5-1.5 5z" />
      </svg>
    );
  }

  if (normalized.includes('postgres')) {
    return (
      <svg className="w-4 h-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V12h2v4.93a8 8 0 1 1-2 0z" />
      </svg>
    );
  }

  if (normalized.includes('gsap') || normalized.includes('framer') || normalized.includes('motion')) {
    return (
      <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }

  if (normalized.includes('storybook')) {
    return (
      <svg className="w-4 h-4 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.71 3.56l-3.3 1.84a.5.5 0 0 0-.25.43v7.41a.5.5 0 0 0 .75.43l3.3-1.84a.5.5 0 0 0 .25-.43V4a.5.5 0 0 0-.75-.44zM7.29 3.56L4 5.4a.5.5 0 0 0-.25.43v7.41a.5.5 0 0 0 .75.43l3.3-1.84a.5.5 0 0 0 .25-.43V4a.5.5 0 0 0-.76-.44z" />
      </svg>
    );
  }

  if (normalized.includes('html') || normalized.includes('css')) {
    return (
      <svg className="w-4 h-4 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  }

  // Fallback: No matching tool icon
  return null;
}
