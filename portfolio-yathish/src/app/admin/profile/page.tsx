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
    languages: [],
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

  const handleLanguageChange = (index: number, field: 'name' | 'level', value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.languages || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, languages: updated };
    });
  };

  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), { name: '', level: 'Native' }],
    }));
  };

  const handleRemoveLanguage = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.languages || []).filter((_, i) => i !== index);
      return { ...prev, languages: updated };
    });
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

      {message && <div role="alert" className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-[#B45309]/30 dark:border-[#FBBF24]/30 text-[#B45309] dark:text-[#FBBF24] text-xs font-mono">{message}</div>}
      {error && <div role="alert" className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-6 bg-white dark:bg-zinc-900/60 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none text-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 font-bold">Name (Read Only)</label>
            <input type="text" name="name" disabled value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 opacity-70 cursor-not-allowed font-medium" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Professional Role/Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Tagline (Hero Positioning Intro) *</label>
          <textarea name="tagline" rows={2} required value={formData.tagline} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
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
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Resume File (URL or Upload PDF)</label>
          <div className="space-y-3 p-4 rounded-xl bg-slate-100/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block font-mono uppercase text-[10px] text-zinc-500 mb-1">Option A: Enter Resume URL</label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl && !formData.resumeUrl.startsWith('data:') ? formData.resumeUrl : ''}
                onChange={handleChange}
                placeholder="https://example.com/resume.pdf or /resume.pdf"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]"
              />
            </div>
            
            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">OR</span>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
            </div>

            <div>
              <label className="block font-mono uppercase text-[10px] text-zinc-500 mb-1">Option B: Browse & Upload PDF File</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    if (file.type !== 'application/pdf') {
                      alert('Please upload a PDF file only.');
                      return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result as string;
                      setFormData((prev) => ({ ...prev, resumeUrl: base64String }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#B45309]/10 file:text-[#B45309] dark:file:bg-[#FBBF24]/10 dark:file:text-[#FBBF24] hover:file:bg-[#B45309]/20 dark:hover:file:bg-[#FBBF24]/20 file:cursor-pointer"
                />
                
                {formData.resumeUrl && formData.resumeUrl.startsWith('data:application/pdf;base64,') && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, resumeUrl: '' }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-950/60 text-red-300 border border-red-800/40 hover:bg-red-900/40 font-mono text-[10px] cursor-pointer"
                  >
                    Remove File
                  </button>
                )}
              </div>
              
              {formData.resumeUrl && formData.resumeUrl.startsWith('data:application/pdf;base64,') && (
                <div className="mt-2 text-[10px] font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold flex items-center gap-1.5">
                  <span>✓ PDF Attached successfully ({Math.round(formData.resumeUrl.length / 1024)} KB)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Short Bio *</label>
          <textarea name="shortBio" rows={3} required value={formData.shortBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Long Bio *</label>
          <textarea name="longBio" rows={5} required value={formData.longBio} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 leading-relaxed resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Location *</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
          </div>
        </div>

        <div>
          <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">Availability Status</label>
          <input type="text" name="availability" value={formData.availability || ''} onChange={handleChange} className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">GitHub URL</label>
            <textarea name="social_github" rows={2} value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
          </div>
          <div>
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">LinkedIn URL</label>
            <textarea name="social_linkedin" rows={2} value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[11px] break-all resize-y focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
          </div>
        </div>

        {/* Languages Section */}
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <label className="block font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-bold">
              Languages & Proficiency
            </label>
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-3 py-1.5 rounded-lg bg-[#B45309]/10 text-[#B45309] dark:bg-[#FBBF24]/10 dark:text-[#FBBF24] hover:bg-[#B45309]/20 dark:hover:bg-[#FBBF24]/20 font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer"
            >
              + Add Language
            </button>
          </div>

          {(formData.languages || []).length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px] py-2">
              No languages added. Click "+ Add Language" to configure.
            </p>
          ) : (
            <div className="space-y-3">
              {(formData.languages || []).map((lang, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] uppercase text-zinc-400 mb-0.5">Language Name</label>
                    <input
                      type="text"
                      value={lang.name}
                      required
                      placeholder="e.g. English"
                      onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] uppercase text-zinc-400 mb-0.5">Proficiency Level</label>
                    <select
                      value={lang.level}
                      onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]"
                    >
                      <option value="Native">Native</option>
                      <option value="Proficient">Proficient</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Bilingual">Bilingual</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="mt-3.5 px-2.5 py-1.5 rounded bg-red-950/60 text-red-300 hover:bg-red-900/40 text-[10px] font-mono cursor-pointer border border-red-800/40"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
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
            className="px-6 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400e] text-white dark:bg-[#FBBF24] dark:hover:bg-[#f59e0b] dark:text-zinc-950 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none font-bold text-xs transition-all cursor-pointer shadow-lg shadow-[#B45309]/10 dark:shadow-[#FBBF24]/10"
          >
            {submitting ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
