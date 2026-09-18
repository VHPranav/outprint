"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const CAROUSEL_CARD_CLASS =
  "group flex flex-col snap-start shrink-0 w-[78vw] sm:w-[46vw] md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-3*1.25rem)/4)] xl:w-[calc((100%-4*1.25rem)/5)]";

export interface SectionCarouselProps {
  id?: string;
  title: string;
  subtitle: string;
  exploreHref?: string;
  exploreLabel?: string;
  theme?: "light" | "dark";
  ariaLabel: string;
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
}

export function SectionCarousel({
  id,
  title,
  subtitle,
  exploreHref,
  exploreLabel = "Explore Now",
  theme = "light",
  ariaLabel,
  children,
  sectionClassName,
  containerClassName,
}: SectionCarouselProps) {
  const isDark = theme === "dark";
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const updateArrows = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id={id}
      className={
        sectionClassName ??
        (isDark ? "bg-black py-16 sm:py-24" : "bg-white py-16 sm:py-24")
      }
    >
      <div className={containerClassName ?? "mx-auto w-[90%] max-w-[1600px]"}>
        {/* Header: Title & Subtitle on left; Explore Now + Circular Chevrons on right */}
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-[#111111]"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed max-w-xl ${
                isDark ? "text-white/70" : "text-neutral-500"
              }`}
            >
              {subtitle}
            </p>
          </div>

          {/* Action Row: Optional Explore Now button + Circular Chevrons */}
          <div
            className={`flex items-center gap-3 sm:gap-4 shrink-0 self-end ${
              exploreHref ? "w-full sm:w-auto justify-between sm:justify-end" : "justify-end"
            }`}
          >
            {exploreHref && (
              <Link
                href={exploreHref}
                className={
                  isDark
                    ? "inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:border-white hover:bg-neutral-800 active:scale-[0.98]"
                    : "inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 shadow-sm transition-all hover:border-black hover:bg-neutral-50 active:scale-[0.98]"
                }
              >
                {exploreLabel}
              </Link>
            )}

            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                aria-label={`Previous ${ariaLabel}`}
                disabled={!canScrollLeft}
                onClick={() => scroll(-1)}
                className={
                  isDark
                    ? "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition-all hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    : "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-neutral-300 text-neutral-800 transition-all hover:bg-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                }
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                type="button"
                aria-label={`Next ${ariaLabel}`}
                disabled={!canScrollRight}
                onClick={() => scroll(1)}
                className={
                  isDark
                    ? "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    : "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                }
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Track */}
        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            role="region"
            aria-label={ariaLabel}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 [-webkit-overflow-scrolling:touch]"
          >
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
