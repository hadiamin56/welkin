"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/types/content";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          What Our Community Says
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Voices of Welkin
        </h2>

        <div className="relative mt-12 min-h-[220px]">
          <Quote className="mx-auto h-9 w-9 text-gold-400/60" />
          <p key={current.id} className="animate-fade-up mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-navy-900 ring-2 ring-gold-400/50">
              {current.photo_url ? (
                <Image src={current.photo_url} alt={current.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gold-400">
                  {current.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-navy-950">{current.name}</p>
              <p className="text-xs text-gold-600">{current.role}</p>
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-navy-900 transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-500" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-navy-900 transition-colors hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
