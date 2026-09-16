"use client";

// Client-only cart store backed by localStorage. No backend — the header
// count and any future cart page all read/write this same storage key.

import * as React from "react";

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

/** Reactive cart item count, kept in sync across components and browser tabs. */
export function useCartCount(): number {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(getCartCount());

    const handleUpdate = () => setCount(getCartCount());
    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return count;
}
