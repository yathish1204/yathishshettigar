'use client';

import React, { useEffect, useState } from 'react';
import { Experience } from '@/types';

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
    startDate: '2024',
    endDate: 'Present',
    current: true,
    summary: '',
    responsibilities: '',
    technologies: '',
    order: 0,
    status: 'published' as const,
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
      startDate: exp.startDate,
      endDate: exp.endDate || 'Present',
      current: exp.current,
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

    const payload = {
      ...form,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Work Experience Management</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
        >
          + Add New Experience
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading experience history...</div>
      ) : experiences.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
          No experience records found. Click "+ Add New Experience" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id || exp.company} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-zinc-100">{exp.role} @ {exp.company}</h3>
                  <span className="text-xs font-mono text-emerald-400">{exp.startDate} — {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{exp.summary}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-mono"
                >
                  Edit
                </button>
                {exp._id && (
                  <button
                    onClick={() => handleDelete(exp._id!, exp.role)}
                    className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-mono"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-zinc-100">
                {editingId ? 'Edit Experience Record' : '+ Add New Experience Record'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-100 font-mono text-xs">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Company *</label>
                  <input type="text" name="company" required value={form.company} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Role *</label>
                  <input type="text" name="role" required value={form.role} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Start Date *</label>
                  <input type="text" name="startDate" required value={form.startDate} onChange={handleChange} placeholder="e.g. Jan 2024" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">End Date</label>
                  <input type="text" name="endDate" value={form.endDate} onChange={handleChange} placeholder="Present" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Summary *</label>
                <textarea name="summary" rows={2} required value={form.summary} onChange={handleChange} placeholder="Overview of position..." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Responsibilities (One per line)</label>
                <textarea name="responsibilities" rows={3} value={form.responsibilities} onChange={handleChange} placeholder="Built design token system..." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Technologies Used (comma separated)</label>
                <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Next.js, TypeScript, Tailwind" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Experience'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
