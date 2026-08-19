"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "@/lib/admin-actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { SiteSettings } from "@/types/content";

const FIELDS: { name: keyof SiteSettings; label: string; type: "text" | "textarea" | "image" }[] = [
  { name: "school_name", label: "School Name", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "logo_url", label: "Logo", type: "image" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "facebook_url", label: "Facebook URL", type: "text" },
  { name: "linkedin_url", label: "LinkedIn URL", type: "text" },
  { name: "twitter_url", label: "Twitter URL", type: "text" },
  { name: "hero_heading", label: "Homepage Hero Heading", type: "text" },
  { name: "hero_subheading", label: "Homepage Hero Subheading", type: "textarea" },
  { name: "chairman_message_heading", label: "Chairman Message — Heading", type: "text" },
  { name: "chairman_message_body", label: "Chairman Message — Body", type: "textarea" },
  { name: "chairman_photo_url", label: "Chairman Photo", type: "image" },
  { name: "about_why_welkin", label: "About — Why SRM Welkin?", type: "textarea" },
  { name: "about_team", label: "About — Our Team", type: "textarea" },
  { name: "about_accreditation", label: "About — Accreditation", type: "textarea" },
  { name: "admissions_heading", label: "Admissions — Heading", type: "text" },
  { name: "admissions_body", label: "Admissions — Body", type: "textarea" },
];

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    const values: Record<string, string> = {};
    for (const f of FIELDS) values[f.name] = String(formData.get(f.name) ?? "");

    startTransition(async () => {
      try {
        await updateSettings(values, "/admin/settings");
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-6">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea name={f.name} defaultValue={settings[f.name]} rows={3} className="input" />
          ) : f.type === "image" ? (
            <ImageUploadField name={f.name} defaultValue={settings[f.name]} folder="settings" />
          ) : (
            <input name={f.name} defaultValue={settings[f.name]} className="input" />
          )}
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="sticky bottom-0 flex items-center gap-4 border-t border-slate-200 bg-white/90 py-4 backdrop-blur">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Settings"}
        </button>
        {saved && <span className="text-sm font-medium text-emerald-600">Saved!</span>}
      </div>
    </form>
  );
}
