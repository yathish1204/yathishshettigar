import { Metadata } from 'next';
import { getCertifications } from '@/services/certifications';
import { PageHeader, CertificationsFilter } from '@/components';
import { CertificationCard } from '@/components/CertificationCard';

export const metadata: Metadata = {
  title: 'Certifications & Licensing | Yathish Shettigar',
  description:
    'Formal industry certifications, technical accreditations, and verified credentials.',
};

export const revalidate = 60;

interface CertificationsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CertificationsPage({ searchParams }: CertificationsPageProps) {
  const { category } = await searchParams;
  const certifications = await getCertifications(category);

  return (
    <article className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <PageHeader
        eyebrow="Credentials"
        title="Certifications & Licensing"
        description="Formal industry certifications and technical accreditations."
        action={<CertificationsFilter />}
      />

      {certifications.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
            No certifications found in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Certifications list">
          {certifications.map((cert) => (
            <div key={cert._id || cert.name} role="listitem">
              <CertificationCard certification={cert} />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
