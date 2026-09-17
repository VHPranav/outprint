"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "outprint_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setIsVisible(true);
    } catch {
      // Storage unavailable (private browsing) — skip the banner rather than nag every load.
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // Best-effort — nothing to do if storage is blocked.
    }
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 max-w-sm rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-elevated sm:inset-x-auto sm:bottom-6 sm:left-6 sm:right-auto">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FAFAF9] text-neutral-500">
          <Cookie className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-neutral-900">We use cookies</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
            Just the essentials — keeping your cart and preferences saved on this device. No third-party
            tracking. See our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-black">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <Button size="sm" className="mt-4 w-full" onClick={accept}>
        Got it
      </Button>
    </div>
  );
}
