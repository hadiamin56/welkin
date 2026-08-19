import { AdminShell } from "@/components/admin/admin-shell";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!SUPABASE_CONFIGURED) {
    return <SupabaseSetupNotice />;
  }

  return <AdminShell>{children}</AdminShell>;
}
