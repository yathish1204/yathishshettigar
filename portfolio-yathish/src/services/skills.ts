import { connectToDatabase } from '@/lib/mongodb';
import { SkillModel } from '@/models/Skill';
import { Skill } from '@/types';

export const DEFAULT_SKILLS: Skill[] = [
  // 1. UX & Product Development
  { name: 'Figma', category: 'UX & Product Development', proficiency: 4, yearsOfExperience: 5, order: 1, status: 'published' },
  { name: 'Design Systems', category: 'UX & Product Development', proficiency: 4, yearsOfExperience: 5, order: 2, status: 'published' },
  { name: 'Wireframing & Prototyping', category: 'UX & Product Development', proficiency: 4, yearsOfExperience: 5, order: 3, status: 'published' },
  { name: 'User Research', category: 'UX & Product Development', proficiency: 3, yearsOfExperience: 4, order: 4, status: 'published' },
  { name: 'Accessibility (WCAG 2.1)', category: 'UX & Product Development', proficiency: 4, yearsOfExperience: 4, order: 5, status: 'published' },

  // 2. Front End Development
  { name: 'React 19', category: 'Front End Development', proficiency: 4, yearsOfExperience: 5, order: 6, status: 'published' },
  { name: 'Next.js 15', category: 'Front End Development', proficiency: 4, yearsOfExperience: 4, order: 7, status: 'published' },
  { name: 'TypeScript', category: 'Front End Development', proficiency: 4, yearsOfExperience: 5, order: 8, status: 'published' },
  { name: 'Tailwind CSS', category: 'Front End Development', proficiency: 4, yearsOfExperience: 5, order: 9, status: 'published' },
  { name: 'HTML5 / CSS3', category: 'Front End Development', proficiency: 4, yearsOfExperience: 6, order: 10, status: 'published' },
  { name: 'Redux / Zustand', category: 'Front End Development', proficiency: 3, yearsOfExperience: 4, order: 11, status: 'published' },
  { name: 'Framer Motion', category: 'Front End Development', proficiency: 3, yearsOfExperience: 3, order: 12, status: 'published' },
  { name: 'GSAP Animations', category: 'Front End Development', proficiency: 3, yearsOfExperience: 3, order: 13, status: 'published' },

  // 3. Tools & Technology
  { name: 'Node.js', category: 'Tools & Technology', proficiency: 3, yearsOfExperience: 4, order: 14, status: 'published' },
  { name: 'Express.js', category: 'Tools & Technology', proficiency: 3, yearsOfExperience: 4, order: 15, status: 'published' },
  { name: 'GraphQL & REST APIs', category: 'Tools & Technology', proficiency: 4, yearsOfExperience: 5, order: 16, status: 'published' },
  { name: 'MongoDB', category: 'Tools & Technology', proficiency: 3, yearsOfExperience: 4, order: 17, status: 'published' },
  { name: 'Git & GitHub', category: 'Tools & Technology', proficiency: 4, yearsOfExperience: 6, order: 18, status: 'published' },
  { name: 'Docker', category: 'Tools & Technology', proficiency: 2, yearsOfExperience: 2, order: 19, status: 'published' },
  { name: 'Storybook', category: 'Tools & Technology', proficiency: 4, yearsOfExperience: 4, order: 20, status: 'published' },
  { name: 'Playwright & E2E Testing', category: 'Tools & Technology', proficiency: 3, yearsOfExperience: 3, order: 21, status: 'published' },
];

let cachedSkills: Skill[] | null = null;
let lastSkillFetch = 0;
const CACHE_TTL = 30000;

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
  const now = Date.now();
  if (cachedSkills && now - lastSkillFetch < CACHE_TTL) {
    return cachedSkills;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedSkills || DEFAULT_SKILLS;

    await ensureSeedSkills();

    const docs = await SkillModel.find({ status: 'published' }).sort({ order: 1, name: 1 }).lean();
    const result = docs.map(sanitizeSkillDoc);
    cachedSkills = result;
    lastSkillFetch = now;
    return result;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return cachedSkills || DEFAULT_SKILLS;
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
  cachedSkills = null;
  lastSkillFetch = 0;
  return { success: true, skill: sanitizeSkillDoc(createdDoc.toObject()) };
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<{ success: boolean; skill?: Skill; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedSkills();

  const updatedDoc = await SkillModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Skill not found' };

  cachedSkills = null;
  lastSkillFetch = 0;
  return { success: true, skill: sanitizeSkillDoc(updatedDoc) };
}

export async function deleteSkill(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedSkills();

  const deleted = await SkillModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Skill not found' };

  cachedSkills = null;
  lastSkillFetch = 0;
  return { success: true };
}
