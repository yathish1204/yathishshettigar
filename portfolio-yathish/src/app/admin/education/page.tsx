'use client';

import React, { useEffect, useState } from 'react';
import { Education } from '@/types';

export default function AdminEducationPage() {
  const [eduList, setEduList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/education');
        const json = await res.json();
        if (json.success) setEduList(json.data);
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
          <h1 className="text-2xl font-bold text-zinc-100">Education & Academic Background</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Degrees and institutional coursework</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading education...</div>
      ) : (
        <div className="space-y-4">
          {eduList.map((edu) => (
            <div key={edu._id || edu.institution} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-100">{edu.degree} in {edu.field}</h3>
                <span className="text-xs font-mono text-emerald-400">{edu.startDate} — {edu.endDate || 'Present'}</span>
              </div>
              <div className="text-xs text-zinc-300">{edu.institution}</div>
              {edu.description && <p className="text-xs text-zinc-400 mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
