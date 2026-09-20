import { getAllCertificationsForAdmin } from '@/services/certifications';
import { AdminCertificationsManager } from '@/components/admin/AdminCertificationsManager';

export const revalidate = 0; // Admin data should always be dynamic

export default async function AdminCertificationsPage() {
  const certifications = await getAllCertificationsForAdmin();

  return <AdminCertificationsManager initialCertifications={certifications} />;
}
