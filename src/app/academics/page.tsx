import { PageHero } from "@/components/site/page-hero";
import { BookOpen, FlaskConical, Palette, Trophy } from "lucide-react";

export const metadata = { title: "Academics — SRM Welkin" };

const PROGRAMS = [
  {
    icon: BookOpen,
    title: "CBSE Curriculum",
    body: "A structured, CBSE-accredited curriculum from kindergarten through senior secondary, delivered by qualified and experienced faculty.",
  },
  {
    icon: FlaskConical,
    title: "Science & Technology",
    body: "Well-equipped laboratories and a fully digitalised library give students hands-on exposure to science, technology and research.",
  },
  {
    icon: Palette,
    title: "Arts & Co-Curricular",
    body: "A multipurpose hall and dedicated activity spaces support music, art, drama and a wide range of co-curricular pursuits.",
  },
  {
    icon: Trophy,
    title: "Sports & Wellness",
    body: "Three vast playgrounds, a basketball court and a play zone keep sports and physical wellbeing at the heart of school life.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning at Welkin"
        title="Academics"
        subtitle="A balanced curriculum built for academic rigour and holistic growth."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {PROGRAMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
