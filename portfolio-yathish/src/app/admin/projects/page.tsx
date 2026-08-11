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

  const handleToggleCorporate = async (project: Project) => {
    const newIsCorporate = !project.isCorporateProject;
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCorporateProject: newIsCorporate }),
      });
      const json = await res.json();
      if (json.success) {
        fetchProjects();
      } else {
        alert(`Failed: ${json.error?.message}`);
      }
    } catch (e) {
      alert('Error updating category');
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
          className="px-4 py-2 rounded-lg bg-[#B45309] hover:bg-[#92400e] text-white dark:bg-[#FBBF24] dark:hover:bg-[#f59e0b] dark:text-zinc-950 font-bold text-xs transition-colors self-start sm:self-auto shadow-md shadow-[#B45309]/10 dark:shadow-[#FBBF24]/10"
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
                <th className="p-3">Category</th>
                <th className="p-3">Role</th>
                <th className="p-3">Year</th>
                <th className="p-3">Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {projects.map((project) => (
                <tr key={project._id || project.slug} className="group hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-zinc-100">{project.title}</div>
                    <div className="font-mono text-[10px] text-zinc-400">/projects/{project.slug}</div>
                  </td>
                  <td className="p-3 font-mono">
                    <button
                      onClick={() => handleToggleCorporate(project)}
                      title="Click to toggle between Personal and Corporate Project"
                      className={`inline-flex px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all hover:scale-105 ${
                        project.isCorporateProject
                          ? 'bg-amber-950 text-[#FBBF24] border border-amber-700/80 shadow-sm'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {project.isCorporateProject ? '🏢 Corporate' : '👤 Personal'}
                    </button>
                  </td>
                  <td className="p-3 font-mono text-zinc-400">{project.role}</td>
                  <td className="p-3 font-mono text-zinc-400">{project.year}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        project.status === 'published'
                          ? 'bg-[#B45309]/10 text-[#B45309] dark:bg-[#FBBF24]/10 dark:text-[#FBBF24] border border-[#B45309]/20 dark:border-[#FBBF24]/20'
                          : project.status === 'archived'
                          ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          : 'bg-amber-950 text-[#FBBF24] border border-amber-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-zinc-400">{project.featured ? '★ Yes' : 'No'}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Link
                        href={`/admin/preview/projects/${project._id}`}
                        target="_blank"
                        title="Preview Project"
                        aria-label="Preview Project"
                        className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>

                      <Link
                        href={`/admin/projects/${project._id}`}
                        title="Edit Project"
                        aria-label="Edit Project"
                        className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#B45309]/10 dark:hover:bg-[#FBBF24]/10 text-[#B45309] dark:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700 hover:border-[#B45309]/40 dark:hover:border-[#FBBF24]/40 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>

                      <button
                        onClick={() => handleTogglePublish(project)}
                        title={project.status === 'published' ? 'Unpublish Project' : 'Publish Project'}
                        aria-label={project.status === 'published' ? 'Unpublish Project' : 'Publish Project'}
                        className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          {project.status === 'published' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 014.122-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-3.003-3.003a3 3 0 00-4.243-4.243m4.243 4.243L3 3l18 18" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDelete(project._id!, project.title)}
                        title="Delete Project"
                        aria-label="Delete Project"
                        className="w-[38px] h-[38px] rounded-lg bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
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
