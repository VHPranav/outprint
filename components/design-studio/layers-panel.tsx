"use client";

import { Eye, EyeOff, Lock, Unlock, ChevronUp, ChevronDown, Layers as LayersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LayerInfo } from "./types";

interface LayersPanelProps {
  layers: LayerInfo[];
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onToggleLock: (id: string) => void;
  onMove: (id: string, direction: "forward" | "backward") => void;
}

export function LayersPanel({ layers, onSelect, onToggleVisible, onToggleLock, onMove }: LayersPanelProps) {
  if (!layers.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <LayersIcon className="h-5 w-5 text-neutral-300" />
        <p className="text-xs text-neutral-400">Nothing on the canvas yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {layers.map((layer, index) => (
        <div
          key={layer.id}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 transition-colors",
            layer.selected ? "bg-neutral-100" : "hover:bg-neutral-50"
          )}
        >
          <button
            type="button"
            onClick={() => onSelect(layer.id)}
            className="min-w-0 flex-1 truncate px-1 text-left text-xs font-medium text-neutral-800"
          >
            {layer.name}
          </button>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => onMove(layer.id, "forward")}
              disabled={index === 0}
              aria-label="Move layer up"
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900 disabled:opacity-30"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMove(layer.id, "backward")}
              disabled={index === layers.length - 1}
              aria-label="Move layer down"
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900 disabled:opacity-30"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onToggleLock(layer.id)}
              aria-label={layer.locked ? "Unlock layer" : "Lock layer"}
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900"
            >
              {layer.locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => onToggleVisible(layer.id)}
              aria-label={layer.visible ? "Hide layer" : "Show layer"}
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900"
            >
              {layer.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
