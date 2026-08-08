import React from 'react';
import { Certification } from '@/types';
import { Button } from '@/components/Button';

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
          <span>{certification.issuer}</span>
          <span>{certification.issueDate}</span>
        </div>

        <h3 className="text-lg font-bold text-zinc-100 mb-2">{certification.name}</h3>

        {certification.credentialId && (
          <p className="text-xs font-mono text-zinc-400 mb-4">ID: {certification.credentialId}</p>
        )}
      </div>

      {certification.credentialUrl && (
        <div className="mt-4 pt-4 border-t border-zinc-800/60">
          <Button
            href={certification.credentialUrl}
            external
            variant="outline"
            size="sm"
            className="w-full"
          >
            Verify Credential
          </Button>
        </div>
      )}
    </div>
  );
}
