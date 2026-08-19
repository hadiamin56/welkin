import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "textarea" },
  { name: "image_url", label: "Background Image", type: "image", imageFolder: "hero" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function HeroSlidesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("hero_slides").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Hero Slides</h1>
      <p className="mt-1 text-sm text-slate-500">The rotating banner shown at the top of the homepage.</p>
      <div className="mt-8">
        <ResourceManager
          table="hero_slides"
          path="/admin/hero-slides"
          fields={fields}
          rows={data ?? []}
          titleField="title"
          imageField="image_url"
        />
      </div>
    </div>
  );
}
