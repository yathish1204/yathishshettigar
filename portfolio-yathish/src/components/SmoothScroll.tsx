'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<any>(null);
  const lastPathnameRef = useRef(pathname);
  const isPopStateRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined' && window.location.pathname !== lastPathnameRef.current) {
        isPopStateRef.current = true;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Reset scroll position to top (0, 0) on any page navigation
  useEffect(() => {
    // If popstate (browser back/forward) is active, reset flag and return early to keep native scroll history
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      lastPathnameRef.current = pathname;
      return;
    }

    const isBack = typeof window !== 'undefined' && sessionStorage.getItem('navigating_back') === 'true';
    if (isBack) {
      sessionStorage.removeItem('navigating_back');
      lastPathnameRef.current = pathname;
      return;
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    lastPathnameRef.current = pathname;
  }, [pathname]);

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

        lenisRef.current = lenis;

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
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
