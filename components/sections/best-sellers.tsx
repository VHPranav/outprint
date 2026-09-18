"use client";

import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";
import { ProductCard } from "./product-card";

// Hand-picked for variety across categories until real sales data exists.
const BEST_SELLER_SLUGS = [
  "vinyl-die-cut-stickers",
  "holographic-die-cut-stickers",
  "weatherproof-vinyl-labels",
  "corrugated-mailer-boxes",
  "rigid-gift-boxes",
  "premium-suede-business-cards",
  "letterpress-cotton-business-cards",
  "vinyl-outdoor-banners",
  "coffee-mugs-gloss-finish",
  "unisex-heavy-weight-t-shirt",
];

export function BestSellers() {
  const products = BEST_SELLER_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <SectionCarousel
      title="Our Best Seller Products"
      subtitle="The stickers, labels and boxes our customers reorder most."
      theme="dark"
      ariaLabel="Best seller products"
      sectionClassName="bg-black py-16 sm:py-24"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="grey"
          theme="dark"
          className={CAROUSEL_CARD_CLASS}
        />
      ))}
    </SectionCarousel>
  );
}
