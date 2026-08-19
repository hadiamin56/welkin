import { getSiteSettings } from "@/lib/queries";
import { SettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-950">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Controls the school name, logo, contact info and homepage copy across the whole site.
      </p>
      <div className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
