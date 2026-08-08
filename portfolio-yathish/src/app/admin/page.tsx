import Link from 'next/link';
import { getPublishedProjects, getAllProjectsForAdmin } from '@/services/projects';
import { getExperiences } from '@/services/experience';
import { getSkills } from '@/services/skills';
import { getCertifications } from '@/services/certifications';

export default async function AdminDashboardPage() {
  const allProjects = await getAllProjectsForAdmin();
  const publishedProjects = await getPublishedProjects();
  const experiences = await getExperiences();
  const skills = await getSkills();
  const certs = await getCertifications();

  const draftCount = allProjects.filter((p) => p.status === 'draft').length;
  const publishedCount = publishedProjects.length;
  const archivedCount = allProjects.filter((p) => p.status === 'archived').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">CMS Management Dashboard</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">Overview of database records and publishing lifecycle status</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">Total Projects</span>
          <div className="text-3xl font-extrabold text-zinc-100 mt-1">{allProjects.length}</div>
          <div className="text-xs font-mono text-emerald-400 mt-2 flex gap-3">
            <span>{publishedCount} Published</span>
            <span>{draftCount} Drafts</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">Work Experience</span>
          <div className="text-3xl font-extrabold text-zinc-100 mt-1">{experiences.length}</div>
          <div className="text-xs font-mono text-zinc-500 mt-2">Roles recorded</div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">Total Skills</span>
          <div className="text-3xl font-extrabold text-zinc-100 mt-1">{skills.length}</div>
          <div className="text-xs font-mono text-zinc-500 mt-2">Across 6 categories</div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">Certifications</span>
          <div className="text-3xl font-extrabold text-zinc-100 mt-1">{certs.length}</div>
          <div className="text-xs font-mono text-zinc-500 mt-2">Verified credentials</div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Manage Projects
            </h2>
            <span className="text-xs font-mono text-emerald-400">Manage →</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Create, edit case study descriptions, publish drafts, set featured projects, and reorder.
          </p>
        </Link>

        <Link
          href="/admin/experience"
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Manage Experience
            </h2>
            <span className="text-xs font-mono text-emerald-400">Manage →</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Update roles, accomplishment bullet points, company timelines, and technical tools.
          </p>
        </Link>

        <Link
          href="/admin/skills"
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Manage Skills
            </h2>
            <span className="text-xs font-mono text-emerald-400">Manage →</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Categorize UX design, frontend, backend, tools, and interaction animation capabilities.
          </p>
        </Link>

        <Link
          href="/admin/certifications"
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Manage Certifications
            </h2>
            <span className="text-xs font-mono text-emerald-400">Manage →</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Add credential verification URLs, issuers, and dates for professional certificates.
          </p>
        </Link>

        <Link
          href="/admin/profile"
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Edit Profile Info
            </h2>
            <span className="text-xs font-mono text-emerald-400">Edit →</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Update positioning tagline, short bio, contact email, social links, and availability status.
          </p>
        </Link>
      </div>
    </div>
  );
}
