import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, type Category } from "@/data/categories";
import { Reveal } from "@/components/ui/reveal";

// A broader, more granular slice of the catalog than the top-level Shop by
// Category strip — individual product families across every top-level group.
const EXPLORE_CATEGORY_IDS = [
  "cat-bp-business-cards",
  "cat-bp-letterheads",
  "cat-pp-stickers-labels",
  "cat-pp-posters",
  "cat-lp-canvas-prints",
  "cat-ts-round-neck",
  "cat-ts-polo",
  "cat-gp-corporate-gifts",
  "cat-gp-photo-gifts",
  "cat-pkg-paper-bags",
  "cat-stickers-die-cut-holographic",
  "cat-banners-vinyl",
];

export function ExploreCategories() {
  const items = EXPLORE_CATEGORY_IDS.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is Category => Boolean(c)
  );

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
              Explore All Categories
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl">
              Every product family we print, in one place.
            </p>
          </div>

          <Link
            href="/category"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 shadow-sm transition-all hover:border-black hover:bg-neutral-50 active:scale-[0.98] self-start sm:self-end shrink-0"
          >
            Explore Now
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col transition-all"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={category.bannerImage}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-3">
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors block">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
