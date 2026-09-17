import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-[#E5E5E5] bg-[#FAFAF9] px-6 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-300">
        <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <h2 className="mt-6 font-serif text-2xl font-normal text-neutral-900">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
        Configure a product and add it to your cart — it&apos;ll show up here, saved on this device.
      </p>
      <Link
        href="/"
        className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Browse Products
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
