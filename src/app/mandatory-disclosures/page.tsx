import { PageHero } from "@/components/site/page-hero";
import { getDisclosures } from "@/lib/queries";
import { FileText } from "lucide-react";

export const metadata = { title: "Mandatory Public Disclosures — SRM Welkin" };

export default async function DisclosuresPage() {
  const disclosures = await getDisclosures();

  return (
    <>
      <PageHero eyebrow="Transparency" title="Mandatory Public Disclosures" />

      <section className="mx-auto max-w-4xl px-6 py-20">
        {disclosures.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <FileText className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">Documents will appear here once the admin uploads them.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {disclosures.map((d) => (
              <a
                key={d.id}
                href={d.file_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50"
              >
                <FileText className="h-5 w-5 shrink-0 text-navy-700" />
                <span className="text-sm font-medium text-navy-950">{d.title}</span>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
