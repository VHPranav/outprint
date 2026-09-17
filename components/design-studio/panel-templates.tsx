"use client";

import * as React from "react";
import { sortTemplatesByFamily, type ProductFamily } from "@/data/design-studio-assets";

interface PanelTemplatesProps {
  family?: ProductFamily;
  onApply: (src: string) => void;
}

export function PanelTemplates({ family, onApply }: PanelTemplatesProps) {
  const templates = React.useMemo(() => sortTemplatesByFamily(family), [family]);

  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500">
        Starter layouts sized to your canvas. Applying one replaces your current design.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onApply(template.src)}
            className="group flex flex-col gap-1.5 rounded-xl border border-[#E5E5E5] p-2 text-left transition-colors hover:border-black"
          >
            <span className="block aspect-square overflow-hidden rounded-lg bg-[#FAFAF9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={template.src}
                alt={template.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </span>
            <span className="px-0.5 text-xs font-medium text-neutral-700">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
