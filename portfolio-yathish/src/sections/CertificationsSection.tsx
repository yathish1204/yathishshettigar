import React from 'react';
import { Certification } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { CertificationsCarousel } from '@/components/CertificationsCarousel';

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  // Maximum 9 items displayed in carousel on main page
  const displayCerts = certifications ? certifications.slice(0, 9) : [];

  return (
    <section id="certifications" className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Licensing"
          description="Formal industry certifications and technical accreditations."
          action={
            <div className="flex items-center gap-3">
              <Button href="/certifications" variant="outline" size="md">
                View All Certifications ({(certifications || []).length})
              </Button>
            </div>
          }
        />

        {/* Dynamic Cards per view Carousel Container (Client Component) */}
        <CertificationsCarousel certifications={displayCerts} />
      </div>
    </section>
  );
}
