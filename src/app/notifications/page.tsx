import { PageHero } from "@/components/site/page-hero";
import { getNotifications } from "@/lib/queries";
import { Bell, Paperclip } from "lucide-react";

export const metadata = { title: "Notifications — SRM Welkin" };

export default async function NotificationsPage() {
  const notifications = await getNotifications(100);

  return (
    <>
      <PageHero eyebrow="Notice Board" title="Notifications" subtitle="Stay up to date with the latest school announcements." />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <Bell className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">No notifications published yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-navy-950">{n.title}</h3>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(n.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {n.body && <p className="mt-2 text-sm leading-relaxed text-slate-600">{n.body}</p>}
                {n.attachment_url && (
                  <a
                    href={n.attachment_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-gold-600"
                  >
                    <Paperclip className="h-3.5 w-3.5" /> View attachment
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
