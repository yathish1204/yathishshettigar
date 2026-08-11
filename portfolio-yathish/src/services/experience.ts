import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { ExperienceModel } from '@/models/Experience';
import { Experience } from '@/types';

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    company: 'Enterprise Product Studio',
    role: 'Senior UX Engineer & Frontend Architect',
    employmentType: 'Full-time',
    location: 'Bengaluru, India (Hybrid)',
    startDate: '2023-01',
    current: true,
    isLatestEmployer: true,
    summary:
      'Lead frontend architecture and UX design systems across multi-product SaaS suites, partnering closely with product and engineering executives.',
    responsibilities: [
      'Architected Next.js App Router design system deployed across 4 major web platforms.',
      'Established WCAG 2.1 AA accessibility guidelines and automated Playwright test pipelines.',
      'Mentored 8 mid/junior frontend developers in TypeScript best practices, performance, and accessibility.',
    ],
    achievements: [
      'Reduced design-to-production iteration time by 45% using automated token pipelines.',
      'Improved Core Web Vitals (LCP < 1.8s, CLS < 0.05) across all client touchpoints.',
    ],
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Mongoose', 'Playwright'],
    order: 1,
    status: 'published',
  },
];

let cachedExp: Experience[] | null = null;
let lastExpFetch = 0;
const CACHE_TTL = 3600000;

function sanitizeExpDoc(doc: any): Experience {
  return {
    _id: doc._id.toString(),
    company: doc.company,
    role: doc.role,
    employmentType: doc.employmentType,
    location: doc.location,
    startDate: doc.startDate,
    endDate: doc.endDate,
    current: doc.current,
    isLatestEmployer: !!doc.isLatestEmployer,
    summary: doc.summary,
    responsibilities: doc.responsibilities || [],
    achievements: doc.achievements || [],
    technologies: doc.technologies || [],
    order: doc.order,
    status: doc.status,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

async function ensureSeedExperiences() {
  const count = await ExperienceModel.countDocuments();
  if (count === 0) {
    await ExperienceModel.insertMany(DEFAULT_EXPERIENCES);
  }
}

export const getExperiences = cache(async function getExperiences(): Promise<Experience[]> {
  const now = Date.now();
  if (cachedExp && now - lastExpFetch < CACHE_TTL) {
    return cachedExp;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedExp || DEFAULT_EXPERIENCES;

    const docs = await ExperienceModel.find({ status: 'published' })
      .sort({ order: 1, startDate: -1 })
      .lean();

    if (docs.length === 0) {
      await ensureSeedExperiences();
      const reDocs = await ExperienceModel.find({ status: 'published' }).sort({ order: 1, startDate: -1 }).lean();
      const result = reDocs.map(sanitizeExpDoc);
      cachedExp = result;
      lastExpFetch = now;
      return result;
    }

    const result = docs.map(sanitizeExpDoc);
    cachedExp = result;
    lastExpFetch = now;
    return result;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return cachedExp || DEFAULT_EXPERIENCES;
  }
});

export async function getAllExperiencesForAdmin(): Promise<Experience[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_EXPERIENCES;

  await ensureSeedExperiences();

  const docs = await ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean();
  return docs.map(sanitizeExpDoc);
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  await ensureSeedExperiences();

  const doc = await ExperienceModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeExpDoc(doc);
}

export async function createExperience(data: Omit<Experience, '_id'>): Promise<{ success: boolean; experience?: Experience; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedExperiences();

  const createdDoc = await ExperienceModel.create(data);
  cachedExp = null;
  lastExpFetch = 0;
  return { success: true, experience: sanitizeExpDoc(createdDoc.toObject()) };
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<{ success: boolean; experience?: Experience; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedExperiences();

  const updatedDoc = await ExperienceModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Experience record not found' };

  cachedExp = null;
  lastExpFetch = 0;
  return { success: true, experience: sanitizeExpDoc(updatedDoc) };
}

export async function deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedExperiences();

  const deleted = await ExperienceModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Experience record not found' };

  cachedExp = null;
  lastExpFetch = 0;
  return { success: true };
}
