import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { categories } from "@/data/categories";
import { getMinQuantity } from "@/lib/catalog";

interface ProductCardProps {
  product: Product;
  className?: string;
  /** "white" is the bordered catalog-grid card; "grey" or "clean" is the modern borderless tile matching the reference design. */
  variant?: "white" | "grey" | "clean";
  theme?: "light" | "dark";
}

/** Truncates to a clean word boundary instead of cutting mid-word. */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export function ProductCard({
  product,
  className,
  variant = "white",
  theme = "light",
}: ProductCardProps) {
  const category = categories.find((c) => c.id === product.categoryId);
  const minQuantity = getMinQuantity(product);
  const isDark = theme === "dark";

  // Clean borderless style matching reference screenshot
  if (variant === "grey" || variant === "clean") {
    return (
      <Link
        href={`/product/${product.slug}`}
        className={`group flex flex-col transition-all ${className ?? ""}`}
      >
        <div
          className={`relative aspect-[16/11] w-full overflow-hidden rounded-2xl sm:rounded-[22px] ${
            isDark ? "bg-neutral-900" : "bg-neutral-100"
          }`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/25 group-hover:opacity-100">
            <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-medium text-black shadow-sm backdrop-blur-sm">
              View Details
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
          {category && (
            <span
              className={`text-[11px] font-medium uppercase tracking-wider ${
                isDark ? "text-neutral-400" : "text-neutral-400"
              }`}
            >
              {category.name}
            </span>
          )}
          <h3
            className={`mt-1 text-base sm:text-lg font-medium leading-snug transition-colors ${
              isDark
                ? "text-white group-hover:text-neutral-200"
                : "text-neutral-900 group-hover:text-black"
            }`}
          >
            {product.name}
          </h3>
          <p
            className={`mt-1 text-xs sm:text-sm leading-relaxed line-clamp-2 ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {truncate(product.description, 70)}
          </p>
          <p
            className={`mt-2 text-xs sm:text-sm ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            MOQ <span className={`font-medium ${isDark ? "text-white" : "text-black"}`}>{minQuantity}</span> pcs
          </p>
        </div>
      </Link>
    );
  }

  // Bordered card for catalog grid pages
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-all hover:shadow-card-hover ${
        className ?? ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAF9]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
            View Details
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            {category.name}
          </span>
        )}
        <h3 className="mt-1 text-base font-medium leading-snug text-neutral-900">
          {product.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {truncate(product.description, 70)}
        </p>
        <p className="mt-auto pt-4 text-sm text-neutral-600">
          MOQ <span className="font-medium text-black">{minQuantity}</span> pcs
        </p>
      </div>
    </Link>
  );
}
