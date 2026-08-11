import { Metadata } from 'next';
import { getProfile } from '@/services/profile';
import { getEducation } from '@/services/education';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { EducationCard } from '@/components/EducationCard';
import { MethodologyGrid } from '@/components/MethodologyGrid';

export const metadata: Metadata = {
  title: 'About & UX Engineering Philosophy | Yathish Shettigar',
  description:
    'Learn about Yathish Shettigar: UX Engineer & Frontend Architect combining human-centered design, React, Next.js, and design token pipelines.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, education] = await Promise.all([getProfile(), getEducation()]);

  const bioParagraphs = profile.longBio
    ? profile.longBio.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
    : [profile.shortBio];

  return (
    <article className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <PageHeader
        eyebrow="Biography, Philosophy & Education"
        title="Engineering Human-Centered Web Applications"
        description={profile.tagline}
      />

      <div className="space-y-10">
        <section aria-label="Biography" className="max-w-3xl space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg font-sans">
          {bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </section>

        <section aria-labelledby="methodology-heading">
          <h2 id="methodology-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-sans">
            UX Engineering Methodology
          </h2>
          <MethodologyGrid />
        </section>

        {education && education.length > 0 && (
          <section aria-labelledby="education-heading" className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 id="education-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-sans">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <EducationCard key={edu._id || edu.institution} education={edu} />
              ))}
            </div>
          </section>
        )}

        {profile.languages && profile.languages.length > 0 && (
          <section aria-labelledby="languages-heading" className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 id="languages-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-sans">
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1 shadow-sm dark:shadow-none hover:border-zinc-400 dark:hover:border-[#ffffff]/40 transition-colors"
                >
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{lang.name}</div>
                  <div className="text-xs font-mono text-gradient-accent dark:text-gradient-accent font-semibold">{lang.level}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="pt-2 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary" size="lg">
            Let's Collaborate
          </Button>
          <Button href="/projects" variant="outline" size="lg">
            Explore Projects
          </Button>
        </div>
      </div>
    </article>
  );
}
