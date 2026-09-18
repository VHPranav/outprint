import * as React from "react";
import { getCategoryBySlug } from "@/lib/catalog";
import type { Category } from "@/data/categories";
import { Reveal } from "@/components/ui/reveal";
import { CategoryTile, HomeSectionTitle, TILE_GRID_CLASS } from "./home-tiles";

const POPULAR_CATEGORY_SLUGS = [
  "biz-cards",
  "stickers",
  "product-boxes",
  "paper-bags",
  "round-neck-t-shirts",
  "flyers",
  "roll-up-banners",
  "corporate-gifts",
];

export function ShopByCategory() {
  const items = POPULAR_CATEGORY_SLUGS.map(getCategoryBySlug).filter(
    (c): c is Category => Boolean(c)
  );

  return (
    <section id="popular-categories" className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Our Most Popular Categories" />
        </Reveal>
        <Reveal delay={0.1} className={TILE_GRID_CLASS}>
          {items.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
