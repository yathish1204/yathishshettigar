import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { EducationModel } from '@/models/Education';
import { Education } from '@/types';

export const DEFAULT_EDUCATION: Education[] = [
  { _id: '1', institution: 'Visvesvaraya Technological University (VTU)', degree: 'Bachelor of Engineering (B.E.)', field: 'Computer Science & Engineering', startDate: '2019', endDate: '2023', description: 'Focused on algorithms, data structures, software engineering, database management systems, and interactive human-computer interfaces.', order: 1 },
];

let cachedEdu: Education[] | null = null;
let lastEduFetch = 0;
const CACHE_TTL = 30000;

function sanitizeEduDoc(doc: any): Education {
  return {
    _id: doc._id.toString(),
    institution: doc.institution,
    degree: doc.degree,
    field: doc.field,
    startDate: doc.startDate,
    endDate: doc.endDate,
    description: doc.description,
    order: doc.order,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

export const getEducation = cache(async function getEducation(): Promise<Education[]> {
  const now = Date.now();
  if (cachedEdu && now - lastEduFetch < CACHE_TTL) {
    return cachedEdu;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedEdu || DEFAULT_EDUCATION;

    const docs = await EducationModel.find().sort({ order: 1, startDate: -1 }).lean();
    if (!docs || docs.length === 0) return DEFAULT_EDUCATION;
    const result = docs.map(sanitizeEduDoc);
    cachedEdu = result;
    lastEduFetch = now;
    return result;
  } catch (error) {
    console.error('Error fetching education:', error);
    return cachedEdu || DEFAULT_EDUCATION;
  }
});

export async function getAllEducationForAdmin(): Promise<Education[]> {
  return getEducation();
}

export async function getEducationById(id: string): Promise<Education | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  const doc = await EducationModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeEduDoc(doc);
}

export async function createEducation(data: Omit<Education, '_id'>): Promise<{ success: boolean; education?: Education; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const createdDoc = await EducationModel.create(data);
  cachedEdu = null;
  lastEduFetch = 0;
  return { success: true, education: sanitizeEduDoc(createdDoc.toObject()) };
}

export async function updateEducation(id: string, data: Partial<Education>): Promise<{ success: boolean; education?: Education; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const updatedDoc = await EducationModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Education record not found' };

  cachedEdu = null;
  lastEduFetch = 0;
  return { success: true, education: sanitizeEduDoc(updatedDoc) };
}

export async function deleteEducation(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const deleted = await EducationModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Education record not found' };

  cachedEdu = null;
  lastEduFetch = 0;
  return { success: true };
}
