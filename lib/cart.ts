"use client";

// Client-only cart store backed by localStorage. No backend — the header
// count and any future cart page all read/write this same storage key.

import * as React from "react";
import { getQuantityMultiplier, round2 } from "@/data/pricing";

const CART_STORAGE_KEY = "outprint_cart";
const CART_UPDATED_EVENT = "outprint:cart-updated";

export interface CartItemSelections {
  shape?: string;
  size?: string;
  material?: string;
  addons?: string[];
}

export interface CartItem {
  /** Unique per cart line (not per product — the same product can appear twice with different options). */
  id: string;
  productId: string;
  slug: string;
  productName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selections: CartItemSelections;
  designFileUrl?: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getCart(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  // "storage" only fires in OTHER tabs; dispatch our own event so the tab
  // that made the change (e.g. this header) can update itself too.
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(item: CartItem): void {
  saveCart([...getCart(), item]);
}

export function removeFromCart(id: string): void {
  saveCart(getCart().filter((item) => item.id !== id));
}

export function clearCart(): void {
  saveCart([]);
}

/**
 * Adjusts a line's quantity by `delta` and rescales its unit price along the
 * same bulk-discount curve used at add-to-cart time (see data/pricing.ts) —
 * dividing out the multiplier baked in at the old quantity and reapplying it
 * at the new one, so a jump from 25 to 100 units reflects the same discount
 * the product page would have shown.
 *
 * Takes a delta (not an absolute target) and re-reads the current quantity
 * from storage on every call, rather than trusting a quantity value the
 * caller computed from possibly-stale React state — so two quick clicks in
 * a row (before a re-render lands) both actually apply instead of the
 * second one clobbering the first.
 */
export function adjustCartItemQuantity(id: string, delta: number): void {
  const items = getCart().map((item) => {
    if (item.id !== id) return item;
    const safeQuantity = Math.max(1, item.quantity + delta);
    const baseUnitPrice = item.unitPrice / getQuantityMultiplier(item.quantity);
    const unitPrice = round2(baseUnitPrice * getQuantityMultiplier(safeQuantity));
    return { ...item, quantity: safeQuantity, unitPrice, totalPrice: round2(unitPrice * safeQuantity) };
  });
  saveCart(items);
}

/** Reactive cart contents, kept in sync across components and browser tabs. */
export function useCart(): CartItem[] {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    setItems(getCart());

    const handleUpdate = () => setItems(getCart());
    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return items;
}

/** Reactive cart item count, kept in sync across components and browser tabs. */
export function useCartCount(): number {
  return useCart().reduce((sum, item) => sum + item.quantity, 0);
}
