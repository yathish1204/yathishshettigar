import React from 'react';
import { Profile } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Let's build something extraordinary."
              description="Whether you have an inquiry regarding a Senior UX Engineer role, design system architecture, or full-stack Next.js project, feel free to reach out."
            />

            <div className="space-y-4 text-sm text-zinc-300">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Direct Email</span>
                <a href={`mailto:${profile.email}`} className="font-semibold text-emerald-400 hover:underline">
                  {profile.email}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Location</span>
                <span className="font-semibold text-zinc-100">{profile.location}</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Status</span>
                <span className="font-semibold text-emerald-400">{profile.availability}</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
