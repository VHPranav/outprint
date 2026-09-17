import * as React from "react";
import { Zap } from "lucide-react";
import { getProductBySlug } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";

// Fast-turnaround products — express variants plus naturally quick items
// (stamps, roll-up banners, simple stickers) that don't need a long lead time.
const SAME_DAY_SLUGS = [
  "express-business-cards",
  "express-flyers",
  "express-letterheads",
  "self-ink-stamp",
  "roll-up-banner-85x200cm",
  "round-stickers",
  "standard-brochures",
];

export function SameDayPrinting() {
  const products = SAME_DAY_SLUGS.map(getProductBySlug).filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <Zap className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
              Same Day Printing
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-500">
              Get your prints ready the same day — fast and reliable.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel ariaLabel="Same day printing" trackClassName="gap-5 px-1 py-1">
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
