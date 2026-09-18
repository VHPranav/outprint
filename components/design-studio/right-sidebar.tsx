"use client";

import { PropertiesPanel } from "./properties-panel";
import { LayersPanel } from "./layers-panel";
import type { DesignStudioController } from "./use-design-studio";

interface RightSidebarProps {
  controller: DesignStudioController;
}

export function RightSidebar({ controller }: RightSidebarProps) {
  return (
    <div className="hidden w-[300px] shrink-0 flex-col overflow-y-auto border-l border-[#E5E5E5] bg-white lg:flex">
      <div className="border-b border-[#E5E5E5] p-4">
        <h2 className="mb-3 text-sm font-medium text-neutral-900">Properties</h2>
        <PropertiesPanel selected={controller.selected} onUpdate={controller.updateSelected} />
      </div>
      <div className="flex-1 p-4">
        <h2 className="mb-3 text-sm font-medium text-neutral-900">Layers</h2>
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
  );
}
