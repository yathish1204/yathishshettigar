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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">CMS Management Dashboard</h1>
      </div>

      {/* Metrics Overview Cards (Clean 2-liner layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 block">Total Projects</span>
            <span className="text-xs font-mono text-emerald-400 mt-1 block">
              {publishedCount} Published • {draftCount} Drafts
            </span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-100">{allProjects.length}</div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 block">Work Experience</span>
            <span className="text-xs font-mono text-zinc-500 mt-1 block">Roles recorded</span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-100">{experiences.length}</div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 block">Total Skills</span>
            <span className="text-xs font-mono text-zinc-500 mt-1 block">Across categories</span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-100">{skills.length}</div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 block">Certifications</span>
            <span className="text-xs font-mono text-zinc-500 mt-1 block">Verified credentials</span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-100">{certs.length}</div>
        </div>
      </div>

      {/* Quick Action Navigation Grid (Sleek card actions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/projects"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Projects
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/experience"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Experience
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/skills"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Skills
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/certifications"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Certifications
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/education"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Education
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/hobbies"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Manage Hobbies
          </h2>
          <span className="text-xs font-mono text-emerald-400">Manage →</span>
        </Link>

        <Link
          href="/admin/profile"
          className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between group"
        >
          <h2 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            Edit Profile Info
          </h2>
          <span className="text-xs font-mono text-emerald-400">Edit →</span>
        </Link>
      </div>
    </div>
  );
}
