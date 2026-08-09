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
  },
  {
    name: 'Meta Senior Frontend Developer Specialization',
    issuer: 'Meta',
    issueDate: '2024-03',
    credentialUrl: 'https://coursera.org/verify/meta-frontend',
    featured: true,
    order: 2,
    status: 'published',
  },
  {
    name: 'UX Design Professional Certificate',
    issuer: 'Google',
    issueDate: '2023-11',
    credentialUrl: 'https://coursera.org/verify/google-ux-design',
    featured: false,
    order: 3,
    status: 'published',
  },
];

let cachedCerts: Certification[] | null = null;
let lastCertFetch = 0;
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

export async function getCertifications(): Promise<Certification[]> {
  const now = Date.now();
  if (cachedCerts && now - lastCertFetch < CACHE_TTL) {
    return cachedCerts;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedCerts || DEFAULT_CERTIFICATIONS;

    await ensureSeedCertifications();

    const docs = await CertificationModel.find({ status: 'published' }).sort({ order: 1, issueDate: -1 }).lean();
    const result = docs.map(sanitizeCertDoc);
    cachedCerts = result;
    lastCertFetch = now;
    return result;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return cachedCerts || DEFAULT_CERTIFICATIONS;
  }
}

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
  cachedCerts = null;
  lastCertFetch = 0;
  return { success: true, certification: sanitizeCertDoc(createdDoc.toObject()) };
}

export async function updateCertification(id: string, data: Partial<Certification>): Promise<{ success: boolean; certification?: Certification; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedCertifications();

  const updatedDoc = await CertificationModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Certification not found' };

  cachedCerts = null;
  lastCertFetch = 0;
  return { success: true, certification: sanitizeCertDoc(updatedDoc) };
}

export async function deleteCertification(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedCertifications();

  const deleted = await CertificationModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Certification not found' };

  cachedCerts = null;
  lastCertFetch = 0;
  return { success: true };
}
