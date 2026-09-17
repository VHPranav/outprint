"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  /** Classes for the scrollable track (gap, padding, etc.) — items themselves control their own width/shrink/snap-align. */
  trackClassName?: string;
  ariaLabel: string;
  /** Auto-advances the track on an interval; pauses while the pointer is over the carousel. Omit for no autoplay. */
  autoplayIntervalMs?: number;
}

/** Shared horizontal carousel shell: scroll-snap track, edge-fade-free arrow nav, native touch-swipe, optional autoplay. */
export function Carousel({ children, trackClassName, ariaLabel, autoplayIntervalMs }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const isHovering = React.useRef(false);

  const updateArrows = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
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

  const scrollByPage = React.useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    if (!autoplayIntervalMs) return;
    const timer = setInterval(() => {
      if (isHovering.current) return;
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      el.scrollTo(
        atEnd
          ? { left: 0, behavior: "smooth" }
          : { left: el.scrollLeft + el.clientWidth * 0.85, behavior: "smooth" }
      );
    }, autoplayIntervalMs);
    return () => clearInterval(timer);
  }, [autoplayIntervalMs]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch] ${
          trackClassName ?? "gap-4"
        }`}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        disabled={!canScrollLeft}
        onClick={() => scrollByPage(-1)}
        className="absolute -left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-neutral-700 shadow-card transition-all hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        disabled={!canScrollRight}
        onClick={() => scrollByPage(1)}
        className="absolute -right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-neutral-700 shadow-card transition-all hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
