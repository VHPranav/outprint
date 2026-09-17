import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
          <Image
            src={subcategory.bannerImage}
            alt={subcategory.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
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
