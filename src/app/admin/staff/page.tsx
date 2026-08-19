import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text" },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "staff" },
  { name: "bio", label: "Short Bio", type: "textarea" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function StaffAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("staff_members").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Staff Members</h1>
      <p className="mt-1 text-sm text-slate-500">The staff leaderboard shown on the homepage.</p>
      <div className="mt-8">
        <ResourceManager
          table="staff_members"
          path="/admin/staff"
          fields={fields}
          rows={data ?? []}
          titleField="name"
          imageField="photo_url"
        />
      </div>
    </div>
  );
}
