// Pure pricing engine. No side effects, no reads outside of the arguments
// passed in — every function here is trivially unit-testable.

import type { Product } from "./products";

/** UAE VAT rate (5%) applied to the order subtotal. */
export const VAT_RATE = 0.05;
/** Alias for backwards compatibility with existing references. */
export const GST_RATE = VAT_RATE;

/** Quantity tier the discount curve is calibrated against (see Product.basePricePerUnit). */
const BASE_QTY = 25;

/** How aggressively per-unit price drops as quantity grows (0 = no discount, 1 = linear). */
const DISCOUNT_EXPONENT = 0.3;

/** Per-unit price never drops below this fraction of the base price, however large the order. */
const MIN_QTY_MULTIPLIER = 0.35;

export interface PriceSelections {
  /** Selected shape option label, if the product has a "shape" option group. Not price-affecting. */
  shape?: string;
  /** Selected size preset label, if the product has a "size" option group. */
  sizeLabel?: string;
  /** Custom size in inches, used when the size group's allowCustomSize is true and no preset is selected. */
  customSizeInInches?: number;
  quantity: number;
  /** Selected material option label, if the product has a "material" option group. */
  materialLabel?: string;
  /** Selected addon labels, if the product has an "addons" option group. */
  addonLabels?: string[];
}

export interface PriceBreakdown {
  unitPrice: number;
  totalPrice: number;
  vatAmount: number;
  /** Alias for vatAmount for backwards compatibility. */
  gstAmount: number;
}

/** Rounds to 2 decimal places, avoiding floating-point artifacts like 12.099999999999998. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Bulk-discount multiplier: 1 at BASE_QTY, decreasing as quantity grows,
 * floored at MIN_QTY_MULTIPLIER so very large orders never approach zero.
 */
export function getQuantityMultiplier(quantity: number): number {
  const qty = Math.max(1, quantity);
  const raw = Math.pow(BASE_QTY / qty, DISCOUNT_EXPONENT);
  return Math.max(MIN_QTY_MULTIPLIER, raw);
}

/**
 * Size multiplier relative to the product's smallest/first size preset
 * (which by convention represents the base size baked into basePricePerUnit).
 * Returns 1 if the product has no size option group.
 */
export function getSizeMultiplier(product: Product, selections: PriceSelections): number {
  const sizeGroup = product.optionGroups.find((group) => group.type === "size");
  if (!sizeGroup) return 1;

  const basePreset = sizeGroup.presets[0];
  const baseValue = basePreset?.valueInInches ?? 1;

  if (selections.sizeLabel) {
    const preset = sizeGroup.presets.find((p) => p.label === selections.sizeLabel);
    if (preset) return preset.valueInInches / baseValue;
  }

  if (sizeGroup.allowCustomSize && selections.customSizeInInches) {
    return selections.customSizeInInches / baseValue;
  }

  return 1;
}

/**
 * Material price multiplier for the selected option, defaulting to the
 * group's first option (or 1 if the product has no material option group).
 */
export function getMaterialMultiplier(product: Product, selections: PriceSelections): number {
  const materialGroup = product.optionGroups.find((group) => group.type === "material");
  if (!materialGroup) return 1;

  const selected = selections.materialLabel
    ? materialGroup.options.find((option) => option.label === selections.materialLabel)
    : materialGroup.options[0];

  return selected?.priceMultiplier ?? 1;
}

/**
 * Sum of flat per-unit fees for every selected addon. Unknown labels and
 * products without an addons option group simply contribute nothing.
 */
export function getAddonFlatTotal(product: Product, selections: PriceSelections): number {
  const addonsGroup = product.optionGroups.find((group) => group.type === "addons");
  if (!addonsGroup || !selections.addonLabels?.length) return 0;

  return selections.addonLabels.reduce((sum, label) => {
    const addon = addonsGroup.options.find((option) => option.label === label);
    return sum + (addon?.priceDelta ?? 0);
  }, 0);
}

/**
 * Computes unit price, order total and GST for a product configuration.
 * unitPrice = basePricePerUnit × quantityMultiplier × sizeMultiplier × materialMultiplier + addon flat fees
 */
export function calculatePrice(product: Product, selections: PriceSelections): PriceBreakdown {
  const quantity = Math.max(1, Math.round(selections.quantity));

  const quantityMultiplier = getQuantityMultiplier(quantity);
  const sizeMultiplier = getSizeMultiplier(product, selections);
  const materialMultiplier = getMaterialMultiplier(product, selections);
  const addonFlatTotal = getAddonFlatTotal(product, selections);

  const rawUnitPrice =
    product.basePricePerUnit * quantityMultiplier * sizeMultiplier * materialMultiplier +
    addonFlatTotal;

  const unitPrice = round2(rawUnitPrice);
  const totalPrice = round2(unitPrice * quantity);
  const vatAmount = round2(totalPrice * VAT_RATE);

  return { unitPrice, totalPrice, vatAmount, gstAmount: vatAmount };
}
