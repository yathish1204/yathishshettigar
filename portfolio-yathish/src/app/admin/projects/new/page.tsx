'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    role: 'Senior UX Engineer',
    client: '',
    duration: '',
    year: new Date().getFullYear(),
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    images: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    technologies: 'Next.js, React, TypeScript, Tailwind CSS',
    responsibilities: 'Frontend Architecture, Accessibility Testing, UX Engineering',
    challenge: '',
    research: '',
    designProcess: '',
    solution: '',
    outcome: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    isCorporateProject: false,
    order: 0,
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
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

  const handleAutoSlug = () => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({ ...prev, slug: generated }));
  };

  const handleSubmit = async (e: React.FormEvent, targetStatus?: string) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      ...formData,
      status: targetStatus || formData.status,
      technologies: formData.technologies.split(',').map((s) => s.trim()).filter(Boolean),
      responsibilities: formData.responsibilities.split(',').map((s) => s.trim()).filter(Boolean),
      images: formData.images.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        setError(json.error?.message || 'Failed to create project.');
      }
    } catch (err) {
      setError('Connection error submitting form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <Link href="/admin/projects" className="text-xs text-zinc-400 hover:text-emerald-400 font-mono">
            ← Back to Projects Directory
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100 mt-1">Create New Project</h1>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
          {error}
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
              onBlur={handleAutoSlug}
              placeholder="e.g. US-FEX Design System"
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500"
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
              placeholder="e.g. us-fex"
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
            />
          </div>
        </div>

        {/* Short & Long Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Short Description (Card Summary) *
            </label>
            <textarea
              name="shortDescription"
              rows={2}
              required
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Concise 1-2 sentence overview of the project..."
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Full Overview Description *
            </label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed case study background and problem statement..."
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:ring-2 focus:ring-emerald-500"
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
              placeholder="e.g. 4 Months"
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Project Date *</label>
            <input
              type="date"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24]"
            />
          </div>
        </div>

        {/* Thumbnail & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Thumbnail URL *</label>
            <input
              type="text"
              name="thumbnail"
              required
              value={formData.thumbnail}
              onChange={handleChange}
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

        {/* Challenge, Solution, Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Challenge</label>
            <textarea
              name="challenge"
              rows={3}
              value={formData.challenge}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Solution</label>
            <textarea
              name="solution"
              rows={3}
              value={formData.solution}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Outcome</label>
            <textarea
              name="outcome"
              rows={3}
              value={formData.outcome}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
        </div>

        {/* Links & Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">Live URL</label>
            <input
              type="text"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">GitHub URL</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs"
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
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="featured" className="text-xs font-mono text-zinc-300">
              Mark as Featured Case Study on Homepage
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCorporateProject"
              name="isCorporateProject"
              checked={formData.isCorporateProject}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-[#B45309] dark:text-[#FBBF24] focus:ring-[#B45309]"
            />
            <label htmlFor="isCorporateProject" className="text-xs font-mono text-zinc-300">
              Corporate Project (Check if Corporate / Uncheck for Personal)
            </label>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-800">
          <button
            type="button"
            disabled={submitting}
            onClick={(e) => handleSubmit(e, 'draft')}
            className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold font-mono transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={(e) => handleSubmit(e, 'published')}
            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors"
          >
            Publish Immediately
          </button>
        </div>
      </form>
    </div>
  );
}
