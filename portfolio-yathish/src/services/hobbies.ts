import { connectToDatabase } from '@/lib/mongodb';
import { HobbyModel } from '@/models/Hobby';
import { Hobby } from '@/types';

export const DEFAULT_HOBBIES: Hobby[] = [
  { _id: '1', name: 'Open-Source UI Libraries', description: 'Experimenting with zero-runtime CSS primitives, WCAG keyboard traps, and micro-interactions.', order: 1, status: 'published' },
  { _id: '2', name: 'UI Motion & Canvas Visualizers', description: 'Crafting fluid GSAP timeline sequences and WebGL shaders for creative portfolio site experiences.', order: 2, status: 'published' },
  { _id: '3', name: 'Generative AI & Data Pipelines', description: 'Building autonomous AI coding subagents and structured data extraction pipelines.', order: 3, status: 'published' },
];

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

export async function getHobbies(): Promise<Hobby[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_HOBBIES;

    const docs = await HobbyModel.find({ status: 'published' }).sort({ order: 1, name: 1 }).lean();
    if (!docs || docs.length === 0) return DEFAULT_HOBBIES;
    return docs.map(sanitizeHobbyDoc);
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    return DEFAULT_HOBBIES;
  }
}

export async function getAllHobbiesForAdmin(): Promise<Hobby[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_HOBBIES;

  const docs = await HobbyModel.find().sort({ order: 1, name: 1 }).lean();
  return docs.map(sanitizeHobbyDoc);
}

export async function getHobbyById(id: string): Promise<Hobby | null> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_HOBBIES.find((h) => h._id === id) || null;

  const doc = await HobbyModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeHobbyDoc(doc);
}

export async function createHobby(data: Omit<Hobby, '_id'>): Promise<{ success: boolean; hobby?: Hobby; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const createdDoc = await HobbyModel.create(data);
  return { success: true, hobby: sanitizeHobbyDoc(createdDoc.toObject()) };
}

export async function updateHobby(id: string, data: Partial<Hobby>): Promise<{ success: boolean; hobby?: Hobby; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const updatedDoc = await HobbyModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Hobby record not found' };

  return { success: true, hobby: sanitizeHobbyDoc(updatedDoc) };
}

export async function deleteHobby(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  const deleted = await HobbyModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Hobby record not found' };

  return { success: true };
}
