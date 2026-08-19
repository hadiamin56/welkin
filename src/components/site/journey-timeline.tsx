import type { Milestone } from "@/types/content";

export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Our Story, Year by Year
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">Our Journey</h2>
        </div>

        <div className="relative mt-16 space-y-8">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200" />
          {milestones.map((m) => (
            <div key={m.id} className="relative flex gap-6">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-gold-400 ring-4 ring-slate-50">
                {m.year}
              </span>
              <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-navy-950">{m.title}</h3>
                {m.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
