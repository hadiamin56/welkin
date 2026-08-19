import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Bell,
  BarChart3,
  Users,
  Trophy,
  Image as ImageIcon,
  Mail,
  Inbox,
} from "lucide-react";

const TABLES = [
  { table: "notifications", label: "Notifications", href: "/admin/notifications", icon: Bell },
  { table: "stat_counters", label: "Stat Counters", href: "/admin/stats", icon: BarChart3 },
  { table: "staff_members", label: "Staff Members", href: "/admin/staff", icon: Users },
  { table: "achievements", label: "Achievements", href: "/admin/achievements", icon: Trophy },
  { table: "gallery_images", label: "Gallery Images", href: "/admin/gallery", icon: ImageIcon },
  { table: "contact_messages", label: "Contact Messages", href: "/admin/messages", icon: Mail },
  { table: "admission_enquiries", label: "Admission Enquiries", href: "/admin/messages", icon: Inbox },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const counts = await Promise.all(
    TABLES.map(async (t) => {
      const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
      return count ?? 0;
    })
  );

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

      <div className="mt-10 rounded-2xl border border-gold-400/30 bg-gold-50 p-6">
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
