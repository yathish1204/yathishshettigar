import { Project } from "@/types";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";

export function SelectedWorkSection({ projects }: { projects: Project[] }) {
  // Filter for Personal Projects only on home page
  const personalProjects = (projects || []).filter(
    (p) => !p.isCorporateProject,
  );
  const displayProjects = personalProjects.slice(0, 9);

  return (
    <section
      id="projects"
      className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          description="Real-world case studies demonstrating UX engineering capability, architecture, and measurable outcomes."
          action={
            <Button href="/projects" variant="outline" size="md">
              View All Projects ({(projects || []).length})
            </Button>
          }
        />

        {/* Dynamic Responsive Carousel Container (Client Component for interactive scroll & dot indicators) */}
        <ProjectsCarousel projects={displayProjects} />
      </div>
    </section>
  );
}
