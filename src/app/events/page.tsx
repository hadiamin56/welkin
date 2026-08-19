import { PageHero } from "@/components/site/page-hero";
import { getEvents } from "@/lib/queries";
import { CalendarDays, Clock, MapPin, CalendarX } from "lucide-react";

export const metadata = { title: "Events — SRM Welkin" };

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero eyebrow="What's Happening" title="Events Calendar" subtitle="Upcoming events, meetings and celebrations at SRM Welkin." />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {events.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <CalendarX className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">No upcoming events published yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((e) => {
              const date = new Date(e.event_date + "T00:00:00");
              return (
                <div
                  key={e.id}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 py-3 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                      {date.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                    <span className="text-2xl font-extrabold leading-none">{date.getDate()}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy-950">{e.title}</h3>
                    {e.description && (
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{e.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-gold-600" />
                        {date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
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
        )}
      </section>
    </>
  );
}
