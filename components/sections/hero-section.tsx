"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Package, Zap, Truck, Search } from "lucide-react";
import { getProductBySlug, searchProducts } from "@/lib/catalog";

interface HeroSectionProps {
  onOpenProof: () => void;
  onRequestSample: () => void;
}

const POPULAR_CATEGORIES: { label: string; href: string }[] = [
  { label: "Business Cards", href: "/category/biz-cards" },
  { label: "Stickers", href: "/category/stickers" },
  { label: "Boxes", href: "/category/product-boxes" },
  { label: "Bags", href: "/category/paper-bags" },
  { label: "T-Shirts", href: "/category/round-neck-t-shirts" },
  { label: "Flyers", href: "/category/flyers" },
];

interface HeroFeatureImage {
  slug: string;
  position: string;
  startX: number;
  startY: number;
}

const HERO_FEATURE_IMAGES: HeroFeatureImage[] = [
  { slug: "unisex-heavy-weight-t-shirt", position: "left-[2%] top-[6%] 2xl:left-[6%]", startX: -10, startY: 8 },
  { slug: "vinyl-die-cut-stickers", position: "left-[6%] top-[64%] 2xl:left-[11%]", startX: 8, startY: -10 },
  { slug: "coffee-mugs-gloss-finish", position: "right-[2%] top-[6%] 2xl:right-[6%]", startX: 10, startY: -8 },
  { slug: "kraft-mailer-boxes", position: "right-[6%] top-[64%] 2xl:right-[11%]", startX: -8, startY: 10 },
];

interface Slide {
  badge: string;
  line1: string;
  accent: string;
  line2: string;
  cta: string;
  href: string;
  productSlug: string;
}

const SLIDES: Slide[] = [
  {
    badge: "Premium Quality",
    line1: "High-End Premium",
    accent: "3D Foiled",
    line2: "Business Cards",
    cta: "Order Now",
    href: "/product/gold-foil-black-cards",
    productSlug: "gold-foil-black-cards",
  },
  {
    badge: "Gift-Ready",
    line1: "Rigid Luxury",
    accent: "Gift Boxes",
    line2: "Built to Impress",
    cta: "Order Now",
    href: "/product/rigid-gift-boxes",
    productSlug: "rigid-gift-boxes",
  },
  {
    badge: "Any Shape, Any Size",
    line1: "Custom Die-Cut",
    accent: "Holographic Stickers",
    line2: "That Catch the Light",
    cta: "Order Now",
    href: "/product/holographic-die-cut-stickers",
    productSlug: "holographic-die-cut-stickers",
  },
];

const AUTOPLAY_MS = 5500;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HeroSection({ onOpenProof, onRequestSample }: HeroSectionProps) {
  const [index, setIndex] = React.useState(0);
  const isHovering = React.useRef(false);

  const [query, setQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const searchResults = React.useMemo(() => searchProducts(query, 6), [query]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isHovering.current) return;
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  React.useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".hero-tilt-card");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        startX: Number(card.dataset.startX ?? 0),
        startY: Number(card.dataset.startY ?? 0),
        max: 18,
        "reset-to-start": true,
        perspective: 900,
        speed: 400,
        scale: 1.06,
        glare: true,
        "max-glare": 0.2,
      });
    });
    return () => {
      cards.forEach((card) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (card as any).vanillaTilt?.destroy();
      });
    };
  }, []);

  function go(direction: -1 | 1) {
    setIndex((i) => (i + direction + SLIDES.length) % SLIDES.length);
  }

  const slide = SLIDES[index];
  const product = getProductBySlug(slide.productSlug);

  return (
    <section className="flex min-h-screen flex-col bg-white">
      {/* Platform intro + catalog search */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-16 sm:pt-20">
        {HERO_FEATURE_IMAGES.map((feature) => {
          const featureProduct = getProductBySlug(feature.slug);
          if (!featureProduct) return null;
          return (
            <div
              key={feature.slug}
              className={`hero-tilt-card absolute hidden h-40 w-40 overflow-hidden rounded-3xl shadow-lg xl:block 2xl:h-48 2xl:w-48 ${feature.position}`}
              data-start-x={feature.startX}
              data-start-y={feature.startY}
            >
              <Image
                src={featureProduct.images[0]}
                alt=""
                fill
                sizes="192px"
                className="pointer-events-none object-cover"
              />
            </div>
          );
        })}

        <div className="relative mx-auto w-[90%] max-w-3xl text-center">
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            The All-in-One
            <br />
            <span className="font-serif italic">Print &amp; Packaging</span> Platform
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            Browse templates, design online, or upload your own artwork — every order confirmed by a real person on WhatsApp.
          </p>

          <div ref={searchRef} className="relative mx-auto mt-8 max-w-xl text-left">
            <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-6 py-4 shadow-sm transition-colors focus-within:border-neutral-400">
              <Search className="h-5 w-5 shrink-0 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search 130+ products…"
                className="w-full bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </div>

            {isSearchOpen && query.trim() && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-[#E5E5E5] bg-white p-2 shadow-elevated">
                {searchResults.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-neutral-400">
                    No products found for &quot;{query}&quot;
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <Link
                          href={`/product/${result.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#FAFAF9]"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                            <Image src={result.images[0]} alt={result.name} fill sizes="48px" className="object-cover" />
                          </div>
                          <p className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-900">
                            {result.name}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-neutral-400">Popular:</span>
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-[#FAFAF9]"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Promo carousel + same-day banner */}
      <div className="hidden pb-6 sm:block sm:pb-8">
      <div className="mx-auto grid w-[90%] max-w-[1600px] grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[2fr_1fr]">
        {/* Large promo carousel */}
        <div
          className="group relative h-[260px] overflow-hidden rounded-3xl bg-[#F4F2EE] sm:h-[300px]"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
        >
          <div className="relative flex h-full flex-col justify-center px-8 sm:px-12 lg:px-14">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm">
              <Star className="h-3 w-3 fill-current text-amber-400" />
              {slide.badge}
            </span>

            <h1 className="mt-3 max-w-md text-xl font-medium leading-tight text-[#111111] sm:text-2xl lg:text-3xl">
              {slide.line1}
              <br />
              <span className="font-serif italic text-2xl text-neutral-900 sm:text-3xl lg:text-4xl">
                {slide.accent}
              </span>
              <br />
              {slide.line2}
            </h1>

            <Link
              href={slide.href}
              className="group/cta mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              {slide.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>

          {product && (
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] sm:block">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="40vw"
                className="object-cover object-left"
              />
            </div>
          )}

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.productSlug}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-black" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Small static promo */}
        <div className="relative flex h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-black p-6 text-white sm:h-[300px] sm:p-7">
          <Zap
            className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/[0.06]"
            strokeWidth={1}
          />

          <div className="relative">
            <p className="text-xl font-medium leading-snug sm:text-2xl">Get your Prints</p>
            <p className="font-serif text-3xl italic leading-snug sm:text-4xl">Ready Today</p>
            <p className="mt-2 text-sm text-white/60">Express same-day turnaround</p>
          </div>

          <div className="relative flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
              <Package className="h-3.5 w-3.5" />
              Standard
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
              <Zap className="h-3.5 w-3.5" />
              Urgent
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
              <Truck className="h-3.5 w-3.5" />
              Next Day
            </span>
          </div>

          <Link
            href="#same-day"
            className="group/cta relative inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Explore Products
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
