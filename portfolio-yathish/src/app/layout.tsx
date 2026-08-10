import type { Metadata } from 'next';
import './globals.css';
import { getProfile } from '@/services/profile';
import { ConditionalLayout } from '@/components/ConditionalLayout';
import { SmoothScroll } from '@/components/SmoothScroll';
import { GSAPScroll } from '@/components/GSAPScroll';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/utils/jsonLd';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en" className="dark scroll-smooth overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-[#B45309] selection:text-white dark:selection:bg-[#FBBF24] dark:selection:text-zinc-950 min-h-screen flex flex-col overflow-x-hidden">
        <SmoothScroll>
          <GSAPScroll>
            <ConditionalLayout profile={profile}>{children}</ConditionalLayout>
          </GSAPScroll>
        </SmoothScroll>
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
