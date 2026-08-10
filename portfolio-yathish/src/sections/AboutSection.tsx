import React from 'react';
import { Profile, Education } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { EducationCard } from '@/components/EducationCard';
import { MethodologyGrid } from '@/components/MethodologyGrid';

export function AboutSection({ profile, education }: { profile: Profile; education: Education[] }) {
  return (
    <section id="about" className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Concise Description (Under 100 words) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About Me"
              title="UX Design + Frontend Architecture"
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-normal">I’m a UX Engineer with 2 years of experience working at the intersection of design and frontend development. I turn user needs and design concepts into accessible, responsive, and high-performing web experiences using React, Next.js, and modern frontend technologies. For me, good engineering isn’t just about making things work — it’s about making them feel right, too.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/about" variant="outline" size="md">
                Read Full Biography
              </Button>
            </div>
          </div>
        </div>

        {/* Upfront UX Engineering Methodology (01 Discover, 02 Define, 03 Design, 04 Develop) */}
        <div className="pt-2">
          <MethodologyGrid />
        </div>

        {/* Education Details */}
        {/* {education && education.length > 0 && (
          <div className="">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-sans">
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <EducationCard key={edu._id || edu.institution} education={edu} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}
