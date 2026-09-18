import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle, ProductTile, TILE_GRID_CLASS } from "./home-tiles";

// Everyday office & stationery items.
const BUSINESS_ESSENTIALS_SLUGS = [
  "standard-letterheads",
  "dl-custom-envelopes",
  "standard-business-cards",
  "a5-notepads",
  "standard-certificates",
  "a4-2-pocket-folders",
  "express-letterheads",
  "c5-custom-envelopes",
];

export function BusinessEssentials() {
  const products = BUSINESS_ESSENTIALS_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Business Essentials" />
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
