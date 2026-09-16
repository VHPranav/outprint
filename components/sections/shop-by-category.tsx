import * as React from "react";
import Link from "next/link";
import { getCategoryTree } from "@/lib/catalog";

export function ShopByCategory() {
  const topLevelCategories = getCategoryTree();

  return (
    <section id="categories" className="bg-[#FAFAF9] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
            Shop by category
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Every product is fully customizable — start from the category closest to what you need.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {topLevelCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.bannerImage}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-serif text-lg text-white">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
