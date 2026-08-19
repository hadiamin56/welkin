import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "class_name", label: "Class", type: "text" },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "students" },
  { name: "achievement", label: "Achievement (e.g. School Topper)", type: "text" },
  { name: "score", label: "Score / Percentage", type: "number" },
  { name: "sort_order", label: "Rank / Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function StudentsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("students").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Student Leaderboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Top achievers shown on the homepage Student Leaderboard. Lower sort order ranks higher
        (1st, 2nd, 3rd get medal badges).
      </p>
      <div className="mt-8">
        <ResourceManager
          table="students"
          path="/admin/students"
          fields={fields}
          rows={data ?? []}
          titleField="name"
          imageField="photo_url"
        />
      </div>
    </div>
  );
}
