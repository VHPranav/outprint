"use client";

import * as React from "react";
import { categories, type Category } from "@/data/categories";
import { Reveal } from "@/components/ui/reveal";
import { CategoryTile, HomeSectionTitle, TILE_GRID_CLASS } from "./home-tiles";

// A granular slice of the catalog — individual product families across every
// top-level group. The first 12 show by default; "Explore More" reveals the rest.
const EXPLORE_CATEGORY_IDS = [
  "cat-bp-letterheads",
  "cat-bp-envelopes",
  "cat-pp-stickers-labels",
  "cat-bp-business-cards",
  "cat-ts-polo",
  "cat-pp-posters",
  "cat-bp-stamps",
  "cat-lp-canvas-prints",
  "cat-ts-round-neck",
  "cat-gp-corporate-gifts",
  "cat-pkg-paper-bags",
  "cat-bp-notepads",
  "cat-gp-photo-gifts",
  "cat-stickers-die-cut-holographic",
  "cat-banners-vinyl",
  "cat-pp-flyers",
  "cat-pp-calendars",
  "cat-pp-postcards",
  "cat-pp-greeting-cards",
  "cat-lp-rollup-banners",
  "cat-lp-foam-board",
  "cat-pkg-food-boxes",
  "cat-pkg-product-boxes",
  "cat-pkg-mailer-wallets",
];

const INITIAL_COUNT = 12;

export function ExploreCategories() {
  const [expanded, setExpanded] = React.useState(false);

  const items = EXPLORE_CATEGORY_IDS.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is Category => Boolean(c)
  );
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle title="Explore All Categories" />
        </Reveal>

        <div className={TILE_GRID_CLASS}>
          {visible.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>

        {items.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="inline-flex h-11 items-center rounded-lg bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:scale-[0.98]"
            >
              {expanded ? "Show Less" : "Explore More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
