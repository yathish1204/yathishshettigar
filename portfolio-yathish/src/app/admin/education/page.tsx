'use client';

import React, { useEffect, useState } from 'react';
import { Education } from '@/types';

export default function AdminEducationPage() {
  const [eduList, setEduList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchEdu();
  }, []);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Education & Academic Background</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
        >
          + Add New Education
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading education...</div>
      ) : eduList.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
          No education records found. Click "+ Add New Education" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {eduList.map((edu) => (
            <div key={edu._id || edu.institution} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-sm text-zinc-100">{edu.degree} in {edu.field}</h3>
                  <span className="text-xs font-mono text-emerald-400">{edu.startDate} — {edu.endDate || 'Present'}</span>
                </div>
                <div className="text-xs text-zinc-300">{edu.institution}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(edu)} className="px-2.5 py-1 rounded bg-zinc-800 text-emerald-400 text-xs font-mono">
                  Edit
                </button>
                {edu._id && (
                  <button onClick={() => handleDelete(edu._id!, edu.degree)} className="px-2.5 py-1 rounded bg-red-950/60 text-red-300 text-xs font-mono">
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
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-zinc-100">{editingId ? 'Edit Education Record' : '+ Add New Education Record'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-100 font-mono text-xs">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Institution *</label>
                <input type="text" name="institution" required value={form.institution} onChange={handleChange} placeholder="University name..." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Degree *</label>
                  <input type="text" name="degree" required value={form.degree} onChange={handleChange} placeholder="B.S. / B.E." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Field of Study *</label>
                  <input type="text" name="field" required value={form.field} onChange={handleChange} placeholder="Computer Science" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Start Date *</label>
                  <input type="text" name="startDate" required value={form.startDate} onChange={handleChange} placeholder="2020" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">End Date</label>
                  <input type="text" name="endDate" value={form.endDate} onChange={handleChange} placeholder="2024" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Education'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
