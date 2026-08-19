import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "body", label: "Details", type: "textarea" },
  { name: "attachment_url", label: "Attachment (PDF/image URL)", type: "text" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function NotificationsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Notifications</h1>
      <p className="mt-1 text-sm text-slate-500">The scrolling notice board on the homepage and Notifications page.</p>
      <div className="mt-8">
        <ResourceManager
          table="notifications"
          path="/admin/notifications"
          fields={fields}
          rows={data ?? []}
          titleField="title"
        />
      </div>
    </div>
  );
}
