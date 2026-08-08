'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects?all=true');
      const json = await response.json();
      if (json.success) {
        setProjects(json.data);
      } else {
        setError(json.error?.message || 'Failed to fetch projects');
      }
    } catch (e) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleTogglePublish = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchProjects();
      } else {
        alert(`Failed: ${json.error?.message}`);
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchProjects();
      } else {
        alert(`Delete failed: ${json.error?.message}`);
      }
    } catch (e) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Projects Directory</h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors self-start sm:self-auto shadow-md shadow-emerald-500/20"
        >
          + Create New Project
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-zinc-400">Loading projects...</div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
          No projects found. Click "+ Create New Project" to add your first case study.
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900 border-b border-zinc-800 uppercase font-mono text-[10px] text-zinc-400">
              <tr>
                <th className="p-3">Title & Slug</th>
                <th className="p-3">Role</th>
                <th className="p-3">Year</th>
                <th className="p-3">Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {projects.map((project) => (
                <tr key={project._id || project.slug} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-zinc-100">{project.title}</div>
                    <div className="font-mono text-[10px] text-zinc-400">/projects/{project.slug}</div>
                  </td>
                  <td className="p-3 font-mono text-zinc-400">{project.role}</td>
                  <td className="p-3 font-mono text-zinc-400">{project.year}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        project.status === 'published'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : project.status === 'archived'
                          ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-zinc-400">{project.featured ? '★ Yes' : 'No'}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href={`/admin/preview/projects/${project._id}`}
                      target="_blank"
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/admin/projects/${project._id}`}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-mono"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono"
                    >
                      {project.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(project._id!, project.title)}
                      className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-red-300 font-mono"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
