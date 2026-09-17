"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/data/products";
import { resolveDesignSize, readDesignSizeFromParams } from "@/lib/design-size";
import { getProductFamily } from "@/lib/product-family";
import { sortTemplatesByFamily } from "@/data/design-studio-assets";

interface TemplatesGalleryProps {
  product: Product;
}

const FAMILY_LABELS: Record<string, string> = {
  stickers: "Stickers",
  labels: "Labels",
  boxes: "Boxes",
  "business-cards": "Business Cards",
  banners: "Banners",
};

export function TemplatesGallery({ product }: TemplatesGalleryProps) {
  const searchParams = useSearchParams();

  const { width: widthIn, height: heightIn } = React.useMemo(() => {
    return (
      readDesignSizeFromParams(searchParams) ??
      resolveDesignSize(product, { sizeLabel: searchParams.get("sizeLabel") ?? undefined })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const shape = searchParams.get("shape") ?? undefined;
  const sizeLabel = searchParams.get("sizeLabel") ?? undefined;

  const family = React.useMemo(() => getProductFamily(product), [product]);
  const templates = React.useMemo(() => sortTemplatesByFamily(family), [family]);

  function studioHref(templateId: string): string {
    const params = new URLSearchParams({
      template: templateId,
      widthIn: widthIn.toFixed(3),
      heightIn: heightIn.toFixed(3),
    });
    if (shape) params.set("shape", shape);
    if (sizeLabel) params.set("sizeLabel", sizeLabel);
    return `/design-studio/${product.slug}?${params.toString()}`;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/product/${product.slug}`}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {product.name}
        </Link>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          Browse Templates
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Pick a starter layout for {product.name.toLowerCase()} — it opens in the design studio, sized to your
          selection, so you can customize every detail before confirming.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {templates.map((template) => (
          <Link
            key={template.id}
            href={studioHref(template.id)}
            className="group flex flex-col gap-2.5 rounded-2xl border border-[#E5E5E5] p-3 transition-colors hover:border-black"
          >
            <span className="block aspect-square overflow-hidden rounded-xl bg-[#FAFAF9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={template.src}
                alt={template.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </span>
            <div>
              <p className="text-sm font-medium text-neutral-900">{template.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {template.families.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-[#F5F5F4] px-2 py-0.5 text-[10px] font-medium text-neutral-500"
                  >
                    {FAMILY_LABELS[f] ?? f}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
