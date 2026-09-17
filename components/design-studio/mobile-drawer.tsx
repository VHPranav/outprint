"use client";

import * as React from "react";
import { LayoutTemplate, Type, Shapes, UploadCloud, Sparkles, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductFamily } from "@/data/design-studio-assets";
import { Modal } from "@/components/ui/modal";
import type { DesignStudioController } from "./use-design-studio";
import type { StudioTab } from "./types";
import { StudioPanelContent } from "./left-sidebar";
import { PropertiesPanel } from "./properties-panel";
import { LayersPanel } from "./layers-panel";

type MobileTab = StudioTab | "properties";

const TABS: { tab: MobileTab; label: string; icon: typeof LayoutTemplate }[] = [
  { tab: "templates", label: "Templates", icon: LayoutTemplate },
  { tab: "text", label: "Text", icon: Type },
  { tab: "shapes", label: "Shapes", icon: Shapes },
  { tab: "uploads", label: "Uploads", icon: UploadCloud },
  { tab: "elements", label: "Elements", icon: Sparkles },
  { tab: "properties", label: "Edit", icon: SlidersHorizontal },
];

const TAB_LABEL: Record<MobileTab, string> = {
  templates: "Templates",
  text: "Text",
  shapes: "Shapes",
  uploads: "Uploads",
  elements: "Elements",
  properties: "Properties & Layers",
};

interface MobileDrawerProps {
  controller: DesignStudioController;
  family?: ProductFamily;
}

export function MobileDrawer({ controller, family }: MobileDrawerProps) {
  const [openTab, setOpenTab] = React.useState<MobileTab | null>(null);

  return (
    <>
      <div className="flex shrink-0 items-center justify-around border-t border-[#E5E5E5] bg-white py-1.5 lg:hidden">
        {TABS.map(({ tab, label, icon: Icon }) => (
          <button
            key={tab}
            type="button"
            onClick={() => setOpenTab(tab)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium",
              tab === "properties" && controller.selected ? "text-emerald-700" : "text-neutral-500"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>

      <Modal
        open={openTab !== null}
        onOpenChange={(open) => !open && setOpenTab(null)}
        title={openTab ? TAB_LABEL[openTab] : ""}
        className="max-h-[80vh] overflow-y-auto"
      >
        {openTab && openTab !== "properties" && (
          <StudioPanelContent tab={openTab} controller={controller} family={family} />
        )}
        {openTab === "properties" && (
          <div className="space-y-6">
            <PropertiesPanel selected={controller.selected} onUpdate={controller.updateSelected} />
            <div className="border-t border-[#F0F0EE] pt-4">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Layers</h3>
              <LayersPanel
                layers={controller.layers}
                onSelect={controller.selectLayer}
                onToggleVisible={controller.toggleLayerVisibility}
                onToggleLock={controller.toggleLayerLock}
                onMove={(id, direction) => {
                  controller.selectLayer(id);
                  controller.reorder(direction);
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
