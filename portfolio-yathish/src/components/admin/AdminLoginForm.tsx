"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function AdminLoginFormContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get("redirect");
  const redirectTarget =
    rawRedirect &&
    rawRedirect.startsWith("/admin") &&
    rawRedirect !== "/admin/login"
      ? rawRedirect
      : "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        // Redirect to intended destination after successful login
        window.location.href = redirectTarget;
      } else {
        setError(json.error?.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
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
          {/* Top Ghost CTA Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800/80 text-xs font-mono transition-all group"
            >
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="flex gap-2 items-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#B45309] text-white dark:bg-[#FBBF24] dark:text-zinc-950 font-mono text-xl font-extrabold flex items-center justify-center shrink-0">
              YS
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight ml-2 md:ml-4">
              Welcome Yathish
            </h1>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-mono"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] dark:focus:border-[#FBBF24] dark:focus:ring-[#FBBF24] transition-all font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] dark:focus:border-[#FBBF24] dark:focus:ring-[#FBBF24] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2/4 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors p-1 cursor-pointer flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.893 7.893L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#B45309] hover:bg-[#92400e] text-white dark:bg-[#FBBF24] dark:hover:bg-[#f59e0b] dark:text-zinc-950 disabled:bg-zinc-850 disabled:text-zinc-500 disabled:cursor-not-allowed font-extrabold text-sm transition-all shadow-lg shadow-[#B45309]/10 dark:shadow-[#FBBF24]/10 active:scale-[0.98] cursor-pointer"
            >
              {submitting ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-400 text-xs font-mono">
          Loading login portal...
        </div>
      }
    >
      <AdminLoginFormContent />
    </Suspense>
  );
}
