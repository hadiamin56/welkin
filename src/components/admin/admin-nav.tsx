"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Settings,
  GalleryHorizontal,
  Bell,
  BarChart3,
  Users,
  Trophy,
  Image as ImageIcon,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: GalleryHorizontal },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/stats", label: "Stat Counters", icon: BarChart3 },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/results", label: "Results", icon: ClipboardList },
  { href: "/admin/disclosures", label: "Disclosures", icon: FileText },
  { href: "/admin/alumni", label: "Alumni", icon: GraduationCap },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <p className="text-sm font-bold text-navy-950">SRM Welkin</p>
        <p className="text-xs text-slate-400">Admin Dashboard</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-navy-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-slate-100 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ExternalLink className="h-4 w-4" /> View site
        </Link>
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/admin/login");
            router.refresh();
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
