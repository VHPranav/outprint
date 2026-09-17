import * as React from "react";
import { getProductBySlug, getStartingOffer } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";
import { Reveal } from "@/components/ui/reveal";
import { BentoCard } from "@/components/ui/bento-card";

// Hand-picked for variety across categories until real sales data exists.
// Order matters: the first two are the large hero tiles, the rest fill the row below.
const BEST_SELLER_SLUGS = [
  "vinyl-die-cut-stickers",
  "rigid-gift-boxes",
  "premium-suede-business-cards",
  "vinyl-outdoor-banners",
  "weatherproof-vinyl-labels",
];

const BEST_SELLER_IMAGES: Record<string, string> = {
  "vinyl-die-cut-stickers": "/images/27.webp",
  "rigid-gift-boxes": "/images/29.webp",
  "premium-suede-business-cards": "/images/22.webp",
  "vinyl-outdoor-banners": "/images/26.webp",
  "weatherproof-vinyl-labels": "/images/30.webp",
};

export function BestSellers() {
  const products = BEST_SELLER_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );
  const [heroA, heroB, ...rest] = products;

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

        <div className="flex flex-col gap-5">
          {heroA && heroB && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[heroA, heroB].map((product, i) => {
                const { unitPrice, quantity } = getStartingOffer(product);
                return (
                  <BentoCard
                    key={product.id}
                    href={`/product/${product.slug}`}
                    title={product.name}
                    subtitle={`From ${formatCurrency(unitPrice)} for ${quantity} pcs`}
                    image={BEST_SELLER_IMAGES[product.slug] || product.images[0]}
                    variant="grey"
                    large
                    delay={0.05 + i * 0.05}
                  />
                );
              })}
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {rest.map((product, i) => {
                const { unitPrice, quantity } = getStartingOffer(product);
                return (
                  <BentoCard
                    key={product.id}
                    href={`/product/${product.slug}`}
                    title={product.name}
                    subtitle={`From ${formatCurrency(unitPrice)} for ${quantity} pcs`}
                    image={BEST_SELLER_IMAGES[product.slug] || product.images[0]}
                    variant="grey"
                    delay={0.15 + i * 0.05}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
