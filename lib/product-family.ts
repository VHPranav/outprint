// Maps a product to the coarse "family" used to pick relevant design-studio
// templates (see @/data/design-studio-assets) — derived from the product's
// top-level category, one of the five root categories in @/data/categories.

import { getCategoryAncestors } from "@/lib/catalog";
import type { Product } from "@/data/products";
import type { ProductFamily } from "@/data/design-studio-assets";

const VALID_FAMILIES: ProductFamily[] = ["stickers", "labels", "boxes", "business-cards", "banners"];

export function getProductFamily(product: Product): ProductFamily | undefined {
  const topSlug = getCategoryAncestors(product.categoryId)[0]?.slug;
  return VALID_FAMILIES.find((family) => family === topSlug);
}
