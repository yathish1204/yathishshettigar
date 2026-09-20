import { Experience } from "@/types";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceList } from "@/components/ExperienceList";
import { Button } from "@/components/Button";

export function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section
      id="experience"
      className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career"
          title="Work Experience"
          description="Proven track record in senior frontend architecture, design systems, and product engineering."
          action={
            <Button href="/experience" variant="outline" size="md">
              Full Experience History
            </Button>
          }
        />

        <ExperienceList experiences={experiences} />
      </div>
    </section>
  );
}
