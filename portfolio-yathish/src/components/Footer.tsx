import React from 'react';
import Link from 'next/link';
import { Profile } from '@/types';

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-12 md:py-16 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="text-xl font-bold text-zinc-100 hover:text-emerald-400 transition-colors">
              {profile.name}
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">{profile.tagline}</p>
            <p className="text-xs font-mono text-emerald-400">{profile.availability}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                  Projects / Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-emerald-400 transition-colors">
                  Experience & History
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Resume */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Connect</h4>
            <ul className="space-y-2">
              {profile.socialLinks?.github && (
                <li>
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    GitHub ↗
                  </a>
                </li>
              )}
              {profile.socialLinks?.linkedin && (
                <li>
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              )}
              {profile.socialLinks?.twitter && (
                <li>
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Twitter ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono">Built with Next.js App Router, React 19, TypeScript & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
