"use client";

import { DESIGN_ELEMENTS } from "@/data/design-studio-assets";

interface PanelElementsProps {
  onAdd: (src: string) => void;
}

export function PanelElements({ onAdd }: PanelElementsProps) {
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500">Simple clipart — recolor from the properties panel once placed.</p>
      <div className="grid grid-cols-4 gap-2.5">
        {DESIGN_ELEMENTS.map((element) => (
          <button
            key={element.id}
            type="button"
            onClick={() => onAdd(element.src)}
            title={element.name}
            className="flex aspect-square items-center justify-center rounded-xl border border-[#E5E5E5] p-3 transition-colors hover:border-black"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={element.src} alt={element.name} className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
