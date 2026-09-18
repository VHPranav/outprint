// Thin read layer over the static /data files, so pages/components never
// import from @/data directly or re-implement lookup/tree-building logic.

import { categories, type Category } from "@/data/categories";
import { products, type Product } from "@/data/products";

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Rebuilds the flat, parentId-linked category list into a nested tree. */
export function getCategoryTree(): CategoryNode[] {
  const nodesById = new Map<string, CategoryNode>(
    categories.map((category) => [category.id, { ...category, children: [] }])
  );

  const roots: CategoryNode[] = [];

  for (const category of categories) {
    const node = nodesById.get(category.id)!;
    if (category.parentId) {
      const parent = nodesById.get(category.parentId);
      if (parent) {
        parent.children.push(node);
        continue;
      }
    }
    roots.push(node);
  }

  return roots;
}

function findCategory(categoryIdOrSlug: string): Category | undefined {
  return categories.find(
    (category) => category.id === categoryIdOrSlug || category.slug === categoryIdOrSlug
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/**
 * Image for a category tile: a real product photo from the category (or its
 * sub-categories), falling back to the category's banner placeholder when it
 * has no products yet. Several banner placeholders are shared stock photos,
 * so product photography reads better and stays consistent with the catalog.
 */
export function getCategoryImage(category: Category): string {
  return getProductsByCategory(category.id)[0]?.images[0] ?? category.bannerImage;
}

/** Direct children of a category (not grandchildren) — used for sub-category tile grids. */
export function getSubcategories(categoryIdOrSlug: string): Category[] {
  const category = findCategory(categoryIdOrSlug);
  if (!category) return [];
  return categories.filter((c) => c.parentId === category.id);
}

/** The category's ancestor chain from the root down to (and including) itself — for breadcrumbs. */
export function getCategoryAncestors(categoryIdOrSlug: string): Category[] {
  const category = findCategory(categoryIdOrSlug);
  if (!category) return [];

  const chain: Category[] = [category];
  let current = category;
  while (current.parentId) {
    const parent = categories.find((c) => c.id === current.parentId);
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }
  return chain;
}

/** Collects a category's id plus every descendant category's id. */
function collectCategoryIds(rootId: string): Set<string> {
  const ids = new Set<string>([rootId]);
  let added = true;

  while (added) {
    added = false;
    for (const category of categories) {
      if (category.parentId && ids.has(category.parentId) && !ids.has(category.id)) {
        ids.add(category.id);
        added = true;
      }
    }
  }

  return ids;
}

export interface GetProductsByCategoryOptions {
  /** Also include products from every descendant sub-category. Defaults to true. */
  includeSubcategories?: boolean;
}

export function getProductsByCategory(
  categoryIdOrSlug: string,
  options: GetProductsByCategoryOptions = {}
): Product[] {
  const { includeSubcategories = true } = options;

  const category = findCategory(categoryIdOrSlug);
  if (!category) return [];

  if (!includeSubcategories) {
    return products.filter((product) => product.categoryId === category.id);
  }

  const categoryIds = collectCategoryIds(category.id);
  return products.filter((product) => categoryIds.has(product.categoryId));
}

/** Case-insensitive substring search over product name/description. Empty query returns no results. */
export function searchProducts(query: string, limit = 6): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return products
    .filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(needle)
    )
    .slice(0, limit);
}
