import * as React from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="mb-6 font-serif text-2xl font-normal tracking-tight text-[#111111]">
        You may also like
      </h2>
      <div className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 [scroll-snap-type:x_mandatory]">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-64 shrink-0 [scroll-snap-align:start] sm:w-72"
          />
        ))}
      </div>
    </section>
  );
}
