'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LetterConfig {
  char: string;
  word: string;
}

const LETTERS: LetterConfig[] = [
  { char: 'Y', word: 'Yonder' },
  { char: 'A', word: 'Adaptive' },
  { char: 'T', word: 'Thoughtful' },
  { char: 'H', word: 'Human-Centered' },
  { char: 'I', word: 'Innovative' },
  { char: 'S', word: 'Strategic' },
  { char: 'H', word: 'Harmonious' },
];

export function YathishAnimatedTitle() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Y shape state: 0 = 'Y', 1 = Square, 2 = Circle, 3 = Triangle
  const [yShapeIndex, setYShapeIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Y letter shape cycling when Y (index 0) is hovered
  const isYHovered = hoveredIndex === 0;

  useEffect(() => {
    if (isYHovered) {
      setYShapeIndex(1); // Start at Square
      let currentStep = 1;

      intervalRef.current = setInterval(() => {
        currentStep = (currentStep % 3) + 1; // Cycles 1 (Square) -> 2 (Circle) -> 3 (Triangle)
        setYShapeIndex(currentStep);
      }, 350);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setYShapeIndex(0); // Reset back to 'Y'
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isYHovered]);

  const getLetterAnimationClass = (index: number): string => {
    switch (index) {
      case 0: // Y
        return '';
      case 1: // A
        return 'hover:rotate-[360deg]';
      case 2: // T
        return 'hover:-translate-y-3';
      case 3: // H (1st)
        return 'hover:scale-x-[-1]';
      case 4: // I
        return 'hover:scale-y-125';
      case 5: // S
        return 'hover:rotate-12 hover:-translate-y-1';
      case 6: // H (2nd)
        return 'hover:-rotate-[360deg]';
      default:
        return '';
    }
  };

  return (
    <div className="hidden md:flex flex-col items-center justify-center py-2 overflow-hidden select-none">
      {/* Tight-spaced Letters (Each letter animates ONLY on direct hover) */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 font-black font-mono tracking-tighter">
        {LETTERS.map((item, index) => {
          if (index === 0) {
            // Letter 'Y'
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-14 h-16 lg:w-16 lg:h-20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 shrink-0"
              >
                {yShapeIndex === 0 && (
                  <span className="text-6xl lg:text-7xl font-black text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                    Y
                  </span>
                )}
                {yShapeIndex === 1 && (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-emerald-500 bg-emerald-500/20 rounded-none shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse" />
                )}
                {yShapeIndex === 2 && (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-emerald-500 bg-emerald-500/20 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse" />
                )}
                {yShapeIndex === 3 && (
                  <svg className="w-11 h-11 lg:w-14 lg:h-14 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 21h22L12 3z" />
                  </svg>
                )}
              </div>
            );
          }

          // Other Letters (A, T, H, I, S, H)
          return (
            <span
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`text-6xl lg:text-7xl font-black text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer transition-all duration-300 hover:scale-125 inline-block px-0.5 ${getLetterAnimationClass(
                index
              )}`}
            >
              {item.char}
            </span>
          );
        })}
      </div>

      {/* Reserved Empty Height Subtitle Display (Zero Layout Shift) */}
      <div className="h-4 min-h-[24px] mt-1 flex items-center justify-center transition-all duration-200">
        {hoveredIndex !== null && (
          <span className="text-xs lg:text-sm font-mono font-bold text-[#555]dark:text-white tracking-widest uppercase rounded-full shadow-sm animate-fade-in">
            {LETTERS[hoveredIndex].word}
          </span>
        )}
      </div>
    </div>
  );
}
