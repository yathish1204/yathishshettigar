import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getPublishedProjects } from '@/services/projects';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { getProjectJsonLd, getBreadcrumbJsonLd } from '@/utils/jsonLd';

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
          url: project.ogImage || project.thumbnail,
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yathish.dev';
  const projectJsonLd = getProjectJsonLd(project, baseUrl);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: baseUrl },
    { name: 'Projects', item: `${baseUrl}/projects` },
    { name: project.title, item: `${baseUrl}/projects/${project.slug}` },
  ]);

  const allProjects = await getPublishedProjects();
  const relatedProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

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

      <article className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-zinc-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-emerald-400">Projects</Link>
          <span>/</span>
          <span className="text-zinc-200 truncate">{project.title}</span>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="emerald">{project.role}</Badge>
            <span className="text-xs font-mono text-zinc-400">Year: {project.year}</span>
            {project.client && (
              <span className="text-xs font-mono text-zinc-400">• Client: {project.client}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* CTAs & External Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <Button href={project.liveUrl} external variant="primary" size="md">
                Live Demonstration ↗
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} external variant="outline" size="md">
                Source Repository ↗
              </Button>
            )}
          </div>
        </header>

        {/* Hero Banner Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <Image
            src={project.thumbnail}
            alt={`Hero banner image for ${project.title}`}
            fill
            sizes="100vw"
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Metadata Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm">
          <div>
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">My Role</span>
            <span className="font-semibold text-zinc-200">{project.role}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Duration</span>
            <span className="font-semibold text-zinc-200">{project.duration || 'N/A'}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Client / Context</span>
            <span className="font-semibold text-zinc-200">{project.client || 'Enterprise'}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Year</span>
            <span className="font-semibold text-zinc-200">{project.year}</span>
          </div>
        </div>

        {/* Detailed Case Study Sections */}
        <div className="space-y-12 text-zinc-300 leading-relaxed text-base md:text-lg">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Project Overview</h2>
            <p>{project.description}</p>
          </section>

          {/* Responsibilities */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Core Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                {project.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenge */}
          {project.challenge && (
            <section className="space-y-4 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <h2 className="text-2xl font-bold text-emerald-400">The Challenge</h2>
              <p>{project.challenge}</p>
            </section>
          )}

          {/* Research & Design Process */}
          {(project.research || project.designProcess) && (
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Research & Design Strategy</h2>
              {project.research && <p>{project.research}</p>}
              {project.designProcess && <p>{project.designProcess}</p>}
            </section>
          )}

          {/* Solution & Engineering Architecture */}
          {project.solution && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Solution & Implementation</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {/* Measurable Outcome */}
          {project.outcome && (
            <section className="space-y-4 p-8 rounded-2xl bg-emerald-950/20 border border-emerald-800/60">
              <h2 className="text-2xl font-bold text-emerald-400">Measurable Impact & Outcome</h2>
              <p className="text-emerald-200">{project.outcome}</p>
            </section>
          )}

          {/* Technology Stack */}
          <section className="space-y-4 pt-4 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-100">Technologies & Tools Employed</h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="emerald" className="py-1.5 px-3 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Gallery Images */}
          {project.images && project.images.length > 1 && (
            <section className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold text-zinc-100">Visual Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
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
          <section className="pt-16 border-t border-zinc-900 space-y-8">
            <SectionHeading
              eyebrow="Explore Further"
              title="Next Case Studies"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((relProj) => (
                <div key={relProj.slug} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-400">{relProj.role}</span>
                    <h3 className="text-xl font-bold text-zinc-100 mt-1 mb-2">{relProj.title}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">{relProj.shortDescription}</p>
                  </div>
                  <div className="mt-6">
                    <Button href={`/projects/${relProj.slug}`} variant="outline" size="sm">
                      Read Case Study →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
