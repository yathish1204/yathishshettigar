import { Metadata } from 'next';
import { getPublishedProjects } from '@/services/projects';
import { PageHeader } from '@/components/PageHeader';
import { ProjectsTabGrid } from '@/components/ProjectsTabGrid';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Yathish Shettigar',
  description:
    'Explore production projects and in-depth UX engineering case studies built with Next.js, React, TypeScript, and Tailwind CSS.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProjectsTabGrid projects={projects} />
    </div>
  );
}
