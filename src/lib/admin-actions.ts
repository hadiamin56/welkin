"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FieldValue = string | number | boolean | null;

const ALLOWED_TABLES = [
  "site_settings",
  "hero_slides",
  "notifications",
  "stat_counters",
  "staff_members",
  "students",
  "achievements",
  "gallery_images",
  "results",
  "disclosures",
  "alumni",
  "contact_messages",
  "admission_enquiries",
  "events",
  "testimonials",
  "milestones",
  "nav_categories",
  "nav_items",
] as const;

export type AdminTable = (typeof ALLOWED_TABLES)[number];

function assertTable(table: string): asserts table is AdminTable {
  if (!ALLOWED_TABLES.includes(table as AdminTable)) {
    throw new Error(`Table "${table}" is not editable from the admin panel.`);
  }
}

export async function createRow(
  table: string,
  values: Record<string, FieldValue>,
  path: string
) {
  assertTable(table);
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(values);
  if (error) throw new Error(error.message);
  revalidatePath(path);
  revalidatePath("/");
}

export async function updateRow(
  table: string,
  id: string,
  values: Record<string, FieldValue>,
  path: string
) {
  assertTable(table);
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(path);
  revalidatePath("/");
}

export async function deleteRow(table: string, id: string, path: string) {
  assertTable(table);
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(path);
  revalidatePath("/");
}

export async function reorderRows(
  table: string,
  orderedIds: string[],
  path: string
) {
  assertTable(table);
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from(table).update({ sort_order: index + 1 }).eq("id", id)
    )
  );
  revalidatePath(path);
  revalidatePath("/");
}

export async function updateSettings(values: Record<string, string>, path: string) {
  const supabase = await createClient();
  const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath(path);
  revalidatePath("/", "layout");
}
