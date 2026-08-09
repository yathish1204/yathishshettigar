'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Certification } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { CertificationCard } from '@/components/CertificationCard';
import { Button } from '@/components/Button';

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Maximum 9 items displayed in carousel on main page
  const displayCerts = certifications ? certifications.slice(0, 9) : [];

  // Update cardsPerPage based on current viewport width
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(displayCerts.length / cardsPerPage);

  const getCardWidth = () => {
    if (!scrollRef.current || !scrollRef.current.firstElementChild) return scrollRef.current?.clientWidth || 300;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    return firstChild.getBoundingClientRect().width + 24; // width + 24px gap
  };

  const handleScrollEvent = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Detect if scrolled near maximum end boundary
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 12;
    if (isAtEnd) {
      setActiveIndex(totalPages - 1);
      return;
    }

    const cardWidth = getCardWidth();
    if (cardWidth > 0) {
      const page = Math.round(container.scrollLeft / (cardWidth * cardsPerPage));
      const clampedPage = Math.min(Math.max(0, page), totalPages - 1);
      if (clampedPage !== activeIndex) {
        setActiveIndex(clampedPage);
      }
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = getCardWidth();

    // If target is the last page, scroll directly to max scrollLeft so odd items show alone
    const targetScrollLeft =
      pageIndex === totalPages - 1
        ? container.scrollWidth - container.clientWidth
        : pageIndex * cardsPerPage * cardWidth;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
    setActiveIndex(pageIndex);
  };

  const handleArrowScroll = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' ? Math.max(0, activeIndex - 1) : Math.min(totalPages - 1, activeIndex + 1);
    scrollToPage(nextIndex);
  };

  return (
    <section id="certifications" className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Licensing"
          description="Formal industry certifications and technical accreditations."
          action={
            <div className="flex items-center gap-3">
             

              <Button href="/certifications" variant="outline" size="md">
                View All Certifications ({certifications.length})
              </Button>
            </div>
          }
        />

        {/* Dynamic Cards per view Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScrollEvent}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-2 pt-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCerts.map((cert) => (
            <div
              key={cert._id || cert.name}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
            >
              <CertificationCard certification={cert} />
            </div>
          ))}
        </div>

        {/* Dynamic Responsive Bottom Carousel Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                aria-label={`Go to slide set ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-emerald-500 shadow-sm shadow-emerald-500/40'
                    : 'w-2.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
