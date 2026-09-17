"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { Navbar, Footer } from "@/components/sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { toast } from "@/components/ui/toast";
import { useCart, removeFromCart, adjustCartItemQuantity } from "@/lib/cart";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { GST_RATE, round2 } from "@/data/pricing";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { OrderSummary } from "@/components/cart/order-summary";
import { EmptyCart } from "@/components/cart/empty-cart";

export default function CartPage() {
  const items = useCart();

  const subtotal = React.useMemo(() => round2(items.reduce((sum, item) => sum + item.totalPrice, 0)), [items]);
  const gstAmount = React.useMemo(() => round2(subtotal * GST_RATE), [subtotal]);
  const grandTotal = round2(subtotal + gstAmount);

  function handleSendWhatsApp() {
    try {
      const link = buildWhatsAppLink({
        type: "cart",
        items: items.map((item) => ({
          productName: item.productName,
          selections: { ...item.selections, quantity: item.quantity },
          totalPrice: item.totalPrice,
          designFileUrl: item.designFileUrl,
        })),
        subtotal,
        gstAmount,
        grandTotal,
      });
      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error("WhatsApp isn't set up yet", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-28">
        <Breadcrumbs items={[{ label: "Cart" }]} className="mb-6" />

        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">Your Cart</h1>
          {items.length > 0 && (
            <p className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Lock className="h-3 w-3" />
              Saved on this device
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyCart />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onAdjustQuantity={adjustCartItemQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <OrderSummary
              subtotal={subtotal}
              gstAmount={gstAmount}
              grandTotal={grandTotal}
              itemCount={items.length}
              onSendWhatsApp={handleSendWhatsApp}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
