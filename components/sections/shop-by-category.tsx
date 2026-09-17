import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories, type Category } from "@/data/categories";
import { getProductsByCategory, getSubcategories } from "@/lib/catalog";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";

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

export function ShopByCategory() {
  const featured = FEATURED_CATEGORY_IDS.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is Category => Boolean(c)
  );

  return (
    <section id="categories" className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111]">
            Shop by category
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Jump straight to what you need — everything is fully customizable.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel ariaLabel="Shop by category" trackClassName="gap-5 px-1 py-1">
            {featured.map((category) => {
              const productCount = getProductsByCategory(category.id).length;
              const subcategories = getSubcategories(category.id);
              const subtitle =
                category.promoTile?.label ||
                (subcategories.length > 0
                  ? subcategories.slice(0, 3).map((s) => s.name).join(", ")
                  : "Explore custom options");

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border-none bg-neutral-100 transition-all hover:shadow-card-hover sm:w-72"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAF9]">
                    <Image
                      src={category.bannerImage}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-100 via-neutral-100/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
                        Explore Category
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      {productCount > 0 ? `${productCount} Products` : "Category"}
                    </span>
                    <h3 className="mt-1 font-serif text-base leading-snug text-neutral-900 group-hover:text-black">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                      {subtitle}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-sm text-neutral-600">
                      <span className="text-xs text-neutral-500">
                        {subcategories.length > 0
                          ? `${subcategories.length} sub-categories`
                          : "Custom prints"}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-black group-hover:underline">
                        Explore{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
