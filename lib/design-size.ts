// Resolves a product's selected size into concrete width x height inches
// for the design studio canvas. Size presets are stored as a single
// `valueInInches` (see @/data/products) used only as a pricing multiplier,
// so the real W x H has to be recovered from the preset's display label
// (e.g. `3.5" x 2" Standard`, `2 ft x 4 ft`) when possible.

import type { Product, SizeOptionGroup } from "@/data/products";

export interface DesignSizeInches {
  width: number;
  height: number;
}

const SIZE_LABEL_PATTERN = /([\d.]+)\s*(in|ft|")?\s*x\s*([\d.]+)\s*(in|ft|")?/i;

/** Parses "3.5in x 2in" / `3.5" x 2" Standard` / "2 ft x 4 ft" into inches. Null if unrecognized. */
export function parseSizeLabel(label: string): DesignSizeInches | null {
  const match = label.match(SIZE_LABEL_PATTERN);
  if (!match) return null;

  const [, rawWidth, widthUnit, rawHeight, heightUnit] = match;
  const unit = (widthUnit || heightUnit || "in").toLowerCase();
  const toInches = unit === "ft" ? 12 : 1;

  const width = parseFloat(rawWidth) * toInches;
  const height = parseFloat(rawHeight) * toInches;
  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) return null;

  return { width, height };
}

function findSizeGroup(product: Product): SizeOptionGroup | undefined {
  return product.optionGroups.find((g): g is SizeOptionGroup => g.type === "size");
}

export interface ResolveDesignSizeOptions {
  sizeLabel?: string;
  customWidthIn?: number;
  customHeightIn?: number;
}

/**
 * Resolves the canvas working area: an explicit custom W x H when given,
 * the real W x H parsed from the matching size preset's label, or (for
 * "max dimension"-only presets like die-cut stickers) a square of the
 * preset's valueInInches. Falls back to a 4x4in square.
 */
export function resolveDesignSize(product: Product, options: ResolveDesignSizeOptions): DesignSizeInches {
  if (options.customWidthIn && options.customHeightIn && options.customWidthIn > 0 && options.customHeightIn > 0) {
    return { width: options.customWidthIn, height: options.customHeightIn };
  }

  const sizeGroup = findSizeGroup(product);
  const preset = sizeGroup
    ? sizeGroup.presets.find((p) => p.label === options.sizeLabel) ?? sizeGroup.presets[0]
    : undefined;

  if (preset) {
    return parseSizeLabel(preset.label) ?? { width: preset.valueInInches, height: preset.valueInInches };
  }

  return { width: 4, height: 4 };
}

/** Reads widthIn/heightIn query params (set by the product page link) as a design size, if both are valid. */
export function readDesignSizeFromParams(params: URLSearchParams): DesignSizeInches | null {
  const width = parseFloat(params.get("widthIn") ?? "");
  const height = parseFloat(params.get("heightIn") ?? "");
  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) return null;
  return { width, height };
}
