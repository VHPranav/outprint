import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Category } from "@/data/categories";
import { getCategoryImage, getProductsByCategory } from "@/lib/catalog";

interface CategorySidebarProps {
  heading: string;
  items: Category[];
  /** The category being viewed — highlighted when it appears in `items` (sibling view). */
  activeId?: string;
  /** Parent category, shown as a "back up" link. */
  parent?: Category;
}

/** Left-rail category navigation: vertical list on desktop, scrolling chips on mobile. */
export function CategorySidebar({ heading, items, activeId, parent }: CategorySidebarProps) {
  if (items.length === 0) return null;

  return (
    <aside aria-label="Browse categories" className="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">{heading}</h2>

      {parent && (
        <Link
          href={`/category/${parent.slug}`}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All {parent.name}
        </Link>
      )}

      {/* Desktop: vertical list with thumbnails */}
      <nav className="hidden max-h-[calc(100vh-10rem)] overflow-y-auto pr-1 lg:block">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <Link
                  href={`/category/${item.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl p-2 pr-3 transition-colors ${
                    isActive ? "bg-brand-blue" : "hover:bg-neutral-100"
                  }`}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={getCategoryImage(item)}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-900">
                    {item.name}
                  </span>
                  <span className="text-xs text-neutral-500">{getProductsByCategory(item.id).length}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / tablet: horizontally scrolling chips */}
      <nav className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:hidden">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-brand-blue bg-brand-blue text-neutral-900"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
