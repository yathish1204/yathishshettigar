import { getAllExperiencesForAdmin } from '@/services/experience';
import { AdminExperienceManager } from '@/components/admin/AdminExperienceManager';

export const revalidate = 0; // Admin data should always be dynamic

export default async function AdminExperiencePage() {
  const experiences = await getAllExperiencesForAdmin();

  return <AdminExperienceManager initialExperiences={experiences} />;
}
