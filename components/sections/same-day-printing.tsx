"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";
import { ProductCard } from "./product-card";

// Fast-turnaround products — express variants plus naturally quick items
// (stamps, roll-up banners, simple stickers) that don't need a long lead time.
const SAME_DAY_SLUGS = [
  "express-business-cards",
  "express-flyers",
  "express-letterheads",
  "self-ink-stamp",
  "roll-up-banner-85x200cm",
  "round-stickers",
  "standard-brochures",
];

export function SameDayPrinting() {
  const products = SAME_DAY_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <SectionCarousel
      title="Same Day Printing"
      subtitle="Get your prints ready the same day — fast and reliable across the UAE."
      ariaLabel="Same day printing products"
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
