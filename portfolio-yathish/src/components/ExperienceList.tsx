'use client';

import React, { useState } from 'react';
import { Experience } from '@/types';
import { ExperienceItem } from '@/components/ExperienceItem';

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl relative pl-6 md:pl-8 border-l border-zinc-300 dark:border-zinc-800 ml-2.5 sm:ml-4">
      {experiences.map((exp, idx) => {
        const itemId = exp._id || exp.company || `exp-${idx}`;
        return (
          <ExperienceItem
            key={itemId}
            experience={exp}
            isOpen={openId === itemId}
            isLatest={idx === 0}
            onToggle={() => handleToggle(itemId)}
          />
        );
      })}
    </div>
  );
}
