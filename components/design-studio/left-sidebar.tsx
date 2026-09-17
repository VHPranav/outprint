"use client";

import * as React from "react";
import { LayoutTemplate, Type, Shapes, UploadCloud, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductFamily } from "@/data/design-studio-assets";
import type { DesignStudioController, ShapeKind } from "./use-design-studio";
import { PanelTemplates } from "./panel-templates";
import { PanelText } from "./panel-text";
import { PanelShapes } from "./panel-shapes";
import { PanelUploads } from "./panel-uploads";
import { PanelElements } from "./panel-elements";
import type { StudioTab } from "./types";

const RAIL_ITEMS: { tab: StudioTab; label: string; icon: typeof LayoutTemplate }[] = [
  { tab: "templates", label: "Templates", icon: LayoutTemplate },
  { tab: "text", label: "Text", icon: Type },
  { tab: "shapes", label: "Shapes", icon: Shapes },
  { tab: "uploads", label: "Uploads", icon: UploadCloud },
  { tab: "elements", label: "Elements", icon: Sparkles },
];

export interface StudioPanelsProps {
  controller: Pick<DesignStudioController, "applyTemplate" | "addText" | "addShape" | "addImageFile" | "addElement">;
  family?: ProductFamily;
}

export function StudioPanelContent({ tab, controller, family }: StudioPanelsProps & { tab: StudioTab }) {
  switch (tab) {
    case "templates":
      return <PanelTemplates family={family} onApply={controller.applyTemplate} />;
    case "text":
      return <PanelText onAdd={controller.addText} />;
    case "shapes":
      return <PanelShapes onAdd={(kind: ShapeKind) => controller.addShape(kind)} />;
    case "uploads":
      return <PanelUploads onAdd={controller.addImageFile} />;
    case "elements":
      return <PanelElements onAdd={controller.addElement} />;
  }
}

interface LeftSidebarProps extends StudioPanelsProps {
  activeTab: StudioTab | null;
  onTabChange: (tab: StudioTab | null) => void;
}

export function LeftSidebar({ activeTab, onTabChange, controller, family }: LeftSidebarProps) {
  return (
    <div className="hidden shrink-0 lg:flex">
      <div className="flex w-[76px] shrink-0 flex-col items-center gap-1 border-r border-[#E5E5E5] bg-white py-4">
        {RAIL_ITEMS.map(({ tab, label, icon: Icon }) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(active ? null : tab)}
              className={cn(
                "flex w-16 flex-col items-center gap-1.5 rounded-xl py-2.5 text-[10px] font-medium transition-colors",
                active ? "bg-black text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div className="w-[300px] shrink-0 overflow-y-auto border-r border-[#E5E5E5] bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-neutral-900">
            {RAIL_ITEMS.find((i) => i.tab === activeTab)?.label}
          </h2>
          <StudioPanelContent tab={activeTab} controller={controller} family={family} />
        </div>
      )}
    </div>
  );
}
