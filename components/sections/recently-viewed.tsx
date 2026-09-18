"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { useRecentlyViewedSlugs } from "@/lib/recently-viewed";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle, ProductTile, TILE_GRID_CLASS } from "./home-tiles";

/** Renders nothing until the visitor has actually viewed at least one product this browser. */
export function RecentlyViewed() {
  const slugs = useRecentlyViewedSlugs();
  const products = slugs
    .map(getProductBySlug)
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .slice(0, 8);

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Recently Viewed Products" />
        </Reveal>
        <Reveal delay={0.1} className={TILE_GRID_CLASS}>
          {products.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
