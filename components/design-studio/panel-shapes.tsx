"use client";

import { Square, Circle, Triangle, Minus, RectangleHorizontal } from "lucide-react";
import type { ShapeKind } from "./use-design-studio";

interface PanelShapesProps {
  onAdd: (kind: ShapeKind) => void;
}

const SHAPES: { kind: ShapeKind; label: string; icon: typeof Square }[] = [
  { kind: "rect", label: "Rectangle", icon: Square },
  { kind: "rounded-rect", label: "Rounded", icon: RectangleHorizontal },
  { kind: "circle", label: "Circle", icon: Circle },
  { kind: "triangle", label: "Triangle", icon: Triangle },
  { kind: "line", label: "Line", icon: Minus },
];

export function PanelShapes({ onAdd }: PanelShapesProps) {
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500">Basic shapes — color and border are editable once placed.</p>
      <div className="grid grid-cols-3 gap-2.5">
        {SHAPES.map(({ kind, label, icon: Icon }) => (
          <button
            key={kind}
            type="button"
            onClick={() => onAdd(kind)}
            className="flex flex-col items-center gap-2 rounded-xl border border-[#E5E5E5] py-4 text-center transition-colors hover:border-black"
          >
            <Icon className="h-6 w-6 text-neutral-700" strokeWidth={1.5} />
            <span className="text-[11px] font-medium text-neutral-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
