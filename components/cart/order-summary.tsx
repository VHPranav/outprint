"use client";

import { Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  itemCount: number;
  onSendWhatsApp: () => void;
}

export function OrderSummary({ itemCount, onSendWhatsApp }: OrderSummaryProps) {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-6 lg:sticky lg:top-24">
      <h2 className="text-sm font-medium text-neutral-900">Quote Summary</h2>

      <p className="mt-2 text-sm text-neutral-500">
        {itemCount} {itemCount === 1 ? "item" : "items"} ready to send
      </p>

      <Button size="lg" className="mt-6 w-full" onClick={onSendWhatsApp}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Get Quote via WhatsApp
      </Button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-400">
        No payment is collected here — our team sends you pricing and confirms your order on WhatsApp.
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
        <Lock className="h-3 w-3" />
        Your cart is saved on this device only
      </p>
    </div>
  );
}
