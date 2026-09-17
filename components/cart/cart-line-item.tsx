"use client";

import Link from "next/link";
import { Minus, Plus, X, FileText, PencilLine } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import { isImageUrl } from "@/lib/utils";

interface CartLineItemProps {
  item: CartItem;
  onAdjustQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartLineItem({ item, onAdjustQuantity, onRemove }: CartLineItemProps) {
  const { shape, size, material, addons } = item.selections;
  const selectionLine = [
    shape && `Shape: ${shape}`,
    size && `Size: ${size}`,
    material && `Material: ${material}`,
    addons?.length && `Add-ons: ${addons.join(", ")}`,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex gap-4 rounded-2xl border border-[#E5E5E5] p-4 sm:gap-5 sm:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.productName}
        className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${item.slug}`}
              className="block truncate text-sm font-semibold text-neutral-900 hover:underline"
            >
              {item.productName}
            </Link>
            {selectionLine && <p className="mt-1 text-xs leading-relaxed text-neutral-500">{selectionLine}</p>}
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {item.designFileUrl && (
          <div className="mt-2.5 flex items-center gap-2">
            {isImageUrl(item.designFileUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.designFileUrl}
                alt="Attached design"
                className="h-8 w-8 shrink-0 rounded-md border border-[#E5E5E5] object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#E5E5E5] bg-[#FAFAF9] text-neutral-400">
                <FileText className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="text-[11px] text-neutral-500">Design attached</span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-[#E5E5E5]">
              <button
                type="button"
                onClick={() => onAdjustQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium tabular-nums text-neutral-900">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onAdjustQuantity(item.id, 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-100"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Link
              href={`/product/${item.slug}`}
              className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-black"
            >
              <PencilLine className="h-3 w-3" />
              Edit options
            </Link>
          </div>

          <div className="text-right">
            <p className="text-xs text-neutral-400">{formatCurrency(item.unitPrice)} / pc</p>
            <p className="text-sm font-semibold text-neutral-900">{formatCurrency(item.totalPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
