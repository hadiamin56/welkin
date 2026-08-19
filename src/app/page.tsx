import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Trophy } from "lucide-react";
import { HeroSlider } from "@/components/site/hero-slider";
import { NotificationTicker } from "@/components/site/notification-ticker";
import { StatCounters } from "@/components/site/stat-counters";
import {
  getHeroSlides,
  getNotifications,
  getSiteSettings,
  getStaffMembers,
  getStatCounters,
} from "@/lib/queries";

export default async function HomePage() {
  const [settings, slides, notifications, counters, staff] = await Promise.all([
    getSiteSettings(),
    getHeroSlides(),
    getNotifications(6),
    getStatCounters(),
    getStaffMembers(),
  ]);

  return (
    <>
      <HeroSlider
        slides={slides}
        fallbackHeading={settings.hero_heading}
        fallbackSubheading={settings.hero_subheading}
      />
      <NotificationTicker notifications={notifications} />

      {/* Welcome / Chairman message */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-gold-400/20 to-navy-600/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <Image
                src={settings.chairman_photo_url}
                alt="Chairman, SRM Welkin"
                width={700}
                height={700}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              A Message From Leadership
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {settings.chairman_message_heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {settings.chairman_message_body}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Learn About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <StatCounters counters={counters} />

      {/* Why SRM Welkin */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
            A Foundation for Lifelong Success
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Academic Excellence",
              body: "CBSE-accredited curriculum delivered by 200+ qualified and experienced teachers.",
            },
            {
              icon: Users,
              title: "Holistic Growth",
              body: "Playgrounds, a basketball court, a botanical garden and a digitalised library nurture every talent.",
            },
            {
              icon: Trophy,
              title: "Proven Results",
              body: "A consistent track record of outstanding results in academics and co-curricular activities.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Staff leaderboard */}
      {staff.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Meet Our Team
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
                Staff Leaderboard
              </h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.slice(0, 8).map((member) => (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-2xl bg-white text-center shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] w-full bg-navy-100">
                    {member.photo_url && (
                      <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-950">{member.name}</h3>
                    <p className="text-sm text-gold-600">{member.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-950 py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Let&rsquo;s Build The Future, Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Admissions are open for the upcoming session. Reach out to our office or submit an
            enquiry online — our team will guide you through every step.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-lg transition-transform hover:scale-105"
            >
              Admission Enquiry
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
