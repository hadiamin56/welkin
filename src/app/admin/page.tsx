import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Bell,
  BarChart3,
  Users,
  Medal,
  Trophy,
  Image as ImageIcon,
  Mail,
  Inbox,
} from "lucide-react";

const TABLES = [
  { table: "notifications", label: "Notifications", href: "/admin/notifications", icon: Bell },
  { table: "stat_counters", label: "Stat Counters", href: "/admin/stats", icon: BarChart3 },
  { table: "staff_members", label: "Teacher Leaderboard", href: "/admin/staff", icon: Users },
  { table: "students", label: "Student Leaderboard", href: "/admin/students", icon: Medal },
  { table: "achievements", label: "Achievements", href: "/admin/achievements", icon: Trophy },
  { table: "gallery_images", label: "Gallery Images", href: "/admin/gallery", icon: ImageIcon },
  { table: "contact_messages", label: "Contact Messages", href: "/admin/messages", icon: Mail },
  { table: "admission_enquiries", label: "Admission Enquiries", href: "/admin/messages", icon: Inbox },
];

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [counts, { data: contacts }, { data: enquiries }] = await Promise.all([
    Promise.all(
      TABLES.map(async (t) => {
        const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
        return count ?? 0;
      })
    ),
    supabase.from("contact_messages").select("id, name, created_at").order("created_at", { ascending: false }).limit(50),
    supabase.from("admission_enquiries").select("id, student_name, created_at").order("created_at", { ascending: false }).limit(50),
  ]);

  const activity = [
    ...(contacts ?? []).map((c) => ({ id: c.id, label: `${c.name} sent a contact message`, at: c.created_at })),
    ...(enquiries ?? []).map((e) => ({ id: e.id, label: `${e.student_name} submitted an admission enquiry`, at: e.created_at })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const dayCounts = days.map((d) => {
    const key = d.toISOString().slice(0, 10);
    const count =
      (contacts ?? []).filter((c) => c.created_at.slice(0, 10) === key).length +
      (enquiries ?? []).filter((e) => e.created_at.slice(0, 10) === key).length;
    return { label: d.toLocaleDateString("en-IN", { weekday: "short" }), count };
  });
  const maxCount = Math.max(1, ...dayCounts.map((d) => d.count));

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage every part of the SRM Welkin website from here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TABLES.map((t, i) => (
          <Link
            key={t.label}
            href={t.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
              <t.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-extrabold text-navy-950">{counts[i]}</p>
            <p className="text-sm text-slate-500">{t.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-navy-950">Form Submissions — Last 7 Days</h2>
          <div className="mt-6 flex h-32 items-end gap-3">
            {dayCounts.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-navy-900 to-navy-600"
                  style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count > 0 ? "6px" : "2px" }}
                  title={`${d.count} submissions`}
                />
                <span className="text-[10px] font-medium text-slate-400">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-navy-950">Recent Activity</h2>
          {activity.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">No form submissions yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 text-sm">
                  <span className="truncate text-slate-700">{a.label}</span>
                  <span className="shrink-0 text-xs text-slate-400">{timeAgo(a.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gold-400/30 bg-gold-50 p-6">
        <h2 className="font-bold text-navy-950">Quick Start</h2>
        <p className="mt-1 text-sm text-slate-600">
          Start with <strong>Site Settings</strong> to set the school name, logo, contact details
          and homepage copy. Then add hero slides, notifications, staff and gallery photos —
          every change reflects on the live site instantly.
        </p>
      </div>
    </div>
  );
}
