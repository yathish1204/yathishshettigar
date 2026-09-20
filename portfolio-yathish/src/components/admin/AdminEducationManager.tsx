'use client';

import React, { useState } from 'react';
import { Education } from '@/types';

export function AdminEducationManager({
  initialEducation,
}: {
  initialEducation: Education[];
}) {
  const [eduList, setEduList] = useState<Education[]>(initialEducation);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    institution: '',
    degree: '',
    field: '',
    startDate: '2020',
    endDate: '2024',
    description: '',
    order: 0,
  };

  const [form, setForm] = useState(initialForm);

  const fetchEdu = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/education');
      const json = await res.json();
      if (json.success) setEduList(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingId(edu._id || null);
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate || '2024',
      description: edu.description || '',
      order: edu.order || 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const url = editingId ? `/api/education/${editingId}` : '/api/education';
    const method = editingId ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setShowModal(false);
        setForm(initialForm);
        setEditingId(null);
        fetchEdu();
      } else {
        setError(json.error?.message || 'Failed to save education record.');
      }
    } catch (err) {
      setError('Connection error saving education.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, degree: string) => {
    if (!confirm(`Delete education record "${degree}"?`)) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchEdu();
      else alert(`Delete failed: ${json.error?.message}`);
    } catch (e) {
      alert('Error deleting education');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Education & Academic Background</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white dark:bg-[#FBBF24] dark:hover:bg-[#F59E0B] dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-[#B45309]/20 dark:shadow-[#FBBF24]/20 self-start sm:self-auto"
        >
          + Add New Education
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">Loading education records...</div>
      ) : eduList.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
          No education records found. Click "+ Add New Education" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {eduList.map((edu) => (
            <div key={edu._id || edu.institution} className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none flex items-start justify-between transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{edu.degree} in {edu.field}</h3>
                  <span className="text-xs font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold">{edu.startDate} — {edu.endDate || 'Present'}</span>
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">{edu.institution}</div>
              </div>

              <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleOpenEdit(edu)}
                  title="Edit Education"
                  aria-label="Edit Education"
                  className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#B45309]/10 dark:hover:bg-[#FBBF24]/10 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700 hover:border-[#B45309]/40 dark:hover:border-[#FBBF24]/40 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {edu._id && (
                  <button
                    onClick={() => handleDelete(edu._id!, edu.degree)}
                    title="Delete Education"
                    aria-label="Delete Education"
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
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{editingId ? 'Edit Education Record' : '+ Add New Education Record'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-mono text-xs cursor-pointer">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Degree *</label>
                <input type="text" name="degree" required value={form.degree} onChange={handleChange} placeholder="e.g. Bachelor of Engineering" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Field of Study *</label>
                <input type="text" name="field" required value={form.field} onChange={handleChange} placeholder="e.g. Computer Science & Engineering" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Institution *</label>
                <input type="text" name="institution" required value={form.institution} onChange={handleChange} placeholder="e.g. Visvesvaraya Technological University" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Start Date *</label>
                  <input type="text" name="startDate" required value={form.startDate} onChange={handleChange} placeholder="e.g. 2020" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>

                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">End Date</label>
                  <input type="text" name="endDate" value={form.endDate} onChange={handleChange} placeholder="e.g. 2024 or Present" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Education'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
