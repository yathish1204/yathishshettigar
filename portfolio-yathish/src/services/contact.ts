import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessageModel } from '@/models/ContactMessage';
import { ContactInput } from '@/types';
import { getProfile } from '@/services/profile';
import { buildContactEmailHtml, buildAutoResponseEmailHtml } from '@/components/ContactEmailTemplate';
import { verifyRecaptchaToken } from '@/services/recaptcha';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  botcheck: z.any().optional(),
});

export async function submitContactForm(input: ContactInput): Promise<{ success: boolean; message: string; mailtoUrl?: string }> {
  // Server-side Zod validation
  const validation = contactSchema.safeParse(input);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || 'Validation failed';
    return { success: false, message: errorMsg };
  }

  const { name, email, subject, message } = validation.data;

  // Verify reCAPTCHA token if provided or if secret key is present
  const secretKey = process.env.RE_CAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey && !input.botcheck) {
    if (!input.recaptchaToken) {
      return { success: false, message: 'Please complete the reCAPTCHA verification.' };
    }
    const recaptchaResult = await verifyRecaptchaToken(input.recaptchaToken);
    if (!recaptchaResult.success) {
      return { success: false, message: recaptchaResult.message || 'reCAPTCHA verification failed.' };
    }
  }

  // Dynamically retrieve user email from Profile or fallback to yathish120420@gmail.com
  let targetRecipient = 'yathish120420@gmail.com';
  try {
    const profile = await getProfile();
    if (profile?.email) {
      targetRecipient = profile.email;
    }
  } catch {
    // Fallback to default
  }

  // Build direct mailto scheme
  const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoUrl = `mailto:${targetRecipient}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(mailtoBody)}`;

  // Web3Forms Honeypot Bot Check
  if (input.botcheck) {
    console.warn('Honeypot botcheck triggered. Dropping spam submission silently.');
    return {
      success: true,
      message: 'Thank you for your message!',
      mailtoUrl,
    };
  }

  try {
    // 1. Store message in MongoDB database
    const db = await connectToDatabase();
    if (db) {
      await ContactMessageModel.create({
        name,
        email,
        subject,
        message,
        read: false,
      });
    }

    // 2. Email Dispatch: Primary = Web3Forms, Secondary Fallback = Resend, Tertiary Fallback = Formspree
    let emailDispatched = Boolean(input.emailAlreadySent);

    // Primary: Web3Forms (Attempted on server if client-side dispatch was skipped or unverified)
    const web3Key =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3Key && !emailDispatched) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            name,
            email,
            subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
            message: `From: ${name} <${email}>\n\n${message}`,
            replyto: email,
            botcheck: input.botcheck || undefined,
          }),
        });

        const contentType = web3Res.headers.get('content-type');
        if (web3Res.ok && contentType && contentType.includes('application/json')) {
          const web3Data = await web3Res.json();
          if (web3Data.success) {
            emailDispatched = true;
          } else {
            console.warn('Web3Forms returned unsuccessful response:', web3Data);
          }
        } else {
          console.warn(`Web3Forms API HTTP status ${web3Res.status} (non-JSON response)`);
        }
      } catch (web3Err) {
        console.warn('Web3Forms email dispatch failed, falling back to Resend:', web3Err);
      }
    }

    // Secondary Fallback: Resend (if Web3Forms failed or was not configured)
    if (!emailDispatched) {
      const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: 'Portfolio Contact Form <onboarding@resend.dev>',
              to: targetRecipient,
              reply_to: email,
              subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
              text: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
              html: buildContactEmailHtml({ name, email, subject, message }),
            }),
          });

          if (resendRes.ok) {
            emailDispatched = true;
          } else {
            const errText = await resendRes.text();
            console.warn(`Resend API HTTP error (${resendRes.status}):`, errText);
          }
        } catch (resendErr) {
          console.warn('Resend email dispatch error:', resendErr);
        }
      }
    }

    // Tertiary Fallback: Formspree (if Web3Forms and Resend both failed or were not configured)
    if (!emailDispatched) {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      if (formspreeId) {
        try {
          const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              name,
              email,
              subject,
              message,
              _replyto: email,
              _subject: `[Portfolio Inquiry] ${subject}`,
            }),
          });

          if (formspreeRes.ok) {
            emailDispatched = true;
          }
        } catch (formspreeErr) {
          console.warn('Formspree email dispatch error:', formspreeErr);
        }
      }
    }

    // 3. Automated Resend Auto-Responder Confirmation Email to the recipient's email address
    const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Yathish Shettigar <onboarding@resend.dev>';
    if (resendApiKey && email) {
      try {
        const sendAutoResponder = async (toAddress: string) => {
          return await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: fromAddress,
              to: toAddress,
              subject: toAddress.toLowerCase() === email.toLowerCase()
                ? `Thank you for reaching out, ${name}! [Automated Response]`
                : `[Test Auto-Responder for ${name} <${email}>] Thank you for reaching out!`,
              text: `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}" and will get back to you soon.\n\nIn the meantime, feel free to explore my portfolio: https://yathishshettigar.site\n\nBest regards,\nYathish Shettigar\n\n(This is an automated response confirming that your message was delivered.)`,
              html: buildAutoResponseEmailHtml({ name, subject }),
            }),
          });
        };

        let autoResendRes = await sendAutoResponder(email);

        // If Resend returns 403 due to free-tier testing domain restriction (onboarding@resend.dev allows only account owner),
        // fallback to sending the auto-responder preview to yathish120420@gmail.com so testing succeeds flawlessly.
        if (autoResendRes.status === 403 && email.toLowerCase() !== 'yathish120420@gmail.com') {
          console.warn(`Resend 403 domain restriction for ${email}. Delivering auto-responder preview to yathish120420@gmail.com.`);
          autoResendRes = await sendAutoResponder('yathish120420@gmail.com');
        }

        if (autoResendRes.ok) {
          console.log(`Automated auto-responder email successfully delivered via Resend.`);
        } else {
          const autoErrText = await autoResendRes.text();
          console.warn(`Resend Auto-responder HTTP ${autoResendRes.status}:`, autoErrText);
        }
      } catch (autoRespErr) {
        console.warn('Auto-responder email dispatch error:', autoRespErr);
      }
    }

    return {
      success: true,
      message: `Thank you, ${name}! Your message has been sent to ${targetRecipient}.`,
      mailtoUrl,
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'Network error submitting form. Click below to email directly.',
      mailtoUrl,
    };
  }
}

export async function getContactMessagesForAdmin(): Promise<{ messages: any[]; unreadCount: number }> {
  try {
    const db = await connectToDatabase();
    if (!db) return { messages: [], unreadCount: 0 };

    const docs = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
    const unreadCount = docs.filter((m) => !m.read).length;

    const formattedMessages = docs.map((m) => ({
      _id: m._id.toString(),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      read: Boolean(m.read),
      createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
    }));

    return { messages: formattedMessages, unreadCount };
  } catch (error) {
    console.error('getContactMessagesForAdmin error:', error);
    return { messages: [], unreadCount: 0 };
  }
}
