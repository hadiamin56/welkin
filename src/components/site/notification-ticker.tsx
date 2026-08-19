import Link from "next/link";
import { Megaphone } from "lucide-react";
import type { Notification } from "@/types/content";

export function NotificationTicker({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) return null;
  const items = [...notifications, ...notifications];

  return (
    <div className="border-b border-gold-500/30 bg-navy-900">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
          <Megaphone className="h-3.5 w-3.5" /> Notice
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
            {items.map((n, i) => (
              <Link
                key={`${n.id}-${i}`}
                href="/notifications"
                className="text-sm text-slate-200 transition-colors hover:text-gold-400"
              >
                {n.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
