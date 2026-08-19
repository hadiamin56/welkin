import { PageHero } from "@/components/site/page-hero";
import { getResults } from "@/lib/queries";
import { ClipboardList } from "lucide-react";

export const metadata = { title: "Results — SRM Welkin" };

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <>
      <PageHero eyebrow="Academics" title="Results" subtitle="Check the latest examination results." />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <ClipboardList className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">Results will appear here once the admin publishes them.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {results.map((r) => (
              <a
                key={r.id}
                href={r.file_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <ClipboardList className="h-5 w-5 shrink-0 text-navy-700" />
                  <div>
                    <p className="text-sm font-medium text-navy-950">{r.title}</p>
                    <p className="text-xs text-slate-400">
                      {r.class_name} {r.session && `· ${r.session}`}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
