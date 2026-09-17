// Single source of truth for site-wide identity used by metadata, JSON-LD,
// and the sitemap — so the production URL and brand name aren't repeated
// (and don't drift) across every page that needs them.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://outprint.co").replace(/\/$/, "");

export const SITE_NAME = "Outprint";

export const SITE_DESCRIPTION =
  "Architectural-grade custom print-on-demand for modern brands: die-cut stickers, embossed packaging, tactile business cards, and marketing collateral.";
