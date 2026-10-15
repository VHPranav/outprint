"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface ShowcaseItem {
  slug: string;
  name: string;
  image: string;
}

const INTERVAL_MS = 4500;

/** Visual state for a card `diff` slots away from the active one (0 = centre). */
function slotStyle(diff: number): React.CSSProperties {
  const abs = Math.abs(diff);
  if (abs > 1) {
    return {
      transform: `translate(-50%, -50%) translateX(${Math.sign(diff) * 70}%) scale(0.6)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none",
    };
  }
  if (abs === 1) {
    return {
      transform: `translate(-50%, -50%) translateX(${diff * 46}%) scale(0.78)`,
      opacity: 0.55,
      zIndex: 10,
    };
  }
  return { transform: "translate(-50%, -50%) scale(1)", opacity: 1, zIndex: 20 };
}

/** Coverflow-style rotating product showcase for the hero. */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const total = items.length;
  const [index, setIndex] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const next = React.useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = React.useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const autoplaying = !hovering && !reducedMotion && total > 1;

  React.useEffect(() => {
    if (!autoplaying) return;
    const timer = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, autoplaying, next]);

  if (total === 0) return null;
  const active = items[index];

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      <div
        className="relative h-[380px] w-full sm:h-[460px] lg:h-[520px]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (delta > 45) next();
          else if (delta < -45) prev();
          touchStartX.current = null;
        }}
        aria-roledescription="carousel"
        aria-label="Featured products"
      >
        {items.map((item, i) => {
          let diff = (i - index) % total;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;
          const isCenter = diff === 0;

          return (
            <div
              key={item.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${item.name}`}
              aria-hidden={Math.abs(diff) > 1}
              onClick={isCenter ? undefined : () => setIndex(i)}
              className={`absolute left-1/2 top-1/2 aspect-[4/5] h-full overflow-hidden rounded-[28px] bg-neutral-200 transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCenter
                  ? "shadow-[0_30px_70px_-20px_rgba(15,23,42,0.45)]"
                  : "cursor-pointer shadow-[0_18px_45px_-15px_rgba(15,23,42,0.3)] hover:opacity-90"
              }`}
              style={slotStyle(diff)}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={Math.abs(diff) <= 1}
                sizes="(min-width: 1024px) 420px, 70vw"
                className="object-cover"
              />
              {isCenter && (
                <Link
                  href={`/product/${item.slug}`}
                  className="group absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4"
                >
                  <p className="min-w-0 truncate text-sm font-medium text-neutral-950 sm:text-base">{item.name}</p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous product"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-800 backdrop-blur-sm transition-colors hover:border-black/30 hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5" aria-hidden>
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              tabIndex={-1}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-900/25 hover:bg-neutral-900/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next product"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-800 backdrop-blur-sm transition-colors hover:border-black/30 hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>

      <p className="sr-only" aria-live="polite">
        Showing {active.name}
      </p>
    </div>
  );
}
