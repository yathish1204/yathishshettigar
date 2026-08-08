import type { Metadata } from 'next';
import './globals.css';
import { getProfile } from '@/services/profile';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { GSAPScroll } from '@/components/GSAPScroll';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/utils/jsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yathish.dev';

  return {
    title: {
      default: `${profile.name} — ${profile.title}`,
      template: `%s | ${profile.name}`,
    },
    description: profile.shortBio,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${profile.name} — ${profile.title}`,
      description: profile.tagline,
      url: baseUrl,
      siteName: `${profile.name} Portfolio`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: profile.profileImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${profile.name} — ${profile.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ${profile.title}`,
      description: profile.tagline,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yathish.dev';
  const personJsonLd = getPersonJsonLd(profile, baseUrl);
  const websiteJsonLd = getWebSiteJsonLd(profile, baseUrl);

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-emerald-500 selection:text-zinc-950 min-h-screen flex flex-col">
        <SmoothScroll>
          <GSAPScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer profile={profile} />
          </GSAPScroll>
        </SmoothScroll>
      </body>
    </html>
  );
}
