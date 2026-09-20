export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4 transition-colors">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Accent Gradient Ring */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#9D5AF9]/30 to-[#123FD9]/30 dark:from-[#BF6BFA]/30 dark:to-[#53B9F6]/30 border border-[#9D5AF9]/40 dark:border-[#BF6BFA]/40 animate-ping absolute" />
        {/* Inner Glowing Accent Gradient Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9D5AF9] to-[#123FD9] dark:from-[#BF6BFA] dark:to-[#53B9F6] text-white dark:text-zinc-950 font-mono font-black text-xl flex items-center justify-center shadow-lg shadow-[#9D5AF9]/30 dark:shadow-[#BF6BFA]/30 relative z-10">
          YS
        </div>
      </div>

      {/* Bouncing Gradient Accent Dots */}
      <div className="flex items-center gap-2 pt-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#9D5AF9] dark:bg-[#BF6BFA] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#5849E4] dark:bg-[#8892F8] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#123FD9] dark:bg-[#53B9F6] animate-bounce" />
      </div>

      <p className="text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
        Loading Portfolio...
      </p>
    </div>
  );
}
