"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { useRecentlyViewedSlugs } from "@/lib/recently-viewed";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";

/** Renders nothing until the visitor has actually viewed at least one product this browser. */
export function RecentlyViewed() {
  const slugs = useRecentlyViewedSlugs();
  const products = slugs.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
            Recently Viewed
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Pick up right where you left off.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel ariaLabel="Recently viewed products" trackClassName="gap-5 px-1 py-1">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grey"
                className="w-64 shrink-0 snap-start sm:w-72"
              />
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
