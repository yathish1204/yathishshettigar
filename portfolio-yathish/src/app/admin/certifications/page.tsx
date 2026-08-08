'use client';

import React, { useEffect, useState } from 'react';
import { Certification } from '@/types';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/certifications');
        const json = await res.json();
        if (json.success) setCerts(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Certifications & Credentials</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Manage verified credentials and issuer details</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading certifications...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((c) => (
            <div key={c._id || c.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">{c.issuer}</span>
                <span className="text-xs font-mono text-zinc-500">{c.issueDate}</span>
              </div>
              <div className="font-bold text-sm text-zinc-100">{c.name}</div>
              {c.credentialId && <div className="text-[10px] font-mono text-zinc-400">ID: {c.credentialId}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
