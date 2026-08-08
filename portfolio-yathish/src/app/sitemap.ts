import { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/services/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yathish.dev';
  const projects = await getPublishedProjects();

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...projectUrls];
}
