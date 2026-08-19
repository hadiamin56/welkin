import { Phone, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getSiteSettings } from "@/lib/queries";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Contact — SRM Welkin" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const cards = [
    { icon: Phone, label: "Call", value: settings.phone, href: `tel:${settings.phone}`, color: "bg-blue-50 text-blue-600" },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}`, color: "bg-amber-50 text-amber-600" },
    { icon: MapPin, label: "Address", value: settings.address, href: undefined, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <>
      <PageHero eyebrow="Get In Touch" title="Contact Us" subtitle="Have a query? We'd love to hear from you." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-navy-950">Contact Now</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill the form below and get in touch with us.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {cards.map(({ icon: Icon, label, value, href, color }) => {
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</h3>
                    <p className="mt-1 font-medium text-navy-950">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href}>{content}</a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
