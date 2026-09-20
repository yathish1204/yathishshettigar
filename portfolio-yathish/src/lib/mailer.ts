import nodemailer, { Transporter } from 'nodemailer';

export interface SendEmailParams {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

// Global cached pooled transporter to keep connections open and eliminate repeated TLS/TCP handshakes
let cachedTransporter: Transporter | null = null;

function getPooledTransporter(): Transporter | null {
  const smtpUser =
    process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_SERVER_USER;
  const smtpPass =
    process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (!smtpUser || !smtpPass) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      pool: true, // Reuse open TCP/TLS connections
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 10,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
    });
  }

  return cachedTransporter;
}

/**
 * Universal multi-provider email dispatcher supporting:
 * 1. Pooled SMTP / Gmail App Password (via Nodemailer) - High-speed connection reuse to ANY recipient
 * 2. Resend API - High deliverability for verified domains or sandbox testing
 */
export async function sendEmail({
  to,
  from,
  replyTo,
  subject,
  text,
  html,
}: SendEmailParams): Promise<{ success: boolean; provider?: string; error?: string }> {
  // 1. Check SMTP with Connection Pooling (Blazing fast connection reuse)
  const transporter = getPooledTransporter();
  const smtpUser =
    process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_SERVER_USER;

  if (transporter && smtpUser) {
    try {
      const info = await transporter.sendMail({
        from: from || `"Yathish Shettigar" <${smtpUser}>`,
        to,
        replyTo: replyTo || smtpUser,
        subject,
        text,
        html,
      });

      console.log(`[Mailer] SMTP email sent successfully to ${to} (${info.messageId})`);
      return { success: true, provider: 'smtp' };
    } catch (smtpErr: any) {
      console.warn('[Mailer] SMTP dispatch error:', smtpErr.message);
    }
  }

  // 2. Check Resend API (Fast HTTP fetch fallback)
  const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (resendApiKey) {
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'Yathish Shettigar <onboarding@resend.dev>';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromAddress,
          to,
          reply_to: replyTo,
          subject,
          text,
          html,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const resData = await resendRes.json();
      if (resendRes.ok && resData.id) {
        console.log(`[Mailer] Resend email sent successfully to ${to} (${resData.id})`);
        return { success: true, provider: 'resend' };
      } else {
        const errorMsg = resData?.message || resData?.name || `HTTP ${resendRes.status}`;
        console.warn(`[Mailer] Resend API response for recipient ${to}:`, errorMsg);
        return { success: false, provider: 'resend', error: errorMsg };
      }
    } catch (resendErr: any) {
      console.warn('[Mailer] Resend dispatch error:', resendErr.message);
      return { success: false, provider: 'resend', error: resendErr.message };
    }
  }

  return { success: false, error: 'No email dispatch provider configured' };
}
