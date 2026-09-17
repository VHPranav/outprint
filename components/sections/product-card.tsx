import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { categories } from "@/data/categories";
import { getStartingOffer } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/** Truncates to a clean word boundary instead of cutting mid-word. */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const category = categories.find((c) => c.id === product.categoryId);
  const { unitPrice, quantity } = getStartingOffer(product);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-all hover:shadow-card-hover ${className ?? ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAF9]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
            View Details
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {category.name}
          </span>
        )}
        <h3 className="mt-1 font-serif text-base leading-snug text-neutral-900">
          {product.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {truncate(product.description, 70)}
        </p>
        <p className="mt-auto pt-4 text-sm text-neutral-600">
          From <span className="font-semibold text-black">{formatCurrency(unitPrice)}</span> for{" "}
          {quantity} pcs
        </p>
      </div>
    </Link>
  );
}
