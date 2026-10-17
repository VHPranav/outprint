import type { Metadata } from "next";

// The cart page is a client component, so its metadata lives here. A cart is per-visitor and has no search value.
export const metadata: Metadata = {
  title: "Cart | Outprint",
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
