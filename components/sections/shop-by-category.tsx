"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories, type Category } from "@/data/categories";
import { SectionCarousel, CAROUSEL_CARD_CLASS } from "@/components/ui/section-carousel";

// Curated storefront categories in display order
const FEATURED_CATEGORY_IDS = [
  "cat-business-prints",
  "cat-promo-prints",
  "cat-stickers",
  "cat-packaging",
  "cat-tshirt-prints",
  "cat-large-prints",
  "cat-gift-prints",
  "cat-business-cards",
  "cat-labels",
  "cat-banners",
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "cat-business-prints":
    "Letterheads, envelopes, presentation folders and stationery for everyday office use.",
  "cat-promo-prints":
    "High-impact flyers, brochures, posters and marketing collateral for campaigns.",
  "cat-stickers":
    "Custom die-cut, holographic and sheet stickers in premium weatherproof finishes.",
  "cat-packaging":
    "Corrugated mailer boxes, rigid gift boxes, paper bags and custom shipping supplies.",
  "cat-tshirt-prints":
    "Custom printed and embroidered round-neck tees, polos and corporate apparel.",
  "cat-large-prints":
    "Roll-up banners, canvas prints, foam boards, sunboards and exhibition displays.",
  "cat-gift-prints":
    "Personalized mugs, drinkware, notebooks, power banks and executive corporate gifts.",
  "cat-business-cards":
    "Luxury suede, cotton letterpress and foil-accented cards that leave a mark.",
  "cat-labels":
    "Product and packaging roll labels with waterproof, oil-resistant and matte coatings.",
  "cat-banners":
    "Heavy-duty outdoor vinyl and wind-resistant mesh banners for events and storefronts.",
};

export function ShopByCategory() {
  const featured = FEATURED_CATEGORY_IDS.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is Category => Boolean(c)
  );

  return (
    <SectionCarousel
      id="categories"
      title="Shop by category"
      subtitle="Jump straight to what you need — everything is fully customizable."
      ariaLabel="Shop by category carousel"
      sectionClassName="bg-white py-16 sm:py-24"
    >
      {featured.map((category) => {
        const description =
          CATEGORY_DESCRIPTIONS[category.id] ||
          category.promoTile?.label ||
          category.seo?.description ||
          "Fully customizable prints with fast delivery across the UAE.";

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={CAROUSEL_CARD_CLASS}
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl sm:rounded-[22px] bg-neutral-100">
              <Image
                src={category.bannerImage}
                alt={category.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between pt-3.5 sm:pt-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-black transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Explore Now button on each individual category card */}
              <div className="mt-4 pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 shadow-sm transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                  Explore Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </SectionCarousel>
  );
}
