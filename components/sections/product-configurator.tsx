"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  LayoutTemplate,
  PencilRuler,
  UploadCloud,
  Users,
  TrendingDown,
  FileCheck,
  ShoppingBag,
  MessageCircle,
  FileText,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import type {
  Product,
  ShapeOptionGroup,
  SizeOptionGroup,
  QuantityOptionGroup,
  MaterialOptionGroup,
  AddonsOptionGroup,
} from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { addToCart, type CartItem } from "@/lib/cart";
import {
  getAttachedDesign,
  saveAttachedDesign,
  clearAttachedDesign,
  type AttachedDesign,
} from "@/lib/design-attachment";
import { toInches, LENGTH_UNITS, type LengthUnit } from "@/lib/units";
import { resolveDesignSize } from "@/lib/design-size";
import { getCategoryAncestors } from "@/lib/catalog";
import { isImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface ProductConfiguratorProps {
  product: Product;
}

function pillClasses(active: boolean): string {
  return `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-black bg-black text-white"
      : "border-[#E5E5E5] text-neutral-700 hover:border-neutral-400"
  }`;
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const searchParams = useSearchParams();

  const shapeGroup = product.optionGroups.find(
    (g): g is ShapeOptionGroup => g.type === "shape"
  );
  const sizeGroup = product.optionGroups.find((g): g is SizeOptionGroup => g.type === "size");
  const quantityGroup = product.optionGroups.find(
    (g): g is QuantityOptionGroup => g.type === "quantity"
  );
  const materialGroup = product.optionGroups.find(
    (g): g is MaterialOptionGroup => g.type === "material"
  );
  const addonsGroup = product.optionGroups.find(
    (g): g is AddonsOptionGroup => g.type === "addons"
  );

  const minQuantity = quantityGroup ? Math.min(...quantityGroup.tiers) : 1;

  const [selectedShape, setSelectedShape] = React.useState(shapeGroup?.options[0]);
  const [selectedSizeLabel, setSelectedSizeLabel] = React.useState(sizeGroup?.presets[0]?.label);
  const [isCustomSize, setIsCustomSize] = React.useState(false);
  const [customWidth, setCustomWidth] = React.useState("");
  const [customHeight, setCustomHeight] = React.useState("");
  const [unit, setUnit] = React.useState<LengthUnit>("in");
  const [quantity, setQuantity] = React.useState(minQuantity);
  const [selectedMaterial, setSelectedMaterial] = React.useState(materialGroup?.options[0]?.label);
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const [attachedDesign, setAttachedDesign] = React.useState<AttachedDesign | null>(null);

  // Restore a design attached earlier (this session), or one handed back via
  // a query param by the upload, templates, or design studio flow.
  React.useEffect(() => {
    const queryUrl = searchParams.get("designUrl");
    if (queryUrl) {
      const design: AttachedDesign = {
        url: queryUrl,
        fileName: searchParams.get("designName") ?? "Design file",
        resolutionEnhancement: searchParams.get("enhancement") === "1",
      };
      setAttachedDesign(design);
      saveAttachedDesign(product.slug, design);
      return;
    }
    const stored = getAttachedDesign(product.slug);
    if (stored) setAttachedDesign(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const sizeDisplayLabel = isCustomSize
    ? customWidth && customHeight
      ? `${customWidth}${unit} x ${customHeight}${unit} (custom)`
      : undefined
    : selectedSizeLabel;

  function toggleAddon(label: string) {
    setSelectedAddons((current) =>
      current.includes(label) ? current.filter((a) => a !== label) : [...current, label]
    );
  }

  function handleRemoveDesign() {
    setAttachedDesign(null);
    clearAttachedDesign(product.slug);
  }

  function handleSendWhatsApp() {
    if (!attachedDesign) return;
    try {
      const link = buildWhatsAppLink({
        type: "product-order",
        productName: product.name,
        selections: {
          shape: selectedShape,
          size: sizeDisplayLabel,
          quantity,
          material: selectedMaterial,
          addons: selectedAddons,
        },
        designFileUrl: attachedDesign.url,
        notes: attachedDesign.resolutionEnhancement
          ? `Resolution Enhancement requested — uploaded artwork is lower resolution than recommended for the selected size; please clean up/upscale before production.`
          : undefined,
      });
      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error("WhatsApp isn't set up yet", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  }

  function handleAddToCart() {
    const item: CartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      slug: product.slug,
      productName: product.name,
      image: product.images[0],
      quantity,
      selections: {
        shape: selectedShape,
        size: sizeDisplayLabel,
        material: selectedMaterial,
        addons: selectedAddons,
      },
      designFileUrl: attachedDesign?.url,
    };
    addToCart(item);
    toast.success("Added to cart", { description: `${product.name} — ${quantity} pcs` });
  }

  const designSize = React.useMemo(() => {
    if (isCustomSize) {
      const width = parseFloat(customWidth);
      const height = parseFloat(customHeight);
      if (Number.isNaN(width) || Number.isNaN(height)) return undefined;
      return { width: toInches(width, unit), height: toInches(height, unit) };
    }
    return resolveDesignSize(product, { sizeLabel: selectedSizeLabel });
  }, [isCustomSize, customWidth, customHeight, unit, product, selectedSizeLabel]);

  // Carries the current shape/size selection into any flow that needs to
  // size its own canvas or resolution check the same way (design studio,
  // templates gallery, artwork upload).
  const sizeQueryString = React.useMemo(() => {
    const params = new URLSearchParams();
    if (designSize) {
      params.set("widthIn", designSize.width.toFixed(3));
      params.set("heightIn", designSize.height.toFixed(3));
    }
    if (selectedShape) params.set("shape", selectedShape);
    if (sizeDisplayLabel) params.set("sizeLabel", sizeDisplayLabel);
    return params.toString();
  }, [designSize, selectedShape, sizeDisplayLabel]);

  const designStudioHref = `/design-studio/${product.slug}${sizeQueryString ? `?${sizeQueryString}` : ""}`;
  const templatesHref = `/product/${product.slug}/templates${sizeQueryString ? `?${sizeQueryString}` : ""}`;
  const uploadHref = `/product/${product.slug}/upload${sizeQueryString ? `?${sizeQueryString}` : ""}`;
  const hireDesignerHref = React.useMemo(() => {
    const params = new URLSearchParams({ product: product.slug, productName: product.name });
    const topCategory = getCategoryAncestors(product.categoryId)[0];
    if (topCategory) params.set("category", topCategory.name);
    return `/hire-a-designer?${params.toString()}`;
  }, [product.slug, product.name, product.categoryId]);

  return (
    <div className="space-y-8">
      {/* 1. Name, description, badges */}
      <div>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Ships in 5–7 days</Badge>
        </div>
      </div>

      {/* 2. Shape */}
      {shapeGroup && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Shape
          </label>
          <div className="flex flex-wrap gap-2">
            {shapeGroup.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedShape(option)}
                className={pillClasses(selectedShape === option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Size */}
      {sizeGroup && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeGroup.presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setSelectedSizeLabel(preset.label);
                  setIsCustomSize(false);
                }}
                className={pillClasses(!isCustomSize && selectedSizeLabel === preset.label)}
              >
                {preset.label}
              </button>
            ))}
            {sizeGroup.allowCustomSize && (
              <button
                type="button"
                onClick={() => setIsCustomSize(true)}
                className={pillClasses(isCustomSize)}
              >
                Custom Size
              </button>
            )}
          </div>

          {isCustomSize && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Input
                type="number"
                inputMode="decimal"
                placeholder="Width"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="h-10 w-24"
              />
              <span className="text-neutral-400">×</span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="Height"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="h-10 w-24"
              />
              <div className="flex overflow-hidden rounded-lg border border-[#E5E5E5]">
                {LENGTH_UNITS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setUnit(value)}
                    className={`px-2.5 py-2 text-xs font-medium transition-colors ${
                      unit === value ? "bg-black text-white" : "bg-white text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Quantity */}
      {quantityGroup && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Quantity
          </label>
          <Select value={String(quantity)} onValueChange={(value) => setQuantity(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {quantityGroup.tiers.map((tier) => (
                <SelectItem key={tier} value={String(tier)}>
                  {tier} pcs
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 5. Material */}
      {materialGroup && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Material
          </label>
          <div className="grid grid-cols-4 gap-3">
            {materialGroup.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setSelectedMaterial(option.label)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-colors ${
                  selectedMaterial === option.label ? "border-black" : "border-transparent hover:border-neutral-200"
                }`}
              >
                {/* The seed data only has generic stock swatches, so show the product's own photo. */}
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={product.images[0]} alt={option.label} fill sizes="64px" className="object-cover" />
                </div>
                <span className="text-center text-[11px] leading-tight text-neutral-700">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Add-ons */}
      {addonsGroup && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Add-ons
          </label>
          <div className="space-y-2">
            {addonsGroup.options.map((option) => {
              const checked = selectedAddons.includes(option.label);
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => toggleAddon(option.label)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    checked ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5] hover:border-neutral-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      checked ? "border-black bg-black text-white" : "border-neutral-300"
                    }`}
                  >
                    {checked && <Check className="h-3 w-3" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-neutral-900">{option.label}</span>
                    <span className="block text-xs text-neutral-500">{option.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. How do you want to start? */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-neutral-900">How do you want to start?</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={templatesHref}
            className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] p-4 transition-colors hover:border-black"
          >
            <LayoutTemplate className="h-5 w-5 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-900">Browse Templates</span>
          </Link>
          <Link
            href={designStudioHref}
            className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] p-4 transition-colors hover:border-black"
          >
            <PencilRuler className="h-5 w-5 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-900">Design It Yourself</span>
          </Link>
          <Link
            href={uploadHref}
            className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] p-4 transition-colors hover:border-black"
          >
            <UploadCloud className="h-5 w-5 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-900">Upload Your Artwork</span>
          </Link>
          <Link
            href={hireDesignerHref}
            className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] p-4 transition-colors hover:border-black"
          >
            <Users className="h-5 w-5 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-900">Hire a Designer</span>
          </Link>
        </div>
      </div>

      {/* 9. Attached design + Send via WhatsApp */}
      {attachedDesign && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] p-3">
            {isImageUrl(attachedDesign.url) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={attachedDesign.url}
                alt={attachedDesign.fileName}
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FAFAF9] text-neutral-400">
                <FileText className="h-5 w-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">{attachedDesign.fileName}</p>
              <p className="text-xs text-neutral-500">Design attached</p>
              {attachedDesign.resolutionEnhancement && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-amber-700">
                  <Sparkles className="h-3 w-3" />
                  Resolution Enhancement requested
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleRemoveDesign}
              aria-label="Remove design"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Button size="lg" className="w-full" onClick={handleSendWhatsApp}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Send Order via WhatsApp
          </Button>
        </div>
      )}

      {/* 10. Trust icons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5E5] pt-5 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <FileCheck className="h-3.5 w-3.5" />
          Free Design Proof
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingDown className="h-3.5 w-3.5" />
          Bulk Order Discounts
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp Updates
        </span>
      </div>

      {/* 11. Add to cart */}
      <Button variant="secondary" size="lg" className="w-full" onClick={handleAddToCart}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
