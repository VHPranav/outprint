import * as React from "react";
import { categories, type Category } from "@/data/categories";
import { Reveal } from "@/components/ui/reveal";
import { BentoCard } from "@/components/ui/bento-card";

// The 6 primary storefront categories, in display order — the same set the
// header's mega menu is built from. See @/lib/nav-menu for the full mapping.
const FEATURED_CATEGORY_IDS = [
  "cat-business-prints",
  "cat-promo-prints",
  "cat-large-prints",
  "cat-gift-prints",
  "cat-tshirt-prints",
  "cat-packaging",
];

const CATEGORY_IMAGES: Record<string, string> = {
  "cat-business-prints": "/images/11.webp",
  "cat-promo-prints": "/images/12.webp",
  "cat-large-prints": "/images/14.webp",
  "cat-gift-prints": "/images/16.webp",
  "cat-tshirt-prints": "/images/20.webp",
  "cat-packaging": "/images/24.webp",
};

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export function ShopByCategory() {
  const featured = FEATURED_CATEGORY_IDS.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is Category => Boolean(c)
  );
  const [heroA, heroB, ...rest] = featured;

  return (
    <section id="categories" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mb-10 max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
            Shop by category
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Every product is fully customizable — start from the category closest to what you need.
          </p>
        </Reveal>

        <div className="flex flex-col gap-5">
          {heroA && heroB && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[heroA, heroB].map((category, i) => (
                <BentoCard
                  key={category.id}
                  href={`/category/${category.slug}`}
                  title={category.name}
                  subtitle={category.seo?.description ? truncate(category.seo.description, 110) : undefined}
                  image={CATEGORY_IMAGES[category.id] || category.bannerImage}
                  variant="grey"
                  large
                  delay={0.05 + i * 0.05}
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((category, i) => (
                <BentoCard
                  key={category.id}
                  href={`/category/${category.slug}`}
                  title={category.name}
                  subtitle={category.seo?.description ? truncate(category.seo.description, 70) : undefined}
                  image={CATEGORY_IMAGES[category.id] || category.bannerImage}
                  variant="grey"
                  delay={0.15 + i * 0.05}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
