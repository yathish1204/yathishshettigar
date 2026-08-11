'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/#hero', sectionId: 'hero' },
    { name: 'About', href: '/#about', sectionId: 'about' },
    { name: 'Skills', href: '/#skills', sectionId: 'skills' },
    { name: 'Projects', href: '/#projects', sectionId: 'projects' },
    { name: 'Experience', href: '/#experience', sectionId: 'experience' },
    { name: 'Certifications', href: '/#certifications', sectionId: 'certifications' },
    { name: 'Contact', href: '/#contact', sectionId: 'contact' },
  ];

  // Dynamic real-time manual scroll listener for updating active menu state
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = navLinks.map((l) => l.sectionId);
    const HEADER_OFFSET = 120; // Header offset threshold

    const handleScroll = () => {
      // 1. Top of page -> Home / Hero
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      // 2. Bottom of page -> Contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 3. Scan section positions from bottom up to find active section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop - HEADER_OFFSET;
          if (window.scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial active check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler with proper header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    setMobileMenuOpen(false);

    if (pathname === '/') {
      e.preventDefault();

      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('hero');
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        const HEADER_OFFSET = 80; // Offset for sticky navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - HEADER_OFFSET;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        window.history.pushState(null, '', `/#${sectionId}`);
        setActiveSection(sectionId);
      }
    }
  };

  const isLinkActive = (sectionId: string, href: string) => {
    if (pathname === '/') {
      return activeSection === sectionId;
    }
    return pathname.startsWith(href.replace('/#', '/'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, '/#hero', 'hero')}
          aria-label="Yathish Shettigar — Home"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] rounded-md"
        >
          {/* YS Accent Div Logo with black text on bottom right edge */}
          <div
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#B45309] dark:bg-[#FBBF24] transition-colors duration-300 overflow-hidden shadow-sm shrink-0"
            aria-hidden="true"
          >
            <span className="absolute bottom-[-1px] right-[2px] font-semibold text-white dark:text-black font-sans text-lg sm:text-xl leading-none tracking-tighter select-none">
              YS
            </span>
          </div>

          {/* Text mark: Yathish Shettigar (Visible only on sm and above) */}
          <span className="hidden sm:inline-block font-sans font-semibold sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-[#B45309] dark:group-hover:text-[#FBBF24] transition-colors">
            Yathish Shettigar
          </span>
        </Link>

        {/* Right Section: Navigation Links & Theme Toggle */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.sectionId, link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] border ${
                    active
                      ? 'text-[#B45309] dark:text-[#FBBF24] bg-[#B45309]/10 dark:bg-[#FBBF24]/10 border-[#B45309]/30 dark:border-[#FBBF24]/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 border-transparent'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle Input Switch */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation & Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay (Fills entire screen below navbar header, click outside collapses menu) */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[72px] z-40 bg-black/60 backdrop-blur-sm md:hidden cursor-pointer transition-opacity"
            aria-hidden="true"
          />

          {/* Mobile Drawer Navigation Menu */}
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="relative z-50 md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-6 space-y-1.5 shadow-2xl transition-all"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.sectionId, link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors cursor-pointer border ${
                    active
                      ? 'text-[#B45309] dark:text-[#FBBF24] bg-[#B45309]/10 dark:bg-[#FBBF24]/10 border-[#B45309]/30 dark:border-[#FBBF24]/30'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 border-transparent'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
}
