'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not show admin navigation bar on login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      window.location.href = '/admin/login';
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Messages', href: '/admin/messages' },
    { name: 'Projects', href: '/admin/projects' },
    { name: 'Experience', href: '/admin/experience' },
    { name: 'Skills', href: '/admin/skills' },
    { name: 'Certifications', href: '/admin/certifications' },
    { name: 'Education', href: '/admin/education' },
    { name: 'Hobbies', href: '/admin/hobbies' },
    { name: 'Profile', href: '/admin/profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      {/* Admin Top Navigation: Fixed wrapper for both main header and mobile sub-nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm">
        <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-bold text-lg text-[#B45309] dark:text-[#FBBF24] tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-mono text-xs flex items-center justify-center font-extrabold">
                  YS
                </span>
                <span>Yathish Admin</span>
              </Link>

              <nav className="hidden lg:flex items-center space-x-1" aria-label="Admin Navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#B45309]/10 dark:bg-[#FBBF24]/10 text-[#B45309] dark:text-[#FBBF24] border border-[#B45309]/20 dark:border-[#FBBF24]/20'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/" target="_blank" className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-mono">
                View Live Site ↗
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Sub-nav for mobile screens */}
        <div className="lg:hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 w-full transition-colors">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded whitespace-nowrap ${
                  isActive(link.href)
                    ? 'bg-[#B45309]/10 dark:bg-[#FBBF24]/10 text-[#B45309] dark:text-[#FBBF24] border border-[#B45309]/20 dark:border-[#FBBF24]/20'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Main Admin Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-[120px] lg:pt-24">{children}</main>
    </div>
  );
}
