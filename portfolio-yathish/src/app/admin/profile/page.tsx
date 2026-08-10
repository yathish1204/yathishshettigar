'use client';

import React, { useEffect, useState } from 'react';
import { Profile } from '@/types';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [initialData, setInitialData] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile>({
    name: '',
    title: '',
    tagline: '',
    shortBio: '',
    longBio: '',
    profileImage: '',
    heroVideoUrl: '',
    heroVideoPoster: '',
    heroVideoUrlLight: '',
    heroVideoPosterLight: '',
    resumeUrl: '',
    email: '',
    location: '',
    availability: '',
    socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/profile');
        const json = await res.json();
        if (json.success && json.data) {
          setFormData(json.data);
          setInitialData(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const isDirty = initialData !== null && JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('social_')) {
      const field = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      setMessage('');
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;

    setMessage('');
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setInitialData(formData);
        setMessage('Profile updated successfully!');
      } else {
        setError(json.error?.message || 'Failed to update profile.');
      }
    } catch (e) {
      setError('Connection error updating profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">Loading profile data...</div>;
  }

  return (
    <div className="w-full space-y-6">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Profile Information</h1>
      </div>

      {message && <div role="alert" className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono">{message}</div>}
      {error && <div role="alert" className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-6 bg-white dark:bg-zinc-900/60 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none text-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold">Name (Read Only)</label>
            <input type="text" name="name" disabled value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 opacity-70 cursor-not-allowed font-medium" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Professional Role/Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Tagline (Hero Positioning Intro) *</label>
          <textarea name="tagline" rows={2} required value={formData.tagline} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-emerald-500" />
        </div>

        {/* Profile Avatar / Headshot Image URL */}
        <div className="space-y-3 p-4 rounded-xl bg-slate-100/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
            Profile Avatar / Headshot Image URL
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {formData.profileImage && (
              <img
                src={formData.profileImage}
                alt="Profile Avatar Preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#B45309] dark:border-[#FBBF24] shadow-md shrink-0"
              />
            )}
            <textarea
              name="profileImage"
              rows={2}
              value={formData.profileImage || ''}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/... or image URL"
              className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]"
            />
          </div>
        </div>

        {/* Hero Video & Poster Attribute URLs (Dark & Light Theme) */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-100/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <div className="font-mono text-xs font-bold text-[#B45309] dark:text-[#FBBF24] uppercase tracking-wider">
            Dark Theme Video Settings
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Dark Theme Video URL (MP4/WebM)</label>
              <textarea name="heroVideoUrl" rows={2} value={formData.heroVideoUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
            </div>
            <div>
              <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Dark Theme Poster Image URL</label>
              <textarea name="heroVideoPoster" rows={2} value={formData.heroVideoPoster || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-slate-100/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <div className="font-mono text-xs font-bold text-[#B45309] dark:text-[#FBBF24] uppercase tracking-wider">
            Light Theme Video Settings
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Light Theme Video URL (MP4/WebM)</label>
              <textarea name="heroVideoUrlLight" rows={2} value={formData.heroVideoUrlLight || ''} onChange={handleChange} placeholder="https://... (fallback to Dark Theme Video)" className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
            </div>
            <div>
              <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Light Theme Poster Image URL</label>
              <textarea name="heroVideoPosterLight" rows={2} value={formData.heroVideoPosterLight || ''} onChange={handleChange} placeholder="https://... (fallback to Dark Theme Poster)" className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Resume File Link (URL)</label>
          <textarea name="resumeUrl" rows={2} value={formData.resumeUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Short Bio *</label>
          <textarea name="shortBio" rows={3} required value={formData.shortBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Long Bio *</label>
          <textarea name="longBio" rows={5} required value={formData.longBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Location *</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Availability Status</label>
          <input type="text" name="availability" value={formData.availability || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">GitHub URL</label>
            <textarea name="social_github" rows={2} value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">LinkedIn URL</label>
            <textarea name="social_linkedin" rows={2} value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!isDirty || submitting}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            {submitting ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
