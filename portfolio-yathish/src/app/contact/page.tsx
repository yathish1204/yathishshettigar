import { Metadata } from 'next';
import { getProfile } from '@/services/profile';
import { ContactSection } from '@/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact & Inquiries | Yathish Shettigar',
  description:
    'Get in touch with Yathish Shettigar regarding Senior UX Engineer roles, frontend architecture consulting, or technical inquiries.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="py-12 md:py-16">
      <ContactSection profile={profile} />
    </div>
  );
}
