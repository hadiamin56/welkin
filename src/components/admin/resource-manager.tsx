"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, GripVertical } from "lucide-react";
import { createRow, deleteRow, reorderRows, updateRow, type FieldValue } from "@/lib/admin-actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "image" | "select";
  required?: boolean;
  imageFolder?: string;
  options?: { value: string; label: string }[];
};

type Row = Record<string, FieldValue>;

export function ResourceManager({
  table,
  path,
  fields,
  rows,
  titleField,
  imageField,
}: {
  table: string;
  path: string;
  fields: FieldConfig[];
  rows: Row[];
  titleField: string;
  imageField?: string;
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [orderedRows, setOrderedRows] = useState(rows);
  const [dragId, setDragId] = useState<string | null>(null);
  const [, startReorder] = useTransition();

  const rowsKey = rows.map((r) => r.id).join(",");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resync local order when the server list changes
    setOrderedRows(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsKey]);

  const canReorder = orderedRows.length > 1 && "sort_order" in (orderedRows[0] ?? {});

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const next = [...orderedRows];
    const fromIndex = next.findIndex((r) => r.id === dragId);
    const toIndex = next.findIndex((r) => r.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setOrderedRows(next);
    setDragId(null);
    startReorder(() => reorderRows(table, next.map((r) => String(r.id)), path));
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setAdding((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
        >
          {adding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {adding ? "Cancel" : "Add New"}
        </button>
      </div>

      {adding && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <RecordForm
            table={table}
            path={path}
            fields={fields}
            onDone={() => setAdding(false)}
          />
        </div>
      )}

      {canReorder && (
        <p className="mt-4 text-xs text-slate-400">
          Drag the handle to reorder — the new order saves automatically.
        </p>
      )}

      <div className="mt-2 space-y-3">
        {orderedRows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-400">
            Nothing here yet — click &ldquo;Add New&rdquo; to create the first entry.
          </p>
        )}

        {orderedRows.map((row) => (
          <div
            key={String(row.id)}
            draggable={canReorder && editingId !== row.id}
            onDragStart={() => setDragId(String(row.id))}
            onDragOver={(e) => canReorder && e.preventDefault()}
            onDrop={() => handleDrop(String(row.id))}
            className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition-opacity ${
              dragId === row.id ? "opacity-50" : ""
            }`}
          >
            {editingId === row.id ? (
              <div className="p-6">
                <RecordForm
                  table={table}
                  path={path}
                  fields={fields}
                  initial={row}
                  onDone={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <GripVertical
                  className={`h-4 w-4 shrink-0 ${
                    canReorder ? "cursor-grab text-slate-400 active:cursor-grabbing" : "text-slate-200"
                  }`}
                />
                {imageField && row[imageField] ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image src={String(row[imageField])} alt="" fill className="object-cover" />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-navy-950">
                    {String(row[titleField] ?? "Untitled")}
                  </p>
                  {"is_published" in row && (
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        row.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {row.is_published ? "Published" : "Hidden"}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setEditingId(String(row.id))}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <DeleteButton table={table} id={String(row.id)} path={path} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DeleteButton({ table, id, path }: { table: string; id: string; path: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this item? This can't be undone.")) {
          startTransition(() => deleteRow(table, id, path));
        }
      }}
      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function RecordForm({
  table,
  path,
  fields,
  initial,
  onDone,
}: {
  table: string;
  path: string;
  fields: FieldConfig[];
  initial?: Row;
  onDone: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    const values: Record<string, FieldValue> = {};
    for (const f of fields) {
      if (f.type === "boolean") {
        values[f.name] = formData.get(f.name) === "on";
      } else if (f.type === "number") {
        values[f.name] = Number(formData.get(f.name) ?? 0);
      } else {
        values[f.name] = String(formData.get(f.name) ?? "");
      }
    }

    startTransition(async () => {
      try {
        if (initial) {
          await updateRow(table, String(initial.id), values, path);
        } else {
          await createRow(table, values, path);
        }
        onDone();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              defaultValue={String(initial?.[f.name] ?? "")}
              required={f.required}
              rows={4}
              className="input"
            />
          ) : f.type === "boolean" ? (
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name={f.name}
                defaultChecked={initial ? Boolean(initial[f.name]) : true}
                className="h-4 w-4 rounded border-slate-300"
              />
              Published / visible on the site
            </label>
          ) : f.type === "image" ? (
            <ImageUploadField
              name={f.name}
              defaultValue={String(initial?.[f.name] ?? "")}
              folder={f.imageFolder ?? table}
            />
          ) : f.type === "select" ? (
            <select
              name={f.name}
              defaultValue={String(initial?.[f.name] ?? "")}
              required={f.required}
              className="input"
            >
              <option value="" disabled>
                Select an option
              </option>
              {f.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={f.type === "number" ? "number" : "text"}
              name={f.name}
              defaultValue={String(initial?.[f.name] ?? "")}
              required={f.required}
              className="input"
            />
          )}
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
        >
          {pending ? "Saving..." : initial ? "Save Changes" : "Create"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
