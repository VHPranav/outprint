"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, MaterialOptionGroup } from "@/data/products";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

const ALL = "all";

function getProductMaterials(product: Product): string[] {
  const group = product.optionGroups.find(
    (g): g is MaterialOptionGroup => g.type === "material"
  );
  return group?.options.map((option) => option.label) ?? [];
}

interface CategoryProductGridProps {
  products: Product[];
}

export function CategoryProductGrid({ products }: CategoryProductGridProps) {
  const [material, setMaterial] = React.useState(ALL);
  const [useCase, setUseCase] = React.useState(ALL);

  const materialOptions = React.useMemo(() => {
    const labels = new Set<string>();
    products.forEach((product) => getProductMaterials(product).forEach((label) => labels.add(label)));
    return Array.from(labels).sort();
  }, [products]);

  const useCaseOptions = React.useMemo(() => {
    const labels = new Set<string>();
    products.forEach((product) => product.useCases?.forEach((label) => labels.add(label)));
    return Array.from(labels).sort();
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      if (material !== ALL && !getProductMaterials(product).includes(material)) return false;
      if (useCase !== ALL && !product.useCases?.includes(useCase)) return false;
      return true;
    });
  }, [products, material, useCase]);

  const hasActiveFilters = material !== ALL || useCase !== ALL;

  function resetFilters() {
    setMaterial(ALL);
    setUseCase(ALL);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </div>

        {materialOptions.length > 0 && (
          <div className="w-40">
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger className="h-10 bg-white">
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All materials</SelectItem>
                {materialOptions.map((label) => (
                  <SelectItem key={label} value={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {useCaseOptions.length > 0 && (
          <div className="w-44">
            <Select value={useCase} onValueChange={setUseCase}>
              <SelectTrigger className="h-10 bg-white">
                <SelectValue placeholder="Use case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All industries</SelectItem>
                {useCaseOptions.map((label) => (
                  <SelectItem key={label} value={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto">
            <X className="mr-1 h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      <p className="mb-6 text-xs text-neutral-500">
        {filteredProducts.length} of {products.length} product
        {products.length === 1 ? "" : "s"}
      </p>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E5E5E5] py-20 text-center">
          <p className="text-sm text-neutral-500">
            No products match these filters.
          </p>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="mt-3">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
