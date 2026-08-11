import { Metadata } from 'next';
import { getExperiences } from '@/services/experience';
import { PageHeader } from '@/components/PageHeader';
import { ExperienceList } from '@/components/ExperienceList';

export const metadata: Metadata = {
  title: 'Work Experience & History | Yathish Shettigar',
  description:
    'Detailed career history, accomplishments, and tech stacks across senior UX engineering and frontend leadership roles.',
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <article className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <PageHeader
        eyebrow="Career Path"
        title="Professional Experience"
        description="Comprehensive timeline highlighting enterprise leadership, accomplishments, and engineering contributions."
      />

      <ExperienceList experiences={experiences} />
    </article>
  );
}
