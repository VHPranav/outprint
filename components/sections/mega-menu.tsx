import * as React from "react";
import Link from "next/link";
import type { CategoryNode } from "@/lib/catalog";

interface MegaMenuProps {
  categories: CategoryNode[];
}

export function MegaMenu({ categories }: MegaMenuProps) {
  return (
    <nav className="hidden md:flex md:items-center md:gap-1">
      {categories.map((category) => (
        <div key={category.id} className="group relative">
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            {category.name}
          </Link>

          {category.children.length > 0 && (
            <div className="invisible absolute left-0 top-full z-50 w-[22rem] translate-y-1 rounded-2xl border border-[#E5E5E5] bg-white p-4 opacity-0 shadow-elevated transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-1">
                  {category.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/category/${child.slug}`}
                        className="block rounded-lg px-2.5 py-2 text-sm text-neutral-700 transition-colors hover:bg-[#FAFAF9] hover:text-black"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {category.promoTile && (
                  <Link
                    href={category.promoTile.href}
                    className="group/tile relative block overflow-hidden rounded-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={category.promoTile.image}
                      alt={category.promoTile.label}
                      className="h-32 w-full object-cover transition-transform duration-300 group-hover/tile:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-xs font-medium leading-snug text-white">
                      {category.promoTile.label}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
