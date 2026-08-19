import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { getAlumni } from "@/lib/queries";
import { Users } from "lucide-react";

export const metadata = { title: "Alumni — SRM Welkin" };

export default async function AlumniPage() {
  const alumni = await getAlumni();

  return (
    <>
      <PageHero eyebrow="Our Legacy" title="Alumni" subtitle="Celebrating the journeys of those who walked these halls before." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        {alumni.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <Users className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">Alumni stories will appear here once the admin adds them.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-navy-100">
                  {a.photo_url && <Image src={a.photo_url} alt={a.name} fill className="object-cover" />}
                </div>
                <h3 className="mt-4 font-bold text-navy-950">{a.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{a.batch}</p>
                {a.message && <p className="mt-3 text-sm italic text-slate-600">&ldquo;{a.message}&rdquo;</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
