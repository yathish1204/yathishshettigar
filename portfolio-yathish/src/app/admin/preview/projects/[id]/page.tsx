import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { headers, cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getProjectById } from '@/services/projects';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

interface PreviewProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectPreviewPage({ params }: PreviewProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session_token')?.value;

  // Reconstruct NextRequest helper for auth check
  const dummyRequest = new NextRequest('http://localhost/admin/preview', {
    headers: new Headers({ cookie: `admin_session_token=${token || ''}` }),
  });

  const session = getAdminSession(dummyRequest);
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Draft Warning Banner */}
      <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-300 flex items-center justify-between text-xs font-mono">
        <div>
          <span className="font-bold">ADMIN PREVIEW MODE</span> — Viewing draft case study for "{project.title}" (Status: {project.status}). This page is not public.
        </div>
        <Link href={`/admin/projects/${project._id}`} className="underline font-bold">
          Edit in Admin →
        </Link>
      </div>

      <article className="py-8 max-w-5xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="emerald">{project.role}</Badge>
            <span className="text-xs font-mono text-zinc-400">Year: {project.year}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100">{project.title}</h1>
          <p className="text-lg text-zinc-300">{project.shortDescription}</p>
        </header>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image
            src={project.thumbnail || '/og-image.jpg'}
            alt={project.title}
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-6 text-zinc-300 leading-relaxed text-base">
          <h2 className="text-2xl font-bold text-zinc-100">Overview</h2>
          <p>{project.description}</p>
        </div>
      </article>
    </div>
  );
}
