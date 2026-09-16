"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Cards are placed on the wall of a shallow conical frustum whose narrow
 * mouth sits at the hero's center (receding, hidden behind the copy) and
 * whose wide rim runs along the viewport edges (closest to the viewer).
 * `angle` is the position around that rim; `radius` is how far out along
 * the frustum wall the card sits — smaller radius reads as further away
 * (small, faint, near the center), larger radius as closer (big, sharp,
 * near the edge). Rotation is derived from horizontal position, so cards
 * fan outward like shingles on the cone rather than rotating arbitrarily.
 */
interface Geometry {
  top: number;
  left: number;
  width: number;
  height: number;
  rotate: number;
  depth: number;
}

function frustumSlot(
  angleDeg: number,
  radius: number,
  aspect: number
): Geometry {
  const spreadX = 1.1;
  const squashY = 0.95;
  const t = Math.min(1, Math.max(0, (radius - 30) / 26));

  // Push the placement radius out a bit further than the raw "how far
  // along the frustum" radius so cards bleed off the viewport edges
  // rather than sitting fully inside it.
  const posRadius = radius * 1.2;
  const rad = (angleDeg * Math.PI) / 180;
  const left = 50 + posRadius * spreadX * Math.cos(rad);
  const top = 50 - posRadius * squashY * Math.sin(rad);

  const width = Math.round(150 + t * 140);
  const height = Math.round(width * aspect);
  const depth = Math.round((0.24 + t * 0.72) * 100) / 100;

  const dx = left - 50;
  const rotate = Math.max(-16, Math.min(16, -dx * 0.34));

  return {
    top: Math.round(top * 100) / 100,
    left: Math.round(left * 100) / 100,
    width,
    height,
    rotate: Math.round(rotate * 10) / 10,
    depth,
  };
}

interface PhotoCard extends Geometry {
  kind: "photo";
  id: string;
  seed: string;
  filter?: string;
  headline?: string;
  cta?: string;
  textPos?: "top" | "bottom";
}

interface PanelCard extends Geometry {
  kind: "panel";
  id: string;
  bg: string;
  lines: string[];
  sub?: string;
}

type CardConfig = PhotoCard | PanelCard;

const CARDS: CardConfig[] = [
  {
    kind: "photo", id: "c1", ...frustumSlot(200, 46, 0.82),
    seed: "outprint-b01", filter: "sepia(0.18) saturate(1.3) hue-rotate(-6deg)",
    headline: "Fold at the edge, not the seam.", cta: "Shop now", textPos: "top",
  },
  {
    kind: "photo", id: "c2", ...frustumSlot(235, 42, 1.25),
    seed: "outprint-b02", filter: "sepia(0.1) saturate(1.15)",
  },
  {
    kind: "photo", id: "c3", ...frustumSlot(305, 38, 0.7),
    seed: "outprint-b03", filter: "sepia(0.22) saturate(1.25) hue-rotate(4deg)",
  },
  {
    kind: "photo", id: "c4", ...frustumSlot(340, 44, 1.15),
    seed: "outprint-b04", filter: "sepia(0.08) saturate(1.2)",
    headline: "Your lightest run yet.", cta: "Shop the edit", textPos: "bottom",
  },

  {
    kind: "photo", id: "c5", ...frustumSlot(172, 50, 1.1),
    seed: "outprint-b05", filter: "sepia(0.2) saturate(1.3) hue-rotate(-8deg)",
    headline: "Made to move with you.", cta: "Shop the collection", textPos: "bottom",
  },
  {
    kind: "panel", id: "c6", ...frustumSlot(18, 40, 1.25),
    bg: "#EDE7DA", lines: ["Studio", "Notes"], sub: "No. 07",
  },

  {
    kind: "photo", id: "c7", ...frustumSlot(150, 46, 1.25),
    seed: "outprint-b06", filter: "sepia(0.25) saturate(1.3) hue-rotate(10deg)",
    headline: "Fold. Cut. Repeat.", cta: "Shop now", textPos: "top",
  },
  {
    kind: "photo", id: "c8", ...frustumSlot(118, 52, 1.2),
    seed: "outprint-b07", filter: "sepia(0.1) saturate(1.1)",
  },
  {
    kind: "panel", id: "c9", ...frustumSlot(28, 46, 1.2),
    bg: "#F5F3EE", lines: ["The Atelier", "Collection"], sub: "New season, now shipping",
  },

  {
    kind: "photo", id: "c10", ...frustumSlot(72, 48, 1.15),
    seed: "outprint-b08", filter: "sepia(0.16) saturate(1.2)",
  },
  {
    kind: "photo", id: "c11", ...frustumSlot(48, 48, 1.15),
    seed: "outprint-b09", filter: "sepia(0.1) saturate(1.15) hue-rotate(-4deg)",
    headline: "Zero microplastic. Full texture.", cta: "Shop now", textPos: "bottom",
  },

  {
    kind: "photo", id: "c12", ...frustumSlot(95, 44, 1.05),
    seed: "outprint-b10", filter: "sepia(0.14) saturate(1.2) hue-rotate(6deg)",
  },
  {
    kind: "photo", id: "c13", ...frustumSlot(0, 36, 1.2),
    seed: "outprint-b11", filter: "sepia(0.12) saturate(1.15)",
    headline: "Heavy cotton, light footprint.", cta: "Shop now", textPos: "bottom",
  },
  {
    kind: "photo", id: "c14", ...frustumSlot(265, 48, 1.3),
    seed: "outprint-b12", filter: "sepia(0.2) saturate(1.25) hue-rotate(-5deg)",
  },
  {
    kind: "photo", id: "c15", ...frustumSlot(322, 40, 0.9),
    seed: "outprint-b13", filter: "sepia(0.18) saturate(1.3) hue-rotate(8deg)",
    headline: "Order the Substrate Box.", cta: "Shop now", textPos: "top",
  },
  {
    kind: "panel", id: "c16", ...frustumSlot(252, 40, 0.85),
    bg: "#E8E2D3", lines: ["Kraft", "No. 12"], sub: "600+ gsm",
  },
];

