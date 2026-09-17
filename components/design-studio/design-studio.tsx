"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { Product } from "@/data/products";
import { resolveDesignSize, readDesignSizeFromParams } from "@/lib/design-size";
import { getStudioSessionId } from "@/lib/design-studio-storage";
import { getProductFamily } from "@/lib/product-family";
import { toast } from "@/components/ui/toast";
import { UploadError } from "@/lib/upload";
import { DESIGN_TEMPLATES } from "@/data/design-studio-assets";
import { useDesignStudio } from "./use-design-studio";
import { ToolbarTop } from "./toolbar-top";
import { LeftSidebar } from "./left-sidebar";
import { CanvasStage } from "./canvas-stage";
import { RightSidebar } from "./right-sidebar";
import { MobileDrawer } from "./mobile-drawer";
import type { StudioTab } from "./types";

interface DesignStudioProps {
  product: Product;
}

export function DesignStudio({ product }: DesignStudioProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId] = React.useState(() => getStudioSessionId());
  const [activeTab, setActiveTab] = React.useState<StudioTab | null>("templates");
  const [isSaving, setIsSaving] = React.useState(false);
  const [showMobileBanner, setShowMobileBanner] = React.useState(true);

  const { width: widthIn, height: heightIn } = React.useMemo(() => {
    return (
      readDesignSizeFromParams(searchParams) ??
      resolveDesignSize(product, { sizeLabel: searchParams.get("sizeLabel") ?? undefined })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const shape = searchParams.get("shape") ?? undefined;
  const templateId = searchParams.get("template") ?? undefined;

  const family = React.useMemo(() => getProductFamily(product), [product]);

  const controller = useDesignStudio({ productSlug: product.slug, sessionId, widthIn, heightIn });

  // Arriving from the templates gallery page: apply the chosen template once
  // the canvas is ready, instead of leaving the user to pick it again here.
  const appliedTemplateRef = React.useRef(false);
  React.useEffect(() => {
    if (!controller.isReady || !templateId || appliedTemplateRef.current) return;
    appliedTemplateRef.current = true;
    const template = DESIGN_TEMPLATES.find((t) => t.id === templateId);
    if (template) void controller.applyTemplate(template.src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller.isReady, templateId]);

  function handleBack() {
    router.push(`/product/${product.slug}`);
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const result = await controller.exportAndUpload();
      controller.clearAutosave();
      const params = new URLSearchParams({
        designUrl: result.url,
        designName: `${product.name} design.png`,
      });
      router.push(`/product/${product.slug}?${params.toString()}`);
    } catch (error) {
      toast.error("Couldn't save your design", {
        description: error instanceof UploadError ? error.message : "Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <ToolbarTop controller={controller} productName={product.name} onBack={handleBack} onSave={handleSave} isSaving={isSaving} />

      {showMobileBanner && (
        <div className="flex shrink-0 items-center justify-between gap-2 bg-[#FAFAF9] px-4 py-2 text-xs text-neutral-600 lg:hidden">
          <span>Best experienced on desktop — tools are simplified here.</span>
          <button type="button" onClick={() => setShowMobileBanner(false)} aria-label="Dismiss">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} controller={controller} family={family} />
        <CanvasStage controller={controller} shape={shape} />
        <RightSidebar controller={controller} />
      </div>

      <MobileDrawer controller={controller} family={family} />
    </div>
  );
}
