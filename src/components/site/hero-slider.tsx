"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { HeroSlide } from "@/types/content";

export function HeroSlider({
  slides,
  fallbackHeading,
  fallbackSubheading,
}: {
  slides: HeroSlide[];
  fallbackHeading: string;
  fallbackSubheading: string;
}) {
  const [index, setIndex] = useState(0);
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (!hasSlides) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [hasSlides, slides.length]);

  const heading = hasSlides ? slides[index].title : fallbackHeading;
  const subheading = hasSlides ? slides[index].subtitle : fallbackSubheading;
  const image = hasSlides ? slides[index].image_url : null;

  return (
    <section className="relative overflow-hidden bg-hero-radial">
      {image && (
        <div className="absolute inset-0">
          <Image
            key={image}
            src={image}
            alt=""
            fill
            priority
            className="object-cover opacity-25 transition-opacity duration-700"
          />
        </div>
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 py-28 sm:py-36">
        <span className="mb-5 animate-fade-up rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
          Admissions Open
        </span>
        <h1 key={heading} className="max-w-3xl animate-fade-up text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          {heading.split(" ").map((word, i, arr) =>
            i === arr.length - 1 || i === arr.length - 2 ? (
              <span key={i} className="text-gradient-gold">
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>
        <p key={subheading} className="mt-6 max-w-xl animate-fade-up text-lg text-slate-300">
          {subheading}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/admissions"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-xl shadow-gold-500/20 transition-transform hover:scale-105"
          >
            Admission Enquiry
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Discover SRM Welkin
          </Link>
        </div>

        {hasSlides && slides.length > 1 && (
          <div className="mt-16 flex items-center gap-4">
            <button
              aria-label="Previous slide"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold-400" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next slide"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full text-[var(--background)]"
        viewBox="0 0 1440 80"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C360,90 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}
