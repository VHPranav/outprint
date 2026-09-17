"use client";

import * as React from "react";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Copy,
  Trash2,
  BringToFront,
  SendToBack,
  ChevronUp,
  ChevronDown,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize,
  Layers,
  AlignHorizontalJustifyCenter,
  Loader2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { AlignEdge, DesignStudioController } from "./use-design-studio";

function useClickOutside(refs: React.RefObject<HTMLElement>[], onOutside: () => void) {
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      const inside = refs.some((ref) => ref.current?.contains(e.target as Node));
      if (!inside) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [refs, onOutside]);
}

function ToolbarIconButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px shrink-0 bg-[#E5E5E5]" />;
}

function PopoverMenu({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  // The toolbar's icon strip scrolls horizontally on narrow screens, which
  // forces its overflow-y to "auto" too (a CSS quirk of mismatched x/y
  // overflow) and would clip an absolutely-positioned popover. Fixed
  // positioning computed from the trigger's own rect escapes that clipping.
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const outsideRefs = React.useRef([panelRef, triggerRef]).current;

  useClickOutside(outsideRefs, () => setOpen(false));

  function toggleOpen() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    }
    setOpen((v) => !v);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleOpen}
        aria-label={label}
        title={label}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
          open && "bg-neutral-100 text-neutral-900"
        )}
      >
        {icon}
      </button>
      {open && coords && (
        <div
          ref={panelRef}
          style={{ position: "fixed", top: coords.top, left: coords.left, transform: "translateX(-50%)" }}
          className="z-20 rounded-xl border border-[#E5E5E5] bg-white p-1.5 shadow-card-hover"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}

interface ToolbarTopProps {
  controller: DesignStudioController;
  productName: string;
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const ALIGN_OPTIONS: { edge: AlignEdge; label: string; icon: typeof AlignStartVertical }[] = [
  { edge: "left", label: "Align left", icon: AlignStartVertical },
  { edge: "centerH", label: "Align center", icon: AlignCenterVertical },
  { edge: "right", label: "Align right", icon: AlignEndVertical },
  { edge: "top", label: "Align top", icon: AlignStartHorizontal },
  { edge: "middleV", label: "Align middle", icon: AlignCenterHorizontal },
  { edge: "bottom", label: "Align bottom", icon: AlignEndHorizontal },
];

export function ToolbarTop({ controller, productName, onBack, onSave, isSaving }: ToolbarTopProps) {
  const hasSelection = !!controller.selected;
  const zoomPct = Math.round(controller.zoom * 100);

  return (
    <div className="flex h-16 shrink-0 items-center gap-1 border-b border-[#E5E5E5] bg-white px-3 sm:px-4">
      <button
        type="button"
        onClick={onBack}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </button>
      <Divider />
      <span className="hidden max-w-[160px] truncate text-sm font-medium text-neutral-900 md:inline">
        {productName}
      </span>

      <div className="mx-auto flex items-center gap-0.5 overflow-x-auto">
        <ToolbarIconButton onClick={controller.undo} disabled={!controller.canUndo} label="Undo">
          <Undo2 className="h-4 w-4" />
        </ToolbarIconButton>
        <ToolbarIconButton onClick={controller.redo} disabled={!controller.canRedo} label="Redo">
          <Redo2 className="h-4 w-4" />
        </ToolbarIconButton>

        <Divider />

        <ToolbarIconButton onClick={() => void controller.duplicateSelected()} disabled={!hasSelection} label="Duplicate">
          <Copy className="h-4 w-4" />
        </ToolbarIconButton>
        <ToolbarIconButton onClick={controller.deleteSelected} disabled={!hasSelection} label="Delete">
          <Trash2 className="h-4 w-4" />
        </ToolbarIconButton>

        <Divider />

        <PopoverMenu label="Layer order" icon={<Layers className="h-4 w-4" />}>
          <div className="flex w-40 flex-col">
            {[
              { action: "front" as const, label: "Bring to front", icon: BringToFront },
              { action: "forward" as const, label: "Bring forward", icon: ChevronUp },
              { action: "backward" as const, label: "Send backward", icon: ChevronDown },
              { action: "back" as const, label: "Send to back", icon: SendToBack },
            ].map(({ action, label, icon: Icon }) => (
              <button
                key={action}
                type="button"
                disabled={!hasSelection}
                onClick={() => controller.reorder(action)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-30"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </PopoverMenu>

        <PopoverMenu label="Align & distribute" icon={<AlignHorizontalJustifyCenter className="h-4 w-4" />}>
          <div className="grid w-40 grid-cols-3 gap-1">
            {ALIGN_OPTIONS.map(({ edge, label, icon: Icon }) => (
              <button
                key={edge}
                type="button"
                disabled={!hasSelection}
                onClick={() => controller.align(edge)}
                aria-label={label}
                title={label}
                className="flex h-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </PopoverMenu>

        <Divider />

        <ToolbarIconButton onClick={() => controller.setZoom(controller.zoom - 0.1)} label="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </ToolbarIconButton>
        <span className="w-11 text-center text-xs tabular-nums text-neutral-500">{zoomPct}%</span>
        <ToolbarIconButton onClick={() => controller.setZoom(controller.zoom + 0.1)} label="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </ToolbarIconButton>
        <ToolbarIconButton onClick={() => controller.setZoom(1)} label="Reset zoom">
          <Maximize className="h-4 w-4" />
        </ToolbarIconButton>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1 text-[11px] text-neutral-400 sm:flex">
          {controller.lastSavedAt ? (
            <>
              <Check className="h-3 w-3" /> Saved
            </>
          ) : null}
        </span>
        <Button size="sm" onClick={onSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
