import Link from 'next/link';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2">
        Error 404
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
        The requested portfolio case study or page could not be located. It may have been moved or archived.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary" size="md">
          Return to Homepage
        </Button>
        <Button href="/projects" variant="outline" size="md">
          View Projects
        </Button>
      </div>
    </div>
  );
}
