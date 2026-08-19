import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "end_value", label: "Value", type: "number", required: true },
  { name: "suffix", label: "Suffix (e.g. +, %)", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number" },
];

export default async function StatsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("stat_counters").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Stat Counters</h1>
      <p className="mt-1 text-sm text-slate-500">The animated counters shown on the homepage and About page.</p>
      <div className="mt-8">
        <ResourceManager
          table="stat_counters"
          path="/admin/stats"
          fields={fields}
          rows={data ?? []}
          titleField="label"
        />
      </div>
    </div>
  );
}
