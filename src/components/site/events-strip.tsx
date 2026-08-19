import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { SchoolEvent } from "@/types/content";

export function EventsStrip({ events }: { events: SchoolEvent[] }) {
  if (events.length === 0) return null;
  const shown = events.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Mark Your Calendar
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
            Upcoming Events
          </h2>
        </div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
        >
          View All Events <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {shown.map((e) => {
          const date = new Date(e.event_date + "T00:00:00");
          return (
            <div
              key={e.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 bg-navy-900 px-6 py-5">
                <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-white/10 py-2 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-gold-400">
                    {date.toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                  <span className="text-xl font-extrabold leading-none">{date.getDate()}</span>
                </div>
                <h3 className="font-bold text-white">{e.title}</h3>
              </div>
              <div className="p-6">
                {e.description && (
                  <p className="text-sm leading-relaxed text-slate-600">{e.description}</p>
                )}
                <div className="mt-4 flex flex-col gap-2 text-xs text-slate-500">
                  {e.event_time && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold-600" /> {e.event_time}
                    </span>
                  )}
                  {e.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold-600" /> {e.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
