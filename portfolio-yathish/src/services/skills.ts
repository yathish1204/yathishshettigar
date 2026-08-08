import { connectToDatabase } from '@/lib/mongodb';
import { SkillModel } from '@/models/Skill';
import { Skill } from '@/types';

export const DEFAULT_SKILLS: Skill[] = [
  { name: 'UX / Product Design', category: 'UX / Product Design', yearsOfExperience: 5, order: 1, status: 'published' },
  { name: 'User Research & Testing', category: 'UX / Product Design', yearsOfExperience: 4, order: 2, status: 'published' },
  { name: 'Design Systems Architecture', category: 'UX / Product Design', yearsOfExperience: 4, order: 3, status: 'published' },
  { name: 'Next.js App Router', category: 'Frontend', yearsOfExperience: 4, order: 4, status: 'published' },
  { name: 'React 19 & Hooks', category: 'Frontend', yearsOfExperience: 5, order: 5, status: 'published' },
  { name: 'TypeScript (Strict)', category: 'Frontend', yearsOfExperience: 4, order: 6, status: 'published' },
  { name: 'Tailwind CSS v4', category: 'Frontend', yearsOfExperience: 4, order: 7, status: 'published' },
  { name: 'WCAG 2.1 AA Accessibility', category: 'Frontend', yearsOfExperience: 4, order: 8, status: 'published' },
  { name: 'Node.js Route Handlers', category: 'Backend', yearsOfExperience: 4, order: 9, status: 'published' },
  { name: 'Zod Schema Validation', category: 'Backend', yearsOfExperience: 3, order: 10, status: 'published' },
  { name: 'REST & GraphQL APIs', category: 'Backend', yearsOfExperience: 4, order: 11, status: 'published' },
  { name: 'MongoDB & Mongoose', category: 'Database', yearsOfExperience: 3, order: 12, status: 'published' },
  { name: 'Playwright E2E Testing', category: 'Tools', yearsOfExperience: 3, order: 13, status: 'published' },
  { name: 'Git & GitHub Actions', category: 'Tools', yearsOfExperience: 5, order: 14, status: 'published' },
  { name: 'GSAP & ScrollTrigger', category: 'Motion / Interaction', yearsOfExperience: 3, order: 15, status: 'published' },
  { name: 'Lenis Smooth Scroll', category: 'Motion / Interaction', yearsOfExperience: 2, order: 16, status: 'published' },
  { name: 'Framer Motion', category: 'Motion / Interaction', yearsOfExperience: 3, order: 17, status: 'published' },
];

function sanitizeSkillDoc(doc: any): Skill {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    category: doc.category,
    proficiency: doc.proficiency,
    yearsOfExperience: doc.yearsOfExperience,
    icon: doc.icon,
    order: doc.order,
    status: doc.status,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

async function ensureSeedSkills() {
  const count = await SkillModel.countDocuments();
  if (count === 0) {
    await SkillModel.insertMany(DEFAULT_SKILLS);
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_SKILLS;

    await ensureSeedSkills();

    const docs = await SkillModel.find({ status: 'published' }).sort({ order: 1, name: 1 }).lean();
    return docs.map(sanitizeSkillDoc);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return DEFAULT_SKILLS;
  }
}

export async function getAllSkillsForAdmin(): Promise<Skill[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_SKILLS;

  await ensureSeedSkills();

  const docs = await SkillModel.find().sort({ order: 1, name: 1 }).lean();
  return docs.map(sanitizeSkillDoc);
}

export async function getSkillById(id: string): Promise<Skill | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  await ensureSeedSkills();

  const doc = await SkillModel.findById(id).lean();
  if (!doc) return null;
  return sanitizeSkillDoc(doc);
}

export async function createSkill(data: Omit<Skill, '_id'>): Promise<{ success: boolean; skill?: Skill; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedSkills();

  const createdDoc = await SkillModel.create(data);
  return { success: true, skill: sanitizeSkillDoc(createdDoc.toObject()) };
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<{ success: boolean; skill?: Skill; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedSkills();

  const updatedDoc = await SkillModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Skill not found' };

  return { success: true, skill: sanitizeSkillDoc(updatedDoc) };
}

export async function deleteSkill(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedSkills();

  const deleted = await SkillModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Skill not found' };

  return { success: true };
}
