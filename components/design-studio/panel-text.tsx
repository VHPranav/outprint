"use client";

import { Type } from "lucide-react";

interface PanelTextProps {
  onAdd: (preset: "heading" | "subheading" | "body") => void;
}

const PRESETS: { key: "heading" | "subheading" | "body"; label: string; sizeClass: string }[] = [
  { key: "heading", label: "Add a heading", sizeClass: "text-xl font-bold" },
  { key: "subheading", label: "Add a subheading", sizeClass: "text-base font-semibold" },
  { key: "body", label: "Add body text", sizeClass: "text-sm font-normal" },
];

export function PanelText({ onAdd }: PanelTextProps) {
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500">
        Drop in a text box, then fine-tune font, size, color and alignment from the properties panel on the right.
      </p>
      <div className="space-y-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => onAdd(preset.key)}
            className="flex w-full items-center gap-3 rounded-xl border border-[#E5E5E5] px-3.5 py-3 text-left transition-colors hover:border-black"
          >
            <Type className="h-4 w-4 shrink-0 text-neutral-400" />
            <span className={`text-neutral-900 ${preset.sizeClass}`}>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
