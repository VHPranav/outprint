// Static asset catalog for the design studio: starter templates and clipart
// elements, both loaded client-side from /public/design-studio/*.svg.
// `families` tags which product categories a template is most relevant for
// (see the top-level category slugs in @/data/categories); the studio sorts
// by relevance but never hides a template.

export type ProductFamily = "stickers" | "labels" | "boxes" | "business-cards" | "banners";

export interface DesignTemplate {
  id: string;
  name: string;
  /** Path under /public, e.g. "/design-studio/templates/minimal-badge.svg" */
  src: string;
  families: ProductFamily[];
}

export const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: "minimal-badge",
    name: "Minimal Badge",
    src: "/design-studio/templates/minimal-badge.svg",
    families: ["stickers", "labels", "business-cards", "boxes"],
  },
  {
    id: "bold-statement",
    name: "Bold Statement",
    src: "/design-studio/templates/bold-statement.svg",
    families: ["banners", "business-cards", "boxes"],
  },
  {
    id: "framed-photo",
    name: "Framed Photo",
    src: "/design-studio/templates/framed-photo.svg",
    families: ["boxes", "labels"],
  },
  {
    id: "pattern-backdrop",
    name: "Pattern Backdrop",
    src: "/design-studio/templates/pattern-backdrop.svg",
    families: ["stickers", "labels", "banners"],
  },
  {
    id: "ribbon-label",
    name: "Ribbon Label",
    src: "/design-studio/templates/ribbon-label.svg",
    families: ["labels", "boxes", "business-cards"],
  },
];

/** Templates relevant to `family` first, without hiding the rest. */
export function sortTemplatesByFamily(family?: ProductFamily): DesignTemplate[] {
  if (!family) return DESIGN_TEMPLATES;
  return [...DESIGN_TEMPLATES].sort((a, b) => {
    const aMatch = a.families.includes(family) ? 0 : 1;
    const bMatch = b.families.includes(family) ? 0 : 1;
    return aMatch - bMatch;
  });
}

export interface DesignElement {
  id: string;
  name: string;
  src: string;
}

export const DESIGN_ELEMENTS: DesignElement[] = [
  { id: "star", name: "Star", src: "/design-studio/elements/star.svg" },
  { id: "heart", name: "Heart", src: "/design-studio/elements/heart.svg" },
  { id: "badge-circle", name: "Badge", src: "/design-studio/elements/badge-circle.svg" },
  { id: "ribbon-banner", name: "Ribbon", src: "/design-studio/elements/ribbon-banner.svg" },
  { id: "arrow", name: "Arrow", src: "/design-studio/elements/arrow.svg" },
  { id: "spark", name: "Spark", src: "/design-studio/elements/spark.svg" },
  { id: "dot-cluster", name: "Dots", src: "/design-studio/elements/dot-cluster.svg" },
  { id: "leaf-sprig", name: "Leaf", src: "/design-studio/elements/leaf-sprig.svg" },
];

export interface FontOption {
  label: string;
  /** CSS custom property name (resolved to a literal family at runtime) or a literal web-safe family. */
  cssVar?: string;
  fallback: string;
}

/** Brand fonts first (resolved from the app's next/font CSS vars at runtime), then safe system fonts. */
export const FONT_OPTIONS: FontOption[] = [
  { label: "Sans (Poppins)", cssVar: "--font-poppins", fallback: "Arial, sans-serif" },
  { label: "Sans (Inter)", cssVar: "--font-inter", fallback: "Arial, sans-serif" },
  { label: "Serif (Fraunces)", cssVar: "--font-fraunces", fallback: "Georgia, serif" },
  { label: "Arial", fallback: "Arial, Helvetica, sans-serif" },
  { label: "Georgia", fallback: "Georgia, 'Times New Roman', serif" },
  { label: "Courier New", fallback: "'Courier New', monospace" },
  { label: "Verdana", fallback: "Verdana, sans-serif" },
];
