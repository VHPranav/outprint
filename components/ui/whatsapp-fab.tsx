"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Site-wide fallback contact method — fixed bottom-right on every page.
 * Sits at z-40 so the design studio's full-screen editor (z-50) naturally
 * covers it while open, with no route-specific logic needed here.
 */
export function WhatsAppFab() {
  const href = React.useMemo(() => {
    try {
      return buildWhatsAppLink({ type: "general-inquiry" });
    } catch {
      return null;
    }
  }, []);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0B5D3B] text-white shadow-elevated transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
}
