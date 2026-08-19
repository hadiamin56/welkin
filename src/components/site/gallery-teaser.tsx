import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GalleryImage } from "@/types/content";

export function GalleryTeaser({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  const shown = images.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Campus Life
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
            A Glimpse Inside Welkin
          </h2>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
        >
          View Gallery <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2">
        {shown.map((img, i) => (
          <div
            key={img.id}
            className={`group relative overflow-hidden rounded-2xl ring-1 ring-black/5 ${
              i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
            }`}
          >
            <Image
              src={img.image_url}
              alt={img.caption || "Campus"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
