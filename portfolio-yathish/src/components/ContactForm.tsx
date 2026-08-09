'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/services/contact';
import { ContactInput } from '@/types';
import { Button } from '@/components/Button';

export function ContactForm() {
  const [status, setStatus] = useState<{
    submitting: boolean;
    success?: boolean;
    message?: string;
    mailtoUrl?: string;
  }>({ submitting: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  // Auto-dismiss status message after 6 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus((prev) => ({ ...prev, message: undefined, mailtoUrl: undefined }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const onSubmit = async (data: ContactInput) => {
    setStatus({ submitting: true });

    // Construct Gmail Compose direct URL as instant fallback
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=yathish120420@gmail.com&su=${encodeURIComponent(
      `[Portfolio Inquiry] ${data.subject}`
    )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          submitting: false,
          success: true,
          message: `Message sent to yathish120420@gmail.com!`,
          mailtoUrl: gmailUrl,
        });
        reset();
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: result.error?.message || result.message || 'Form error. Opening Gmail...',
          mailtoUrl: gmailUrl,
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Automatically open Gmail compose on network error
      window.open(gmailUrl, '_blank');
      setStatus({
        submitting: false,
        success: true,
        message: 'Opening Gmail compose window for direct email to yathish120420@gmail.com...',
        mailtoUrl: gmailUrl,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono">
          Your Name <span className="text-emerald-600 dark:text-emerald-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="e.g. Alex Morgan"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono">
          Your Email <span className="text-emerald-600 dark:text-emerald-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="e.g. alex@company.com"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono">
          Subject <span className="text-emerald-600 dark:text-emerald-400">*</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          placeholder="e.g. Senior UX Engineer Role / Project Inquiry"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono">
          Message <span className="text-emerald-600 dark:text-emerald-400">*</span>
        </label>
        <textarea
          id="message"
          rows={2}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Write your message here..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm transition-colors resize-y min-h-[80px] max-h-[350px]"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submission Status Alert (Placed Directly Before Send Message CTA) */}
      {status.message && (
        <div
          role="alert"
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium border leading-relaxed flex items-center justify-between gap-3 transition-all duration-300 ${
            status.success
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}
        >
          <span>{status.message}</span>
          {status.mailtoUrl && (
            <a
              href={status.mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-emerald-500 text-zinc-950 text-xs font-bold shrink-0 hover:bg-emerald-400 transition-colors"
            >
              Open in Gmail ↗
            </a>
          )}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={status.submitting} size="md" className="w-full sm:w-auto mt-2">
        {status.submitting ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  );
}
