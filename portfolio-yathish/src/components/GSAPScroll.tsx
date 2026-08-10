'use client';

import React, { useEffect, useRef } from 'react';

export function GSAPScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let ctx: any = null;
    let isMounted = true;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!isMounted || !containerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.to('.scroll-progress-bar', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          });
        }, containerRef);
      }
    );

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left z-[100] scale-x-0 pointer-events-none hidden" />
      {children}
    </div>
  );
}
