'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';

interface AdminEditProjectFormProps {
  initialProject: Project;
  id: string;
}

export default function AdminEditProjectForm({ initialProject, id }: AdminEditProjectFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: initialProject.title || '',
    slug: initialProject.slug || '',
    shortDescription: initialProject.shortDescription || '',
    description: initialProject.description || '',
    role: initialProject.role || '',
    client: initialProject.client || '',
    duration: initialProject.duration || '',
    year: initialProject.year || 2025,
    thumbnail: initialProject.thumbnail || '',
    images: (initialProject.images || []).join(', '),
    technologies: (initialProject.technologies || []).join(', '),
    responsibilities: (initialProject.responsibilities || []).join(', '),
    challenge: initialProject.challenge || '',
    research: initialProject.research || '',
    designProcess: initialProject.designProcess || '',
    solution: initialProject.solution || '',
    outcome: initialProject.outcome || '',
    liveUrl: initialProject.liveUrl || '',
    githubUrl: initialProject.githubUrl || '',
    featured: initialProject.featured || false,
    isCorporateProject: initialProject.isCorporateProject || false,
    order: initialProject.order || 0,
    status: initialProject.status || 'draft',
    seoTitle: initialProject.seoTitle || '',
    seoDescription: initialProject.seoDescription || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'year' || name === 'order') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e: React.FormEvent, targetStatus?: string) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setSubmitting(true);

    const payload = {
      ...formData,
      status: targetStatus || formData.status,
      technologies: formData.technologies.split(',').map((s) => s.trim()).filter(Boolean),
      responsibilities: formData.responsibilities.split(',').map((s) => s.trim()).filter(Boolean),
      images: formData.images.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const p = json.data;
        setFormData({
          title: p.title || '',
          slug: p.slug || '',
          shortDescription: p.shortDescription || '',
          description: p.description || '',
          role: p.role || '',
          client: p.client || '',
          duration: p.duration || '',
          year: p.year || 2025,
          thumbnail: p.thumbnail || '',
          images: (p.images || []).join(', '),
          technologies: (p.technologies || []).join(', '),
          responsibilities: (p.responsibilities || []).join(', '),
          challenge: p.challenge || '',
          research: p.research || '',
          designProcess: p.designProcess || '',
          solution: p.solution || '',
          outcome: p.outcome || '',
          liveUrl: p.liveUrl || '',
          githubUrl: p.githubUrl || '',
          featured: p.featured || false,
          isCorporateProject: p.isCorporateProject || false,
          order: p.order || 0,
          status: p.status || 'draft',
          seoTitle: p.seoTitle || '',
          seoDescription: p.seoDescription || '',
        });
        setSuccessMsg(`Project updated successfully! Status: ${p.status} | Category: ${p.isCorporateProject ? 'Corporate' : 'Personal'}`);
      } else {
        setError(json.error?.message || 'Failed to update project.');
      }
    } catch (err) {
      setError('Connection error updating project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <Link href="/admin/projects" className="text-xs text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] font-mono">
            ← Back to Projects Directory
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100 mt-1">Edit Project — {formData.title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[#B45309] dark:text-[#FBBF24]">
            Status: {formData.status}
          </span>
          <Link
            href={`/admin/preview/projects/${id}`}
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono"
          >
            Preview Draft ↗
          </Link>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
          {error}
        </div>
      )}

      {successMsg && (
        <div role="alert" className="p-4 rounded-xl bg-amber-500/10 border border-[#B45309]/30 dark:border-[#FBBF24]/30 text-[#B45309] dark:text-[#FBBF24] text-xs font-mono">
          Project updated successfully!
        </div>
      )}

      <form className="space-y-6 bg-zinc-900/60 p-6 md:p-8 rounded-2xl border border-zinc-800">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24] font-mono text-xs"
            />
          </div>
        </div>

        {/* Short & Long Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Short Description *
            </label>
            <textarea
              name="shortDescription"
              rows={2}
              required
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Full Description *
            </label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
          </div>
        </div>

        {/* Role, Client, Duration, Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Role *</label>
            <input
              type="text"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Project Date / Year *</label>
            <input
              type="text"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2024 or May 2024 or 2024-05-15"
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
          </div>
        </div>

        {/* Thumbnail & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              {formData.isCorporateProject ? 'Thumbnail URL (Optional for Corporate)' : 'Thumbnail URL *'}
            </label>
            <input
              type="text"
              name="thumbnail"
              required={!formData.isCorporateProject}
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Gallery Image URLs (comma separated)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="https://img1.png, https://img2.png"
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono"
            />
          </div>
        </div>

        {/* Technologies & Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Technologies (comma separated) *
            </label>
            <input
              type="text"
              name="technologies"
              required
              value={formData.technologies}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Responsibilities (comma separated)
            </label>
            <input
              type="text"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
        </div>

        {/* Links & Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Live URL (Optional)</label>
            <input
              type="text"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">GitHub URL (Optional)</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Display Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
        </div>

        {/* Featured & Corporate Checkboxes */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-[#B45309] dark:text-[#FBBF24] focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
            <label htmlFor="featured" className="text-xs font-mono text-zinc-300">
              Featured Case Study on Homepage
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCorporateProject"
              name="isCorporateProject"
              checked={formData.isCorporateProject}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-[#B45309] dark:text-[#FBBF24] focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
            <label htmlFor="isCorporateProject" className="text-xs font-mono text-zinc-300">
              Corporate Project (Check for Corporate / Uncheck for Personal)
            </label>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleUpdate(e, 'archived')}
              className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono"
            >
              Archive
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleUpdate(e, 'draft')}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold font-mono"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleUpdate(e, 'published')}
              className="px-5 py-2.5 rounded-lg bg-[#B45309] hover:bg-[#92400e] text-white dark:bg-[#FBBF24] dark:hover:bg-[#f59e0b] dark:text-zinc-950 text-xs font-bold"
            >
              Publish Updates
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
