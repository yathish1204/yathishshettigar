import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getPublishedProjects } from '@/services/projects';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { getProjectJsonLd, getBreadcrumbJsonLd } from '@/utils/jsonLd';
import { formatMonthYear } from '@/utils/format';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Yathish Shettigar',
    };
  }

  const title = project.seoTitle || `${project.title} — UX Engineering Case Study | Yathish Shettigar`;
  const description = project.seoDescription || project.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: project.ogImage || project.thumbnail || 'https://res.cloudinary.com/ddzrfwfsl/image/upload/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yathishshettigar.site';
  const projectJsonLd = getProjectJsonLd(project, baseUrl);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: baseUrl },
    { name: 'Projects', item: `${baseUrl}/projects` },
    { name: project.title, item: `${baseUrl}/projects/${project.slug}` },
  ]);

  const allProjects = await getPublishedProjects();
  const relatedProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const formattedYear = formatMonthYear(project.year);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Back Icon + Tooltip + Inline Eyebrow/Title matching PageHeader.tsx */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Back to Projects Button with Hover Tooltip */}
            <div className="relative group shrink-0">
              <Link
                href="/projects"
                aria-label="Back to Projects"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#B45309] dark:hover:border-[#FBBF24] hover:text-[#B45309] dark:hover:text-[#FBBF24] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>

              {/* Hover Tooltip */}
              <div className="absolute left-0 top-full mt-2 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                Back to Projects
              </div>
            </div>

            {/* Role Eyebrow & Project Title in the same header row */}
            <div className="min-w-0 py-0.5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gradient-accent pb-0.5">
                  {project.role}
                </span>
                {project.client && (
                  <span className="text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400" title={`Client: ${project.client}`}>
                    • {project.client}
                  </span>
                )}
              </div>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* 75% Image + 25% Vertical Metrics Panel Side-by-Side on md+, flex-col 400px height on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* 75% Hero Image (9 Cols on md+) */}
          <div className="md:col-span-9 relative w-full h-[300px] sm:h-[400px] md:h-auto min-h-[300px] md:min-h-[420px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <Image
              src={project.thumbnail || 'https://res.cloudinary.com/ddzrfwfsl/image/upload/v1786337057/yathish-hero-poster-img_1_qfd3fd.png'}
              alt={`Hero image for ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
              className="object-cover object-top"
            />
          </div>

          {/* 25% Vertical Metrics Panel (3 Cols on md+) / Wrapped Grid on Mobile */}
          <div className="md:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800/90 shadow-md space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">My Role</span>
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-sans block">{project.role}</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Duration</span>
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-sans block">{project.duration || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Client / Context</span>
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-sans block">{project.client || 'Enterprise'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Year</span>
                <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-sans block">{formattedYear}</span>
              </div>
            </div>

            {/* CTAs */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                {project.liveUrl && (
                  <Button href={project.liveUrl} external variant="primary" size="sm" className="w-full">
                    Live Demo ↗
                  </Button>
                )}
                {project.githubUrl && (
                  <Button href={project.githubUrl} external variant="outline" size="sm" className="w-full">
                    Repository ↗
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Short Description under Thumbnail + Metrics Panel */}
        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal max-w-4xl">
          {project.shortDescription}
        </p>

        {/* Detailed Case Study Content */}
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg font-sans">
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Project Overview</h2>
            <p>{project.description}</p>
          </section>

          {/* Core Responsibilities & Technologies Side-by-Side on md+, 1-by-1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {/* Responsibilities */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Core Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Technologies & Tools */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Technologies & Tools Employed</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="zinc" className="py-1 px-3 text-xs sm:text-sm border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Challenge */}
          {project.challenge && (
            <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">The Challenge</h2>
              <p>{project.challenge}</p>
            </section>
          )}

          {/* Research & Design Process */}
          {(project.research || project.designProcess) && (
            <section className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Research & Design Strategy</h2>
              {project.research && <p>{project.research}</p>}
              {project.designProcess && <p>{project.designProcess}</p>}
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Solution & Implementation</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {/* Measurable Outcome */}
          {project.outcome && (
            <section className="space-y-3 p-6 sm:p-8 rounded-2xl bg-amber-500/10 dark:bg-amber-500/10 border border-[#B45309]/30 dark:border-[#FBBF24]/30 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Measurable Impact & Outcome</h2>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{project.outcome}</p>
            </section>
          )}

          {/* Gallery Images */}
          {project.images && project.images.length > 1 && (
            <section className="space-y-4 pt-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.25] pb-1">Visual Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
                    <Image
                      src={imgUrl}
                      alt={`${project.title} gallery screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-10 border-t border-zinc-200 dark:border-zinc-900 space-y-4">
            <SectionHeading
              eyebrow="Explore Further"
              title="Next Case Studies"
              className="mb-4 md:mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relProj) => (
                <Link
                  key={relProj.slug}
                  href={`/projects/${relProj.slug}`}
                  className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-[#B45309] dark:hover:border-[#FBBF24] transition-all flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold">{relProj.role}</span>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-[#B45309] dark:group-hover:text-[#FBBF24] transition-colors">↗</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#B45309] dark:group-hover:text-[#FBBF24] transition-colors mt-1 mb-2 leading-[1.25] pb-0.5">{relProj.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">{relProj.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
