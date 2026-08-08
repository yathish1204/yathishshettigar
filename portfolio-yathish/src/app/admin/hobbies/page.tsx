'use client';

import React, { useEffect, useState } from 'react';
import { Hobby } from '@/types';

export default function AdminHobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/hobbies');
        const json = await res.json();
        if (json.success) setHobbies(json.data);
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
          <h1 className="text-2xl font-bold text-zinc-100">Personal Interests & Hobbies</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Creative pursuits supporting professional endeavors</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading hobbies...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hobbies.map((h) => (
            <div key={h._id || h.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <h3 className="font-bold text-sm text-zinc-100">{h.name}</h3>
              <p className="text-xs text-zinc-400">{h.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
