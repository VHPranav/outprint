import * as React from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, Truck } from "lucide-react";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/catalog";
import { HeroShowcase, type ShowcaseItem } from "./hero-showcase";

// Lifestyle photography shown in the rotating showcase, in order.
const SHOWCASE_SLUGS = [
  "gold-foil-black-cards",
  "standard-letterheads",
  "c5-custom-envelopes",
  "premium-certificates",
  "letterpress-cotton-business-cards",
  "pre-ink-stamp",
];

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "Free digital proof before print" },
  { icon: MessageCircle, label: "Every order confirmed on WhatsApp" },
  { icon: Truck, label: "Delivery across all 7 Emirates" },
];

export function HeroSection() {
  const showcase: ShowcaseItem[] = SHOWCASE_SLUGS.map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ slug: p.slug, name: p.name, image: p.images[0] }));
  const productCount = Math.floor(products.length / 10) * 10;

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-gradient-to-b from-brand-blue/60 via-brand-blue/20 to-white pt-16 text-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-white/60 blur-3xl"
      />

      <div className="relative mx-auto grid w-[90%] max-w-[1400px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 my-auto">
        {/* Copy */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
            Print &amp; packaging studio · UAE
          </span>

          <h1 className="mt-6 text-[2.6rem] font-medium leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-6xl lg:text-[4.25rem]">
            Print that makes your brand look{" "}
premium.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg">
            Business cards, stationery and packaging finished to a standard your customers notice.
            Design online, use a template or upload your own artwork.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/design-studio"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Start designing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#popular-categories"
              className="inline-flex h-12 items-center rounded-full border border-black/15 bg-white/70 px-7 text-sm font-medium text-neutral-900 backdrop-blur-sm transition-colors hover:border-black/40 hover:bg-white"
            >
              Browse {productCount}+ products
            </Link>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-black/10 pt-6 text-sm text-neutral-700 sm:grid-cols-3 sm:gap-4">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" strokeWidth={1.75} />
                <span className="leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rotating product showcase */}
        <div className="animate-fade-in">
          <HeroShowcase items={showcase} />
        </div>
      </div>
    </section>
  );
}
