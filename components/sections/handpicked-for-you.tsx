import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle, ProductTile, TILE_GRID_CLASS } from "./home-tiles";

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
    <section className="bg-white pb-14 pt-4 sm:pb-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Handpicked For You" />
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
