import { getProfile } from "@/services/profile";
import AdminProfileManager from "@/components/admin/AdminProfileManager";

export const revalidate = 0;

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return <AdminProfileManager initialProfile={profile} />;
}
