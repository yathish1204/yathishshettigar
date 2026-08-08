import { connectToDatabase } from '@/lib/mongodb';
import { HobbyModel } from '@/models/Hobby';
import { Hobby } from '@/types';

export const DEFAULT_HOBBIES: Hobby[] = [
  {
    _id: '1',
    name: 'Generative UI & Creative Coding',
    description: 'Experimenting with WebGL, canvas shaders, SVG micro-animations, and interactive generative art.',
    icon: 'Sparkles',
    order: 1,
    status: 'published',
  },
  {
    _id: '2',
    name: 'Open Source Accessibility Advocacy',
    description: 'Contributing to accessibility documentation and building WCAG color contrast checker scripts.',
    icon: 'HeartHandshake',
    order: 2,
    status: 'published',
  },
  {
    _id: '3',
    name: 'Typography & Layout Exploration',
    description: 'Studying modern typographic hierarchy, grid systems, print design history, and editorial layouts.',
    icon: 'Type',
    order: 3,
    status: 'published',
  },
];

export async function getHobbies(): Promise<Hobby[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_HOBBIES;

    const docs = await HobbyModel.find({ status: 'published' })
      .sort({ order: 1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_HOBBIES;

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      icon: doc.icon,
      image: doc.image,
      order: doc.order,
      status: doc.status,
    }));
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    return DEFAULT_HOBBIES;
  }
}
