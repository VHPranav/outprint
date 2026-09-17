import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
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
];

export function BestSellers() {
  const products = BEST_SELLER_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
              Best sellers
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              The stickers, labels and boxes our customers reorder most.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="no-scrollbar mx-auto flex max-w-6xl gap-5 overflow-x-auto scroll-smooth px-6 pb-2 sm:px-8 [scroll-snap-type:x_mandatory]">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-64 shrink-0 [scroll-snap-align:start] sm:w-72"
          />
        ))}
      </Reveal>
    </section>
  );
}
