// Client-side heuristic for the artwork upload flow: flags a raster image
// whose pixel dimensions are thin for the selected print size, so we can
// offer a paid "we'll clean it up manually" add-on before the file ships to
// production. Not a substitute for a real pre-press check — just an early,
// honest heads-up for the customer.

/** Print-quality threshold. True press-perfect is ~300dpi; 150 avoids flagging phone photos that will still print acceptably at typical sticker/label sizes. */
export const PRINT_QUALITY_DPI = 150;

export const RESOLUTION_ENHANCEMENT_PRICE = 99;

export interface ResolutionCheck {
  isLowResolution: boolean;
  requiredWidthPx: number;
  requiredHeightPx: number;
}

export function checkImageResolution(
  naturalWidth: number,
  naturalHeight: number,
  widthIn: number,
  heightIn: number
): ResolutionCheck {
  const requiredWidthPx = Math.round(widthIn * PRINT_QUALITY_DPI);
  const requiredHeightPx = Math.round(heightIn * PRINT_QUALITY_DPI);
  const isLowResolution = naturalWidth < requiredWidthPx || naturalHeight < requiredHeightPx;
  return { isLowResolution, requiredWidthPx, requiredHeightPx };
}

/** Reads a raster image file's natural pixel dimensions via a throwaway <img>. */
export function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't read this image's dimensions."));
    };
    img.src = url;
  });
}
