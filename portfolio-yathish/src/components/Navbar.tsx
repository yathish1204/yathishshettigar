'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Work', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-100 hover:text-emerald-400 transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-500 text-zinc-950 font-mono font-extrabold flex items-center justify-center text-sm shadow-md shadow-emerald-500/20">
            YS
          </span>
          <span className="hidden sm:inline font-sans">Yathish Shettigar</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive(link.href)
                  ? 'text-emerald-400 bg-zinc-900 border border-zinc-800'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Button href="/contact" variant="primary" size="sm" className="hidden sm:inline-flex">
            Let's Talk
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-emerald-400 bg-zinc-900 border border-zinc-800'
                  : 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
