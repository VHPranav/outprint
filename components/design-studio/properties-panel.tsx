"use client";

import * as React from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import { FONT_OPTIONS } from "@/data/design-studio-assets";
import { resolveFontFamily } from "./canvas-utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { SelectedObjectProps } from "./types";

interface PropertiesPanelProps {
  selected: SelectedObjectProps | null;
  onUpdate: (patch: Record<string, unknown>) => void;
}

function IconToggle({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
        active ? "border-black bg-black text-white" : "border-[#E5E5E5] text-neutral-600 hover:border-neutral-400"
      )}
    >
      {children}
    </button>
  );
}

export function PropertiesPanel({ selected, onUpdate }: PropertiesPanelProps) {
  const fonts = React.useMemo(
    () => FONT_OPTIONS.map((option) => ({ label: option.label, family: resolveFontFamily(option) })),
    []
  );

  if (!selected) {
    return (
      <p className="text-xs leading-relaxed text-neutral-400">
        Select an object on the canvas to edit its properties here.
      </p>
    );
  }

  const isBold = selected.fontWeight === 700 || selected.fontWeight === "bold";
  const isItalic = selected.fontStyle === "italic";

  return (
    <div className="space-y-5">
      {selected.isText && (
        <>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Font
            </label>
            <Select
              value={selected.fontFamily ?? fonts[0]?.family}
              onValueChange={(value) => onUpdate({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font.label} value={font.family}>
                    <span style={{ fontFamily: font.family }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Size
            </label>
            <input
              type="number"
              min={6}
              max={400}
              value={Math.round(selected.fontSize ?? 24)}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) || 1 })}
              className="h-9 w-full rounded-lg border border-[#E5E5E5] px-3 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <IconToggle active={isBold} onClick={() => onUpdate({ fontWeight: isBold ? 400 : 700 })} label="Bold">
              <Bold className="h-4 w-4" />
            </IconToggle>
            <IconToggle
              active={isItalic}
              onClick={() => onUpdate({ fontStyle: isItalic ? "normal" : "italic" })}
              label="Italic"
            >
              <Italic className="h-4 w-4" />
            </IconToggle>
            <IconToggle
              active={!!selected.underline}
              onClick={() => onUpdate({ underline: !selected.underline })}
              label="Underline"
            >
              <Underline className="h-4 w-4" />
            </IconToggle>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Alignment
            </label>
            <div className="flex items-center gap-2">
              {[
                { value: "left", icon: AlignLeft },
                { value: "center", icon: AlignCenter },
                { value: "right", icon: AlignRight },
                { value: "justify", icon: AlignJustify },
              ].map(({ value, icon: Icon }) => (
                <IconToggle
                  key={value}
                  active={selected.textAlign === value}
                  onClick={() => onUpdate({ textAlign: value })}
                  label={`Align ${value}`}
                >
                  <Icon className="h-4 w-4" />
                </IconToggle>
              ))}
            </div>
          </div>
        </>
      )}

      {!selected.isImage && (
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            {selected.isText ? "Text Color" : "Fill"}
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={selected.fill ?? "#111111"}
              onChange={(e) => onUpdate({ fill: e.target.value })}
              className="h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-[#E5E5E5] bg-white p-1"
            />
            <span className="font-mono text-xs text-neutral-500">{selected.fill ?? "#111111"}</span>
          </div>
        </div>
      )}

      {selected.isShape && (
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Border
          </label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              value={selected.stroke ?? "#000000"}
              onChange={(e) => onUpdate({ stroke: e.target.value })}
              className="h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-[#E5E5E5] bg-white p-1"
            />
            <input
              type="number"
              min={0}
              max={50}
              value={selected.strokeWidth ?? 0}
              onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) || 0 })}
              className="h-9 w-full rounded-lg border border-[#E5E5E5] px-3 text-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Opacity
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round((selected.opacity ?? 1) * 100)}
          onChange={(e) => onUpdate({ opacity: Number(e.target.value) / 100 })}
          className="w-full accent-black"
        />
      </div>
    </div>
  );
}
