import { createClient } from "@/lib/supabase/server";
import { ResourceManager, type FieldConfig } from "@/components/admin/resource-manager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "event_date", label: "Date (YYYY-MM-DD)", type: "text", required: true },
  { name: "event_time", label: "Time", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "is_published", label: "Status", type: "boolean" },
];

export default async function EventsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("event_date");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Events Calendar</h1>
      <p className="mt-1 text-sm text-slate-500">Upcoming events shown on the homepage and Events page.</p>
      <div className="mt-8">
        <ResourceManager
          table="events"
          path="/admin/events"
          fields={fields}
          rows={data ?? []}
          titleField="title"
        />
      </div>
    </div>
  );
}
