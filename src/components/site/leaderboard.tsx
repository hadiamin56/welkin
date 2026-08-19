import Image from "next/image";
import { Crown, Medal, GraduationCap } from "lucide-react";

export type LeaderboardEntry = {
  id: string;
  name: string;
  subtitle: string;
  photoUrl: string;
  meta?: string;
};

const RANK_STYLES = [
  {
    ring: "ring-gold-400",
    badge: "bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950",
    glow: "shadow-[0_0_0_1px_rgba(242,193,78,0.4),0_20px_45px_-15px_rgba(242,193,78,0.55)]",
    icon: Crown,
  },
  {
    ring: "ring-slate-300",
    badge: "bg-gradient-to-br from-slate-200 to-slate-400 text-navy-950",
    glow: "shadow-[0_16px_35px_-18px_rgba(15,23,42,0.4)]",
    icon: Medal,
  },
  {
    ring: "ring-amber-600/50",
    badge: "bg-gradient-to-br from-amber-500 to-amber-700 text-white",
    glow: "shadow-[0_16px_35px_-18px_rgba(15,23,42,0.4)]",
    icon: Medal,
  },
];

export function Leaderboard({
  eyebrow,
  title,
  entries,
  variant = "dark",
}: {
  eyebrow: string;
  title: string;
  entries: LeaderboardEntry[];
  variant?: "dark" | "light";
}) {
  if (entries.length === 0) return null;

  const isDark = variant === "dark";

  return (
    <section className={isDark ? "relative overflow-hidden bg-navy-950 py-20" : "bg-slate-50 py-20"}>
      {isDark && (
        <>
          <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-navy-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            {eyebrow}
          </span>
          <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${isDark ? "text-white" : "text-navy-950"}`}>
            {title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.slice(0, 8).map((entry, i) => {
            const rank = RANK_STYLES[i];
            const Icon = rank?.icon ?? GraduationCap;

            return (
              <div
                key={entry.id}
                className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-transform hover:-translate-y-1.5 ${
                  isDark ? "bg-white/[0.04] ring-1 ring-white/10 backdrop-blur" : "bg-white ring-1 ring-slate-200"
                } ${rank ? rank.glow : "shadow-sm"}`}
              >
                <div className="relative mx-auto h-20 w-20">
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-full ring-4 ${
                      rank ? rank.ring : isDark ? "ring-white/15" : "ring-slate-200"
                    } bg-navy-800`}
                  >
                    {entry.photoUrl ? (
                      <Image src={entry.photoUrl} alt={entry.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gold-400">
                        {entry.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>
                  {rank && (
                    <span
                      className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${rank.badge} ring-2 ${
                        isDark ? "ring-navy-950" : "ring-white"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {!rank && (
                    <span
                      className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ring-2 ${
                        isDark ? "bg-white/10 text-slate-200 ring-navy-950" : "bg-navy-900 text-white ring-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>

                <h3 className={`mt-4 font-bold ${isDark ? "text-white" : "text-navy-950"}`}>{entry.name}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gold-500">
                  {entry.subtitle}
                </p>
                {entry.meta && (
                  <p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {entry.meta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
