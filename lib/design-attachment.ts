"use client";

// Persists the design file a customer has attached to a specific product's
// configuration, so it survives a refresh between "upload artwork" (or a
// future design studio / template picker) and "send via WhatsApp".

export interface AttachedDesign {
  url: string;
  fileName: string;
  /** Customer opted into the paid manual upscale/cleanup add-on from the upload flow's low-resolution warning. */
  resolutionEnhancement?: boolean;
}

function storageKey(productSlug: string): string {
  return `outprint_design_${productSlug}`;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAttachedDesign(productSlug: string): AttachedDesign | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(storageKey(productSlug));
    return raw ? (JSON.parse(raw) as AttachedDesign) : null;
  } catch {
    return null;
  }
}

export function saveAttachedDesign(productSlug: string, design: AttachedDesign): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(storageKey(productSlug), JSON.stringify(design));
}

export function clearAttachedDesign(productSlug: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(storageKey(productSlug));
}
