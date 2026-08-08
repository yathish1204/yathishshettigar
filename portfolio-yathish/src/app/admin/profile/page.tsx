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
    return <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading profile data...</div>;
  }

  return (
    <div className="w-full space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-100">Profile Information</h1>
      </div>

      {message && <div role="alert" className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">{message}</div>}
      {error && <div role="alert" className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-6 bg-zinc-900/60 p-6 md:p-8 rounded-2xl border border-zinc-800 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Name (Read Only)</label>
            <input type="text" name="name" disabled value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 opacity-70 cursor-not-allowed" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Professional Role/Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Tagline (Hero Positioning Intro) *</label>
          <textarea name="tagline" rows={2} required value={formData.tagline} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 leading-relaxed resize-y" />
        </div>

        {/* Hero Video & Poster Attribute URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Hero Video URL (MP4/WebM)</label>
            <textarea name="heroVideoUrl" rows={2} value={formData.heroVideoUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px] break-all resize-y" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Hero Video Poster Image URL</label>
            <textarea name="heroVideoPoster" rows={2} value={formData.heroVideoPoster || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px] break-all resize-y" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Resume File Link (URL)</label>
          <textarea name="resumeUrl" rows={2} value={formData.resumeUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px] break-all resize-y" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Short Bio *</label>
          <textarea name="shortBio" rows={3} required value={formData.shortBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 leading-relaxed resize-y" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Long Bio *</label>
          <textarea name="longBio" rows={5} required value={formData.longBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 leading-relaxed resize-y" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Location *</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">Availability Status</label>
          <input type="text" name="availability" value={formData.availability || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">GitHub URL</label>
            <textarea name="social_github" rows={2} value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px] break-all resize-y" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1.5">LinkedIn URL</label>
            <textarea name="social_linkedin" rows={2} value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px] break-all resize-y" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!isDirty || submitting}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none text-zinc-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            {submitting ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
