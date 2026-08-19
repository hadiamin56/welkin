import { DatabaseZap } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-hero-radial px-6 py-16">
      <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
          <DatabaseZap className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-xl font-bold text-navy-950">Connect Supabase to enable the admin panel</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The admin dashboard needs a Supabase project for authentication and content storage.
        </p>
        <ol className="mt-6 space-y-2 text-left text-sm text-slate-600">
          <li>1. Create a free project at supabase.com.</li>
          <li>2. Run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">supabase/migrations/0001_init.sql</code> and{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">0002_seed.sql</code> in the SQL editor.</li>
          <li>3. Create an admin user under Authentication → Users.</li>
          <li>4. Copy your Project URL and anon key into <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">.env.local</code> (see{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">.env.local.example</code>).</li>
          <li>5. Restart the app and sign in at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/admin/login</code>.</li>
        </ol>
      </div>
    </div>
  );
}
