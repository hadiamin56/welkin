import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "batch", label: "Batch / Year", type: "text" },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "alumni" },
  { name: "message", label: "Message", type: "textarea" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function AlumniAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("alumni").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Alumni</h1>
      <p className="mt-1 text-sm text-slate-500">Alumni entries shown on the Alumni page.</p>
      <div className="mt-8">
        <ResourceManager
          table="alumni"
          path="/admin/alumni"
          fields={fields}
          rows={data ?? []}
          titleField="name"
          imageField="photo_url"
        />
      </div>
    </div>
  );
}
