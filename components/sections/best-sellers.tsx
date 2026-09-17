import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
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
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Our Best Seller Products
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70">
            The stickers, labels and boxes our customers reorder most.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel ariaLabel="Best seller products" trackClassName="gap-5 px-1 py-1">
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
