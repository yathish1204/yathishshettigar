import React from 'react';
import { Certification, Education } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { CertificationCard } from '@/components/CertificationCard';
import { EducationCard } from '@/components/EducationCard';

export function CertificationsSection({
  certifications,
  education,
}: {
  certifications: Certification[];
  education: Education[];
}) {
  return (
    <section id="certifications" className="py-20 md:py-28 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials & Background"
          title="Certifications & Education"
          description="Verified professional credentials and academic background supporting domain knowledge."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Certifications Col */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Professional Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <CertificationCard key={cert._id || cert.name} certification={cert} />
              ))}
            </div>
          </div>

          {/* Education Col */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <EducationCard key={edu._id || edu.institution} education={edu} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
