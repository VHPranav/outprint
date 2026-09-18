"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, MessageCircle, Menu, X } from "lucide-react";
import { getMegaMenuGroups } from "@/lib/nav-menu";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useCartCount } from "@/lib/cart";
import { CURRENCY } from "@/lib/currency";
import { MegaMenu } from "./mega-menu";
import { SearchBar } from "./search-bar";
import { MobileMenu } from "./mobile-menu";

function getWhatsAppHref(): string | null {
  try {
    return buildWhatsAppLink({ type: "general-inquiry" });
  } catch {
    return null;
  }
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const menuGroups = React.useMemo(() => getMegaMenuGroups(), []);
  const whatsappHref = React.useMemo(() => getWhatsAppHref(), []);
  const cartCount = useCartCount();

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Outprint"
              width={142}
              height={40}
              priority
              className="h-7 w-auto object-contain sm:h-8"
            />
          </Link>

          <MegaMenu groups={menuGroups} />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <span className="hidden items-center gap-1 pr-2 text-xs font-medium text-neutral-500 lg:flex">
            {CURRENCY.code} (UAE)
          </span>

          <SearchBar />

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black sm:flex"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
          )}

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu
          groups={menuGroups}
          whatsappHref={whatsappHref}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
