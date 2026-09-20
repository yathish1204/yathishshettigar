import { getAllHobbiesForAdmin } from "@/services/hobbies";
import AdminHobbiesManager from "@/components/admin/AdminHobbiesManager";

export const revalidate = 0;

export default async function AdminHobbiesPage() {
  const initialHobbies = await getAllHobbiesForAdmin();
  return <AdminHobbiesManager initialHobbies={initialHobbies} />;
}
