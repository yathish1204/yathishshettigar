import { Profile, Education } from "@/types";
import { ABOUT_SECTION_DATA } from "@/constants/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { MethodologyGrid } from "@/components/MethodologyGrid";

export function AboutSection({
  profile,
  education,
}: {
  profile: Profile;
  education: Education[];
}) {
  return (
    <section
      id="about"
      className="py-10 md:py-14 border-b border-zinc-200 dark:border-zinc-900 bg-slate-100/50 dark:bg-zinc-950/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Concise Description (Under 100 words) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={ABOUT_SECTION_DATA.eyebrow}
              title={ABOUT_SECTION_DATA.title}
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7 space-y-2 md:space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-normal">
              {profile?.shortBio || ABOUT_SECTION_DATA.bioText}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/about" variant="outline" size="md">
                Read Full Biography
              </Button>
            </div>
          </div>
        </div>

        {/* Upfront UX Engineering Methodology (01 Discover, 02 Define, 03 Design, 04 Develop) */}
        <div className="pt-2">
          <MethodologyGrid />
        </div>
      </div>
    </section>
  );
}
