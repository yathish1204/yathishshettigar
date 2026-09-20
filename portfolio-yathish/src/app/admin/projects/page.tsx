import { getAllProjectsForAdmin } from "@/services/projects";
import AdminProjectsManager from "@/components/admin/AdminProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsListPage() {
  const initialProjects = await getAllProjectsForAdmin();

  return <AdminProjectsManager initialProjects={initialProjects} />;
}
