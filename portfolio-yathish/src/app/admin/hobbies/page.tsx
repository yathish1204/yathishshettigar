'use client';

import React, { useEffect, useState } from 'react';
import { Hobby } from '@/types';

export default function AdminHobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    name: '',
    description: '',
    order: 0,
    status: 'published' as 'published' | 'draft',
  };

  const [form, setForm] = useState(initialForm);

  const fetchHobbies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hobbies');
      const json = await res.json();
      if (json.success) setHobbies(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (hobby: Hobby) => {
    setEditingId(hobby._id || null);
    setForm({
      name: hobby.name,
      description: hobby.description,
      order: hobby.order || 0,
      status: (hobby.status as 'published' | 'draft') || 'published',
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

    const url = editingId ? `/api/hobbies/${editingId}` : '/api/hobbies';
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
        fetchHobbies();
      } else {
        setError(json.error?.message || 'Failed to save hobby.');
      }
    } catch (err) {
      setError('Connection error saving hobby.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete hobby "${name}"?`)) return;
    try {
      const res = await fetch(`/api/hobbies/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchHobbies();
      else alert(`Delete failed: ${json.error?.message}`);
    } catch (e) {
      alert('Error deleting hobby');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Personal Interests & Hobbies</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
        >
          + Add New Hobby
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading hobbies...</div>
      ) : hobbies.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
          No hobbies found. Click "+ Add New Hobby" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hobbies.map((h) => (
            <div key={h._id || h.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-zinc-100">{h.name}</h3>
                <p className="text-xs text-zinc-400">{h.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(h)} className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[10px] font-mono">
                  Edit
                </button>
                {h._id && (
                  <button onClick={() => handleDelete(h._id!, h.name)} className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 text-[10px] font-mono">
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
              <h2 className="text-lg font-bold text-zinc-100">{editingId ? 'Edit Hobby' : '+ Add New Hobby'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-100 font-mono text-xs">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Hobby Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Photography" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Description *</label>
                <textarea name="description" rows={3} required value={form.description} onChange={handleChange} placeholder="Exploring urban architecture..." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Hobby'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
