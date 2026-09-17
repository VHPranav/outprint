"use client";

// Client-only "recently viewed products" store backed by localStorage.
// Mirrors the @/lib/cart pattern: no backend, same-tab reactivity via a
// custom event, cross-tab reactivity via the native "storage" event.

import * as React from "react";

const STORAGE_KEY = "outprint_recently_viewed";
const UPDATED_EVENT = "outprint:recently-viewed-updated";
const MAX_ENTRIES = 12;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getSlugs(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Call on a product page mount to record that slug as most-recently viewed. */
export function recordProductView(slug: string): void {
  if (!isBrowser()) return;
  const existing = getSlugs().filter((s) => s !== slug);
  const next = [slug, ...existing].slice(0, MAX_ENTRIES);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(UPDATED_EVENT));
}

/** Reactive list of recently viewed product slugs, most recent first. */
export function useRecentlyViewedSlugs(): string[] {
  const [slugs, setSlugs] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSlugs(getSlugs());

    const handleUpdate = () => setSlugs(getSlugs());
    window.addEventListener(UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return slugs;
}
