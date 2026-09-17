"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { MegaMenuGroup, MegaMenuHeading } from "@/lib/nav-menu";

const CLOSE_DELAY_MS = 150;

interface Preview {
  name: string;
  image: string;
  href: string;
}

function headingToPreview(heading: MegaMenuHeading): Preview {
  return { name: heading.name, image: heading.image, href: `/category/${heading.slug}` };
}

/** Thin scrollbar matching the site's neutral theme, shown only inside scrollable mega-menu columns. */
const THEMED_SCROLL =
  "[scrollbar-width:thin] [scrollbar-color:#D4D4D4_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400";

interface MegaMenuPanelProps {
  group: MegaMenuGroup;
}

function MegaMenuPanel({ group }: MegaMenuPanelProps) {
  const [activeHeadingId, setActiveHeadingId] = React.useState(group.headings[0]?.id);
  const [preview, setPreview] = React.useState<Preview | null>(
    group.headings[0] ? headingToPreview(group.headings[0]) : null
  );

  React.useEffect(() => {
    setActiveHeadingId(group.headings[0]?.id);
    setPreview(group.headings[0] ? headingToPreview(group.headings[0]) : null);
  }, [group]);

  const activeHeading = group.headings.find((h) => h.id === activeHeadingId) ?? group.headings[0];

  return (
    <div
      data-lenis-prevent
      className={`mx-auto grid max-h-[calc(100vh-6rem)] max-w-7xl grid-cols-[1fr_1fr_1.4fr] items-stretch gap-8 overflow-y-auto px-8 py-8 ${THEMED_SCROLL}`}
    >
      {/* Column 1 — sub-categories */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Shop by category
        </p>
        <ul className={`max-h-[380px] space-y-0.5 overflow-y-auto pr-1 ${THEMED_SCROLL}`}>
          {group.headings.map((heading) => (
            <li key={heading.id}>
              <Link
                href={`/category/${heading.slug}`}
                onMouseEnter={() => {
                  setActiveHeadingId(heading.id);
                  setPreview(headingToPreview(heading));
                }}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeHeading?.id === heading.id
                    ? "bg-neutral-100 font-medium text-black"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                {heading.name}
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2 — products for the active sub-category */}
      <div className="border-l border-neutral-100 pl-8">
        {activeHeading && (
          <>
            <p className="text-sm font-semibold text-black">{activeHeading.name}</p>
            {activeHeading.description && (
              <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{activeHeading.description}</p>
            )}
            <ul className={`mt-3 max-h-[380px] space-y-0.5 overflow-y-auto pr-1 ${THEMED_SCROLL}`}>
              {activeHeading.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.slug}`}
                    onMouseEnter={() => setPreview({ name: p.name, image: p.image, href: `/product/${p.slug}` })}
                    className="block truncate rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/category/${activeHeading.slug}`}
              onMouseEnter={() => setPreview(headingToPreview(activeHeading))}
              className="mt-1 inline-block px-3 py-1 text-xs font-medium text-neutral-500 transition-colors hover:text-black"
            >
              View all {activeHeading.products.length} &rarr;
            </Link>
          </>
        )}
      </div>

      {/* Column 3 — image preview, fills the column */}
      <Link
        href={preview?.href ?? `/category/${group.slug}`}
        className="group/preview relative block min-h-[320px] overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100"
      >
        {preview && (
          <>
            <Image
              src={preview.image}
              alt={preview.name}
              fill
              sizes="420px"
              className="object-cover transition-transform duration-300 group-hover/preview:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-base font-medium leading-snug">{preview.name}</p>
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium">
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </>
        )}
      </Link>
    </div>
  );
}

interface MegaMenuProps {
  groups: MegaMenuGroup[];
}

export function MegaMenu({ groups }: MegaMenuProps) {
  const [openLabel, setOpenLabel] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  React.useEffect(() => () => cancelClose(), [cancelClose]);

  const openGroup = groups.find((g) => g.label === openLabel) ?? null;

  return (
    <div className="relative" onMouseLeave={scheduleClose}>
      <nav className="hidden md:flex md:items-center md:gap-1">
        {groups.map((group) => (
          <Link
            key={group.label}
            href={`/category/${group.slug}`}
            onMouseEnter={() => {
              cancelClose();
              setOpenLabel(group.label);
            }}
            className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              openLabel === group.label
                ? "bg-neutral-100 text-black"
                : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            {group.label}
          </Link>
        ))}
      </nav>

      <div
        aria-hidden={!openGroup}
        className={`fixed inset-x-0 top-16 z-50 overflow-hidden rounded-b-2xl border-t border-[#E5E5E5] bg-white shadow-elevated transition-[opacity,transform] duration-200 ease-out ${
          openGroup ? "translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0"
        }`}
        onMouseEnter={cancelClose}
      >
        {openGroup && <MegaMenuPanel group={openGroup} />}
      </div>
    </div>
  );
}
