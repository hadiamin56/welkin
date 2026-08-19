"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ToastItem = { id: string; title: string };

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export function NotificationBell() {
  const [unread, setUnread] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    const supabase = createClient();

    const channel = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const row = payload.new as { id: string; title: string; is_published: boolean };
          if (!row.is_published) return;
          setUnread((n) => n + 1);
          setToasts((t) => [...t, { id: row.id, title: row.title }]);
          setTimeout(() => {
            setToasts((t) => t.filter((item) => item.id !== row.id));
          }, 7000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <Link
        href="/notifications"
        onClick={() => setUnread(0)}
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-white/10 hover:text-gold-400"
      >
        <Bell className="h-4.5 w-4.5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-950">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Link>

      <div className="fixed right-4 top-4 z-[200] flex w-80 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-fade-up flex items-start gap-3 rounded-xl bg-navy-950 p-4 text-sm text-white shadow-2xl ring-1 ring-white/10"
          >
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">New Notice</p>
              <p className="mt-0.5 truncate text-slate-300">{t.title}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="text-slate-400 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
