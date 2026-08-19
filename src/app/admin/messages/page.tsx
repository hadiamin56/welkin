import { createClient } from "@/lib/supabase/server";
import { MessagesList } from "@/components/admin/messages-list";

export default async function MessagesAdminPage() {
  const supabase = await createClient();
  const [{ data: contacts }, { data: enquiries }] = await Promise.all([
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    supabase.from("admission_enquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Messages</h1>
      <p className="mt-1 text-sm text-slate-500">
        Submissions from the Contact and Admissions forms on the public site.
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-navy-950">Admission Enquiries</h2>
        <div className="mt-4">
          <MessagesList
            table="admission_enquiries"
            rows={enquiries ?? []}
            fields={[
              { key: "student_name", label: "Student" },
              { key: "parent_name", label: "Parent" },
              { key: "class_applying", label: "Class" },
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email" },
              { key: "message", label: "Message" },
            ]}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-bold text-navy-950">Contact Messages</h2>
        <div className="mt-4">
          <MessagesList
            table="contact_messages"
            rows={contacts ?? []}
            fields={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "message", label: "Message" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
