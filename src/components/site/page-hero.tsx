export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero-radial py-20">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-300">{subtitle}</p>}
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full text-[var(--background)]"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,30 C360,70 1080,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}
