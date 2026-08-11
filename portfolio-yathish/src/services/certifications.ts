import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { CertificationModel } from '@/models/Certification';
import { Certification } from '@/types';

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    name: 'Responsive Web Development',
    issuer: 'freecodecamp',
    issueDate: '2024-05',
    credentialUrl: 'https://freecodecamp.org/certification/responsive-web-design',
    featured: true,
    order: 1,
    status: 'published',
    categories: ['Development'],
  },
  {
    name: 'Meta Senior Frontend Developer Specialization',
    issuer: 'Meta',
    issueDate: '2024-03',
    credentialUrl: 'https://coursera.org/verify/meta-frontend',
    featured: true,
    order: 2,
    status: 'published',
    categories: ['Development'],
  },
  {
    name: 'UX Design Professional Certificate',
    issuer: 'Google',
    issueDate: '2023-11',
    credentialUrl: 'https://coursera.org/verify/google-ux-design',
    featured: false,
    order: 3,
    status: 'published',
    categories: ['UI'],
  },
];

let cachedCertsByCategory: Record<string, { certs: Certification[]; timestamp: number }> = {};
const CACHE_TTL = 30000;

function sanitizeCertDoc(doc: any): Certification {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    issuer: doc.issuer,
    issueDate: doc.issueDate,
    expiryDate: doc.expiryDate,
    credentialId: doc.credentialId,
    credentialUrl: doc.credentialUrl,
    certificateImage: doc.certificateImage,
    thumbnail: doc.thumbnail,
    featured: doc.featured,
    order: doc.order,
    status: doc.status,
    categories: doc.categories && doc.categories.length > 0
      ? doc.categories
      : doc.category ? [doc.category] : ['Others'],
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

async function ensureSeedCertifications() {
  const count = await CertificationModel.countDocuments();
  if (count === 0) {
    await CertificationModel.insertMany(DEFAULT_CERTIFICATIONS);
  }
}

export const getCertifications = cache(async function getCertifications(category?: string): Promise<Certification[]> {
  const now = Date.now();
  const cacheKey = category || 'All';
  const cached = cachedCertsByCategory[cacheKey];
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.certs;
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return (cached?.certs || DEFAULT_CERTIFICATIONS).filter(
        c => !category || category === 'All' || c.categories?.includes(category as any)
      );
    }

    const query: any = { status: 'published' };
    if (category && category !== 'All') {
      query.categories = category;
    }

    const docs = await CertificationModel.find(query).sort({ order: 1, issueDate: -1 }).lean();
    if (docs.length === 0 && (!category || category === 'All')) {
      await ensureSeedCertifications();
      const reDocs = await CertificationModel.find(query).sort({ order: 1, issueDate: -1 }).lean();
      const result = reDocs.map(sanitizeCertDoc);
      cachedCertsByCategory[cacheKey] = { certs: result, timestamp: now };
      return result;
    }

    const result = docs.map(sanitizeCertDoc);
    cachedCertsByCategory[cacheKey] = { certs: result, timestamp: now };
    return result;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return (cached?.certs || DEFAULT_CERTIFICATIONS).filter(
      c => !category || category === 'All' || c.categories?.includes(category as any)
    );
  }
});

export async function getAllCertificationsForAdmin(): Promise<Certification[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_CERTIFICATIONS;

  await ensureSeedCertifications();

  const docs = await CertificationModel.find().sort({ order: 1, issueDate: -1 }).lean();
  return docs.map(sanitizeCertDoc);
}

export async function getCertificationById(id: string): Promise<Certification | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  await ensureSeedCertifications();

  const doc = await CertificationModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeCertDoc(doc);
}

export async function createCertification(data: Omit<Certification, '_id'>): Promise<{ success: boolean; certification?: Certification; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedCertifications();

  const createdDoc = await CertificationModel.create(data);
  cachedCertsByCategory = {};
  return { success: true, certification: sanitizeCertDoc(createdDoc.toObject()) };
}

export async function updateCertification(id: string, data: Partial<Certification>): Promise<{ success: boolean; certification?: Certification; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedCertifications();

  const updatedDoc = await CertificationModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Certification not found' };

  cachedCertsByCategory = {};
  return { success: true, certification: sanitizeCertDoc(updatedDoc) };
}

export async function deleteCertification(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedCertifications();

  const deleted = await CertificationModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Certification not found' };

  cachedCertsByCategory = {};
  return { success: true };
}
