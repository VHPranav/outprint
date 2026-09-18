"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";
import { ProductCard } from "./product-card";

// Everyday office & stationery items — letterheads, envelopes, notepads,
// business cards and folders.
const BUSINESS_ESSENTIALS_SLUGS = [
  "standard-letterheads",
  "express-letterheads",
  "dl-custom-envelopes",
  "c5-custom-envelopes",
  "standard-business-cards",
  "a5-notepads",
  "standard-certificates",
  "a4-2-pocket-folders",
];

export function BusinessEssentials() {
  const products = BUSINESS_ESSENTIALS_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <SectionCarousel
      title="Business Essentials"
      subtitle="Letterheads, envelopes, notepads and cards for everyday office use."
      ariaLabel="Business essentials products"
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
