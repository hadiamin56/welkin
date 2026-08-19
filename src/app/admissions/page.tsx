import { Compass, MessageSquareHeart, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getSiteSettings } from "@/lib/queries";
import { AdmissionForm } from "./admission-form";

export const metadata = { title: "Admissions — SRM Welkin" };

export default async function AdmissionsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Join Us" title="Admissions" subtitle={settings.admissions_heading} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy-950">{settings.admissions_heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{settings.admissions_body}</p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Compass, title: "Engage", body: "Engage with like-minded individuals." },
                { icon: MessageSquareHeart, title: "Contribute", body: "Contribute to meaningful discussions." },
                { icon: Sparkles, title: "Initiate", body: "Be a part of initiatives for positive change." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-950">{title}</h3>
                    <p className="text-sm text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-navy-950">Admission Enquiry Form</h3>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the details below and our admissions team will get in touch.
            </p>
            <div className="mt-6">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
