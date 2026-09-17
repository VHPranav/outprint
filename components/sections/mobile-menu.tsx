"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { MegaMenuGroup } from "@/lib/nav-menu";
import { CURRENCY } from "@/lib/currency";

interface MobileMenuProps {
  groups: MegaMenuGroup[];
  whatsappHref: string | null;
  onClose: () => void;
}

export function MobileMenu({ groups, whatsappHref, onClose }: MobileMenuProps) {
  return (
    <div className="border-t border-[#E5E5E5] bg-white md:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-4">
        <Accordion type="single" collapsible className="w-full">
          {groups.map((group) => (
            <AccordionItem key={group.label} value={group.label}>
              <AccordionTrigger>
                <Link
                  href={`/category/${group.slug}`}
                  onClick={onClose}
                  className="hover:underline"
                >
                  {group.label}
                </Link>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {group.headings.map((heading) => (
                    <AccordionItem key={heading.id} value={heading.id} className="border-b-0">
                      <AccordionTrigger className="py-2.5 text-sm font-medium text-neutral-800">
                        <Link
                          href={`/category/${heading.slug}`}
                          onClick={onClose}
                          className="hover:underline"
                        >
                          {heading.name}
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-3">
                          {heading.products.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/product/${p.slug}`}
                                onClick={onClose}
                                className="block rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:text-black"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-4 flex items-center justify-between border-t border-[#E5E5E5] pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Currency
          </span>
          <span className="text-sm font-medium text-neutral-700">
            {CURRENCY.symbol} {CURRENCY.code}
          </span>
        </div>

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
