import { Metadata } from 'next';
import { getProfile } from '@/services/profile';
import { getEducation } from '@/services/education';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { EducationCard } from '@/components/EducationCard';
import { MethodologyGrid } from '@/components/MethodologyGrid';

export const metadata: Metadata = {
  title: 'About & UX Engineering Philosophy | Yathish Shettigar',
  description:
    'Learn about Yathish Shettigar: Senior UX Engineer & Frontend Architect combining human-centered design, React, Next.js, and design token pipelines.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await getProfile();
  const education = await getEducation();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        eyebrow="Biography & Philosophy"
        title="Engineering Human-Centered Web Applications"
        description={profile.tagline}
      />

      <div className="space-y-12">
        <div className="max-w-3xl space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
          <p>{profile.longBio}</p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6 font-sans">
            UX Engineering Methodology
          </h2>
          <MethodologyGrid />
        </div>

        {education && education.length > 0 && (
          <div className="pt-8 border-t border-zinc-800">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-6 font-sans">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <EducationCard key={edu._id || edu.institution} education={edu} />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary" size="lg">
            Let's Collaborate
          </Button>
          <Button href="/projects" variant="outline" size="lg">
            Explore Case Studies
          </Button>
        </div>
      </div>
    </div>
  );
}
