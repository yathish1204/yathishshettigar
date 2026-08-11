'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get('redirect');
  const redirectTarget =
    rawRedirect && rawRedirect.startsWith('/admin') && rawRedirect !== '/admin/login'
      ? rawRedirect
      : '/admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        // Redirect to intended destination after successful login
        window.location.href = redirectTarget;
      } else {
        setError(json.error?.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[65fr_35fr] bg-zinc-950 text-zinc-100 font-sans antialiased overflow-hidden">
      {/* 65% Hero Poster Image Column - Hidden on mobile */}
      <div className="hidden md:block relative h-full w-full overflow-hidden select-none">
        <img
          src="https://res.cloudinary.com/ddzrfwfsl/image/upload/q_auto,f_auto/v1786337057/yathish-hero-poster-img_1_qfd3fd.png"
          alt="Hero Poster"
          className="w-full h-full object-cover object-center"
        />
        {/* Blending Transparent Linear Gradient on the right end */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/10 to-zinc-950" />
      </div>

      {/* 35% Login Form Column */}
      <div className="flex items-center justify-center p-6 sm:p-10 md:p-16 h-full relative z-10">
        <div className="w-full max-w-sm space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-zinc-950 font-mono text-xl font-extrabold flex items-center justify-center shadow-lg shadow-emerald-500/20">
              YS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">CMS Admin</h1>
            <p className="text-xs sm:text-sm text-zinc-400">Sign in to manage portfolio content and case studies</p>
          </div>

          {error && (
            <div role="alert" className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-username" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-850 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] cursor-pointer"
            >
              {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-400 text-xs font-mono">
          Loading login portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
