import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/data/categories";
import type { Product } from "@/data/products";
import { categories } from "@/data/categories";
import { getCategoryImage } from "@/lib/catalog";

export const TILE_GRID_CLASS =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6";

interface HomeSectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function HomeSectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "left",
  tone = "light",
}: HomeSectionTitleProps) {
  const isDark = tone === "dark";
  return (
    <div className={`mb-8 sm:mb-10 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`text-xs font-medium uppercase tracking-[0.2em] ${
            isDark ? "text-white/70" : "text-neutral-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl font-medium tracking-tight sm:text-3xl ${eyebrow ? "mt-2" : ""} ${
          isDark ? "text-white" : "text-[#111111]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-sm sm:text-base ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"} ${
            isDark ? "text-white/75" : "text-neutral-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CategoryTile({ category }: { category: Category }) {
  const image = getCategoryImage(category);

  return (
    <Link href={`/category/${category.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
        <Image
          src={image}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 30vw, 46vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="mt-3 text-center text-sm font-medium text-neutral-900 transition-colors group-hover:text-neutral-600">
        {category.name}
      </span>
    </Link>
  );
}

interface ProductTileProps {
  product: Product;
  /** "plain" sits directly on the page; "card" is a white card for use on a colored band. */
  variant?: "plain" | "card";
}

export function ProductTile({ product, variant = "plain" }: ProductTileProps) {
  const category = categories.find((c) => c.id === product.categoryId);

  const image = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 30vw, 46vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );

  if (variant === "card") {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="group flex flex-col rounded-2xl bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover"
      >
        {image}
        <div className="px-1 pb-1 pt-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-neutral-900">
            {product.name}
          </h3>
          {category && <p className="mt-1 text-xs text-neutral-500">{category.name}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      {image}
      <h3 className="mt-3 line-clamp-2 text-center text-sm font-medium leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600">
        {product.name}
      </h3>
      {category && (
        <p className="mt-0.5 text-center text-xs text-neutral-500">{category.name}</p>
      )}
    </Link>
  );
}
