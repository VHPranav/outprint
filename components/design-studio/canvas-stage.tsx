"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { BLEED_IN, SAFE_MARGIN_IN } from "./canvas-utils";
import type { DesignStudioController } from "./use-design-studio";

interface CanvasStageProps {
  controller: DesignStudioController;
  shape?: string;
}

export function CanvasStage({ controller, shape }: CanvasStageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { dims } = controller;
  const isRound = shape === "Circle" || shape === "Oval";

  const bleedPx = BLEED_IN * dims.dpi;
  const safePx = (BLEED_IN + SAFE_MARGIN_IN) * dims.dpi;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !controller.isReady) return;
    controller.fitToScreen(el.clientWidth, el.clientHeight);
    // Fit once when the canvas becomes ready; the user drives zoom after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller.isReady]);

  return (
    <div ref={containerRef} className="relative flex flex-1 items-center justify-center overflow-auto bg-[#F0F0EE] p-8">
      {!controller.isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F0F0EE]">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      )}

      <div
        style={{
          width: dims.pxWidth * controller.zoom,
          height: dims.pxHeight * controller.zoom,
        }}
        className="relative shrink-0"
      >
        <div
          style={{
            width: dims.pxWidth,
            height: dims.pxHeight,
            transform: `scale(${controller.zoom})`,
            transformOrigin: "top left",
          }}
          className="absolute left-0 top-0 shadow-elevated"
        >
          <canvas ref={controller.canvasElRef} />

          <svg
            className="pointer-events-none absolute inset-0"
            width={dims.pxWidth}
            height={dims.pxHeight}
            viewBox={`0 0 ${dims.pxWidth} ${dims.pxHeight}`}
          >
            {isRound ? (
              <>
                <ellipse
                  cx={dims.pxWidth / 2}
                  cy={dims.pxHeight / 2}
                  rx={dims.pxWidth / 2 - bleedPx}
                  ry={dims.pxHeight / 2 - bleedPx}
                  fill="none"
                  stroke="#EF4444"
                  strokeDasharray="6 5"
                  strokeWidth={1.5}
                />
                <ellipse
                  cx={dims.pxWidth / 2}
                  cy={dims.pxHeight / 2}
                  rx={dims.pxWidth / 2 - safePx}
                  ry={dims.pxHeight / 2 - safePx}
                  fill="none"
                  stroke="#0B5D3B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              </>
            ) : (
              <>
                <rect
                  x={bleedPx}
                  y={bleedPx}
                  width={dims.pxWidth - bleedPx * 2}
                  height={dims.pxHeight - bleedPx * 2}
                  fill="none"
                  stroke="#EF4444"
                  strokeDasharray="6 5"
                  strokeWidth={1.5}
                />
                <rect
                  x={safePx}
                  y={safePx}
                  width={dims.pxWidth - safePx * 2}
                  height={dims.pxHeight - safePx * 2}
                  fill="none"
                  stroke="#0B5D3B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
