import { getAllSkillsForAdmin } from "@/services/skills";
import AdminSkillsManager from "@/components/admin/AdminSkillsManager";

export const revalidate = 0;

export default async function AdminSkillsPage() {
  const initialSkills = await getAllSkillsForAdmin();

  return <AdminSkillsManager initialSkills={initialSkills} />;
}
