'use client';

import React, { useEffect, useState } from 'react';
import { Profile } from '@/types';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Profile>({
    name: '',
    title: '',
    tagline: '',
    shortBio: '',
    longBio: '',
    profileImage: '',
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
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-100">Profile Information</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">Centralized positioning, bio, contact details, and social links</p>
      </div>

      {message && <div role="alert" className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">{message}</div>}
      {error && <div role="alert" className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/60 p-6 md:p-8 rounded-2xl border border-zinc-800 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Professional Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Tagline (Hero Positioning) *</label>
          <input type="text" name="tagline" required value={formData.tagline} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Short Bio *</label>
          <textarea name="shortBio" rows={2} required value={formData.shortBio} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Long Bio *</label>
          <textarea name="longBio" rows={4} required value={formData.longBio} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Location *</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">Availability Status</label>
          <input type="text" name="availability" value={formData.availability || ''} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">GitHub URL</label>
            <input type="text" name="social_github" value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px]" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-300 mb-1">LinkedIn URL</label>
            <input type="text" name="social_linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-[11px]" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-800">
          <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors">
            {submitting ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
