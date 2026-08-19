import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

export default async function NavItemsAdminPage() {
  const supabase = await createClient();
  const [{ data: items }, { data: categories }] = await Promise.all([
    supabase.from("nav_items").select("*").order("sort_order"),
    supabase.from("nav_categories").select("id, label").order("sort_order"),
  ]);

  const categoryOptions = (categories ?? []).map((c) => ({ value: c.id, label: c.label }));
  const categoryLabelById = new Map((categories ?? []).map((c) => [c.id, c.label]));

  const fields: FieldConfig[] = [
    { name: "label", label: "Label", type: "text", required: true },
    { name: "href", label: "Link (e.g. /gallery)", type: "text", required: true },
    { name: "category_id", label: "Category", type: "select", options: categoryOptions, required: true },
    { name: "sort_order", label: "Sort Order (within its category)", type: "number" },
    { name: "is_published", label: "Status", type: "boolean" },
  ];

  const rowsWithDisplay = (items ?? []).map((item) => ({
    ...item,
    display_label: `${categoryLabelById.get(String(item.category_id)) ?? "Uncategorised"} → ${item.label}`,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Navigation — Items</h1>
      <p className="mt-1 text-sm text-slate-500">
        Sub-items shown inside a category&rsquo;s dropdown. Create categories first on the{" "}
        <strong>Navigation — Categories</strong> page.
      </p>
      {categoryOptions.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-400">
          No categories yet — add one on the Navigation — Categories page first.
        </p>
      ) : (
        <div className="mt-8">
          <ResourceManager
            table="nav_items"
            path="/admin/nav-items"
            fields={fields}
            rows={rowsWithDisplay}
            titleField="display_label"
          />
        </div>
      )}
    </div>
  );
}
