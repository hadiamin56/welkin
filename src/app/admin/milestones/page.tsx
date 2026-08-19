import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "year", label: "Year", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function MilestonesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("milestones").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Our Journey</h1>
      <p className="mt-1 text-sm text-slate-500">Milestones shown as a timeline on the About page.</p>
      <div className="mt-8">
        <ResourceManager
          table="milestones"
          path="/admin/milestones"
          fields={fields}
          rows={data ?? []}
          titleField="title"
        />
      </div>
    </div>
  );
}
