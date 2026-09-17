"use client";

// Local persistence for the design studio: a per-browser anonymous session
// id (no auth in this app) plus the autosaved canvas JSON keyed by
// product + session, so an in-progress design survives a refresh.

const SESSION_ID_KEY = "outprint_studio_session_id";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function storageKey(productSlug: string, sessionId: string): string {
  return `outprint_studio_${productSlug}_${sessionId}`;
}

/** Persistent anonymous id for this browser, created once and reused across visits. */
export function getStudioSessionId(): string {
  if (!isBrowser()) return "server";
  try {
    let id = window.localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export interface AutosavedDesign {
  /** Fabric canvas.toJSON() output. */
  canvasJSON: Record<string, unknown>;
  widthIn: number;
  heightIn: number;
  savedAt: number;
}

export function saveAutosavedDesign(productSlug: string, sessionId: string, design: AutosavedDesign): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(storageKey(productSlug, sessionId), JSON.stringify(design));
  } catch {
    // Storage full or unavailable (private browsing) — autosave is best-effort.
  }
}

export function getAutosavedDesign(productSlug: string, sessionId: string): AutosavedDesign | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(storageKey(productSlug, sessionId));
    return raw ? (JSON.parse(raw) as AutosavedDesign) : null;
  } catch {
    return null;
  }
}

export function clearAutosavedDesign(productSlug: string, sessionId: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(storageKey(productSlug, sessionId));
}
