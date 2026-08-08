import { connectToDatabase } from '@/lib/mongodb';
import { SkillModel } from '@/models/Skill';
import { Skill } from '@/types';

export const DEFAULT_SKILLS: Skill[] = [
  // UX / Product Design
  { _id: '1', name: 'User Research & Personas', category: 'UX / Product Design', yearsOfExperience: 5, order: 1, status: 'published' },
  { _id: '2', name: 'Information Architecture', category: 'UX / Product Design', yearsOfExperience: 5, order: 2, status: 'published' },
  { _id: '3', name: 'Wireframing & Prototyping', category: 'UX / Product Design', yearsOfExperience: 6, order: 3, status: 'published' },
  { _id: '4', name: 'Design Systems & Tokens', category: 'UX / Product Design', yearsOfExperience: 5, order: 4, status: 'published' },
  { _id: '5', name: 'Figma & Design Tools', category: 'UX / Product Design', yearsOfExperience: 6, order: 5, status: 'published' },

  // Frontend
  { _id: '6', name: 'React 19 / 18', category: 'Frontend', yearsOfExperience: 6, order: 6, status: 'published' },
  { _id: '7', name: 'Next.js (App Router)', category: 'Frontend', yearsOfExperience: 4, order: 7, status: 'published' },
  { _id: '8', name: 'TypeScript (Strict)', category: 'Frontend', yearsOfExperience: 5, order: 8, status: 'published' },
  { _id: '9', name: 'Tailwind CSS v4 / v3', category: 'Frontend', yearsOfExperience: 4, order: 9, status: 'published' },
  { _id: '10', name: 'HTML5 & Semantic Structure', category: 'Frontend', yearsOfExperience: 7, order: 10, status: 'published' },
  { _id: '11', name: 'Web Accessibility (WCAG 2.1 AA)', category: 'Frontend', yearsOfExperience: 5, order: 11, status: 'published' },

  // Backend & Database
  { _id: '12', name: 'Next.js Server Actions & API', category: 'Backend', yearsOfExperience: 4, order: 12, status: 'published' },
  { _id: '13', name: 'MongoDB & Mongoose', category: 'Database', yearsOfExperience: 4, order: 13, status: 'published' },
  { _id: '14', name: 'Zod Validation Schema', category: 'Backend', yearsOfExperience: 3, order: 14, status: 'published' },

  // Tools & Testing
  { _id: '15', name: 'Playwright E2E Testing', category: 'Tools', yearsOfExperience: 3, order: 15, status: 'published' },
  { _id: '16', name: 'Git & Version Control', category: 'Tools', yearsOfExperience: 7, order: 16, status: 'published' },
  { _id: '17', name: 'ESLint & Code Standards', category: 'Tools', yearsOfExperience: 6, order: 17, status: 'published' },

  // Motion / Interaction
  { _id: '18', name: 'GSAP & ScrollTrigger', category: 'Motion / Interaction', yearsOfExperience: 3, order: 18, status: 'published' },
  { _id: '19', name: 'Framer Motion', category: 'Motion / Interaction', yearsOfExperience: 4, order: 19, status: 'published' },
  { _id: '20', name: 'Lenis Smooth Scroll', category: 'Motion / Interaction', yearsOfExperience: 2, order: 20, status: 'published' },
];

export async function getSkills(): Promise<Skill[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_SKILLS;

    const docs = await SkillModel.find({ status: 'published' })
      .sort({ order: 1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_SKILLS;

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      category: doc.category,
      proficiency: doc.proficiency,
      yearsOfExperience: doc.yearsOfExperience,
      icon: doc.icon,
      order: doc.order,
      status: doc.status,
    }));
  } catch (error) {
    console.error('Error fetching skills:', error);
    return DEFAULT_SKILLS;
  }
}
