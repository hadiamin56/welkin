import { BookOpen, Users, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { StatCounters } from "@/components/site/stat-counters";
import { getSiteSettings, getStatCounters } from "@/lib/queries";

export const metadata = { title: "About Us — SRM Welkin" };

export default async function AboutPage() {
  const [settings, counters] = await Promise.all([getSiteSettings(), getStatCounters()]);

  const cards = [
    { icon: BookOpen, title: "Why SRM Welkin?", body: settings.about_why_welkin },
    { icon: Users, title: "Our Team", body: settings.about_team },
    { icon: ShieldCheck, title: "Accreditation", body: settings.about_accreditation },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About SRM Welkin"
        subtitle="Higher Secondary School, Sopore — a legacy of knowledge, growth and character."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6">
          {cards.map(({ icon: Icon, title, body }) =>
            body ? (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-navy-950">{title}</h2>
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ) : null
          )}
        </div>
      </section>

      <StatCounters counters={counters} />
    </>
  );
}
