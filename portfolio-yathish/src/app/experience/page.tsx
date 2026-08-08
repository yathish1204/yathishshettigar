import { Metadata } from 'next';
import { getExperiences } from '@/services/experience';
import { SectionHeading } from '@/components/SectionHeading';
import { ExperienceItem } from '@/components/ExperienceItem';

export const metadata: Metadata = {
  title: 'Work Experience & History | Yathish Shettigar',
  description:
    'Detailed career history, accomplishments, and tech stacks across senior UX engineering and frontend leadership roles.',
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Career Path"
        title="Professional Experience"
        description="Comprehensive timeline highlighting enterprise leadership, accomplishments, and engineering contributions."
      />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceItem key={exp._id || exp.company} experience={exp} />
        ))}
      </div>
    </div>
  );
}
