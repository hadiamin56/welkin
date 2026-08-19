import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "label", label: "Label (shown in the nav bar)", type: "text", required: true },
  {
    name: "href",
    label: "Link (only used if this category has no sub-items — leave blank to make it a dropdown)",
    type: "text",
  },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function NavCategoriesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("nav_categories").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Navigation — Categories</h1>
      <p className="mt-1 text-sm text-slate-500">
        Top-level menu entries. A category with sub-items (managed on the{" "}
        <strong>Navigation — Items</strong> page) becomes a dropdown; a category with no
        sub-items becomes a plain link using the Link field below.
      </p>
      <div className="mt-8">
        <ResourceManager
          table="nav_categories"
          path="/admin/nav-categories"
          fields={fields}
          rows={data ?? []}
          titleField="label"
        />
      </div>
    </div>
  );
}
