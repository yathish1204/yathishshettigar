import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessageModel } from '@/models/ContactMessage';
import { ContactInput } from '@/types';
import { getProfile } from '@/services/profile';
import { buildContactEmailHtml, buildAutoConfirmationEmailHtml } from '@/components/ContactEmailTemplate';
import { verifyRecaptchaToken } from '@/services/recaptcha';
import { sendEmail } from '@/lib/mailer';
import { contactSchema } from '@/lib/validations/contact';

export { contactSchema };

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

    // 2. Concurrent Parallel Email Dispatch: 1st Email (To Admin) + 2nd Email (To User)
    const adminEmailPromise = sendEmail({
      to: targetRecipient,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: buildContactEmailHtml({ name, email, subject, message }),
    });

    const userConfirmationPromise = sendEmail({
      to: email,
      replyTo: targetRecipient,
      subject: `Thank you for reaching out, ${name}! [Message Received]`,
      text: `Hi ${name},\n\nThank you for visiting my portfolio website and getting in touch! I have received your enquiry regarding "${subject}" and will get back to you within 24 business hours.\n\nMy Direct Contacts:\n- Email: yathish120420@gmail.com\n- Phone: +91 8296302220\n- Location: Jayanagar, Bengaluru, Karnataka, India\n- Website: https://yathishshettigar.site\n\nBest regards,\nYathish Shettigar`,
      html: buildAutoConfirmationEmailHtml({ name, email, subject }),
    });

    // Execute both emails concurrently in parallel for instant sub-second response
    const [adminRes, userRes] = await Promise.allSettled([
      adminEmailPromise,
      userConfirmationPromise,
    ]);

    if (adminRes.status === 'fulfilled' && !adminRes.value.success) {
      console.warn(`[Contact Service] Admin notification email warning:`, adminRes.value.error);
    }
    if (userRes.status === 'fulfilled' && !userRes.value.success) {
      console.warn(`[Auto-Responder] Confirmation email warning:`, userRes.value.error);
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
