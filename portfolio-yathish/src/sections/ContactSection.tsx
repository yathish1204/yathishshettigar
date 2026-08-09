import React from 'react';
import { Profile } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';

export function ContactSection({ profile }: { profile: Profile }) {
  const phoneDisplay = profile.phone || '+91 99000 00000';
  const phoneTel = profile.phone ? profile.phone.replace(/\s+/g, '') : '+919900000000';

  return (
    <section id="contact" className="py-12 md:py-18 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LHS Info Side (Clean borderless list with icons) */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Let's build something extraordinary."
              description="Whether you have an inquiry regarding a Senior UX Engineer role, design system architecture, or full-stack Next.js project, feel free to reach out."
            />

            <div className="space-y-4 pt-2 text-xs sm:text-sm">
              {/* 1. Direct Email */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compose Email in Gmail"
                className="flex items-center justify-between py-2 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">Email</span>
                </div>
                <span className="font-semibold text-zinc-900 dark:text-white truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:underline group-hover:decoration-dashed group-hover:decoration-emerald-500 group-hover:underline-offset-[3px] transition-all ml-2">
                  {profile.email}
                </span>
              </a>

              {/* 2. Direct Phone (Triggers Native Mobile Dial) */}
              <a
                href={`tel:${phoneTel}`}
                title="Click to dial phone number"
                className="flex items-center justify-between py-2 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">Phone</span>
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:underline group-hover:decoration-dashed group-hover:decoration-emerald-500 group-hover:underline-offset-[3px] transition-all ml-2">
                  {phoneDisplay}
                </span>
              </a>

              {/* 3. Location (Opens Google Maps) */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="View location on Google Maps"
                className="flex items-center justify-between py-2 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono">Location</span>
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:underline group-hover:decoration-dashed group-hover:decoration-emerald-500 group-hover:underline-offset-[3px] transition-all ml-2">
                  {profile.location}
                </span>
              </a>

              {/* 4. Status */}
              <div className="flex items-start gap-3 py-2 text-xs sm:text-sm group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs">Status</span>
                  <span className="font-semibold text-zinc-900 dark:text-white text-xs leading-relaxed mt-0.5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:underline group-hover:decoration-dashed group-hover:decoration-emerald-500 group-hover:underline-offset-[3px] transition-all">
                    {profile.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RHS Form Side */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/90 shadow-xl dark:shadow-none">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
