import * as React from "react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";

// A different curated set again — gifting, hospitality and personalized items.
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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
            Handpicked For You
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Gifting, hospitality and personalized favorites.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel ariaLabel="Handpicked for you" trackClassName="gap-5 px-1 py-1">
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
