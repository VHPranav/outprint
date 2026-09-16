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
import type { CategoryNode } from "@/lib/catalog";
import { CURRENCY } from "@/lib/currency";

interface MobileMenuProps {
  categories: CategoryNode[];
  whatsappHref: string | null;
  onClose: () => void;
}

export function MobileMenu({ categories, whatsappHref, onClose }: MobileMenuProps) {
  return (
    <div className="border-t border-[#E5E5E5] bg-white md:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-4">
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              {category.children.length > 0 ? (
                <>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {category.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/category/${child.slug}`}
                            onClick={onClose}
                            className="block rounded-lg px-2 py-2 text-sm text-neutral-600 hover:text-black"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onClose}
                  className="block py-4 text-sm font-medium text-neutral-900"
                >
                  {category.name}
                </Link>
              )}
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
