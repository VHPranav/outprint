import * as React from "react";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { ProductTile, TILE_GRID_CLASS } from "./home-tiles";

const FOOD_BOXES_SLUG = "food-boxes";
const VISIBLE_COUNT = 8;

export function FoodPackaging() {
  const products = getProductsByCategory(FOOD_BOXES_SLUG).slice(0, VISIBLE_COUNT);
  if (products.length === 0) return null;

  return (
    <section className="bg-brand-blue py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
            <h2 className="text-2xl font-medium tracking-tight text-[#111111] sm:text-3xl">
              Custom Fast Food Packaging Boxes
            </h2>
            <Link
              href={`/category/${FOOD_BOXES_SLUG}`}
              className="inline-flex h-10 items-center rounded-lg bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              View all
            </Link>
          </div>
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
