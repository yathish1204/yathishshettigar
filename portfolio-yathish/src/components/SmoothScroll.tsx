'use client';

import React, { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null;
    let tickerCallback: any = null;
    let gsapObj: any = null;
    let isMounted = true;

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;

        gsap.registerPlugin(ScrollTrigger);
        gsapObj = gsap;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        tickerCallback = (time: number) => {
          lenis?.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      }
    );

    return () => {
      isMounted = false;
      if (gsapObj && tickerCallback) {
        gsapObj.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
