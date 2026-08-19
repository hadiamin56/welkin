"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
      <AdminNav />
      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
}
