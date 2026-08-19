import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "caption", label: "Caption", type: "text" },
  { name: "image_url", label: "Image", type: "image", imageFolder: "gallery", required: true },
  { name: "category", label: "Category", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function GalleryAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_images").select("*").order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Gallery</h1>
      <p className="mt-1 text-sm text-slate-500">Campus life photos shown on the Gallery page.</p>
      <div className="mt-8">
        <ResourceManager
          table="gallery_images"
          path="/admin/gallery"
          fields={fields}
          rows={data ?? []}
          titleField="caption"
          imageField="image_url"
        />
      </div>
    </div>
  );
}
