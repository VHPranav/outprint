import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle, ProductTile, TILE_GRID_CLASS } from "./home-tiles";

// Hand-picked for variety across categories until real sales data exists.
const BEST_SELLER_SLUGS = [
  "vinyl-die-cut-stickers",
  "corrugated-mailer-boxes",
  "rigid-gift-boxes",
  "premium-suede-business-cards",
  "coffee-mugs-gloss-finish",
  "unisex-heavy-weight-t-shirt",
  "holographic-die-cut-stickers",
  "weatherproof-vinyl-labels",
];

export function BestSellers() {
  const products = BEST_SELLER_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <section className="bg-brand-blue py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Our Best Seller Products" />
        </Reveal>
        <Reveal delay={0.1} className={TILE_GRID_CLASS}>
          {products.map((product) => (
            <ProductTile key={product.id} product={product} variant="card" />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
