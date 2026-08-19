"use client";

import { useEffect, useRef, useState } from "react";
import type { StatCounter } from "@/types/content";

function Counter({ end, suffix, duration = 1800 }: { end: number; suffix: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.round(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatCounters({ counters }: { counters: StatCounter[] }) {
  if (counters.length === 0) return null;

  return (
    <section className="relative bg-navy-950 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {counters.map((c) => (
          <div key={c.id} className="text-center">
            <div className="text-3xl font-extrabold text-gold-400 sm:text-4xl">
              <Counter end={c.end_value} suffix={c.suffix} />
            </div>
            <p className="mt-2 text-sm text-slate-300">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
