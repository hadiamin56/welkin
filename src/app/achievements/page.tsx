import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { getAchievements } from "@/lib/queries";
import { Trophy } from "lucide-react";

export const metadata = { title: "Achievements — SRM Welkin" };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <>
      <PageHero eyebrow="Recognition" title="Achievements" subtitle="Celebrating our students' and school's milestones." />

      <section className="mx-auto max-w-6xl px-6 py-20">
        {achievements.length === 0 ? (
          <EmptyState message="Achievements will appear here once the admin adds them." />
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {achievements.map((a) => (
              <div key={a.id} className="break-inside-avoid overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                <Image
                  src={a.image_url}
                  alt={a.title || "Achievement"}
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
                {a.title && (
                  <div className="bg-white p-4">
                    <p className="text-sm font-medium text-navy-950">{a.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
      <Trophy className="h-10 w-10 text-slate-300" />
      <p className="mt-4 text-sm text-slate-500">{message}</p>
    </div>
  );
}
