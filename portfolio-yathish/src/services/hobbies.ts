import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { HobbyModel } from '@/models/Hobby';
import { Hobby } from '@/types';

export const DEFAULT_HOBBIES: Hobby[] = [
  { name: 'Open-Source UI Libraries', description: 'Experimenting with zero-runtime CSS primitives, WCAG keyboard traps, and micro-interactions.', icon: '⚛️', order: 1, status: 'published' },
  { name: 'UX & Accessibility Research', description: 'Exploring screen reader patterns, high-contrast themes, and fluid typography systems.', icon: '🎨', order: 2, status: 'published' },
  { name: 'Generative AI & Tooling', description: 'Building autonomous coding assistants, prompt workflows, and AI-powered interfaces.', icon: '⚡', order: 3, status: 'published' },
  { name: 'Typography & Motion Design', description: 'Crafting responsive variable fonts, spring physics animations, and interactive prototypes.', icon: '✨', order: 4, status: 'published' },
];

let cachedHobbies: Hobby[] | null = null;
let lastHobbyFetch = 0;
const CACHE_TTL = 30000;

function sanitizeHobbyDoc(doc: any): Hobby {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    icon: doc.icon,
    image: doc.image,
    order: doc.order,
    status: doc.status,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

async function ensureSeedHobbies() {
  const count = await HobbyModel.countDocuments();
  if (count === 0) {
    await HobbyModel.insertMany(DEFAULT_HOBBIES);
  }
}

export const getHobbies = cache(async function getHobbies(): Promise<Hobby[]> {
  const now = Date.now();
  if (cachedHobbies && now - lastHobbyFetch < CACHE_TTL) {
    return cachedHobbies;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedHobbies || DEFAULT_HOBBIES;

    const docs = await HobbyModel.find({ status: 'published' }).sort({ order: 1, name: 1 }).lean();
    if (docs.length === 0) {
      await ensureSeedHobbies();
      const reDocs = await HobbyModel.find({ status: 'published' }).sort({ order: 1, name: 1 }).lean();
      const result = reDocs.map(sanitizeHobbyDoc);
      cachedHobbies = result;
      lastHobbyFetch = now;
      return result;
    }

    const result = docs.map(sanitizeHobbyDoc);
    cachedHobbies = result;
    lastHobbyFetch = now;
    return result;
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    return cachedHobbies || DEFAULT_HOBBIES;
  }
});

export async function getAllHobbiesForAdmin(): Promise<Hobby[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_HOBBIES;

  await ensureSeedHobbies();

  const docs = await HobbyModel.find().sort({ order: 1, name: 1 }).lean();
  return docs.map(sanitizeHobbyDoc);
}

export async function getHobbyById(id: string): Promise<Hobby | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  await ensureSeedHobbies();

  const doc = await HobbyModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeHobbyDoc(doc);
}

export async function createHobby(data: Omit<Hobby, '_id'>): Promise<{ success: boolean; hobby?: Hobby; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedHobbies();

  const createdDoc = await HobbyModel.create(data);
  cachedHobbies = null;
  lastHobbyFetch = 0;
  return { success: true, hobby: sanitizeHobbyDoc(createdDoc.toObject()) };
}

export async function updateHobby(id: string, data: Partial<Hobby>): Promise<{ success: boolean; hobby?: Hobby; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedHobbies();

  const updatedDoc = await HobbyModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Hobby record not found' };

  cachedHobbies = null;
  lastHobbyFetch = 0;
  return { success: true, hobby: sanitizeHobbyDoc(updatedDoc) };
}

export async function deleteHobby(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedHobbies();

  const deleted = await HobbyModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Hobby record not found' };

  cachedHobbies = null;
  lastHobbyFetch = 0;
  return { success: true };
}
