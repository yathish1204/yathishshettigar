import { Profile, Project } from '@/types';

export function getPersonJsonLd(profile: Profile, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.shortBio,
    url: baseUrl,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: [
      profile.socialLinks?.github,
      profile.socialLinks?.linkedin,
      profile.socialLinks?.twitter,
      profile.socialLinks?.website,
    ].filter(Boolean),
  };
}

export function getWebSiteJsonLd(profile: Profile, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${profile.name} — Portfolio`,
    url: baseUrl,
    description: profile.tagline,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  };
}

export function getProjectJsonLd(project: Project, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.shortDescription,
    description: project.description,
    url: `${baseUrl}/projects/${project.slug}`,
    image: project.thumbnail,
    creator: {
      '@type': 'Person',
      name: 'Yathish Shettigar',
    },
    keywords: project.technologies.join(', '),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };
}
