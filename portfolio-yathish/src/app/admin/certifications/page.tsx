'use client';

import React, { useEffect, useState } from 'react';
import { Certification } from '@/types';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialForm = {
    name: '',
    issuer: '',
    issueDate: '2024',
    credentialId: '',
    credentialUrl: '',
    thumbnail: '',
    featured: false,
    order: 0,
    status: 'published' as 'published' | 'draft',
    categories: ['General'] as string[],
  };

  const [form, setForm] = useState(initialForm);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/certifications');
      const json = await res.json();
      if (json.success) setCerts(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (cert: Certification) => {
    setEditingId(cert._id || null);
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      thumbnail: cert.thumbnail || cert.certificateImage || '',
      featured: Boolean(cert.featured),
      order: cert.order || 0,
      status: (cert.status as 'published' | 'draft') || 'published',
      categories: cert.categories && cert.categories.length > 0
        ? cert.categories
        : cert.category ? [cert.category] : ['Others'],
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const type = 'type' in e.target ? (e.target as HTMLInputElement).type : undefined;
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

    const url = editingId ? `/api/certifications/${editingId}` : '/api/certifications';
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
        fetchCerts();
      } else {
        setError(json.error?.message || json.message || 'Failed to save certification.');
      }
    } catch (err) {
      setError('Connection error saving certification.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete certification "${name}"?`)) return;
    try {
      const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) fetchCerts();
      else alert(`Delete failed: ${json.error?.message}`);
    } catch (e) {
      alert('Error deleting certification');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Certifications & Credentials</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white dark:bg-[#FBBF24] dark:hover:bg-[#F59E0B] dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-[#B45309]/20 dark:shadow-[#FBBF24]/20 self-start sm:self-auto"
        >
          + Add New Certification
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">Loading certifications...</div>
      ) : certs.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
          No certifications found. Click "+ Add New Certification" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c) => (
            <div key={c._id || c.name} className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none flex items-start justify-between transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-[#B45309] dark:text-[#FBBF24] font-semibold">{c.issuer}</span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">• {c.issueDate}</span>
                  {c.featured && <span className="text-xs text-[#B45309] dark:text-[#FBBF24] font-bold">★ Featured</span>}
                </div>
                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{c.name}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(c.categories && c.categories.length > 0
                    ? c.categories
                    : c.category ? [c.category] : ['Others']
                  ).map((cat) => (
                    <span key={cat} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[9px] uppercase font-semibold font-mono border border-zinc-200 dark:border-zinc-700">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleOpenEdit(c)}
                  title="Edit Certification"
                  aria-label="Edit Certification"
                  className="w-[38px] h-[38px] rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#B45309]/10 dark:hover:bg-[#FBBF24]/10 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] border border-zinc-200 dark:border-zinc-700 hover:border-[#B45309]/40 dark:hover:border-[#FBBF24]/40 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {c._id && (
                  <button
                    onClick={() => handleDelete(c._id!, c.name)}
                    title="Delete Certification"
                    aria-label="Delete Certification"
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
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{editingId ? 'Edit Certification' : '+ Add New Certification'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-mono text-xs cursor-pointer">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Certification Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Responsive Web Development" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Issuer *</label>
                  <input type="text" name="issuer" required value={form.issuer} onChange={handleChange} placeholder="freecodecamp" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Issue Date *</label>
                  <input type="text" name="issueDate" required value={form.issueDate} onChange={handleChange} placeholder="2023" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Badge Image / Thumbnail URL</label>
                <input type="text" name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://... or /images/cert.jpg" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24] font-mono text-xs" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Credential Verification URL</label>
                <input type="text" name="credentialUrl" value={form.credentialUrl} onChange={handleChange} placeholder="https://freecodecamp.org/verify/..." className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#B45309] dark:focus:border-[#FBBF24]" />
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-700 dark:text-zinc-300 mb-1 font-bold">Filter Categories</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 max-h-32 overflow-y-auto">
                  {['UX/UI Design', 'Frontend Development', 'Design Systems', 'General'].map((cat) => {
                    const isChecked = form.categories.includes(cat);
                    return (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300 select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setForm((prev) => ({ ...prev, categories: [...prev.categories, cat] }));
                            } else {
                              setForm((prev) => ({ ...prev, categories: prev.categories.filter((c) => c !== cat) }));
                            }
                          }}
                          className="w-4 h-4 accent-[#B45309] dark:accent-[#FBBF24] rounded cursor-pointer"
                        />
                        <span className="text-[11px] font-mono">{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#B45309] dark:accent-[#FBBF24] rounded cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer">
                  Featured Certification (Display on home page highlight grid)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Certification'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
