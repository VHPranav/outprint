import * as React from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";
import { CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl sm:text-3xl font-medium tracking-tight text-[#111111]">
        You may also like
      </h2>
      <div className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="grey"
            className={CAROUSEL_CARD_CLASS}
          />
        ))}
      </div>
    </section>
  );
}
