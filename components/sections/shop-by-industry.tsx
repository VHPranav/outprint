import * as React from "react";
import Link from "next/link";
import { Utensils, Shirt, Sparkles, ShoppingBag, PartyPopper, Building2 } from "lucide-react";

const industries = [
  {
    label: "Food & Beverage",
    description: "Labels, packaging & menu collateral",
    icon: Utensils,
    href: "/category/labels",
  },
  {
    label: "Fashion & Apparel",
    description: "Hang tags, care labels & mailers",
    icon: Shirt,
    href: "/category/boxes",
  },
  {
    label: "Beauty & Cosmetics",
    description: "Product labels & branded boxes",
    icon: Sparkles,
    href: "/category/product-labels",
  },
  {
    label: "E-commerce & DTC",
    description: "Mailers, stickers & packaging inserts",
    icon: ShoppingBag,
    href: "/category/boxes",
  },
  {
    label: "Events & Weddings",
    description: "Invitations, stationery & banners",
    icon: PartyPopper,
    href: "/category/business-cards",
  },
  {
    label: "Corporate & Office",
    description: "Business cards & branded signage",
    icon: Building2,
    href: "/category/business-cards",
  },
];

export function ShopByIndustry() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10 max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
            Shop by industry
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Not sure where to start? Browse by what you&apos;re actually building.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ label, description, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-start gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-colors hover:border-neutral-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F4] text-neutral-700 transition-colors group-hover:bg-black group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg text-neutral-900">{label}</h3>
                <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
