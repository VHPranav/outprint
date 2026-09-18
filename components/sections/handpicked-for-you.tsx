"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";
import { ProductCard } from "./product-card";

// Curated set — gifting, hospitality and personalized items.
const HANDPICKED_SLUGS = [
  "a5-pu-leather-notebooks",
  "cotton-tote-bags",
  "custom-water-bottles",
  "metal-key-ring",
  "photo-mini-books",
  "standard-coasters",
  "power-banks",
  "pvc-nfc-cards",
];

export function HandpickedForYou() {
  const products = HANDPICKED_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <SectionCarousel
      title="Handpicked For You"
      subtitle="Gifting, hospitality and personalized favorites."
      ariaLabel="Handpicked for you products"
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
