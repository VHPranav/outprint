import * as React from "react";
import Link from "next/link";
import type { Category } from "@/data/categories";

interface SubcategoryTilesProps {
  subcategories: Category[];
}

export function SubcategoryTiles({ subcategories }: SubcategoryTilesProps) {
  if (subcategories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          href={`/category/${subcategory.slug}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={subcategory.bannerImage}
            alt={subcategory.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <span className="absolute bottom-3 left-3 right-3 text-sm font-medium text-white">
            {subcategory.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
