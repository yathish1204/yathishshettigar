'use client';

import React, { useEffect, useState } from 'react';
import { Skill } from '@/types';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/skills');
        const json = await res.json();
        if (json.success) setSkills(json.data);
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
          <h1 className="text-2xl font-bold text-zinc-100">Skills & Tooling Management</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Categorized competencies across UX, Frontend, Backend, Tools & Motion</p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-zinc-400">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill._id || skill.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-zinc-100">{skill.name}</div>
                <div className="text-[10px] font-mono text-emerald-400">{skill.category}</div>
              </div>
              {skill.yearsOfExperience && (
                <span className="text-xs font-mono text-zinc-400">{skill.yearsOfExperience} yrs</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
