import { connectToDatabase } from '@/lib/mongodb';
import { CertificationModel } from '@/models/Certification';
import { Certification } from '@/types';

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    _id: '1',
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera / Meta',
    issueDate: '2023',
    credentialId: 'META-FE-99823',
    credentialUrl: 'https://coursera.org/verify/meta-frontend',
    order: 1,
    status: 'published',
  },
  {
    _id: '2',
    name: 'Google UX Design Professional Certificate',
    issuer: 'Coursera / Google',
    issueDate: '2022',
    credentialId: 'GOOG-UX-77612',
    credentialUrl: 'https://coursera.org/verify/google-ux',
    order: 2,
    status: 'published',
  },
  {
    _id: '3',
    name: 'Web Accessibility (WCAG 2.1 AA) Certification',
    issuer: 'W3Cx / edX',
    issueDate: '2023',
    credentialId: 'W3C-WAI-44109',
    credentialUrl: 'https://edx.org/verify/w3c-accessibility',
    order: 3,
    status: 'published',
  },
];

export async function getCertifications(): Promise<Certification[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_CERTIFICATIONS;

    const docs = await CertificationModel.find({ status: 'published' })
      .sort({ order: 1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_CERTIFICATIONS;

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      issuer: doc.issuer,
      issueDate: doc.issueDate,
      expiryDate: doc.expiryDate,
      credentialId: doc.credentialId,
      credentialUrl: doc.credentialUrl,
      certificateImage: doc.certificateImage,
      order: doc.order,
      status: doc.status,
    }));
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return DEFAULT_CERTIFICATIONS;
  }
}