function imgSrc(seed: string, w: number, h: number) {
  const dpr = 2;
  return `https://picsum.photos/seed/${seed}/${w * dpr}/${h * dpr}`;
}

function CardBody({ card }: { card: CardConfig }) {
  if (card.kind === "panel") {
    return (
      <div
        className="w-full h-full flex flex-col justify-between p-4"
        style={{ backgroundColor: card.bg }}
      >
        <div>
          {card.lines.map((line) => (
            <span
              key={line}
              className="block font-serif text-lg leading-tight text-neutral-900"
            >
              {line}
            </span>
          ))}
        </div>
        {card.sub ? (
          <span className="text-[11px] font-sans text-neutral-500">
            {card.sub}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc(card.seed, card.width, card.height)}
        alt=""
        width={card.width}
        height={card.height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{ filter: card.filter }}
        draggable={false}
      />
      {card.headline ? (
        <div
          className={cn(
            "absolute inset-x-0 flex flex-col gap-2 p-3.5",
            card.textPos === "top"
              ? "top-0 bg-gradient-to-b from-black/65 via-black/10 to-transparent"
              : "bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
          )}
        >
          <span className="font-sans font-semibold text-[15px] leading-snug text-white drop-shadow-sm">
            {card.headline}
          </span>
          {card.cta ? (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-neutral-900">
              {card.cta}
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function HeroParallaxField() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const target = React.useRef({ x: 0, y: 0 });
  const current = React.useRef({ x: 0, y: 0 });
  const rafId = React.useRef<number>();

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const applyTransform = (px: number, py: number) => {
      const maxOffset = 30; // px
      const maxTiltDelta = 3; // deg, subtle extra spin on top of resting rotation
      CARDS.forEach((c) => {
        const el = cardRefs.current.get(c.id);
        if (!el) return;
        const tx = px * maxOffset * c.depth;
        const ty = py * maxOffset * c.depth;
        const rot = c.rotate + px * maxTiltDelta * c.depth;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    };

    if (prefersReducedMotion) {
      applyTransform(0, 0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      target.current.x = Math.min(1, Math.max(-1, (x - 0.5) * 2));
      target.current.y = Math.min(1, Math.max(-1, (y - 0.5) * 2));
    };

    const handleLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.07;
      current.current.y += (target.current.y - current.current.y) * 0.07;
      applyTransform(current.current.x, current.current.y);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          "[mask-image:radial-gradient(circle_at_center,transparent_0%,transparent_40%,black_68%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_center,transparent_0%,transparent_40%,black_68%)]"
        )}
      >
        {CARDS.map((c) => (
          <div
            key={c.id}
            ref={(el) => {
              if (el) cardRefs.current.set(c.id, el);
            }}
            className="absolute will-change-transform rounded-2xl overflow-hidden bg-neutral-100 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.28)]"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: c.width,
              height: c.height,
              transform: `rotate(${c.rotate}deg)`,
            }}
          >
            <CardBody card={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
