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
    order: 0,
    status: 'published' as const,
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
      order: cert.order || 0,
      status: (cert.status as 'published' | 'draft') || 'published',
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        setError(json.error?.message || 'Failed to save certification.');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Certifications & Credentials</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
        >
          + Add New Certification
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading certifications...</div>
      ) : certs.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
          No certifications found. Click "+ Add New Certification" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((c) => (
            <div key={c._id || c.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400">{c.issuer}</span>
                  <span className="text-xs font-mono text-zinc-500">• {c.issueDate}</span>
                </div>
                <div className="font-bold text-sm text-zinc-100">{c.name}</div>
                {c.credentialId && <div className="text-[10px] font-mono text-zinc-400">ID: {c.credentialId}</div>}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(c)} className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 text-[10px] font-mono">
                  Edit
                </button>
                {c._id && (
                  <button onClick={() => handleDelete(c._id!, c.name)} className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 text-[10px] font-mono">
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
              <h2 className="text-lg font-bold text-zinc-100">{editingId ? 'Edit Certification' : '+ Add New Certification'}</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-100 font-mono text-xs">✕ Close</button>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Certification Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. AWS Certified Developer" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Issuer *</label>
                  <input type="text" name="issuer" required value={form.issuer} onChange={handleChange} placeholder="Amazon Web Services" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
                <div>
                  <label className="block font-mono uppercase text-zinc-300 mb-1">Issue Date *</label>
                  <input type="text" name="issueDate" required value={form.issueDate} onChange={handleChange} placeholder="2024" className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-zinc-300 mb-1">Credential URL</label>
                <input type="text" name="credentialUrl" value={form.credentialUrl} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 font-mono">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold">{submitting ? 'Saving...' : 'Save Certification'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
