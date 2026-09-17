"use client";

import { Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";

interface OrderSummaryProps {
  subtotal: number;
  vatAmount?: number;
  gstAmount?: number;
  grandTotal: number;
  itemCount: number;
  onSendWhatsApp: () => void;
}

export function OrderSummary({ subtotal, vatAmount, gstAmount, grandTotal, itemCount, onSendWhatsApp }: OrderSummaryProps) {
  const tax = vatAmount ?? gstAmount ?? 0;

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-6 lg:sticky lg:top-24">
      <h2 className="text-sm font-semibold text-neutral-900">Order Summary</h2>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-500">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</dt>
          <dd className="font-medium text-neutral-900">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">VAT (5%)</dt>
          <dd className="font-medium text-neutral-900">{formatCurrency(tax)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-[#E5E5E5] pt-4">
        <span className="text-sm font-semibold text-neutral-900">Grand Total</span>
        <span className="font-serif text-2xl text-neutral-900">{formatCurrency(grandTotal)}</span>
      </div>

      <Button size="lg" className="mt-6 w-full" onClick={onSendWhatsApp}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Send Order via WhatsApp
      </Button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-400">
        No payment is collected here — our team confirms pricing and payment with you on WhatsApp.
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
        <Lock className="h-3 w-3" />
        Your cart is saved on this device only
      </p>
    </div>
  );
}
