import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title / Caption", type: "text" },
  { name: "image_url", label: "Image", type: "image", imageFolder: "achievements", required: true },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function AchievementsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("achievements").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Achievements</h1>
      <p className="mt-1 text-sm text-slate-500">Award and achievement photos shown on the Achievements page.</p>
      <div className="mt-8">
        <ResourceManager
          table="achievements"
          path="/admin/achievements"
          fields={fields}
          rows={data ?? []}
          titleField="title"
          imageField="image_url"
        />
      </div>
    </div>
  );
}
