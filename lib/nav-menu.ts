// Builds the site nav's 6 top-level groups from the real category/product
// data. The catalog itself still has legacy standalone top-level categories
// (Stickers, Labels, Boxes & Packaging, Business Cards, Banners & Signage)
// left over from earlier seeding passes — NAV_GROUPS below is the one place
// that says where each of those now surfaces in navigation, either merged
// into an existing same-topic heading or added as its own heading. Every
// subcategory/product actually shown is still read live from @/data.

import { categories, type Category } from "@/data/categories";
import { getSubcategories, getProductsByCategory } from "@/lib/catalog";

interface NavGroupConfig {
  label: string;
  /** The modern top-level category that owns this nav group's primary columns. */
  primaryCategoryId: string;
  /** Legacy category id -> id of an existing heading (child of primaryCategoryId) whose product list it should be folded into. */
  mergeIntoHeading?: Record<string, string[]>;
  /** Legacy top-level category ids that get their own extra heading (no same-topic heading already exists to merge into). */
  extraHeadingCategoryIds?: string[];
}

const NAV_GROUPS: NavGroupConfig[] = [
  {
    label: "Business Prints",
    primaryCategoryId: "cat-business-prints",
    mergeIntoHeading: { "cat-bp-business-cards": ["cat-business-cards"] },
  },
  {
    label: "Promo Prints",
    primaryCategoryId: "cat-promo-prints",
    mergeIntoHeading: { "cat-pp-stickers-labels": ["cat-stickers", "cat-labels"] },
  },
  {
    label: "Large Prints",
    primaryCategoryId: "cat-large-prints",
    extraHeadingCategoryIds: ["cat-banners"],
  },
  {
    label: "Gift Prints",
    primaryCategoryId: "cat-gift-prints",
  },
  {
    label: "T-shirt Prints",
    primaryCategoryId: "cat-tshirt-prints",
  },
  {
    label: "Packaging",
    primaryCategoryId: "cat-packaging",
    extraHeadingCategoryIds: ["cat-boxes"],
  },
];

/** Deterministic placeholder image pool — swap for real photography later. */
const PLACEHOLDER_IMAGE_COUNT = 35;
function placeholderImage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const index = (hash % PLACEHOLDER_IMAGE_COUNT) + 1;
  return `/images/${index}.webp`;
}

export interface MegaMenuProductLink {
  name: string;
  slug: string;
  image: string;
}

export interface MegaMenuHeading {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: MegaMenuProductLink[];
}

export interface MegaMenuGroup {
  label: string;
  slug: string;
  image: string;
  headings: MegaMenuHeading[];
}

function findCategory(id: string): Category {
  const found = categories.find((c) => c.id === id);
  if (!found) throw new Error(`nav-menu: unknown category id "${id}"`);
  return found;
}

function buildHeading(category: Category, extraCategoryIds: string[] = []): MegaMenuHeading {
  let products = getProductsByCategory(category.id, { includeSubcategories: true });
  for (const extraId of extraCategoryIds) {
    products = products.concat(getProductsByCategory(extraId, { includeSubcategories: true }));
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.seo?.description ?? "",
    image: placeholderImage(category.id),
    products: products.map((p) => ({
      name: p.name,
      slug: p.slug,
      image: placeholderImage(p.id),
    })),
  };
}

export function getMegaMenuGroups(): MegaMenuGroup[] {
  return NAV_GROUPS.map((config) => {
    const primary = findCategory(config.primaryCategoryId);
    const directChildren = getSubcategories(primary.id);

    const headings = directChildren.map((child) =>
      buildHeading(child, config.mergeIntoHeading?.[child.id] ?? [])
    );

    for (const extraId of config.extraHeadingCategoryIds ?? []) {
      headings.push(buildHeading(findCategory(extraId)));
    }

    return {
      label: config.label,
      slug: primary.slug,
      image: placeholderImage(primary.id),
      headings,
    };
  });
}
