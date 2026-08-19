"use client";

import { useTransition } from "react";
import { updateRow, deleteRow } from "@/lib/admin-actions";
import { Trash2, Mail, MailOpen } from "lucide-react";

type Msg = {
  id: string;
  created_at: string;
  is_read: boolean;
  [key: string]: unknown;
};

export function MessagesList({
  table,
  rows,
  fields,
}: {
  table: "contact_messages" | "admission_enquiries";
  rows: Msg[];
  fields: { key: string; label: string }[];
}) {
  const [, startTransition] = useTransition();

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-400">
        No messages yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className={`rounded-2xl border p-5 shadow-sm ${
            row.is_read ? "border-slate-200 bg-white" : "border-gold-400/50 bg-gold-50/40"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="grid flex-1 gap-1 sm:grid-cols-2">
              {fields.map((f) => (
                <p key={f.key} className="text-sm">
                  <span className="font-semibold text-navy-950">{f.label}: </span>
                  <span className="text-slate-600">{String(row[f.key] ?? "—")}</span>
                </p>
              ))}
              <p className="text-xs text-slate-400 sm:col-span-2">
                {new Date(row.created_at).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                title={row.is_read ? "Mark as unread" : "Mark as read"}
                onClick={() =>
                  startTransition(() =>
                    updateRow(table, row.id, { is_read: !row.is_read }, "/admin/messages")
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                {row.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              </button>
              <button
                title="Delete"
                onClick={() => {
                  if (confirm("Delete this message?")) {
                    startTransition(() => deleteRow(table, row.id, "/admin/messages"));
                  }
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
