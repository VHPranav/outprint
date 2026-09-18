"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { useRecentlyViewedSlugs } from "@/lib/recently-viewed";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";
import { ProductCard } from "./product-card";

/** Renders nothing until the visitor has actually viewed at least one product this browser. */
export function RecentlyViewed() {
  const slugs = useRecentlyViewedSlugs();
  const products = slugs.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  if (products.length === 0) return null;

  return (
    <SectionCarousel
      title="Recently Viewed"
      subtitle="Pick up right where you left off."
      ariaLabel="Recently viewed products"
      sectionClassName="bg-white py-16 sm:py-24"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="grey"
          className={CAROUSEL_CARD_CLASS}
        />
      ))}
    </SectionCarousel>
  );
}
