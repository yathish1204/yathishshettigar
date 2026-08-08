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

export async function submitContactForm(input: ContactInput): Promise<{ success: boolean; message: string }> {
  // Server-side Zod validation
  const validation = contactSchema.safeParse(input);
  if (!validation.success) {
    const errorMsg = validation.error.errors[0]?.message || 'Validation failed';
    return { success: false, message: errorMsg };
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      await ContactMessageModel.create({
        name: validation.data.name,
        email: validation.data.email,
        subject: validation.data.subject,
        message: validation.data.message,
      });
    }

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending your message. Please try again later.',
    };
  }
}
