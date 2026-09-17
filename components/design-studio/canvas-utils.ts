import { loadSVGFromString, type Canvas, type FabricObject } from "fabric";
import type { FontOption } from "@/data/design-studio-assets";

/** Standard print bleed/safe-area margins, in inches. */
export const BLEED_IN = 0.125;
export const SAFE_MARGIN_IN = 0.125;

/** Canvas is edited at this resolution (px/in) for a smooth, responsive UI... */
const MAX_EDIT_PX = 1400;
const MIN_EDIT_PX = 500;
/** ...but exported at print resolution regardless of on-screen working size. */
export const EXPORT_DPI = 300;

export interface WorkingCanvasDimensions {
  /** The canvas's internal backing-store size, in px — also the coordinate space every Fabric object lives in. */
  pxWidth: number;
  pxHeight: number;
  /** px-per-inch of that coordinate space; used to convert back to inches (guides) and to compute the export multiplier. */
  dpi: number;
}

/**
 * Picks a working DPI so the canvas stays comfortably sized for interactive
 * editing (roughly 500-1400px on the long edge) no matter how physically
 * large or small the product is (a 2in sticker vs. an 8ft banner).
 */
export function computeWorkingDimensions(widthIn: number, heightIn: number): WorkingCanvasDimensions {
  const longEdge = Math.max(widthIn, heightIn, 0.1);
  let dpi = MAX_EDIT_PX / longEdge;
  dpi = Math.min(dpi, 150);
  dpi = Math.max(dpi, MIN_EDIT_PX / longEdge, 20);

  return {
    pxWidth: Math.round(widthIn * dpi),
    pxHeight: Math.round(heightIn * dpi),
    dpi,
  };
}

/** Resolves a font option's CSS custom property (set by next/font on <html>) to a literal font-family string usable by canvas 2D text. */
export function resolveFontFamily(option: FontOption): string {
  if (option.cssVar && typeof window !== "undefined") {
    const value = window.getComputedStyle(document.documentElement).getPropertyValue(option.cssVar).trim();
    if (value) return value;
  }
  return option.fallback;
}

export interface SvgPlacement {
  left: number;
  top: number;
  targetWidth: number;
  targetHeight: number;
}

/**
 * Loads an SVG from a URL and adds its parsed objects to the canvas,
 * uniformly scaled + centered into `placement`. Each source element keeps
 * its own transform (no wrapping group), so a multi-element template lands
 * as individually selectable objects.
 */
export async function addSvgToCanvas(
  canvas: Canvas,
  url: string,
  placement: SvgPlacement
): Promise<FabricObject[]> {
  const response = await fetch(url);
  const svgString = await response.text();
  const { objects, options } = await loadSVGFromString(svgString);
  const parsed = objects.filter((o): o is FabricObject => o !== null);
  if (!parsed.length) return [];

  const sourceWidth = options?.width || 100;
  const sourceHeight = options?.height || 100;
  const scale = Math.min(placement.targetWidth / sourceWidth, placement.targetHeight / sourceHeight);
  const offsetX = placement.left + (placement.targetWidth - sourceWidth * scale) / 2;
  const offsetY = placement.top + (placement.targetHeight - sourceHeight * scale) / 2;

  parsed.forEach((obj) => {
    obj.set({
      left: offsetX + (obj.left ?? 0) * scale,
      top: offsetY + (obj.top ?? 0) * scale,
      scaleX: (obj.scaleX ?? 1) * scale,
      scaleY: (obj.scaleY ?? 1) * scale,
    });
    canvas.add(obj);
  });

  return parsed;
}

/** Converts a canvas data URL (from toDataURL) into a File, for handing to uploadFile(). */
export async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

export function friendlyLayerName(obj: FabricObject): string {
  const type = obj.type ?? "object";
  if (type === "textbox" || type === "i-text" || type === "text") {
    const text = (obj as unknown as { text?: string }).text?.trim();
    if (text) return text.length > 24 ? `${text.slice(0, 24)}…` : text;
    return "Text";
  }
  const names: Record<string, string> = {
    rect: "Rectangle",
    circle: "Circle",
    triangle: "Triangle",
    ellipse: "Ellipse",
    line: "Line",
    polygon: "Shape",
    path: "Element",
    image: "Image",
    group: "Group",
  };
  return names[type] ?? "Object";
}
