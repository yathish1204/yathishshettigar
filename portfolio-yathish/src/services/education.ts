import { connectToDatabase } from '@/lib/mongodb';
import { EducationModel } from '@/models/Education';
import { Education } from '@/types';

export const DEFAULT_EDUCATION: Education[] = [
  {
    _id: '1',
    institution: 'Visvesvaraya Technological University (VTU)',
    degree: 'Bachelor of Engineering (B.E.)',
    field: 'Computer Science & Engineering',
    startDate: '2015',
    endDate: '2019',
    description:
      'Focused on Software Engineering, Data Structures & Algorithms, Web Technologies, and Human-Computer Interaction.',
    order: 1,
  },
];

export async function getEducation(): Promise<Education[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_EDUCATION;

    const docs = await EducationModel.find()
      .sort({ order: 1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_EDUCATION;

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      institution: doc.institution,
      degree: doc.degree,
      field: doc.field,
      startDate: doc.startDate,
      endDate: doc.endDate,
      description: doc.description,
      order: doc.order,
    }));
  } catch (error) {
    console.error('Error fetching education:', error);
    return DEFAULT_EDUCATION;
  }
}
