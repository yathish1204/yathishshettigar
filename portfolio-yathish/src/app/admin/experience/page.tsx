'use client';

import React, { useEffect, useState } from 'react';
import { Experience } from '@/types';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/experience');
        const json = await res.json();
        if (json.success) setExperiences(json.data);
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
          <h1 className="text-2xl font-bold text-zinc-100">Work Experience Management</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Manage career timeline and accomplishment bullet points</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading experience history...</div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id || exp.company} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-100">{exp.role} @ {exp.company}</h3>
                <span className="text-xs font-mono text-emerald-400">{exp.startDate} — {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-xs text-zinc-400">{exp.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
