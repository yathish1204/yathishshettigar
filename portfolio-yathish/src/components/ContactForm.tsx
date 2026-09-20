"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/services/contact";
import { ContactInput } from "@/types";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/gtag";
import { ReCAPTCHA, ReCAPTCHARef } from "@/components/ReCAPTCHA";

export function ContactForm() {
  const [status, setStatus] = useState<{
    submitting: boolean;
    success?: boolean;
    message?: string;
    mailtoUrl?: string;
  }>({ submitting: false });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHARef>(null);

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
        setStatus((prev) => ({
          ...prev,
          message: undefined,
          mailtoUrl: undefined,
        }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const onSubmit = async (data: ContactInput) => {
    setRecaptchaError(null);

    if (!recaptchaToken && !data.botcheck) {
      setRecaptchaError(
        "Please tick the 'I am not a robot' checkbox above to send your message.",
      );
      return;
    }

    setStatus({ submitting: true });

    // Track contact form submission action in Google Analytics
    trackEvent({
      action: "submit_contact_form",
      category: "Contact",
      label: data.subject,
    });

    // Construct mailto: direct scheme to open Gmail app on mobile devices
    const mailtoScheme = `mailto:yathish120420@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${data.subject}`,
    )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;

    const web3Key =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "ee76f41c-f4f2-4169-9250-7b8fb0f5cd86";
    let web3Sent = false;

    // Primary Email Dispatch: Call Web3Forms API directly from browser
    if (web3Key && !data.botcheck) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: data.name,
            email: data.email,
            subject: `[Portfolio Inquiry] ${data.subject} - from ${data.name}`,
            message: `From: ${data.name} <${data.email}>\n\n${data.message}`,
            replyto: data.email,
            "g-recaptcha-response": recaptchaToken || undefined,
            botcheck: data.botcheck || undefined,
          }),
        });

        const web3Result = await web3Res.json();
        if (web3Res.ok && web3Result.success) {
          web3Sent = true;
        } else {
          console.warn(
            "Primary Web3Forms client dispatch warning:",
            web3Result,
          );
        }
      } catch (web3Err) {
        console.warn(
          "Web3Forms client fetch error, falling back to backend Resend:",
          web3Err,
        );
      }
    }

    try {
      // 2. Save message to database & trigger secondary backend fallback (Resend) if Web3Forms failed
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          recaptchaToken: recaptchaToken || undefined,
          emailAlreadySent: web3Sent,
        }),
      });

      const result = await response.json();

      if ((response.ok && result.success) || web3Sent) {
        setStatus({
          submitting: false,
          success: true,
          message: `Thank you, ${data.name}! Your message has been sent to yathish120420@gmail.com.`,
          mailtoUrl: mailtoScheme,
        });
        reset();
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setStatus({
          submitting: false,
          success: false,
          message:
            result.error?.message ||
            result.message ||
            "Form error. Opening Mail app...",
          mailtoUrl: mailtoScheme,
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      if (web3Sent) {
        setStatus({
          submitting: false,
          success: true,
          message: `Thank you, ${data.name}! Your message has been sent to yathish120420@gmail.com.`,
          mailtoUrl: mailtoScheme,
        });
        reset();
      } else {
        window.location.href = mailtoScheme;
        setStatus({
          submitting: false,
          success: true,
          message:
            "Opening Mail app for direct email to yathish120420@gmail.com...",
          mailtoUrl: mailtoScheme,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Web3Forms Honeypot Botcheck (Hidden from humans for bot protection) */}
      <input
        type="checkbox"
        id="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        {...register("botcheck")}
      />

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Your Name{" "}
          <span
            className="text-[#B45309] dark:text-[#FBBF24]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="e.g. Alex Morgan"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24] focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Your Email{" "}
          <span
            className="text-[#B45309] dark:text-[#FBBF24]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="e.g. alex@company.com"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24] focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <label
          htmlFor="subject"
          className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Subject{" "}
          <span
            className="text-[#B45309] dark:text-[#FBBF24]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="e.g. Senior UX Engineer Role / Project Inquiry"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24] focus:border-transparent text-xs sm:text-sm transition-colors"
        />
        {errors.subject && (
          <p
            id="subject-error"
            className="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Message{" "}
          <span
            className="text-[#B45309] dark:text-[#FBBF24]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <textarea
          id="message"
          rows={2}
          {...register("message")}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Write your message here..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#B45309] dark:focus:ring-[#FBBF24] focus:border-transparent text-xs sm:text-sm transition-colors resize-y min-h-[80px] max-h-[350px]"
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Google reCAPTCHA Verification */}
      <div>
        <ReCAPTCHA
          ref={recaptchaRef}
          siteKey={
            process.env.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY ||
            "6Lf-ZMQtAAAAALIknd7ziGRvPHmUtEUp6Ju9H3Nv"
          }
          onChange={(token) => {
            setRecaptchaToken(token);
            if (token) setRecaptchaError(null);
          }}
        />
        {recaptchaError && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
            {recaptchaError}
          </p>
        )}
      </div>

      {/* Submission Status Alert (Placed Directly Before Send Message CTA) */}
      {status.message && (
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium border leading-relaxed flex items-center justify-between gap-3 transition-all duration-300 ${
            status.success
              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
          }`}
        >
          <span>{status.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status.submitting}
        size="md"
        className="w-full sm:w-auto mt-2"
      >
        {status.submitting ? "Sending Message..." : "Send Message"}
      </Button>
    </form>
  );
}
