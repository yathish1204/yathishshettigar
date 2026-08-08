'use client';

import React, { useEffect, useState } from 'react';
import { Skill, SkillCategory } from '@/types';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    name: '',
    category: 'Frontend' as SkillCategory,
    yearsOfExperience: 3,
    order: 0,
    status: 'published' as const,
  };

  const [form, setForm] = useState(initialForm);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/skills');
      const json = await res.json();
      if (json.success) setSkills(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingId(skill._id || null);
    setForm({
      name: skill.name,
      category: skill.category,
      yearsOfExperience: skill.yearsOfExperience || 1,
      order: skill.order || 0,
      status: (skill.status as 'published' | 'draft') || 'published',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'yearsOfExperience' || name === 'order') {
      setForm((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
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
        fetchSkills();
      } else {
        setError(json.error?.message || 'Failed to save skill.');
      }
    } catch (err) {
      setError('Connection error saving skill.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchSkills();
      else alert(`Delete failed: ${json.error?.message}`);
    } catch (e) {
      alert('Error deleting skill');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Skills & Tooling Management</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
        >
          + Add New Skill
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
          No skills found. Click "+ Add New Skill" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill._id || skill.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-zinc-100">{skill.name}</div>
                <div className="text-[10px] font-mono text-emerald-400">{skill.category}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(skill)} className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[10px] font-mono">
                  Edit
                </button>
                {skill._id && (
                  <button onClick={() => handleDelete(skill._id!, skill.name)} className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 text-[10px] font-mono">
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
              <h2 className="text-lg font-bold text-zinc-100">{editingId ? 'Edit Skill' : '+ Add New Skill'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-100 font-mono text-xs">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Skill Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Next.js" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100">
                  <option value="UX / Product Design">UX / Product Design</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Motion / Interaction">Motion / Interaction</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Years of Experience</label>
                <input type="number" name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
