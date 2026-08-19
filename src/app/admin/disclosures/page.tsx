import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Document Title", type: "text", required: true },
  { name: "file_url", label: "Document URL", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function DisclosuresAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("disclosures").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Mandatory Disclosures</h1>
      <p className="mt-1 text-sm text-slate-500">Public disclosure documents shown on the Disclosures page.</p>
      <div className="mt-8">
        <ResourceManager
          table="disclosures"
          path="/admin/disclosures"
          fields={fields}
          rows={data ?? []}
          titleField="title"
        />
      </div>
    </div>
  );
}
