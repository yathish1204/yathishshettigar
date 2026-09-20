import { getEducation } from '@/services/education';
import { AdminEducationManager } from '@/components/admin/AdminEducationManager';

export const revalidate = 0; // Admin data should always be dynamic

export default async function AdminEducationPage() {
  const education = await getEducation();

  return <AdminEducationManager initialEducation={education} />;
}
