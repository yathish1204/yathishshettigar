import { Metadata } from 'next';
import { getProfile } from '@/services/profile';
import { ContactSection } from '@/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact & Inquiries | Yathish Shettigar',
  description:
    'Get in touch with Yathish Shettigar regarding Senior UX Engineer roles, frontend architecture consulting, or technical inquiries.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <article>
      <ContactSection profile={profile} isPage={true} />
    </article>
  );
}
