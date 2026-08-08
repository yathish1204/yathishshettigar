import { Metadata } from 'next';
import { getPublishedProjects } from '@/services/projects';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectGrid } from '@/components/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Yathish Shettigar',
  description:
    'Explore production projects and in-depth UX engineering case studies built with Next.js, React, TypeScript, and Tailwind CSS.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Case Study Portfolio"
        title="Featured Projects & Work"
        description="Comprehensive breakdown of software architecture, UX research, component engineering, and measurable project outcomes."
      />

      <ProjectGrid projects={projects} />
    </div>
  );
}
