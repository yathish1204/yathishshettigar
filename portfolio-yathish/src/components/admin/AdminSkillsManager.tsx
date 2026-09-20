'use client';

import React, { useState } from 'react';
import { Skill, SkillCategory } from '@/types';

interface AdminSkillsManagerProps {
  initialSkills: Skill[];
}

export default function AdminSkillsManager({ initialSkills }: AdminSkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    name: '',
    category: 'Front End Development' as SkillCategory,
    icon: '',
    proficiency: 3,
    yearsOfExperience: 3,
    order: 0,
    status: 'published' as 'published' | 'draft',
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
      icon: skill.icon || '',
      proficiency: skill.proficiency !== undefined ? Number(skill.proficiency) : 3,
      yearsOfExperience: skill.yearsOfExperience !== undefined ? Number(skill.yearsOfExperience) : 3,
      order: skill.order || 0,
      status: (skill.status as 'published' | 'draft') || 'published',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'yearsOfExperience' || name === 'proficiency' || name === 'order') {
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
        setError(json.error?.message || json.message || 'Failed to save skill.');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Skills & Tooling Management</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white dark:bg-[#FBBF24] dark:hover:bg-[#F59E0B] dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-[#B45309]/20 dark:shadow-[#FBBF24]/20 self-start sm:self-auto"
        >
          + Add New Skill
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
          No skills found. Click "+ Add New Skill" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill._id || skill.name} className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain rounded-sm shrink-0" />
                )}
                <div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{skill.name}</div>
                  <div className="text-[10px] font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold">{skill.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleOpenEdit(skill)}
                  title="Edit Skill"
                  aria-label="Edit Skill"
                  className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#B45309]/10 dark:hover:bg-[#FBBF24]/10 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700 hover:border-[#B45309]/40 dark:hover:border-[#FBBF24]/40 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {skill._id && (
                  <button
                    onClick={() => handleDelete(skill._id!, skill.name)}
                    title="Delete Skill"
                    aria-label="Delete Skill"
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
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{editingId ? 'Edit Skill' : '+ Add New Skill'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-mono text-xs cursor-pointer">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Skill Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Next.js" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]">
                  <option value="UX & Product Development">UX & Product Development</option>
                  <option value="Front End Development">Front End Development</option>
                  <option value="Tools & Technology">Tools & Technology</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Proficiency Level *</label>
                  <select name="proficiency" value={form.proficiency} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]">
                    <option value={1}>1 - Basic</option>
                    <option value={2}>2 - Intermediate</option>
                    <option value={3}>3 - Proficient</option>
                    <option value={4}>4 - Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Years of Exp</label>
                  <input type="number" min={0} name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} placeholder="e.g. 4" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Icon Image / SVG URL (Optional)</label>
                <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="e.g. https://... or /icons/custom.svg" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24] font-mono text-xs" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Display Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
