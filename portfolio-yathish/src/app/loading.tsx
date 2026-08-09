import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Emerald Ring */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 animate-ping absolute" />
        {/* Inner Glowing Badge */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-zinc-950 font-mono font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 relative z-10">
          YS
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
      </div>

      <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Loading Portfolio...</p>
    </div>
  );
}
