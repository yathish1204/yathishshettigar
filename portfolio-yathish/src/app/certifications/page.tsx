import { Metadata } from 'next';
import { getCertifications } from '@/services/certifications';
import { SectionHeading } from '@/components/SectionHeading';
import { CertificationCard } from '@/components/CertificationCard';

export const metadata: Metadata = {
  title: 'Certifications & Licensing | Yathish Shettigar',
  description:
    'Formal industry certifications, technical accreditations, and verified credentials.',
};

export const revalidate = 60;

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <article className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & Licensing"
        description="Formal industry certifications and technical accreditations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Certifications list">
        {certifications.map((cert) => (
          <div key={cert._id || cert.name} role="listitem">
            <CertificationCard certification={cert} />
          </div>
        ))}
      </div>
    </article>
  );
}
