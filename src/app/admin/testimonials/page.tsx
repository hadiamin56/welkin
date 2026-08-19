import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role (e.g. Parent, Alumnus)", type: "text" },
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "photo_url", label: "Photo", type: "image", imageFolder: "testimonials" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Testimonials</h1>
      <p className="mt-1 text-sm text-slate-500">Parent and alumni quotes shown in the homepage carousel.</p>
      <div className="mt-8">
        <ResourceManager
          table="testimonials"
          path="/admin/testimonials"
          fields={fields}
          rows={data ?? []}
          titleField="name"
          imageField="photo_url"
        />
      </div>
    </div>
  );
}
