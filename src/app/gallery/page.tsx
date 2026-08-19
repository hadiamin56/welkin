import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { getGalleryImages } from "@/lib/queries";
import { ImageIcon } from "lucide-react";

export const metadata = { title: "Gallery — SRM Welkin" };

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero eyebrow="Campus Life" title="Gallery" subtitle="A glimpse into life at SRM Welkin." />

      <section className="mx-auto max-w-7xl px-6 py-20">
        {images.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
            <ImageIcon className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">
              Gallery photos will appear here once the admin uploads them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5"
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{img.caption}</p>
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
