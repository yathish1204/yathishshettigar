'use client';

import React, { useEffect, useState } from 'react';
import { Experience } from '@/types';

// Convert dd/mm/yyyy or legacy format to yyyy-mm-dd (for HTML date input value)
const toInputFormat = (dateStr?: string): string => {
  if (!dateStr) return '';
  const clean = dateStr.trim();
  if (clean.toLowerCase() === 'present') return '';

  // If already in yyyy-mm-dd
  if (clean.includes('-')) {
    const parts = clean.split('-');
    if (parts.length === 3) return clean;
    if (parts.length === 2) return `${clean}-01`;
    return `${parts[0]}-01-01`;
  }

  // If in dd/mm/yyyy
  if (clean.includes('/')) {
    const parts = clean.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }

  // If it is just a year (e.g. 2024)
  if (/^\d{4}$/.test(clean)) {
    return `${clean}-01-01`;
  }

  return '';
};

// Convert yyyy-mm-dd to dd/mm/yyyy (for API / DB storage)
const toDbFormat = (dateStr?: string): string => {
  if (!dateStr) return '';
  const clean = dateStr.trim();
  const parts = clean.split('-'); // ["yyyy", "mm", "dd"]
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
  }
  return clean;
};

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    company: '',
    role: '',
    employmentType: 'Full-time',
    location: 'Bengaluru, India',
    startDate: '',
    endDate: '',
    current: true,
    isLatestEmployer: false,
    summary: '',
    responsibilities: '',
    technologies: '',
    order: 0,
    status: 'published' as 'published' | 'draft',
  };

  const [form, setForm] = useState(initialForm);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/experience');
      const json = await res.json();
      if (json.success) setExperiences(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingId(exp._id || null);
    setForm({
      company: exp.company,
      role: exp.role,
      employmentType: exp.employmentType || 'Full-time',
      location: exp.location || 'Bengaluru, India',
      startDate: toInputFormat(exp.startDate),
      endDate: toInputFormat(exp.endDate),
      current: exp.current,
      isLatestEmployer: !!exp.isLatestEmployer,
      summary: exp.summary,
      responsibilities: (exp.responsibilities || []).join('\n'),
      technologies: (exp.technologies || []).join(', '),
      order: exp.order || 0,
      status: (exp.status as 'published' | 'draft') || 'published',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const isCurrent = !form.endDate;

    const payload = {
      ...form,
      startDate: toDbFormat(form.startDate),
      endDate: form.endDate ? toDbFormat(form.endDate) : '',
      current: isCurrent,
      responsibilities: form.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      technologies: form.technologies.split(',').map((s) => s.trim()).filter(Boolean),
    };

    const url = editingId ? `/api/experience/${editingId}` : '/api/experience';
    const method = editingId ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setShowModal(false);
        setForm(initialForm);
        setEditingId(null);
        fetchExperiences();
      } else {
        setError(json.error?.message || 'Failed to save experience record.');
      }
    } catch (err) {
      setError('Connection error submitting experience.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (!confirm(`Delete experience record for "${role}"?`)) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchExperiences();
      else alert(`Delete failed: ${json.error?.message}`);
    } catch (e) {
      alert('Error deleting experience');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Work Experience Management</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white dark:bg-[#FBBF24] dark:hover:bg-[#F59E0B] dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-[#B45309]/20 dark:shadow-[#FBBF24]/20 self-start sm:self-auto"
        >
          + Add New Experience
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">Loading experience history...</div>
      ) : experiences.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
          No experience records found. Click "+ Add New Experience" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id || exp.company} className="group p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none space-y-2 flex items-start justify-between transition-colors">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{exp.role} @ {exp.company}</h3>
                  <span className="text-xs font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold">{exp.startDate} — {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{exp.summary}</p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  title="Edit Experience"
                  aria-label="Edit Experience"
                  className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#B45309]/10 dark:hover:bg-[#FBBF24]/10 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700 hover:border-[#B45309]/40 dark:hover:border-[#FBBF24]/40 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {exp._id && (
                  <button
                    onClick={() => handleDelete(exp._id!, exp.role)}
                    title="Delete Experience"
                    aria-label="Delete Experience"
                    className="w-[38px] h-[38px] rounded-lg bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {editingId ? 'Edit Experience Record' : '+ Add New Experience Record'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-mono text-xs cursor-pointer">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Company *</label>
                  <input type="text" name="company" required value={form.company} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Role *</label>
                  <input type="text" name="role" required value={form.role} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Start Date *</label>
                  <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Summary Points (One point per line) *</label>
                <textarea name="summary" rows={4} required value={form.summary} onChange={handleChange} placeholder="• Spearheaded frontend architecture and design systems&#10;• Led cross-functional team of 8 engineers&#10;• Reduced page load times by 45%" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24] font-sans text-xs leading-relaxed" />
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                  Enter each summary item on a new line. Each line will be rendered as a bulleted summary point.
                </p>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Responsibilities (One per line)</label>
                <textarea name="responsibilities" rows={3} value={form.responsibilities} onChange={handleChange} placeholder="Built design token system..." className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Technologies Used (comma separated)</label>
                <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Next.js, TypeScript, Tailwind" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isLatestEmployer"
                  name="isLatestEmployer"
                  checked={form.isLatestEmployer}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[#B45309] accent-[#B45309] dark:accent-[#FBBF24]"
                />
                <label htmlFor="isLatestEmployer" className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer">
                  Latest Employer (Show pulsating animation on stepper node)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Experience'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
