import { Metadata } from 'next';
import { getProfile } from '@/services/profile';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'About & UX Engineering Philosophy | Yathish Shettigar',
  description:
    'Learn about Yathish Shettigar: Senior UX Engineer & Frontend Architect combining human-centered design, React, Next.js, and design token pipelines.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        eyebrow="Biography & Philosophy"
        title="Engineering Human-Centered Web Applications"
        description={profile.tagline}
      />

      <div className="space-y-8 text-zinc-300 leading-relaxed text-base md:text-lg">
        <p>{profile.longBio}</p>

        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 pt-4">Engineering Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">1. Performance First</h3>
            <p className="text-sm text-zinc-400">
              Zero layout shift, server-side data fetching, and minimal client JS overhead.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">2. Universal Accessibility</h3>
            <p className="text-sm text-zinc-400">
              Built for every user across mouse, touch, keyboard, and screen reader interactions.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">3. Design Token Rigor</h3>
            <p className="text-sm text-zinc-400">
              1:1 alignment between Figma components and production React primitives.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">4. Purposeful Motion</h3>
            <p className="text-sm text-zinc-400">
              Micro-interactions that communicate feedback without hindering navigation.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap gap-4">
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
