import { getContactMessagesForAdmin } from "@/services/contact";
import AdminMessagesManager from "@/components/admin/AdminMessagesManager";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const { messages, unreadCount } = await getContactMessagesForAdmin();

  return (
    <AdminMessagesManager
      initialMessages={messages}
      initialUnreadCount={unreadCount}
    />
  );
}
