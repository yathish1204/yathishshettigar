'use client';

import React, { useState } from 'react';
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
  }>({ submitting: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus({ submitting: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ submitting: false, success: true, message: result.message });
        reset();
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: result.error?.message || result.message || 'Failed to submit form.',
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        submitting: false,
        success: false,
        message: 'Network error. Please try again later or email directly.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Alert Messages */}
      {status.message && (
        <div
          role="alert"
          className={`p-4 rounded-xl text-sm font-medium border ${
            status.success
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300'
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-2">
          Your Name <span className="text-emerald-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="e.g. Alex Morgan"
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-2">
          Your Email <span className="text-emerald-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="e.g. alex@company.com"
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-2">
          Subject <span className="text-emerald-400">*</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          placeholder="e.g. Senior UX Engineer Role / Project Inquiry"
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-xs text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-2">
          Message <span className="text-emerald-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Write your message here..."
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-y"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={status.submitting} className="w-full sm:w-auto">
        {status.submitting ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  );
}
