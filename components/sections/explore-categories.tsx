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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
            Explore All Categories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Every product family we print, in one place.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center gap-2.5 rounded-[28px] border-none bg-neutral-100 p-3 text-center transition-all hover:shadow-card-hover"
            >
              <span className="relative block aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={category.bannerImage}
                  alt={category.name}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-100 via-neutral-100/60 to-transparent" />
              </span>
              <span className="text-xs font-medium leading-snug text-neutral-700 group-hover:text-black">
                {category.name}
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
