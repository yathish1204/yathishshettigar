import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessageModel } from '@/models/ContactMessage';
import { ContactInput } from '@/types';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export async function submitContactForm(input: ContactInput): Promise<{ success: boolean; message: string; mailtoUrl?: string }> {
  // Server-side Zod validation
  const validation = contactSchema.safeParse(input);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || 'Validation failed';
    return { success: false, message: errorMsg };
  }

  const { name, email, subject, message } = validation.data;
  const targetRecipient = 'yathish120420@gmail.com';

  // Build mailto fallback URL
  const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoUrl = `mailto:${targetRecipient}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(mailtoBody)}`;

  try {
    // 1. Store in MongoDB database
    const db = await connectToDatabase();
    if (db) {
      await ContactMessageModel.create({
        name,
        email,
        subject,
        message,
        recipient: targetRecipient,
      });
    }

    // 2. Dispatch to Resend API if key is present
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: targetRecipient,
            reply_to: email,
            subject: `[Portfolio] ${subject} - from ${name}`,
            text: `Sender: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });
      } catch (resendErr) {
        console.warn('Resend email dispatch error:', resendErr);
      }
    }

    // 3. Dispatch to Formspree / Web3Forms fallback endpoint
    try {
      await fetch('https://formspree.io/f/xknkyoky', {
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
    } catch (formspreeErr) {
      console.warn('Formspree dispatch error:', formspreeErr);
    }

    return {
      success: true,
      message: `Thank you, ${name}! Your message has been sent to yathish120420@gmail.com.`,
      mailtoUrl,
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'Database error. Click here to send via Gmail directly.',
      mailtoUrl,
    };
  }
}
