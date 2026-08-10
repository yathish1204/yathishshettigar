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
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-zinc-950 font-mono text-xl font-bold flex items-center justify-center mx-auto">
            YS
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">CMS Admin Login</h1>
          <p className="text-xs text-zinc-400">Sign in to manage portfolio content and case studies</p>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : 'Sign In to Admin'}
          </button>
        </form>
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
