import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
        <li className="flex items-center gap-1.5">
          <Link href="/" aria-label="Home" className="flex items-center hover:text-black transition-colors">
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3 w-3 text-neutral-300" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-black transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-neutral-900" : ""}>{item.label}</span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-neutral-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
