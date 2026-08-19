import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "class_name", label: "Class", type: "text" },
  { name: "session", label: "Session", type: "text" },
  { name: "file_url", label: "Result File URL", type: "text" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function ResultsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("results").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Results</h1>
      <p className="mt-1 text-sm text-slate-500">Examination results shown on the Results page.</p>
      <div className="mt-8">
        <ResourceManager
          table="results"
          path="/admin/results"
          fields={fields}
          rows={data ?? []}
          titleField="title"
        />
      </div>
    </div>
  );
}
