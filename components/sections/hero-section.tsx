"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { TenthFormation } from "@/components/ui/UnspokenFormation";

interface HeroSectionProps {
  onOpenProof: () => void;
  onRequestSample: () => void;
}

export function HeroSection({ onRequestSample }: HeroSectionProps) {
  return (
    <TenthFormation className="min-h-screen pt-16 bg-white">
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-8">

        {/* Punchy 2-Line Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-[-0.035em] text-[#111111] leading-[1.05] text-balance">
          Tactile objects,<br />
          on demand.
        </h1>

        {/* Clean 1-Line Subtitle */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-500 font-normal max-w-md mx-auto leading-relaxed text-balance">
          Engineered print, luxury packaging, and archival stationery for modern brands.
        </p>

        {/* Minimal Pill CTA */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRequestSample}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-medium text-sm transition-all shadow-sm hover:scale-105"
          >
            <span>Order Sample Box</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </TenthFormation>
  );
}

