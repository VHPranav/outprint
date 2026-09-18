// Static product catalog. Every product references a category by id (see
// @/data/categories) and declares its own configurator via `optionGroups` —
// a flexible array of option-group blocks so different product types
// (a sticker vs. a rigid box) can expose completely different configurators
// without a rigid shared schema. @/data/pricing consumes this shape.

export interface SizePreset {
  label: string;
  valueInInches: number;
}

export interface MaterialOption {
  label: string;
  image: string;
  priceMultiplier: number;
}

export interface AddonOption {
  label: string;
  description: string;
  priceDelta: number;
}

export interface ShapeOptionGroup {
  type: "shape";
  options: string[];
}

export interface SizeOptionGroup {
  type: "size";
  presets: SizePreset[];
  allowCustomSize: boolean;
}

export interface QuantityOptionGroup {
  type: "quantity";
  tiers: number[];
}

export interface MaterialOptionGroup {
  type: "material";
  options: MaterialOption[];
}

export interface AddonsOptionGroup {
  type: "addons";
  options: AddonOption[];
}

export type OptionGroup =
  | ShapeOptionGroup
  | SizeOptionGroup
  | QuantityOptionGroup
  | MaterialOptionGroup
  | AddonsOptionGroup;

export interface ProductSEO {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** References Category.id in @/data/categories */
  categoryId: string;
  description: string;
  /** Customer verticals this product is commonly ordered for; drives the "use-case" filter on /category/[slug]. */
  useCases?: string[];
  images: string[];
  /** True when `images` is a labeled "photo sourcing pending" placeholder, not real product photography. */
  needsManualSourcing?: boolean;
  seo: ProductSEO;
  optionGroups: OptionGroup[];
  /**
   * Reference unit price used by @/data/pricing's tiered discount curve.
   * Represents the price of ONE unit at the 25-unit baseline and at the
   * first (smallest/default) size preset — not necessarily an orderable
   * quantity for every product (e.g. banners are typically ordered in
   * single digits; 25 is still the curve's calibration point).
   */
  basePricePerUnit: number;
}

export const products: Product[] = [
  // ── Stickers ─────────────────────────────────────────────────────────
  {
    id: "prod-vinyl-diecut-stickers",
    slug: "vinyl-die-cut-stickers",
    name: "Custom Vinyl Die-Cut Stickers",
    categoryId: "cat-stickers-die-cut-vinyl",
    description:
      "Weatherproof vinyl stickers cut precisely to your artwork's outline. UV-laminated for 5+ years of outdoor durability, dishwasher and scratch safe.",
    useCases: ["E-commerce & DTC", "Events & Weddings"],
    images: [
      "/images/products/vinyl-die-cut-stickers.webp",
    ],
    seo: {
      title: "Custom Vinyl Die-Cut Stickers | Outprint",
      description:
        "Order weatherproof custom vinyl die-cut stickers cut to any shape. Bulk order discounts from 25 to 2500 units, matte, glossy and holographic finishes.",
    },
    optionGroups: [
      { type: "shape", options: ["Circle", "Square", "Rectangle", "Custom Shape"] },
      {
        type: "size",
        presets: [
          { label: '2" max dimension', valueInInches: 2 },
          { label: '3" max dimension', valueInInches: 3 },
          { label: '4" max dimension', valueInInches: 4 },
          { label: '5" max dimension', valueInInches: 5 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [25, 50, 100, 200, 500, 1000, 2500] },
      {
        type: "material",
        options: [
          { label: "Matte Vinyl", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Glossy Vinyl", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.05 },
          { label: "Holographic", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.35 },
          { label: "Clear Transparent", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.15 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Extra UV Lamination", description: "Adds a second laminate pass for marine-grade durability.", priceDelta: 0.05 },
          { label: "White Ink Underlay", description: "Opaque white base layer for clear or dark substrates.", priceDelta: 0.08 },
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.15 },
        ],
      },
    ],
    basePricePerUnit: 0.85,
  },
  {
    id: "prod-holographic-diecut-stickers",
    slug: "holographic-die-cut-stickers",
    name: "Holographic Die-Cut Stickers",
    categoryId: "cat-stickers-die-cut-holographic",
    description:
      "Prismatic rainbow-refraction stickers with a 100% opaque spot-white backing so colors stay vivid against any surface.",
    useCases: ["E-commerce & DTC", "Events & Weddings"],
    images: [
      "/images/products/holographic-die-cut-stickers.webp",
    ],
    seo: {
      title: "Holographic Die-Cut Stickers | Outprint",
      description:
        "Custom holographic die-cut stickers with prismatic rainbow refraction and opaque white backing. Free proof, bulk order discounts.",
    },
    optionGroups: [
      { type: "shape", options: ["Circle", "Square", "Rectangle", "Custom Shape"] },
      {
        type: "size",
        presets: [
          { label: '2" max dimension', valueInInches: 2 },
          { label: '3" max dimension', valueInInches: 3 },
          { label: '4" max dimension', valueInInches: 4 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [25, 50, 100, 200, 500, 1000] },
      {
        type: "material",
        options: [
          { label: "Holographic Rainbow", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Holographic Gold", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.1 },
          { label: "Holographic Silver Dot", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.1 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "White Ink Underlay", description: "Opaque white base layer included as standard, upgrade to double pass.", priceDelta: 0.06 },
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.18 },
        ],
      },
    ],
    basePricePerUnit: 1.15,
  },
  {
    id: "prod-sticker-sheets",
    slug: "custom-sticker-sheets",
    name: "Custom Sticker Sheets",
    categoryId: "cat-stickers-sheet",
    description:
      "Multiple designs kiss-cut onto a single sheet — perfect for sticker packs, product inserts, and con merch.",
    useCases: ["E-commerce & DTC", "Events & Weddings"],
    images: [
      "/images/products/custom-sticker-sheets.webp",
    ],
    seo: {
      title: "Custom Sticker Sheets | Outprint",
      description:
        "Kiss-cut sticker sheets with multiple designs per sheet. Choose from letter, A5 and postcard sizes with matte or glossy finish.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '5" x 7" Sheet', valueInInches: 7 },
          { label: '8.5" x 11" Sheet', valueInInches: 11 },
        ],
        allowCustomSize: false,
      },
      { type: "quantity", tiers: [25, 50, 100, 200, 500, 1000] },
      {
        type: "material",
        options: [
          { label: "Matte Paper", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Glossy Vinyl", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.12 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.2 },
        ],
      },
    ],
    basePricePerUnit: 2.4,
  },

  // ── Labels ───────────────────────────────────────────────────────────
  {
    id: "prod-matte-product-labels",
    slug: "matte-product-labels",
    name: "Matte Product Labels",
    categoryId: "cat-labels-product",
    description:
      "Clean matte-finish labels for candles, cosmetics, and packaged goods. Available on rolls or sheets.",
    useCases: ["Beauty & Cosmetics", "Food & Beverage"],
    images: [
      "/images/products/matte-product-labels.webp",
    ],
    seo: {
      title: "Matte Product Labels | Outprint",
      description:
        "Custom matte product labels for candles, cosmetics and packaged goods. Roll or sheet fulfillment, bulk discounts to 5000 units.",
    },
    optionGroups: [
      { type: "shape", options: ["Rectangle", "Circle", "Oval"] },
      {
        type: "size",
        presets: [
          { label: '1" Circle', valueInInches: 1 },
          { label: '2" Circle', valueInInches: 2 },
          { label: '3" x 2" Rectangle', valueInInches: 3 },
          { label: '4" x 3" Rectangle', valueInInches: 4 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [50, 100, 250, 500, 1000, 2500, 5000] },
      {
        type: "material",
        options: [
          { label: "Matte Paper", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Glossy Paper", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.08 },
          { label: "Kraft Brown", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.1 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Sequential Numbering", description: "Unique incrementing number printed on each label.", priceDelta: 0.03 },
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.1 },
        ],
      },
    ],
    basePricePerUnit: 0.32,
  },
  {
    id: "prod-weatherproof-labels",
    slug: "weatherproof-vinyl-labels",
    name: "Weatherproof Vinyl Labels",
    categoryId: "cat-labels-product-weatherproof",
    description:
      "Waterproof, UV-stable vinyl labels built for bottles, outdoor gear, and anything that lives outside a climate-controlled shelf.",
    useCases: ["Beauty & Cosmetics", "Food & Beverage"],
    images: [
      "/images/products/weatherproof-vinyl-labels.webp",
    ],
    seo: {
      title: "Weatherproof Vinyl Labels | Outprint",
      description:
        "UV-stable, waterproof vinyl labels for outdoor and cold-chain products. Freezer-safe adhesive, bulk order discounts available.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '2" Circle', valueInInches: 2 },
          { label: '3" Circle', valueInInches: 3 },
          { label: '4" x 2" Rectangle', valueInInches: 4 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [50, 100, 250, 500, 1000, 2500] },
      {
        type: "material",
        options: [
          { label: "Waterproof Vinyl", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Freezer-Grade Vinyl", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.2 },
          { label: "Foil Accent Vinyl", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.5 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.12 },
        ],
      },
    ],
    basePricePerUnit: 0.48,
  },
  {
    id: "prod-packaging-labels",
    slug: "custom-packaging-labels",
    name: "Custom Packaging Labels",
    categoryId: "cat-labels-packaging",
    description:
      "Branded closure and shipping labels sized for mailers, pouches and retail boxes.",
    useCases: ["E-commerce & DTC", "Food & Beverage"],
    images: [
      "/images/products/custom-packaging-labels.webp",
    ],
    seo: {
      title: "Custom Packaging Labels | Outprint",
      description:
        "Custom branded packaging and shipping labels for mailers, pouches and retail boxes with bulk order discounts tiers.",
    },
    optionGroups: [
      { type: "shape", options: ["Rectangle", "Square"] },
      {
        type: "size",
        presets: [
          { label: '2" x 2" Square', valueInInches: 2 },
          { label: '4" x 2" Rectangle', valueInInches: 4 },
          { label: '6" x 4" Rectangle', valueInInches: 6 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [50, 100, 250, 500, 1000, 2500] },
      {
        type: "material",
        options: [
          { label: "Matte Paper", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Kraft Brown", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.05 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Tamper-Evident Perforation", description: "Adds a perforated tear line for closure security.", priceDelta: 0.04 },
        ],
      },
    ],
    basePricePerUnit: 0.28,
  },

  // ── Boxes & Packaging ────────────────────────────────────────────────
  {
    id: "prod-corrugated-mailer-boxes",
    slug: "corrugated-mailer-boxes",
    name: "Corrugated Mailer Boxes",
    categoryId: "cat-boxes-mailer-corrugated",
    description:
      "Custom-printed corrugated mailers with a tuck-lock closure — sturdy enough for e-commerce shipping, light enough to keep freight costs down.",
    useCases: ["E-commerce & DTC"],
    images: [
      "/images/products/corrugated-mailer-boxes.webp",
    ],
    seo: {
      title: "Custom Corrugated Mailer Boxes | Outprint",
      description:
        "Custom-printed corrugated mailer boxes with tuck-lock closure. Sized for e-commerce shipping, bulk order discounts from 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '6" x 4" x 4"', valueInInches: 6 },
          { label: '9" x 6" x 3"', valueInInches: 9 },
          { label: '12" x 9" x 4"', valueInInches: 12 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [25, 50, 100, 250, 500, 1000] },
      {
        type: "material",
        options: [
          { label: "E-Flute Corrugated", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "White Kraft Corrugated", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.1 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Interior Printing", description: "Full-color print on the inside panels.", priceDelta: 0.4 },
          { label: "Matte Lamination", description: "Soft-touch matte film over the exterior print.", priceDelta: 0.25 },
        ],
      },
    ],
    basePricePerUnit: 1.9,
  },
  {
    id: "prod-kraft-mailer-boxes",
    slug: "kraft-mailer-boxes",
    name: "Kraft Mailer Boxes",
    categoryId: "cat-boxes-mailer",
    description:
      "Uncoated kraft mailer boxes with a natural, eco-forward finish — ideal for brands leaning into minimal, recyclable packaging.",
    useCases: ["E-commerce & DTC", "Fashion & Apparel"],
    images: [
      "/images/products/kraft-mailer-boxes.webp",
    ],
    seo: {
      title: "Kraft Mailer Boxes | Outprint",
      description:
        "Recyclable kraft mailer boxes with natural uncoated finish. Custom sizes, one-color or full-color print, bulk order discounts.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '8" x 6" x 3"', valueInInches: 8 },
          { label: '10" x 8" x 4"', valueInInches: 10 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [25, 50, 100, 250, 500] },
      {
        type: "material",
        options: [
          { label: "Natural Kraft", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "White Kraft", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.08 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "One-Color Logo Stamp", description: "Single-color logo print on the lid.", priceDelta: 0.2 },
        ],
      },
    ],
    basePricePerUnit: 1.6,
  },
  {
    id: "prod-rigid-gift-boxes",
    slug: "rigid-gift-boxes",
    name: "Rigid Gift Boxes",
    categoryId: "cat-boxes-rigid",
    description:
      "Two-piece rigid chipboard boxes with a magnetic or friction-fit lid — built for unboxing moments, not just shipping.",
    useCases: ["Fashion & Apparel", "Beauty & Cosmetics", "Events & Weddings"],
    images: [
      "/images/products/rigid-gift-boxes.webp",
    ],
    seo: {
      title: "Custom Rigid Gift Boxes | Outprint",
      description:
        "Two-piece rigid chipboard gift boxes with magnetic or friction-fit lid. Custom sizes and finishes for premium unboxing.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '5" x 5" x 2"', valueInInches: 5 },
          { label: '8" x 8" x 3"', valueInInches: 8 },
          { label: '10" x 10" x 4"', valueInInches: 10 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [25, 50, 100, 250, 500] },
      {
        type: "material",
        options: [
          { label: "Rigid Chipboard", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Linen-Wrapped Chipboard", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.35 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Magnetic Closure", description: "Upgrades the lid to a concealed magnetic snap.", priceDelta: 0.6 },
          { label: "Ribbon Pull Tab", description: "Satin ribbon tab for easy lid removal.", priceDelta: 0.35 },
        ],
      },
    ],
    basePricePerUnit: 4.2,
  },

  // ── Business Cards ───────────────────────────────────────────────────
  {
    id: "prod-standard-matte-cards",
    slug: "standard-matte-business-cards",
    name: "Standard Matte Business Cards",
    categoryId: "cat-cards-standard",
    description:
      "Everyday 14pt matte business cards — smudge-resistant, quick turnaround, and priced for ordering in volume.",
    useCases: ["Corporate & Office"],
    images: [
      "/images/products/standard-matte-business-cards.webp",
    ],
    seo: {
      title: "Standard Matte Business Cards | Outprint",
      description:
        "Order standard 14pt matte business cards with fast turnaround. Bulk order discounts from 100 to 5000 cards.",
    },
    optionGroups: [
      { type: "shape", options: ["Standard Rectangle", "Rounded Corners"] },
      {
        type: "size",
        presets: [{ label: '3.5" x 2" Standard', valueInInches: 3.5 }],
        allowCustomSize: false,
      },
      { type: "quantity", tiers: [100, 250, 500, 1000, 2500, 5000] },
      {
        type: "material",
        options: [
          { label: "14pt Matte", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "16pt Silk", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.1 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Rounded Corners", description: "Rounds all four corners to a 1/8in radius.", priceDelta: 0.05 },
          { label: "Spot UV", description: "Glossy raised coating over selected artwork areas.", priceDelta: 0.1 },
        ],
      },
    ],
    basePricePerUnit: 0.18,
  },
  {
    id: "prod-premium-suede-cards",
    slug: "premium-suede-business-cards",
    name: "Premium Suede Business Cards",
    categoryId: "cat-cards-premium",
    description:
      "32pt ultra-thick cards laminated in a soft-touch suede finish, with a colored edge for a tactile first impression.",
    useCases: ["Corporate & Office", "Fashion & Apparel"],
    images: [
      "/images/products/premium-suede-business-cards.webp",
    ],
    seo: {
      title: "Premium Suede Business Cards | Outprint",
      description:
        "32pt suede-laminated business cards with colored edge paint and foil stamping options. Premium bulk order discounts.",
    },
    optionGroups: [
      { type: "shape", options: ["Standard Rectangle", "Square"] },
      {
        type: "size",
        presets: [
          { label: '3.5" x 2" Standard', valueInInches: 3.5 },
          { label: '2.5" x 2.5" Square', valueInInches: 2.5 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [100, 250, 500, 1000, 2500] },
      {
        type: "material",
        options: [
          { label: "32pt Suede Laminated", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "32pt Suede + Colored Edge", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.25 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Foil Stamping", description: "Metallic foil accent on logo or type.", priceDelta: 0.15 },
          { label: "Edge Painting", description: "Solid color paint applied to the card's cut edges.", priceDelta: 0.2 },
        ],
      },
    ],
    basePricePerUnit: 0.65,
  },
  {
    id: "prod-letterpress-cotton-cards",
    slug: "letterpress-cotton-business-cards",
    name: "Letterpress Cotton Business Cards",
    categoryId: "cat-cards-premium-letterpress",
    description:
      "600gsm cotton stock, deep-impression letterpress or blind deboss — the same archival cotton used for our stationery line.",
    useCases: ["Corporate & Office", "Events & Weddings"],
    images: [
      "/images/products/letterpress-cotton-business-cards.webp",
    ],
    seo: {
      title: "Letterpress Cotton Business Cards | Outprint",
      description:
        "600gsm cotton letterpress business cards with deep-impression deboss. Colorplan stock options, small-batch bulk order discounts.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [{ label: '3.5" x 2" Standard', valueInInches: 3.5 }],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [100, 250, 500, 1000] },
      {
        type: "material",
        options: [
          { label: "600gsm Cotton", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Colorplan Emerald", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.15 },
          { label: "Colorplan Ivory", image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.15 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Blind Deboss", description: "Uninked deep impression for a tactile mark.", priceDelta: 0.3 },
          { label: "Edge Painting", description: "Solid color paint applied to the card's cut edges.", priceDelta: 0.2 },
        ],
      },
    ],
    basePricePerUnit: 1.4,
  },

  // ── Banners & Signage ────────────────────────────────────────────────
  {
    id: "prod-vinyl-outdoor-banners",
    slug: "vinyl-outdoor-banners",
    name: "Vinyl Outdoor Banners",
    categoryId: "cat-banners-vinyl",
    description:
      "13oz scrim vinyl banners with reinforced hems and brass grommets — built for storefronts, events, and job sites.",
    useCases: ["Corporate & Office", "Events & Weddings"],
    images: [
      "/images/products/vinyl-outdoor-banners.webp",
    ],
    seo: {
      title: "Custom Vinyl Outdoor Banners | Outprint",
      description:
        "13oz scrim vinyl banners with grommets, custom sizes from 2x4ft to 10x20ft. Fast turnaround for events and storefronts.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: "2 ft x 4 ft", valueInInches: 24 },
          { label: "3 ft x 6 ft", valueInInches: 36 },
          { label: "4 ft x 8 ft", valueInInches: 48 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [1, 2, 5, 10, 25, 50] },
      {
        type: "material",
        options: [
          { label: "13oz Scrim Vinyl", image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "18oz Heavy-Duty Vinyl", image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.3 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Brass Grommets", description: "Corner and edge grommets every 2ft for hanging.", priceDelta: 4 },
          { label: "Pole Pockets", description: "Sewn pockets on top and bottom for pole mounting.", priceDelta: 6 },
          { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 10 },
        ],
      },
    ],
    basePricePerUnit: 18,
  },
  {
    id: "prod-mesh-windproof-banners",
    slug: "mesh-windproof-banners",
    name: "Mesh Windproof Banners",
    categoryId: "cat-banners-mesh",
    description:
      "Perforated mesh vinyl lets wind pass through instead of catching your banner — the standard for fence lines and high-wind sites.",
    useCases: ["Events & Weddings", "Corporate & Office"],
    images: [
      "/images/products/mesh-windproof-banners.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Mesh Windproof Banners | Outprint",
      description:
        "Perforated mesh vinyl banners built for wind resistance on fence lines and outdoor events. Custom sizes and grommet placement.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: "3 ft x 6 ft", valueInInches: 36 },
          { label: "4 ft x 10 ft", valueInInches: 48 },
        ],
        allowCustomSize: true,
      },
      { type: "quantity", tiers: [1, 2, 5, 10, 25] },
      {
        type: "material",
        options: [
          { label: "Standard Mesh Vinyl", image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Brass Grommets", description: "Corner and edge grommets every 2ft for hanging.", priceDelta: 5 },
          { label: "Reinforced Hem", description: "Double-stitched hem for high-wind sites.", priceDelta: 7 },
        ],
      },
    ],
    basePricePerUnit: 24,
  },
  {
    id: "prod-retractable-banner-stands",
    slug: "retractable-banner-stands",
    name: "Retractable Banner Stands",
    categoryId: "cat-banners",
    description:
      "Roll-up banner stand with an aluminum base, carry bag, and a replaceable printed graphic — setup in under a minute.",
    useCases: ["Corporate & Office", "Events & Weddings"],
    images: [
      "/images/products/retractable-banner-stands.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Retractable Banner Stands | Outprint",
      description:
        "Roll-up retractable banner stands with aluminum base and carry bag. Standard and premium wide-base options.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          { label: '33" x 81"', valueInInches: 33 },
          { label: '48" x 81"', valueInInches: 48 },
        ],
        allowCustomSize: false,
      },
      { type: "quantity", tiers: [1, 2, 5, 10, 25] },
      {
        type: "material",
        options: [
          { label: "Standard Aluminum Base", image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1 },
          { label: "Premium Wide-Base", image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80", priceMultiplier: 1.3 },
        ],
      },
      {
        type: "addons",
        options: [
          { label: "Custom Carry Case", description: "Padded hard case for transport and storage.", priceDelta: 15 },
          { label: "Double-Sided Print", description: "Prints identical graphics on both faces.", priceDelta: 25 },
        ],
      },
    ],
    basePricePerUnit: 65,
  },

  // ── Business Prints & Promo Prints ──────────────────────────────────
  {
    id: "prod-standard-business-cards",
    slug: "standard-business-cards",
    name: "Standard Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Everyday 14pt cards in matte or gloss — smudge-resistant, quick turnaround, and priced for ordering in volume.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-business-cards.webp",
    ],
    seo: {
      title: "Standard Business Cards | Outprint",
      description: "Everyday 14pt cards in matte or gloss — smudge-resistant, quick turnaround, and priced for ordering in volume. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "14pt Gloss",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "16pt Silk",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.12,
          },
        ],
      },
    ],
    basePricePerUnit: 0.16,
  },
  {
    id: "prod-express-business-cards",
    slug: "express-business-cards",
    name: "Express Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Same-day proofing and 24-hour production on our core matte and gloss stocks, for launches that can't wait.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/express-business-cards.webp",
    ],
    seo: {
      title: "Express Business Cards | Outprint",
      description: "Same-day proofing and 24-hour production on our core matte and gloss stocks, for launches that can't wait. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte — 24hr",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "14pt Gloss — 24hr",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.24,
  },
  {
    id: "prod-velvet-laminated-cards",
    slug: "velvet-laminated-cards",
    name: "Velvet Laminated Cards",
    categoryId: "cat-bp-business-cards",
    description: "16pt stock laminated in a soft-touch velvet film — a tactile, fingerprint-resistant finish that reads premium instantly.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/velvet-laminated-cards.webp",
    ],
    seo: {
      title: "Velvet Laminated Cards | Outprint",
      description: "16pt stock laminated in a soft-touch velvet film — a tactile, fingerprint-resistant finish that reads premium instantly. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "16pt Velvet Soft-Touch",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "18pt Velvet Soft-Touch",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.12,
          },
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.55,
  },
  {
    id: "prod-textured-business-cards",
    slug: "textured-business-cards",
    name: "Textured Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Linen, cotton or hammer-textured stock adds a tactile finish you can feel before you read a word.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/textured-business-cards.webp",
    ],
    seo: {
      title: "Textured Business Cards | Outprint",
      description: "Linen, cotton or hammer-textured stock adds a tactile finish you can feel before you read a word. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Linen Texture",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Cotton Texture",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
          {
            label: "Hammer Texture",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.45,
  },
  {
    id: "prod-pearl-shimmer-cards",
    slug: "pearl-shimmer-cards",
    name: "Pearl Shimmer Cards",
    categoryId: "cat-bp-business-cards",
    description: "Pearlescent shimmer stock that catches the light at an angle — a subtle upgrade over flat matte or gloss.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/pearl-shimmer-cards.webp",
    ],
    seo: {
      title: "Pearl Shimmer Cards | Outprint",
      description: "Pearlescent shimmer stock that catches the light at an angle — a subtle upgrade over flat matte or gloss. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Pearl White Shimmer",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Pearl Ivory Shimmer",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Pearl Gold Shimmer",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.5,
  },
  {
    id: "prod-smooth-white-business-cards",
    slug: "smooth-white-business-cards",
    name: "Smooth White Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Uncoated smooth white stock that takes pen ink cleanly — popular for cards meant to be written on.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/smooth-white-business-cards.webp",
    ],
    seo: {
      title: "Smooth White Business Cards | Outprint",
      description: "Uncoated smooth white stock that takes pen ink cleanly — popular for cards meant to be written on. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Smooth Uncoated",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Smooth Uncoated",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.1,
          },
        ],
      },
    ],
    basePricePerUnit: 0.2,
  },
  {
    id: "prod-brown-kraft-business-cards",
    slug: "brown-kraft-business-cards",
    name: "Brown Kraft Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Uncoated kraft stock with visible natural fibers — an earthy, eco-forward look for craft and hospitality brands.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/brown-kraft-business-cards.webp",
    ],
    seo: {
      title: "Brown Kraft Business Cards | Outprint",
      description: "Uncoated kraft stock with visible natural fibers — an earthy, eco-forward look for craft and hospitality brands. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "18pt Kraft Uncoated",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "18pt Kraft + Spot UV",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.25,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.12,
          },
        ],
      },
    ],
    basePricePerUnit: 0.22,
  },
  {
    id: "prod-waterproof-cards",
    slug: "waterproof-cards",
    name: "Waterproof Cards",
    categoryId: "cat-bp-business-cards",
    description: "Synthetic polypropylene stock that survives a spill, a pool day, or a stint in a wallet through the wash.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/waterproof-cards.webp",
    ],
    seo: {
      title: "Waterproof Cards | Outprint",
      description: "Synthetic polypropylene stock that survives a spill, a pool day, or a stint in a wallet through the wash. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Synthetic PP Waterproof",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Synthetic PP Frosted",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.48,
  },
  {
    id: "prod-eco-friendly-cards",
    slug: "eco-friendly-cards",
    name: "Eco-Friendly Cards",
    categoryId: "cat-bp-business-cards",
    description: "100% recycled matte stock, or plantable seed paper that grows into wildflowers once the card's done its job.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/eco-friendly-cards.webp",
    ],
    seo: {
      title: "Eco-Friendly Cards | Outprint",
      description: "100% recycled matte stock, or plantable seed paper that grows into wildflowers once the card's done its job. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "100% Recycled Matte",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Seed Paper (Plantable)",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.6,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.12,
          },
        ],
      },
    ],
    basePricePerUnit: 0.24,
  },
  {
    id: "prod-spot-uv-business-cards",
    slug: "spot-uv-business-cards",
    name: "Spot UV Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Matte or silk base stock with a glossy raised coating over your logo or type for contrast without color.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/spot-uv-business-cards.webp",
    ],
    seo: {
      title: "Spot UV Business Cards | Outprint",
      description: "Matte or silk base stock with a glossy raised coating over your logo or type for contrast without color. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte + Spot UV",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Silk + Spot UV",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.42,
  },
  {
    id: "prod-white-ink-black-cards",
    slug: "white-ink-black-cards",
    name: "White Ink Black Cards",
    categoryId: "cat-bp-business-cards",
    description: "Solid black stock printed with opaque white ink — a stark, high-contrast look that stands out in any card holder.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/white-ink-black-cards.webp",
    ],
    seo: {
      title: "White Ink Black Cards | Outprint",
      description: "Solid black stock printed with opaque white ink — a stark, high-contrast look that stands out in any card holder. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Black Stock + White Ink",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black Stock + White Ink + Spot UV",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.18,
          },
        ],
      },
    ],
    basePricePerUnit: 0.5,
  },
  {
    id: "prod-gold-foil-black-cards",
    slug: "gold-foil-black-cards",
    name: "Gold Foil Black Cards",
    categoryId: "cat-bp-business-cards",
    description: "Black stock finished with a metallic foil stamp — gold, rose gold or silver — for a luxury first impression.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/gold-foil-black-cards.webp",
    ],
    seo: {
      title: "Gold Foil Black Cards | Outprint",
      description: "Black stock finished with a metallic foil stamp — gold, rose gold or silver — for a luxury first impression. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Black Stock + Gold Foil",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black Stock + Rose Gold Foil",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Black Stock + Silver Foil",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.75,
  },
  {
    id: "prod-double-pasted-cards",
    slug: "double-pasted-cards",
    name: "Double Pasted Cards",
    categoryId: "cat-bp-business-cards",
    description: "Two sheets glued face-to-face for extra rigidity and heft, without the cost of a full triplex build.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/double-pasted-cards.webp",
    ],
    seo: {
      title: "Double Pasted Cards | Outprint",
      description: "Two sheets glued face-to-face for extra rigidity and heft, without the cost of a full triplex build. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "32pt Double Pasted",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "32pt Double Pasted + Colored Core",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rounded Corners",
            description: "Rounds all four corners to a 1/8in radius.",
            priceDelta: 0.04,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.35,
  },
  {
    id: "prod-triplex-business-cards",
    slug: "triplex-business-cards",
    name: "Triplex Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Three laminated layers with a bold colored core visible at the edge — our thickest, most substantial card build.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/triplex-business-cards.webp",
    ],
    seo: {
      title: "Triplex Business Cards | Outprint",
      description: "Three laminated layers with a bold colored core visible at the edge — our thickest, most substantial card build. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Standard Rectangle",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Standard",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "48pt Triplex (Colored Core)",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "48pt Triplex + Edge Paint",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.6,
  },
  {
    id: "prod-square-business-cards",
    slug: "square-business-cards",
    name: "Square Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "A square die-cut card that stands out in a stack of standard rectangles, on the same 14pt-16pt stocks.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/square-business-cards.webp",
    ],
    seo: {
      title: "Square Business Cards | Outprint",
      description: "A square die-cut card that stands out in a stack of standard rectangles, on the same 14pt-16pt stocks. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "65mm x 65mm (2.6\" x 2.6\") Square",
            valueInInches: 2.6,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Silk",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.28,
  },
  {
    id: "prod-circle-business-cards",
    slug: "circle-business-cards",
    name: "Circle Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "A fully round die-cut card — a distinctive shape for logos and brands built around a circular mark.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/circle-business-cards.webp",
    ],
    seo: {
      title: "Circle Business Cards | Outprint",
      description: "A fully round die-cut card — a distinctive shape for logos and brands built around a circular mark. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "55mm Diameter (2.2\") Circle",
            valueInInches: 2.2,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Silk",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.3,
  },
  {
    id: "prod-oval-shaped-business-cards",
    slug: "oval-shaped-business-cards",
    name: "Oval Shaped Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "A softened oval die-cut for a card that still reads as familiar but never gets lost in a card holder.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/oval-shaped-business-cards.webp",
    ],
    seo: {
      title: "Oval Shaped Business Cards | Outprint",
      description: "A softened oval die-cut for a card that still reads as familiar but never gets lost in a card holder. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "85mm x 55mm (3.35\" x 2.2\") Oval",
            valueInInches: 3.35,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Silk",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.3,
  },
  {
    id: "prod-any-shape-die-cut-business-cards",
    slug: "any-shape-die-cut-business-cards",
    name: "Any Shape (Die-cut) Business Cards",
    categoryId: "cat-bp-business-cards",
    description: "Fully custom die-cut outline traced to your artwork — arches, tabs, notches or a shape entirely your own.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/any-shape-die-cut-business-cards.webp",
    ],
    seo: {
      title: "Any Shape (Die-cut) Business Cards | Outprint",
      description: "Fully custom die-cut business cards in any outline. Bulk order discounts from 100 to 5000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Custom Die-Cut Outline",
          "Arch",
          "Slit Corner",
          "Notched Corner",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm x 50mm (3.5\" x 2\") Bounding Box",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "16pt Silk Die-Cut",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "18pt Matte Die-Cut",
            image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.45,
  },
  {
    id: "prod-standard-letterheads",
    slug: "standard-letterheads",
    name: "Standard Letterheads",
    categoryId: "cat-bp-letterheads",
    description: "80gsm-100gsm bond paper letterheads, single or full-color printed to your template.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-letterheads.webp",
    ],
    seo: {
      title: "Standard Letterheads | Outprint",
      description: "80gsm-100gsm bond paper letterheads, single or full-color printed to your template. Bulk order discounts from 100 to 2500 sheets.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "80gsm Bond",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "100gsm Bond",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Second Color Print",
            description: "Adds a second spot color to your letterhead template.",
            priceDelta: 0.4,
          },
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 3.5,
  },
  {
    id: "prod-express-letterheads",
    slug: "express-letterheads",
    name: "Express Letterheads",
    categoryId: "cat-bp-letterheads",
    description: "Same bond-paper letterheads with a 24-hour turnaround for urgent print runs.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/express-letterheads.webp",
    ],
    seo: {
      title: "Express Letterheads | Outprint",
      description: "Same bond-paper letterheads with a 24-hour turnaround for urgent print runs. Bulk order discounts from 100 to 2500 sheets.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "80gsm Bond — 24hr",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "100gsm Bond — 24hr",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Second Color Print",
            description: "Adds a second spot color to your letterhead template.",
            priceDelta: 0.4,
          },
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 5,
  },
  {
    id: "prod-executive-letterheads",
    slug: "executive-letterheads",
    name: "Executive Letterheads",
    categoryId: "cat-bp-letterheads",
    description: "120gsm-160gsm premium uncoated stock, built for foil or embossed letterhead headers.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/executive-letterheads.webp",
    ],
    seo: {
      title: "Executive Letterheads | Outprint",
      description: "120gsm-160gsm premium uncoated stock, built for foil or embossed letterhead headers. Bulk order discounts from 100 to 2500 sheets.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "120gsm Premium",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "160gsm Premium",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Second Color Print",
            description: "Adds a second spot color to your letterhead template.",
            priceDelta: 0.4,
          },
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 7,
  },
  {
    id: "prod-dl-custom-envelopes",
    slug: "dl-custom-envelopes",
    name: "DL Custom Envelopes",
    categoryId: "cat-bp-envelopes",
    description: "110mm x 220mm DL envelopes, the standard size for a folded A4 letter.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/dl-custom-envelopes.webp",
    ],
    seo: {
      title: "DL Custom Envelopes | Outprint",
      description: "110mm x 220mm DL envelopes, the standard size for a folded A4 letter. Optional window cut, full-color print, bulk order discounts from 100 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "110mm x 220mm (DL)",
            valueInInches: 4.33,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "100gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "120gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
          {
            label: "100gsm Kraft Brown",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Window Cut",
            description: "Adds a clear film window for address visibility.",
            priceDelta: 0.05,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.35,
  },
  {
    id: "prod-c5-custom-envelopes",
    slug: "c5-custom-envelopes",
    name: "C5 Custom Envelopes",
    categoryId: "cat-bp-envelopes",
    description: "162mm x 229mm C5 envelopes, sized for an A4 sheet folded once.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/c5-custom-envelopes.webp",
    ],
    seo: {
      title: "C5 Custom Envelopes | Outprint",
      description: "162mm x 229mm C5 envelopes, sized for an A4 sheet folded once. Optional window cut, full-color print, bulk order discounts from 100 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "162mm x 229mm (C5)",
            valueInInches: 6.38,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "100gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "120gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
          {
            label: "100gsm Kraft Brown",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Window Cut",
            description: "Adds a clear film window for address visibility.",
            priceDelta: 0.05,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.55,
  },
  {
    id: "prod-c4-custom-envelopes",
    slug: "c4-custom-envelopes",
    name: "C4 Custom Envelopes",
    categoryId: "cat-bp-envelopes",
    description: "229mm x 324mm C4 envelopes, sized for an unfolded A4 sheet.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/c4-custom-envelopes.webp",
    ],
    seo: {
      title: "C4 Custom Envelopes | Outprint",
      description: "229mm x 324mm C4 envelopes, sized for an unfolded A4 sheet. Optional window cut, full-color print, bulk order discounts from 100 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "229mm x 324mm (C4)",
            valueInInches: 9.02,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "100gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "120gsm White Wove",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
          {
            label: "100gsm Kraft Brown",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Window Cut",
            description: "Adds a clear film window for address visibility.",
            priceDelta: 0.05,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.85,
  },
  {
    id: "prod-a5-notepads",
    slug: "a5-notepads",
    name: "A5 Notepads",
    categoryId: "cat-bp-notepads",
    description: "50-sheet A5 notepads, glue-bound at the top, with your logo and ruled or grid layout printed on every sheet.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a5-notepads.webp",
    ],
    seo: {
      title: "A5 Notepads | Outprint",
      description: "50-sheet A5 notepads, glue-bound at the top, with your logo and ruled or grid layout printed on every sheet. Bulk order discounts from 25 to 500 notepads.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "80gsm Uncoated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "100gsm Uncoated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Chipboard Backer",
            description: "Adds a rigid backing board for a firmer writing surface.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 4,
          },
        ],
      },
    ],
    basePricePerUnit: 32,
  },
  {
    id: "prod-a5-wire-o-notebooks",
    slug: "a5-wire-o-notebooks",
    name: "A5 Wire-o Notebooks",
    categoryId: "cat-bp-notepads",
    description: "Wire-o bound A5 notebooks with a printed soft or hard cover — lies flat for writing, and holds up to daily use.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a5-wire-o-notebooks.webp",
    ],
    seo: {
      title: "A5 Wire-o Notebooks | Outprint",
      description: "Wire-o bound A5 notebooks with a printed soft or hard cover — lies flat for writing, and holds up to daily use. Bulk order discounts from 25 to 500 notepads.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Soft Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Hard Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Elastic Closure Band",
            description: "Adds an elastic band to keep the notebook closed.",
            priceDelta: 5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 6,
          },
        ],
      },
    ],
    basePricePerUnit: 58,
  },
  {
    id: "prod-standard-certificates",
    slug: "standard-certificates",
    name: "Standard Certificates",
    categoryId: "cat-bp-certificates",
    description: "160gsm-220gsm cardstock certificates with a decorative border, printed in full color.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-certificates.webp",
    ],
    seo: {
      title: "Standard Certificates | Outprint",
      description: "160gsm-220gsm cardstock certificates with a decorative border, printed in full color. Bulk order discounts from 25 to 1000 certificates.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
          {
            label: "Landscape A4 (11.7\" x 8.3\")",
            valueInInches: 11.7,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "160gsm Cardstock",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "220gsm Cardstock",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 1.2,
  },
  {
    id: "prod-premium-certificates",
    slug: "premium-certificates",
    name: "Premium Certificates",
    categoryId: "cat-bp-certificates",
    description: "Textured cover-weight stock with a gold or silver foil seal for award and achievement certificates.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/premium-certificates.webp",
    ],
    seo: {
      title: "Premium Certificates | Outprint",
      description: "Textured cover-weight stock with a gold or silver foil seal for award and achievement certificates. Bulk order discounts from 25 to 1000 certificates.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
          {
            label: "Landscape A4 (11.7\" x 8.3\")",
            valueInInches: 11.7,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "250gsm Textured",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "300gsm Textured + Foil Seal",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.5,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.4,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.4,
          },
        ],
      },
    ],
    basePricePerUnit: 2.5,
  },
  {
    id: "prod-a4-2-pocket-folders",
    slug: "a4-2-pocket-folders",
    name: "A4 2-Pocket Folders",
    categoryId: "cat-bp-folders",
    description: "Standard A4 presentation folder with two interior pockets and a business card slit, on heavy printed board.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a4-2-pocket-folders.webp",
    ],
    seo: {
      title: "A4 2-Pocket Folders | Outprint",
      description: "A4 two-pocket presentation folders on 300gsm-350gsm board, full-color printed. Bulk order discounts from 25 to 1000 folders.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (9\" x 12\" Folder)",
            valueInInches: 9,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "300gsm Gloss Board",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "350gsm Matte Board",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Business Card Slits",
            description: "Die-cut slits on the inside pocket to hold a business card.",
            priceDelta: 0.15,
          },
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.6,
          },
        ],
      },
    ],
    basePricePerUnit: 3.5,
  },
  {
    id: "prod-custom-shape-folders",
    slug: "custom-shape-folders",
    name: "Custom Shape Folders",
    categoryId: "cat-bp-folders",
    description: "Die-cut presentation folder in a shape unique to your brand, beyond the standard rectangle.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/custom-shape-folders.webp",
    ],
    seo: {
      title: "Custom Shape Folders | Outprint",
      description: "Custom die-cut shape presentation folders on heavy board, full-color printed. Bulk order discounts from 25 to 1000 folders.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Custom Die-Cut Outline",
          "Angled Pocket",
          "Rounded Corners",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "A4 (9\" x 12\" Bounding Box)",
            valueInInches: 9,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "300gsm Gloss Board",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "350gsm Matte Board",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Spot UV",
            description: "Glossy raised coating over selected artwork areas.",
            priceDelta: 0.3,
          },
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.6,
          },
        ],
      },
    ],
    basePricePerUnit: 5.5,
  },
  {
    id: "prod-standard-flyers",
    slug: "standard-flyers",
    name: "Standard Flyers",
    categoryId: "cat-pp-flyers",
    description: "150gsm-250gsm gloss art paper flyers for everyday promotions, priced for high-volume distribution.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/standard-flyers.webp",
    ],
    seo: {
      title: "Standard Flyers | Outprint",
      description: "150gsm-250gsm gloss art paper flyers for everyday promotions, priced for high-volume distribution. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "150gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
          {
            label: "250gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.25,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 1.2,
  },
  {
    id: "prod-express-flyers",
    slug: "express-flyers",
    name: "Express Flyers",
    categoryId: "cat-pp-flyers",
    description: "The same gloss art paper flyer, produced and dispatched within 24 hours.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/express-flyers.webp",
    ],
    seo: {
      title: "Express Flyers | Outprint",
      description: "The same gloss art paper flyer, produced and dispatched within 24 hours. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "150gsm Gloss — 24hr",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Gloss — 24hr",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.4,
          },
        ],
      },
    ],
    basePricePerUnit: 1.8,
  },
  {
    id: "prod-gloss-laminated-flyers",
    slug: "gloss-laminated-flyers",
    name: "Gloss Laminated Flyers",
    categoryId: "cat-pp-flyers",
    description: "300gsm-350gsm stock finished with a gloss laminate film for extra durability and shine.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/gloss-laminated-flyers.webp",
    ],
    seo: {
      title: "Gloss Laminated Flyers | Outprint",
      description: "300gsm-350gsm stock finished with a gloss laminate film for extra durability and shine. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "300gsm Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "350gsm Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.35,
          },
        ],
      },
    ],
    basePricePerUnit: 1.7,
  },
  {
    id: "prod-square-flyers",
    slug: "square-flyers",
    name: "Square Flyers",
    categoryId: "cat-pp-flyers",
    description: "A square-format flyer that breaks from the standard A-size rack — popular for menus and social handouts.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/square-flyers.webp",
    ],
    seo: {
      title: "Square Flyers | Outprint",
      description: "A square-format flyer that breaks from the standard A-size rack — popular for menus and social handouts. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "250gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.35,
          },
        ],
      },
    ],
    basePricePerUnit: 1.6,
  },
  {
    id: "prod-brown-kraft-flyers",
    slug: "brown-kraft-flyers",
    name: "Brown Kraft Flyers",
    categoryId: "cat-pp-flyers",
    description: "Uncoated kraft stock flyers for an earthy, hand-made look that still holds crisp full-color print.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/brown-kraft-flyers.webp",
    ],
    seo: {
      title: "Brown Kraft Flyers | Outprint",
      description: "Uncoated kraft stock flyers for an earthy, hand-made look that still holds crisp full-color print. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "120gsm Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 1.5,
  },
  {
    id: "prod-waterproof-flyers",
    slug: "waterproof-flyers",
    name: "Waterproof Flyers",
    categoryId: "cat-pp-flyers",
    description: "Synthetic waterproof stock built for outdoor handouts, boats and anything that meets rain or spray.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
      "Food & Beverage",
    ],
    images: [
      "/images/products/waterproof-flyers.webp",
    ],
    seo: {
      title: "Waterproof Flyers | Outprint",
      description: "Synthetic waterproof stock built for outdoor handouts, boats and anything that meets rain or spray. Bulk order discounts from 100 to 10,000 flyers, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
          10000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Synthetic Waterproof Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Synthetic Waterproof Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.2,
  },
  {
    id: "prod-desktop-calendars",
    slug: "desktop-calendars",
    name: "Desktop Calendars",
    categoryId: "cat-pp-calendars",
    description: "A compact wire-bound tent calendar that sits on any desk, printed with 12 monthly spreads.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/desktop-calendars.webp",
    ],
    seo: {
      title: "Desktop Calendars | Outprint",
      description: "A compact wire-bound tent calendar that sits on any desk, printed with 12 monthly spreads. Bulk order discounts from 25 to 1000 units, custom branding on every month.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "6\" x 4\" Tent",
            valueInInches: 6,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "250gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "300gsm Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 8,
  },
  {
    id: "prod-wall-calendars",
    slug: "wall-calendars",
    name: "Wall Calendars",
    categoryId: "cat-pp-calendars",
    description: "A 12-month wire-o bound wall calendar with a hanging hole, one spread per month.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/wall-calendars.webp",
    ],
    seo: {
      title: "Wall Calendars | Outprint",
      description: "A 12-month wire-o bound wall calendar with a hanging hole, one spread per month. Bulk order discounts from 25 to 1000 units, custom branding on every month.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "12\" x 18\" Wall",
            valueInInches: 12,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "200gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "250gsm Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 14,
  },
  {
    id: "prod-poster-calendars",
    slug: "poster-calendars",
    name: "Poster Calendars",
    categoryId: "cat-pp-calendars",
    description: "A single large-format sheet with all 12 months laid out at once — no binding, just pin and go.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/poster-calendars.webp",
    ],
    seo: {
      title: "Poster Calendars | Outprint",
      description: "A single large-format sheet with all 12 months laid out at once — no binding, just pin and go. Bulk order discounts from 25 to 1000 units, custom branding on every month.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "18\" x 24\" Poster",
            valueInInches: 18,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "200gsm Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 10,
  },
  {
    id: "prod-standard-postcards",
    slug: "standard-postcards",
    name: "Standard Postcards",
    categoryId: "cat-pp-postcards",
    description: "4in x 6in gloss postcards for direct mail, promotions and event invites.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-postcards.webp",
    ],
    seo: {
      title: "Standard Postcards | Outprint",
      description: "4in x 6in gloss postcards for direct mail, promotions and event invites. Bulk order discounts from 100 to 5000 postcards.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "4\" x 6\" Standard",
            valueInInches: 4,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.25,
  },
  {
    id: "prod-photo-postcards",
    slug: "photo-postcards",
    name: "Photo Postcards",
    categoryId: "cat-pp-postcards",
    description: "Photo-paper finish postcards that reproduce images with the depth of a real photo print.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-postcards.webp",
    ],
    seo: {
      title: "Photo Postcards | Outprint",
      description: "Photo-paper finish postcards that reproduce images with the depth of a real photo print. Bulk order discounts from 100 to 5000 postcards.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "4\" x 6\" Standard",
            valueInInches: 4,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Photo Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Photo Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.4,
  },
  {
    id: "prod-square-postcards",
    slug: "square-postcards",
    name: "Square Postcards",
    categoryId: "cat-pp-postcards",
    description: "A square-format postcard for a distinctive mailer or Instagram-ready handout.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/square-postcards.webp",
    ],
    seo: {
      title: "Square Postcards | Outprint",
      description: "A square-format postcard for a distinctive mailer or Instagram-ready handout. Bulk order discounts from 100 to 5000 postcards.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "5\" x 5\" Square",
            valueInInches: 5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.35,
  },
  {
    id: "prod-standard-greeting-cards",
    slug: "standard-greeting-cards",
    name: "Standard Greeting Cards",
    categoryId: "cat-pp-greeting-cards",
    description: "A folded 5in x 7in greeting card printed inside and out, with a matching blank envelope included.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-greeting-cards.webp",
    ],
    seo: {
      title: "Standard Greeting Cards | Outprint",
      description: "Custom folded greeting cards with matching envelopes. Bulk order discounts from 25 to 1000 cards, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "5\" x 7\" Folded",
            valueInInches: 5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "250gsm Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "300gsm Textured",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.25,
          },
          {
            label: "Kraft Envelope Upgrade",
            description: "Swaps the included envelope for a kraft brown one.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 2.5,
  },
  {
    id: "prod-trifold-menus",
    slug: "trifold-menus",
    name: "Trifold Menus",
    categoryId: "cat-pp-menus-brochures",
    description: "A laminated trifold A4 menu built to survive daily handling on a restaurant table.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/trifold-menus.webp",
    ],
    seo: {
      title: "Trifold Menus | Outprint",
      description: "A laminated trifold A4 menu built to survive daily handling on a restaurant table. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\") Trifold",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "250gsm Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 3.5,
  },
  {
    id: "prod-trifold-pamphlets",
    slug: "trifold-pamphlets",
    name: "Trifold Pamphlets",
    categoryId: "cat-pp-menus-brochures",
    description: "An unlaminated trifold pamphlet for marketing collateral, rack cards and info handouts.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/trifold-pamphlets.webp",
    ],
    seo: {
      title: "Trifold Pamphlets | Outprint",
      description: "An unlaminated trifold pamphlet for marketing collateral, rack cards and info handouts. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\") Trifold",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "150gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 1,
  },
  {
    id: "prod-standard-booklets",
    slug: "standard-booklets",
    name: "Standard Booklets",
    categoryId: "cat-pp-menus-brochures",
    description: "An 8-page saddle-stitched booklet with a self-cover, for programs, guides and product overviews.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/standard-booklets.webp",
    ],
    seo: {
      title: "Standard Booklets | Outprint",
      description: "An 8-page saddle-stitched booklet with a self-cover, for programs, guides and product overviews. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "150gsm Gloss Text",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Silk Text",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 12,
  },
  {
    id: "prod-standard-catalogues",
    slug: "standard-catalogues",
    name: "Standard Catalogues",
    categoryId: "cat-pp-menus-brochures",
    description: "A multi-page perfect-bound or saddle-stitched catalogue for a full product range.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/standard-catalogues.webp",
    ],
    seo: {
      title: "Standard Catalogues | Outprint",
      description: "A multi-page perfect-bound or saddle-stitched catalogue for a full product range. Bulk order discounts from 25 to 500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Silk Text",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "200gsm Silk Text",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.12,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 18,
  },
  {
    id: "prod-standard-brochures",
    slug: "standard-brochures",
    name: "Standard Brochures",
    categoryId: "cat-pp-menus-brochures",
    description: "A bifold A4 brochure for a single product line or service overview.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/standard-brochures.webp",
    ],
    seo: {
      title: "Standard Brochures | Outprint",
      description: "A bifold A4 brochure for a single product line or service overview. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\") Bifold",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "250gsm Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.2,
  },
  {
    id: "prod-company-profiles",
    slug: "company-profiles",
    name: "Company Profiles",
    categoryId: "cat-pp-menus-brochures",
    description: "A premium bound document on quality stock with a heavier cover — the print leave-behind for a pitch meeting.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/company-profiles.webp",
    ],
    seo: {
      title: "Company Profiles | Outprint",
      description: "A premium bound document on quality stock with a heavier cover — the print leave-behind for a pitch meeting. Bulk order discounts from 25 to 500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "200gsm Silk Text + Matte Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "250gsm Silk Text + Laminated Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Perfect Binding Upgrade",
            description: "Upgrades from saddle-stitch to a flat, glued spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.5,
          },
        ],
      },
    ],
    basePricePerUnit: 22,
  },
  {
    id: "prod-door-hangers",
    slug: "door-hangers",
    name: "Door Hangers",
    categoryId: "cat-pp-door-hangers",
    description: "A die-cut door hanger with a slotted handle sized for a standard doorknob, printed full color both sides.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/door-hangers.webp",
    ],
    seo: {
      title: "Door Hangers | Outprint",
      description: "Custom die-cut door hangers with slotted handle. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "4.25\" x 11\" Standard",
            valueInInches: 4.25,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Gloss",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Tear-Off Coupon Perforation",
            description: "Adds a perforated tear-off strip along one edge.",
            priceDelta: 0.08,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.25,
          },
        ],
      },
    ],
    basePricePerUnit: 1.4,
  },
  {
    id: "prod-round-stickers",
    slug: "round-stickers",
    name: "Round Stickers",
    categoryId: "cat-pp-stickers-labels",
    description: "A simple circular sticker cut to a clean round edge — the fastest, most affordable die-cut shape.",
    useCases: [
      "E-commerce & DTC",
      "Events & Weddings",
    ],
    images: [
      "/images/products/round-stickers.webp",
    ],
    seo: {
      title: "Round Stickers | Outprint",
      description: "Custom round stickers in matte or glossy vinyl. Bulk order discounts from 25 to 2500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" Diameter",
            valueInInches: 2,
          },
          {
            label: "3\" Diameter",
            valueInInches: 3,
          },
          {
            label: "4\" Diameter",
            valueInInches: 4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          200,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Glossy Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.55,
  },
  {
    id: "prod-square-stickers",
    slug: "square-stickers",
    name: "Square Stickers",
    categoryId: "cat-pp-stickers-labels",
    description: "A clean square-cut sticker, ideal for grid layouts, product packs and uniform branding.",
    useCases: [
      "E-commerce & DTC",
      "Events & Weddings",
    ],
    images: [
      "/images/products/square-stickers.webp",
    ],
    seo: {
      title: "Square Stickers | Outprint",
      description: "Custom square stickers in matte or glossy vinyl. Bulk order discounts from 25 to 2500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 2\"",
            valueInInches: 2,
          },
          {
            label: "3\" x 3\"",
            valueInInches: 3,
          },
          {
            label: "4\" x 4\"",
            valueInInches: 4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          200,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Glossy Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.55,
  },
  {
    id: "prod-any-shape-kiss-cut-stickers",
    slug: "any-shape-kiss-cut-stickers",
    name: "Any Shape (Kiss-cut) Stickers",
    categoryId: "cat-pp-stickers-labels",
    description: "Kiss-cut to your artwork's outline on a peel-away backing sheet — the outline shows, the backing stays whole.",
    useCases: [
      "E-commerce & DTC",
      "Events & Weddings",
    ],
    images: [
      "/images/products/any-shape-kiss-cut-stickers.webp",
    ],
    seo: {
      title: "Any Shape (Kiss-cut) Stickers | Outprint",
      description: "Custom kiss-cut stickers in any shape, matte, glossy or holographic. Bulk order discounts from 25 to 2500 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Circle",
          "Square",
          "Rectangle",
          "Custom Shape",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "2\" max dimension",
            valueInInches: 2,
          },
          {
            label: "3\" max dimension",
            valueInInches: 3,
          },
          {
            label: "4\" max dimension",
            valueInInches: 4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          200,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Vinyl",
            image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Glossy Vinyl",
            image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Holographic",
            image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "White Ink Underlay",
            description: "Opaque white base layer for clear or dark substrates.",
            priceDelta: 0.08,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.9,
  },
  {
    id: "prod-paper-stickers",
    slug: "paper-stickers",
    name: "Paper Stickers",
    categoryId: "cat-pp-stickers-labels",
    description: "Uncoated or gloss paper stickers for indoor use — a budget-friendly alternative to vinyl for short-run campaigns.",
    useCases: [
      "E-commerce & DTC",
      "Events & Weddings",
    ],
    images: [
      "/images/products/paper-stickers.webp",
    ],
    seo: {
      title: "Paper Stickers | Outprint",
      description: "Custom paper stickers in matte, glossy or kraft finish. Bulk order discounts from 25 to 2500 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Circle",
          "Square",
          "Rectangle",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "2\" max dimension",
            valueInInches: 2,
          },
          {
            label: "3\" max dimension",
            valueInInches: 3,
          },
          {
            label: "4\" max dimension",
            valueInInches: 4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          200,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Paper",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Glossy Paper",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
          {
            label: "Kraft Paper",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.12,
          },
        ],
      },
    ],
    basePricePerUnit: 0.45,
  },
  {
    id: "prod-standard-posters",
    slug: "standard-posters",
    name: "Standard Posters",
    categoryId: "cat-pp-posters",
    description: "Large-format posters in matte or gloss finish, sized from A3 up to A0 for windows, walls and event signage.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/standard-posters.webp",
    ],
    seo: {
      title: "Standard Posters | Outprint",
      description: "Custom large-format posters, A3 to A0, matte or gloss finish. Bulk order discounts from 10 to 500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A3 (11.7\" x 16.5\")",
            valueInInches: 11.7,
          },
          {
            label: "A2 (16.5\" x 23.4\")",
            valueInInches: 16.5,
          },
          {
            label: "A1 (23.4\" x 33.1\")",
            valueInInches: 23.4,
          },
          {
            label: "A0 (33.1\" x 46.8\")",
            valueInInches: 33.1,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Matte Poster Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "170gsm Gloss Poster Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Synthetic Waterproof",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.4,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Lamination",
            description: "Matte or gloss laminate film over the printed surface.",
            priceDelta: 1.2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 2,
          },
        ],
      },
    ],
    basePricePerUnit: 3.5,
  },
  {
    id: "prod-standard-coasters",
    slug: "standard-coasters",
    name: "Standard Coasters",
    categoryId: "cat-pp-hospitality",
    description: "Round or square absorbent pulpboard coasters, full-color printed on one or both sides.",
    useCases: [
      "Food & Beverage",
      "Events & Weddings",
    ],
    images: [
      "/images/products/standard-coasters.webp",
    ],
    seo: {
      title: "Standard Coasters | Outprint",
      description: "Custom pulpboard coasters, round or square. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Round",
          "Square",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm (3.5\") Round/Square",
            valueInInches: 3.5,
          },
          {
            label: "95mm (3.7\") Round/Square",
            valueInInches: 3.7,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "1.5mm Pulpboard",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "2mm Pulpboard",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Double-Sided Print",
            description: "Prints full color on both faces of the coaster.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.6,
  },
  {
    id: "prod-brown-kraft-coasters",
    slug: "brown-kraft-coasters",
    name: "Brown Kraft Coasters",
    categoryId: "cat-pp-hospitality",
    description: "Uncoated kraft coaster board for a rustic, cafe-style look that still holds crisp one or two-color print.",
    useCases: [
      "Food & Beverage",
      "Events & Weddings",
    ],
    images: [
      "/images/products/brown-kraft-coasters.webp",
    ],
    seo: {
      title: "Brown Kraft Coasters | Outprint",
      description: "Custom brown kraft coasters, round or square. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Round",
          "Square",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "90mm (3.5\") Round/Square",
            valueInInches: 3.5,
          },
          {
            label: "95mm (3.7\") Round/Square",
            valueInInches: 3.7,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "1.5mm Kraft Pulpboard",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "2mm Kraft Pulpboard",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Double-Sided Print",
            description: "Prints full color on both faces of the coaster.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.65,
  },
  {
    id: "prod-standard-placemats",
    slug: "standard-placemats",
    name: "Standard Placemats",
    categoryId: "cat-pp-hospitality",
    description: "Disposable paper placemats sized for a standard table setting, full-color printed with menu highlights or ads.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/standard-placemats.webp",
    ],
    seo: {
      title: "Standard Placemats | Outprint",
      description: "Custom paper placemats for restaurants and cafes. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A3 (11.7\" x 16.5\")",
            valueInInches: 11.7,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "80gsm Uncoated",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "100gsm Gloss",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 0.9,
  },
  {
    id: "prod-food-wrappers",
    slug: "food-wrappers",
    name: "Food Wrappers",
    categoryId: "cat-pp-hospitality",
    description: "Greaseproof food wrap sheets printed with your branding, for burgers, sandwiches and bakery items.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/food-wrappers.webp",
    ],
    seo: {
      title: "Food Wrappers | Outprint",
      description: "Custom branded greaseproof food wrapping sheets. Bulk order discounts from 250 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "12\" x 12\" Sheet",
            valueInInches: 12,
          },
          {
            label: "15\" x 15\" Sheet",
            valueInInches: 15,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Greaseproof Paper",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Greaseproof Kraft",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.5,
  },
  {
    id: "prod-table-tents",
    slug: "table-tents",
    name: "Table Tents",
    categoryId: "cat-pp-hospitality",
    description: "A folded, free-standing table tent card for menu specials, promotions or table numbers.",
    useCases: [
      "Food & Beverage",
      "Events & Weddings",
    ],
    images: [
      "/images/products/table-tents.webp",
    ],
    seo: {
      title: "Table Tents | Outprint",
      description: "Custom folded table tent cards for restaurants and events. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "4\" x 6\" Tent",
            valueInInches: 4,
          },
          {
            label: "5\" x 7\" Tent",
            valueInInches: 5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "300gsm Gloss Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "300gsm Matte Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "350gsm Laminated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 3,
  },
  {
    id: "prod-standard-hang-tags",
    slug: "standard-hang-tags",
    name: "Standard Hang Tags",
    categoryId: "cat-pp-tags-bookmarks",
    description: "Retail garment hang tags on sturdy cardstock, punched with a string hole and ready to attach.",
    useCases: [
      "Fashion & Apparel",
      "E-commerce & DTC",
    ],
    images: [
      "/images/products/standard-hang-tags.webp",
    ],
    seo: {
      title: "Standard Hang Tags | Outprint",
      description: "Custom retail hang tags with string hole. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 3.5\"",
            valueInInches: 2,
          },
          {
            label: "2.5\" x 4\"",
            valueInInches: 2.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "18pt Kraft",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "String Attached",
            description: "Pre-attaches a cotton string loop through the hole.",
            priceDelta: 0.03,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.1,
          },
        ],
      },
    ],
    basePricePerUnit: 0.35,
  },
  {
    id: "prod-standard-bookmarks",
    slug: "standard-bookmarks",
    name: "Standard Bookmarks",
    categoryId: "cat-pp-tags-bookmarks",
    description: "A simple full-color bookmark on matte or gloss cardstock — a low-cost giveaway for stores and events.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/standard-bookmarks.webp",
    ],
    seo: {
      title: "Standard Bookmarks | Outprint",
      description: "Custom bookmarks in matte or gloss finish. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 6\"",
            valueInInches: 2,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "14pt Gloss",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.1,
          },
        ],
      },
    ],
    basePricePerUnit: 0.4,
  },
  {
    id: "prod-premium-bookmarks",
    slug: "premium-bookmarks",
    name: "Premium Bookmarks",
    categoryId: "cat-pp-tags-bookmarks",
    description: "A laminated or foil-accented bookmark on heavier stock, for gifting and premium retail giveaways.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/premium-bookmarks.webp",
    ],
    seo: {
      title: "Premium Bookmarks | Outprint",
      description: "Custom premium bookmarks with lamination and foil options. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 6\"",
            valueInInches: 2,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "16pt Gloss Laminated",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "18pt Velvet Soft-Touch",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Stamping",
            description: "Metallic foil accent on logo or type.",
            priceDelta: 0.2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.75,
  },
  {
    id: "prod-standard-tickets-vouchers",
    slug: "standard-tickets-vouchers",
    name: "Standard Tickets/Vouchers",
    categoryId: "cat-pp-tickets-vouchers",
    description: "Event tickets or gift vouchers on secure cardstock, with optional sequential numbering and a tear-off perforation.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/standard-tickets-vouchers.webp",
    ],
    seo: {
      title: "Standard Tickets/Vouchers | Outprint",
      description: "Custom event tickets and gift vouchers with numbering and perforation. Bulk order discounts from 100 to 5000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 5.5\" Ticket",
            valueInInches: 2,
          },
          {
            label: "3.5\" x 8.5\" Voucher",
            valueInInches: 3.5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
          5000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "14pt Matte",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "16pt Gloss",
            image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Sequential Numbering",
            description: "Unique incrementing number printed on each ticket.",
            priceDelta: 0.04,
          },
          {
            label: "Perforated Tear-Off Stub",
            description: "Adds a perforated stub line for entry tracking.",
            priceDelta: 0.05,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.15,
          },
        ],
      },
    ],
    basePricePerUnit: 0.5,
  },

  // ── Large Prints & Gift Prints ──────────────────────────────────────
  {
    id: "prod-roll-up-banner-85x200cm",
    slug: "roll-up-banner-85x200cm",
    name: "Roll-Up Banner 85x200cm",
    categoryId: "cat-lp-rollup-banners",
    description: "An economical retractable roll-up banner on a standard aluminum base — the everyday size for storefronts, booths and reception areas.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/roll-up-banner-85x200cm.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Roll-Up Banner 85x200cm | Outprint",
      description: "Custom 85cm x 200cm retractable roll-up banner with aluminum base. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "85cm x 200cm (33.5\" x 78.7\")",
            valueInInches: 33.5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "440gsm Flex Print",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "510gsm Premium Flex",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Custom Carry Case",
            description: "Padded hard case for transport and storage.",
            priceDelta: 15,
          },
          {
            label: "Double-Sided Print",
            description: "Prints identical graphics on both faces.",
            priceDelta: 20,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 12,
          },
        ],
      },
    ],
    basePricePerUnit: 52,
  },
  {
    id: "prod-premium-roll-up-banner",
    slug: "premium-roll-up-banner",
    name: "Premium Roll-Up Banner",
    categoryId: "cat-lp-rollup-banners",
    description: "A wider, heavier-duty base with double-sided printing available — built for daily setup and teardown at trade shows.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/premium-roll-up-banner.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Premium Roll-Up Banner | Outprint",
      description: "Premium wide-base retractable roll-up banner, single or double-sided. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "85cm x 200cm (33.5\" x 78.7\") Standard",
            valueInInches: 33.5,
          },
          {
            label: "100cm x 200cm (39.4\" x 78.7\") Wide",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "510gsm Premium Flex — Single Sided",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "510gsm Premium Flex — Double Sided",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.4,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Custom Carry Case",
            description: "Padded hard case for transport and storage.",
            priceDelta: 18,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 88,
  },
  {
    id: "prod-custom-printed-banners",
    slug: "custom-printed-banners",
    name: "Custom Printed Banners",
    categoryId: "cat-lp-backdrop-banners",
    description: "A general-purpose large-format vinyl banner made to your exact cm dimensions — for storefronts, launches and indoor or outdoor display.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/custom-printed-banners.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Custom Printed Banners | Outprint",
      description: "Custom-sized printed vinyl banners in cm dimensions, grommets and pole pockets available. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "200cm x 100cm (78.7\" x 39.4\")",
            valueInInches: 78.7,
          },
          {
            label: "300cm x 150cm (118.1\" x 59.1\")",
            valueInInches: 118.1,
          },
          {
            label: "400cm x 200cm (157.5\" x 78.7\")",
            valueInInches: 157.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "440gsm Flex Vinyl",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "510gsm Premium Vinyl",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Brass Grommets",
            description: "Corner and edge grommets every 2ft for hanging.",
            priceDelta: 4,
          },
          {
            label: "Pole Pockets",
            description: "Sewn pockets on top and bottom for pole mounting.",
            priceDelta: 6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 10,
          },
        ],
      },
    ],
    basePricePerUnit: 22,
  },
  {
    id: "prod-backdrop-banner",
    slug: "backdrop-banner",
    name: "Backdrop Banner",
    categoryId: "cat-lp-backdrop-banners",
    description: "A step-and-repeat or photo-op backdrop in wrinkle-resistant fabric or vinyl, sized for a full-body photo background.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/backdrop-banner.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Backdrop Banner | Outprint",
      description: "Custom step-and-repeat photo backdrop banners in fabric or vinyl. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "240cm x 240cm (94.5\" x 94.5\") Square",
            valueInInches: 94.5,
          },
          {
            label: "300cm x 200cm (118.1\" x 78.7\")",
            valueInInches: 118.1,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Wrinkle-Resistant Fabric",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Vinyl Backdrop",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 0.85,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Backdrop Stand Frame",
            description: "Collapsible pipe-and-drape frame to hang the backdrop.",
            priceDelta: 35,
          },
          {
            label: "Brass Grommets",
            description: "Corner and edge grommets every 2ft for hanging.",
            priceDelta: 4,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 48,
  },
  {
    id: "prod-5mm-foam-board-panel",
    slug: "5mm-foam-board-panel",
    name: "5mm Foam Board Panel",
    categoryId: "cat-lp-foam-board",
    description: "A lightweight 5mm rigid foam board panel, printed and laminated — easy to hang, easy to carry.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/5mm-foam-board-panel.webp",
    ],
    seo: {
      title: "5mm Foam Board Panel | Outprint",
      description: "Custom 5mm foam board panels, matte or gloss laminate. Small-run orders from 1 to 25 panels.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "60cm x 90cm (23.6\" x 35.4\")",
            valueInInches: 23.6,
          },
          {
            label: "90cm x 120cm (35.4\" x 47.2\")",
            valueInInches: 35.4,
          },
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Laminate",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Laminate",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Mounting Stand-offs",
            description: "Wall stand-off hardware for a raised mounted look.",
            priceDelta: 8,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 10,
          },
        ],
      },
    ],
    basePricePerUnit: 16,
  },
  {
    id: "prod-10mm-foam-board-panel",
    slug: "10mm-foam-board-panel",
    name: "10mm Foam Board Panel",
    categoryId: "cat-lp-foam-board",
    description: "A thicker, stiffer 10mm foam board panel for larger displays that need to resist warping.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/10mm-foam-board-panel.webp",
    ],
    seo: {
      title: "10mm Foam Board Panel | Outprint",
      description: "Custom 10mm rigid foam board panels, matte or gloss laminate. Small-run orders from 1 to 25 panels.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "60cm x 90cm (23.6\" x 35.4\")",
            valueInInches: 23.6,
          },
          {
            label: "90cm x 120cm (35.4\" x 47.2\")",
            valueInInches: 35.4,
          },
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Laminate",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Laminate",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Mounting Stand-offs",
            description: "Wall stand-off hardware for a raised mounted look.",
            priceDelta: 8,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 10,
          },
        ],
      },
    ],
    basePricePerUnit: 26,
  },
  {
    id: "prod-large-stickers",
    slug: "large-stickers",
    name: "Large Stickers",
    categoryId: "cat-lp-large-format",
    description: "Oversized die-cut or square decals for walls, windows and vehicles — printed on removable or permanent vinyl.",
    useCases: [
      "Corporate & Office",
      "E-commerce & DTC",
    ],
    images: [
      "/images/products/large-stickers.webp",
    ],
    seo: {
      title: "Large Stickers | Outprint",
      description: "Custom large-format stickers up to 100cm, matte, glossy or removable wall-safe vinyl. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Square",
          "Rectangle",
          "Custom Shape",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "30cm x 30cm (11.8\" x 11.8\")",
            valueInInches: 11.8,
          },
          {
            label: "50cm x 50cm (19.7\" x 19.7\")",
            valueInInches: 19.7,
          },
          {
            label: "100cm x 100cm (39.4\" x 39.4\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Glossy Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Removable Wall-Safe Vinyl",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Extra UV Lamination",
            description: "Adds a second laminate pass for outdoor durability.",
            priceDelta: 2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 5,
          },
        ],
      },
    ],
    basePricePerUnit: 9,
  },
  {
    id: "prod-large-posters",
    slug: "large-posters",
    name: "Large Posters",
    categoryId: "cat-lp-large-format",
    description: "Exhibition-grade large-format posters up to 2 meters, for trade shows, retail windows and gallery display.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/large-posters.webp",
    ],
    seo: {
      title: "Large Posters | Outprint",
      description: "Custom large-format posters up to 150cm x 200cm, matte, gloss or waterproof synthetic. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
          {
            label: "150cm x 200cm (59.1\" x 78.7\")",
            valueInInches: 59.1,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "170gsm Matte Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "230gsm Gloss Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
          {
            label: "Synthetic Waterproof",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.4,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Lamination",
            description: "Matte or gloss laminate film over the printed surface.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 6,
          },
        ],
      },
    ],
    basePricePerUnit: 15,
  },
  {
    id: "prod-rolled-canvas-print",
    slug: "rolled-canvas-print",
    name: "Rolled Canvas Print",
    categoryId: "cat-lp-canvas-prints",
    description: "Your image printed on canvas and shipped rolled, unframed — the flexible option for framing later or shipping abroad.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/rolled-canvas-print.webp",
    ],
    seo: {
      title: "Rolled Canvas Print | Outprint",
      description: "Custom rolled canvas prints, matte or gloss finish, shipped unframed. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "30cm x 40cm (11.8\" x 15.7\")",
            valueInInches: 11.8,
          },
          {
            label: "50cm x 70cm (19.7\" x 27.6\")",
            valueInInches: 19.7,
          },
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Canvas",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Canvas",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 8,
          },
        ],
      },
    ],
    basePricePerUnit: 12,
  },
  {
    id: "prod-stretched-canvas-print",
    slug: "stretched-canvas-print",
    name: "Stretched Canvas Print",
    categoryId: "cat-lp-canvas-prints",
    description: "Canvas stretched taut over a solid wooden frame with gallery-wrapped edges — ready to hang straight out of the box.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/stretched-canvas-print.webp",
    ],
    seo: {
      title: "Stretched Canvas Print | Outprint",
      description: "Custom canvas prints stretched on a wooden frame, gallery-wrapped and ready to hang. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "30cm x 40cm (11.8\" x 15.7\")",
            valueInInches: 11.8,
          },
          {
            label: "50cm x 70cm (19.7\" x 27.6\")",
            valueInInches: 19.7,
          },
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Canvas — Stretched",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Canvas — Stretched",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Gallery Wrap Edges",
            description: "Wraps the printed image around the frame edges instead of a white border.",
            priceDelta: 5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 10,
          },
        ],
      },
    ],
    basePricePerUnit: 28,
  },
  {
    id: "prod-classic-framed-canvas",
    slug: "classic-framed-canvas",
    name: "Classic Framed Canvas",
    categoryId: "cat-lp-canvas-prints",
    description: "A stretched canvas print finished with an additional outer wooden frame, for a traditional gallery presentation.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/classic-framed-canvas.webp",
    ],
    seo: {
      title: "Classic Framed Canvas | Outprint",
      description: "Custom stretched canvas prints finished with an outer wooden frame. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "30cm x 40cm (11.8\" x 15.7\")",
            valueInInches: 11.8,
          },
          {
            label: "50cm x 70cm (19.7\" x 27.6\")",
            valueInInches: 19.7,
          },
          {
            label: "100cm x 150cm (39.4\" x 59.1\")",
            valueInInches: 39.4,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Black Frame",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Natural Wood Frame",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "White Frame",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 12,
          },
        ],
      },
    ],
    basePricePerUnit: 48,
  },
  {
    id: "prod-pop-up-banner-hardcase-straight",
    slug: "pop-up-banner-hardcase-straight",
    name: "Pop-Up Banner Hardcase (Straight)",
    categoryId: "cat-lp-display-stands",
    description: "A tension-fabric pop-up display system with a straight profile, packed into its own wheeled hardcase for trade show travel.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/pop-up-banner-hardcase-straight.webp",
    ],
    needsManualSourcing: true,
    seo: {
      title: "Pop-Up Banner Hardcase (Straight) | Outprint",
      description: "Straight-profile pop-up trade show display with wheeled hardcase. Small-run orders from 1 to 10 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "238cm x 225cm (93.7\" x 88.6\") Straight",
            valueInInches: 93.7,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Fabric Graphic — Straight",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Fabric Graphic — Curved",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "LED Lighting Kit",
            description: "Adds clip-on LED spotlights to the display frame.",
            priceDelta: 60,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 40,
          },
        ],
      },
    ],
    basePricePerUnit: 185,
  },
  {
    id: "prod-spring-a-board",
    slug: "spring-a-board",
    name: "Spring A-Board",
    categoryId: "cat-lp-display-stands",
    description: "A weatherproof spring-hinged A-frame pavement sign that folds flat for storage between uses.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/spring-a-board.webp",
    ],
    seo: {
      title: "Spring A-Board | Outprint",
      description: "Weatherproof spring A-board pavement signs with printed insert. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "60cm x 90cm (23.6\" x 35.4\") A1 Board",
            valueInInches: 23.6,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Weatherproof Correx Insert",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Weatherproof Foamex Insert",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 10,
          },
        ],
      },
    ],
    basePricePerUnit: 68,
  },
  {
    id: "prod-sail-flag",
    slug: "sail-flag",
    name: "Sail Flag",
    categoryId: "cat-lp-display-stands",
    description: "A feather-shaped sail flag on a pole and cross base, printed full color for outdoor visibility at events and forecourts.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/sail-flag.webp",
    ],
    seo: {
      title: "Sail Flag | Outprint",
      description: "Custom outdoor sail flags with pole and base, single or double-sided. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "240cm Small Sail Flag",
            valueInInches: 94.5,
          },
          {
            label: "340cm Medium Sail Flag",
            valueInInches: 133.9,
          },
          {
            label: "450cm Large Sail Flag",
            valueInInches: 177.2,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Polyester Flag Fabric — Single Sided",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Polyester Flag Fabric — Double Sided",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Ground Spike Base",
            description: "Swaps the cross base for a ground spike, for grass or soil.",
            priceDelta: 15,
          },
          {
            label: "Cross Base",
            description: "A weighted cross base for hard flooring.",
            priceDelta: 20,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 75,
  },
  {
    id: "prod-custom-table-cloth",
    slug: "custom-table-cloth",
    name: "Custom Table Cloth",
    categoryId: "cat-lp-display-stands",
    description: "A fitted or full-drop table throw printed edge-to-edge with your branding, sized for standard trade show tables.",
    useCases: [
      "Corporate & Office",
      "Events & Weddings",
    ],
    images: [
      "/images/products/custom-table-cloth.webp",
    ],
    seo: {
      title: "Custom Table Cloth | Outprint",
      description: "Custom printed table cloths and fitted covers for trade show tables. Small-run orders from 1 to 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "180cm x 75cm Fitted (6ft Table)",
            valueInInches: 70.9,
          },
          {
            label: "240cm x 75cm Fitted (8ft Table)",
            valueInInches: 94.5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          2,
          5,
          10,
          25,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Polyester Table Throw — Full Print",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Polyester Fitted Cover",
            image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Carry Bag",
            description: "A zip carry bag sized for the folded table cloth.",
            priceDelta: 10,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 58,
  },
  {
    id: "prod-plastic-pens",
    slug: "plastic-pens",
    name: "Plastic Pens",
    categoryId: "cat-gp-corporate-gifts",
    description: "Branded plastic ballpoint pens — the most economical corporate giveaway, printed with your logo.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/plastic-pens.webp",
    ],
    seo: {
      title: "Plastic Pens | Outprint",
      description: "Branded plastic ballpoint pens — the most economical corporate giveaway, printed with your logo. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Classic Twist — Blue Ink",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Classic Twist — Black Ink",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Click Pen — Assorted Barrel Colors",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Full-Color Logo Print",
            description: "Upgrades from single-color to a full-color printed logo.",
            priceDelta: 1,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 8,
  },
  {
    id: "prod-metal-pens",
    slug: "metal-pens",
    name: "Metal Pens",
    categoryId: "cat-gp-corporate-gifts",
    description: "A heavier metal-barrel ballpoint pen with a satin or gunmetal finish, for a gift that feels more substantial.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/metal-pens.webp",
    ],
    seo: {
      title: "Metal Pens | Outprint",
      description: "A heavier metal-barrel ballpoint pen with a satin or gunmetal finish, for a gift that feels more substantial. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Silver",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gunmetal Black",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Rose Gold",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Laser Engraving",
            description: "Permanent laser-etched logo instead of printed.",
            priceDelta: 4,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 2,
          },
        ],
      },
    ],
    basePricePerUnit: 35,
  },
  {
    id: "prod-metal-business-card-case",
    slug: "metal-business-card-case",
    name: "Metal Business Card Case",
    categoryId: "cat-gp-corporate-gifts",
    description: "A slim metal case that holds a stack of business cards protected in a jacket or bag pocket.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/metal-business-card-case.webp",
    ],
    seo: {
      title: "Metal Business Card Case | Outprint",
      description: "A slim metal case that holds a stack of business cards protected in a jacket or bag pocket. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Brushed Silver",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Black",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Gold-Tone",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Laser Engraving",
            description: "Permanent laser-etched logo instead of printed.",
            priceDelta: 6,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 45,
  },
  {
    id: "prod-usb-card-sticks",
    slug: "usb-card-sticks",
    name: "USB Card Sticks",
    categoryId: "cat-gp-corporate-gifts",
    description: "A credit-card-shaped USB flash drive that snaps out a full-size connector, printed edge-to-edge with your branding.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/usb-card-sticks.webp",
    ],
    seo: {
      title: "USB Card Sticks | Outprint",
      description: "A credit-card-shaped USB flash drive that snaps out a full-size connector, printed edge-to-edge with your branding. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "4GB",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "8GB",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
          {
            label: "16GB",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.5,
          },
          {
            label: "32GB",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 4,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 5,
          },
        ],
      },
    ],
    basePricePerUnit: 180,
  },
  {
    id: "prod-mouse-pads",
    slug: "mouse-pads",
    name: "Mouse Pads",
    categoryId: "cat-gp-corporate-gifts",
    description: "A full-color printed mouse pad with a cloth top and non-slip rubber base.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/mouse-pads.webp",
    ],
    seo: {
      title: "Mouse Pads | Outprint",
      description: "A full-color printed mouse pad with a cloth top and non-slip rubber base. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Standard Cloth Top",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Extended Cloth Top",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.4,
          },
          {
            label: "Rubber-Backed Neoprene",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 2,
          },
        ],
      },
    ],
    basePricePerUnit: 25,
  },
  {
    id: "prod-power-banks",
    slug: "power-banks",
    name: "Power Banks",
    categoryId: "cat-gp-corporate-gifts",
    description: "A portable USB power bank printed with your logo — a high-utility gift that keeps your brand in daily use.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/power-banks.webp",
    ],
    seo: {
      title: "Power Banks | Outprint",
      description: "A portable USB power bank printed with your logo — a high-utility gift that keeps your brand in daily use. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "5000mAh",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "10000mAh",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.6,
          },
          {
            label: "20000mAh",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 2.4,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 6,
          },
        ],
      },
    ],
    basePricePerUnit: 350,
  },
  {
    id: "prod-coffee-mugs-gloss-finish",
    slug: "coffee-mugs-gloss-finish",
    name: "Coffee Mugs (Gloss Finish)",
    categoryId: "cat-gp-corporate-gifts",
    description: "A ceramic coffee mug in a bright gloss finish, full-color wrap printed and dishwasher safe.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/coffee-mugs-gloss-finish.webp",
    ],
    seo: {
      title: "Coffee Mugs (Gloss Finish) | Outprint",
      description: "A ceramic coffee mug in a bright gloss finish, full-color wrap printed and dishwasher safe. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "11oz Standard",
            valueInInches: 1,
          },
          {
            label: "15oz Large",
            valueInInches: 1.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Gloss",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Two-Tone Gloss — Black Handle",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
          {
            label: "Two-Tone Gloss — Blue Handle",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 55,
  },
  {
    id: "prod-metal-key-ring",
    slug: "metal-key-ring",
    name: "Metal Key Ring",
    categoryId: "cat-gp-corporate-gifts",
    description: "A durable metal keychain with your logo laser-etched or printed onto the tag.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/metal-key-ring.webp",
    ],
    seo: {
      title: "Metal Key Ring | Outprint",
      description: "A durable metal keychain with your logo laser-etched or printed onto the tag. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Nickel-Plated",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Black",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Antique Brass",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Laser Engraving",
            description: "Permanent laser-etched logo instead of printed.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 18,
  },
  {
    id: "prod-plastic-id-cards",
    slug: "plastic-id-cards",
    name: "Plastic ID Cards",
    categoryId: "cat-gp-corporate-gifts",
    description: "Printed PVC identity cards for staff, events or membership programs.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/plastic-id-cards.webp",
    ],
    seo: {
      title: "Plastic ID Cards | Outprint",
      description: "Printed PVC identity cards for staff, events or membership programs. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Standard PVC",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Frosted PVC",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Lanyard + Clip",
            description: "Includes a branded lanyard and badge clip with each card.",
            priceDelta: 1.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 6,
  },
  {
    id: "prod-magnet-name-badges",
    slug: "magnet-name-badges",
    name: "Magnet Name Badges",
    categoryId: "cat-gp-corporate-gifts",
    description: "A no-pinhole magnetic name badge that clips through fabric without damaging it.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/magnet-name-badges.webp",
    ],
    seo: {
      title: "Magnet Name Badges | Outprint",
      description: "A no-pinhole magnetic name badge that clips through fabric without damaging it. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Rectangle Acrylic",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Oval Acrylic",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1,
          },
        ],
      },
    ],
    basePricePerUnit: 14,
  },
  {
    id: "prod-a5-pu-leather-notebooks",
    slug: "a5-pu-leather-notebooks",
    name: "A5 PU Leather Notebooks",
    categoryId: "cat-gp-corporate-gifts",
    description: "An A5 notebook bound in soft PU leather with a debossed or foiled logo on the cover.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a5-pu-leather-notebooks.webp",
    ],
    seo: {
      title: "A5 PU Leather Notebooks | Outprint",
      description: "An A5 notebook bound in soft PU leather with a debossed or foiled logo on the cover. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Black PU Leather",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Brown PU Leather",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Navy PU Leather",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Debossing",
            description: "Debosses your logo into the cover with metallic foil.",
            priceDelta: 8,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 4,
          },
        ],
      },
    ],
    basePricePerUnit: 85,
  },
  {
    id: "prod-cotton-tote-bags",
    slug: "cotton-tote-bags",
    name: "Cotton Tote Bags",
    categoryId: "cat-gp-corporate-gifts",
    description: "A sturdy cotton canvas tote screen-printed with your logo — a practical, reusable giveaway.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/cotton-tote-bags.webp",
    ],
    seo: {
      title: "Cotton Tote Bags | Outprint",
      description: "A sturdy cotton canvas tote screen-printed with your logo — a practical, reusable giveaway. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Standard (38cm x 42cm)",
            valueInInches: 1,
          },
          {
            label: "Large (42cm x 48cm)",
            valueInInches: 1.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Natural Cotton Canvas",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black Cotton Canvas",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Full-Color Logo Print",
            description: "Upgrades from single-color to a full-color printed logo.",
            priceDelta: 2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 2,
          },
        ],
      },
    ],
    basePricePerUnit: 28,
  },
  {
    id: "prod-custom-water-bottles",
    slug: "custom-water-bottles",
    name: "Custom Water Bottles",
    categoryId: "cat-gp-corporate-gifts",
    description: "An insulated stainless steel or aluminum water bottle, laser-etched or printed with your branding.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/custom-water-bottles.webp",
    ],
    seo: {
      title: "Custom Water Bottles | Outprint",
      description: "An insulated stainless steel or aluminum water bottle, laser-etched or printed with your branding. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "500ml",
            valueInInches: 1,
          },
          {
            label: "750ml",
            valueInInches: 1.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Stainless Steel Matte",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Stainless Steel Gloss",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Aluminum",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 0.85,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Laser Engraving",
            description: "Permanent laser-etched logo instead of printed.",
            priceDelta: 6,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 4,
          },
        ],
      },
    ],
    basePricePerUnit: 65,
  },
  {
    id: "prod-pvc-nfc-cards",
    slug: "pvc-nfc-cards",
    name: "PVC NFC Cards",
    categoryId: "cat-gp-corporate-gifts",
    description: "A tap-to-share smart PVC card with an embedded NFC chip, programmed to open your link, profile or menu.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/pvc-nfc-cards.webp",
    ],
    seo: {
      title: "PVC NFC Cards | Outprint",
      description: "A tap-to-share smart PVC card with an embedded NFC chip, programmed to open your link, profile or menu. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White PVC NFC",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black PVC NFC",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Wood-Grain PVC NFC",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "NFC Programming Setup",
            description: "Pre-programs every card with your chosen link or vCard.",
            priceDelta: 5,
          },
          {
            label: "Individual Gift Box",
            description: "Packs each unit in a branded gift box.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 4,
          },
        ],
      },
    ],
    basePricePerUnit: 95,
  },
  {
    id: "prod-photo-strips",
    slug: "photo-strips",
    name: "Photo Strips",
    categoryId: "cat-gp-photo-gifts",
    description: "Photobooth-style photo strips printed on glossy or matte photo paper — a popular wedding and event favor.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-strips.webp",
    ],
    seo: {
      title: "Photo Strips | Outprint",
      description: "Photobooth-style photo strips printed on glossy or matte photo paper — a popular wedding and event favor. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2\" x 6\" Strip",
            valueInInches: 2,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Glossy Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Custom Border Template",
            description: "Adds a branded or themed border around each strip.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 6,
  },
  {
    id: "prod-photo-mini-books",
    slug: "photo-mini-books",
    name: "Photo Mini Books",
    categoryId: "cat-gp-photo-gifts",
    description: "A small flip-through photo book with a soft or hard cover, perfect as a pocket-sized keepsake.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-mini-books.webp",
    ],
    seo: {
      title: "Photo Mini Books | Outprint",
      description: "A small flip-through photo book with a soft or hard cover, perfect as a pocket-sized keepsake. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "4\" x 4\" Mini Book",
            valueInInches: 4,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Soft Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Hard Cover",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Extra Pages",
            description: "Adds additional photo spreads beyond the base page count.",
            priceDelta: 2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 110,
  },
  {
    id: "prod-photo-greeting-cards",
    slug: "photo-greeting-cards",
    name: "Photo Greeting Cards",
    categoryId: "cat-gp-photo-gifts",
    description: "A folded greeting card personalized with your photo on the front, with a matching envelope included.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-greeting-cards.webp",
    ],
    seo: {
      title: "Photo Greeting Cards | Outprint",
      description: "A folded greeting card personalized with your photo on the front, with a matching envelope included. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "5\" x 7\" Folded",
            valueInInches: 5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Photo Card",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Photo Card",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Foil Accent",
            description: "Metallic foil accent on the front-of-card text.",
            priceDelta: 0.4,
          },
          {
            label: "Kraft Envelope Upgrade",
            description: "Swaps the included envelope for a kraft brown one.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.4,
          },
        ],
      },
    ],
    basePricePerUnit: 15,
  },
  {
    id: "prod-photo-stickers",
    slug: "photo-stickers",
    name: "Photo Stickers",
    categoryId: "cat-gp-photo-gifts",
    description: "Personalized photo stickers on glossy or matte vinyl — great for favors, scrapbooking and packaging.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-stickers.webp",
    ],
    seo: {
      title: "Photo Stickers | Outprint",
      description: "Personalized photo stickers on glossy or matte vinyl — great for favors, scrapbooking and packaging. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "3\" x 3\"",
            valueInInches: 3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Glossy Photo Vinyl",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Photo Vinyl",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 4,
  },
  {
    id: "prod-photo-calendars",
    slug: "photo-calendars",
    name: "Photo Calendars",
    categoryId: "cat-gp-photo-gifts",
    description: "A personalized wall calendar built around your own photos, one image per monthly spread.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-calendars.webp",
    ],
    seo: {
      title: "Photo Calendars | Outprint",
      description: "A personalized wall calendar built around your own photos, one image per monthly spread. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "8\" x 10\" Wall",
            valueInInches: 8,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Gloss Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Photo Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Wire-o Binding Upgrade",
            description: "Upgrades from stapled to a wire-o bound spine.",
            priceDelta: 2.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 2,
          },
        ],
      },
    ],
    basePricePerUnit: 18,
  },
  {
    id: "prod-photo-canvas",
    slug: "photo-canvas",
    name: "Photo Canvas",
    categoryId: "cat-gp-photo-gifts",
    description: "Your favorite photo printed on canvas and stretched on a wooden frame, ready to hang.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/photo-canvas.webp",
    ],
    seo: {
      title: "Photo Canvas | Outprint",
      description: "Your favorite photo printed on canvas and stretched on a wooden frame, ready to hang. Bulk order discounts from 25 to 500 units, free digital proof.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "12\" x 16\"",
            valueInInches: 12,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Matte Canvas",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Gloss Canvas",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Wooden Frame Upgrade",
            description: "Adds an outer wooden frame around the stretched canvas.",
            priceDelta: 12,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 8,
          },
        ],
      },
    ],
    basePricePerUnit: 65,
  },

  // ── T-shirt Prints & Packaging ──────────────────────────────────────
  {
    id: "prod-unisex-light-weight-t-shirt",
    slug: "unisex-light-weight-t-shirt",
    name: "Unisex Light Weight T-Shirt",
    categoryId: "cat-ts-round-neck",
    description: "A breathable 160gsm single-jersey cotton tee in a unisex fit — the everyday choice for event merch and team wear.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/unisex-light-weight-t-shirt.webp",
    ],
    seo: {
      title: "Unisex Light Weight T-Shirt | Outprint",
      description: "Custom printed 160gsm unisex t-shirts in 7 colors, S to XXL. Bulk order discounts from 10 to 250 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "S",
            valueInInches: 1,
          },
          {
            label: "M",
            valueInInches: 1,
          },
          {
            label: "L",
            valueInInches: 1,
          },
          {
            label: "XL",
            valueInInches: 1,
          },
          {
            label: "XXL",
            valueInInches: 1.15,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Navy Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Red",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Royal Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Heather Grey",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Bottle Green",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Back Print",
            description: "Adds a second print location on the back of the garment.",
            priceDelta: 25,
          },
          {
            label: "Individual Poly Bag",
            description: "Packs each shirt separately in a clear poly bag.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 120,
  },
  {
    id: "prod-unisex-heavy-weight-t-shirt",
    slug: "unisex-heavy-weight-t-shirt",
    name: "Unisex Heavy Weight T-Shirt",
    categoryId: "cat-ts-round-neck",
    description: "A substantial 220gsm cotton tee with a thicker handfeel and better shape retention through repeated washes.",
    useCases: [
      "Events & Weddings",
      "Corporate & Office",
    ],
    images: [
      "/images/products/unisex-heavy-weight-t-shirt.webp",
    ],
    seo: {
      title: "Unisex Heavy Weight T-Shirt | Outprint",
      description: "Custom printed 220gsm heavyweight unisex t-shirts in 7 colors, S to XXL. Bulk order discounts from 10 to 250 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "S",
            valueInInches: 1,
          },
          {
            label: "M",
            valueInInches: 1,
          },
          {
            label: "L",
            valueInInches: 1,
          },
          {
            label: "XL",
            valueInInches: 1,
          },
          {
            label: "XXL",
            valueInInches: 1.15,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Navy Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Red",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Royal Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Heather Grey",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Bottle Green",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Back Print",
            description: "Adds a second print location on the back of the garment.",
            priceDelta: 25,
          },
          {
            label: "Individual Poly Bag",
            description: "Packs each shirt separately in a clear poly bag.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 165,
  },
  {
    id: "prod-kids-light-weight-t-shirt",
    slug: "kids-light-weight-t-shirt",
    name: "Kids Light Weight T-Shirt",
    categoryId: "cat-ts-round-neck",
    description: "The same soft 160gsm cotton tee cut for kids, sized by age from 2-3 years up to 10-11 years.",
    useCases: [
      "Events & Weddings",
    ],
    images: [
      "/images/products/kids-light-weight-t-shirt.webp",
    ],
    seo: {
      title: "Kids Light Weight T-Shirt | Outprint",
      description: "Custom printed 160gsm kids t-shirts in 7 colors, ages 2-3 to 10-11 years. Bulk order discounts from 10 to 250 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "2-3Y",
            valueInInches: 1,
          },
          {
            label: "4-5Y",
            valueInInches: 1,
          },
          {
            label: "6-7Y",
            valueInInches: 1,
          },
          {
            label: "8-9Y",
            valueInInches: 1,
          },
          {
            label: "10-11Y",
            valueInInches: 1,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Navy Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Red",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Royal Blue",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Heather Grey",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Bottle Green",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Back Print",
            description: "Adds a second print location on the back of the garment.",
            priceDelta: 25,
          },
          {
            label: "Individual Poly Bag",
            description: "Packs each shirt separately in a clear poly bag.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 95,
  },
  {
    id: "prod-polo-shirts",
    slug: "polo-shirts",
    name: "Polo Shirts",
    categoryId: "cat-ts-polo",
    description: "A collared pique-knit polo in a structured unisex fit — the standard for staff uniforms and corporate dress codes.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/polo-shirts.webp",
    ],
    seo: {
      title: "Polo Shirts | Outprint",
      description: "Custom printed or embroidered pique-knit polo shirts in 7 colors, S to XXL. Bulk order discounts from 10 to 250 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "S",
            valueInInches: 1,
          },
          {
            label: "M",
            valueInInches: 1,
          },
          {
            label: "L",
            valueInInches: 1,
          },
          {
            label: "XL",
            valueInInches: 1,
          },
          {
            label: "XXL",
            valueInInches: 1.15,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Black",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Navy Blue",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Red",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Royal Blue",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Heather Grey",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Bottle Green",
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Embroidered Logo",
            description: "Upgrades the chest logo from printed to embroidered.",
            priceDelta: 35,
          },
          {
            label: "Individual Poly Bag",
            description: "Packs each shirt separately in a clear poly bag.",
            priceDelta: 3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 18,
          },
        ],
      },
    ],
    basePricePerUnit: 220,
  },
  {
    id: "prod-fast-food-boxes",
    slug: "fast-food-boxes",
    name: "Fast Food Boxes",
    categoryId: "cat-pkg-food-boxes",
    description: "A single-compartment grease-resistant box for burgers, fries and takeaway meals, printed full color.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/fast-food-boxes.webp",
    ],
    seo: {
      title: "Fast Food Boxes | Outprint",
      description: "Custom fast food boxes in white duplex or kraft board, grease-resistant coating available. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (6\" x 4\" x 3\")",
            valueInInches: 6,
          },
          {
            label: "Medium (7\" x 5\" x 3.5\")",
            valueInInches: 7,
          },
          {
            label: "Large (8\" x 6\" x 4\")",
            valueInInches: 8,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Interior Grease-Proof Liner",
            description: "Adds a foil or PE liner inside the box.",
            priceDelta: 0.3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.2,
  },
  {
    id: "prod-bakery-food-boxes",
    slug: "bakery-food-boxes",
    name: "Bakery Food Boxes",
    categoryId: "cat-pkg-food-boxes",
    description: "A cake and pastry box sized to protect delicate bakes in transit, with an optional clear window.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/bakery-food-boxes.webp",
    ],
    seo: {
      title: "Bakery Food Boxes | Outprint",
      description: "Custom bakery and cake boxes in white duplex or kraft board, optional window cut. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (8\" x 8\" x 3\")",
            valueInInches: 8,
          },
          {
            label: "Medium (10\" x 10\" x 4\")",
            valueInInches: 10,
          },
          {
            label: "Large (12\" x 12\" x 5\")",
            valueInInches: 12,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.08,
          },
          {
            label: "Grease-Resistant Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "PVC Window Cut",
            description: "Die-cuts a window on the lid with a clear PVC insert.",
            priceDelta: 0.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.6,
          },
        ],
      },
    ],
    basePricePerUnit: 3.2,
  },
  {
    id: "prod-retail-product-box",
    slug: "retail-product-box",
    name: "Retail Product Box",
    categoryId: "cat-pkg-product-boxes",
    description: "A standard rectangular retail box for shipping and shelf display, printed full color on your choice of board.",
    useCases: [
      "E-commerce & DTC",
      "Beauty & Cosmetics",
    ],
    images: [
      "/images/products/retail-product-box.webp",
    ],
    seo: {
      title: "Retail Product Box | Outprint",
      description: "Custom retail product boxes in corrugated, kraft or white duplex board. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (4\" x 4\" x 2\")",
            valueInInches: 4,
          },
          {
            label: "Medium (6\" x 6\" x 3\")",
            valueInInches: 6,
          },
          {
            label: "Large (8\" x 8\" x 4\")",
            valueInInches: 8,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "E-Flute Corrugated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Matte Lamination",
            description: "Soft-touch matte film over the exterior print.",
            priceDelta: 0.4,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.6,
          },
        ],
      },
    ],
    basePricePerUnit: 2.6,
  },
  {
    id: "prod-shape-product-box",
    slug: "shape-product-box",
    name: "Shape Product Box",
    categoryId: "cat-pkg-product-boxes",
    description: "A die-cut product box in a shape beyond the standard rectangle — pillow, hexagon or a custom outline of your own.",
    useCases: [
      "E-commerce & DTC",
      "Beauty & Cosmetics",
    ],
    images: [
      "/images/products/shape-product-box.webp",
    ],
    seo: {
      title: "Shape Product Box | Outprint",
      description: "Custom die-cut shape product boxes — pillow, hexagon or fully custom outline. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "shape",
        options: [
          "Pillow Box",
          "Hexagon Box",
          "Custom Die-Cut Outline",
        ],
      },
      {
        type: "size",
        presets: [
          {
            label: "Small (4\" x 4\" x 2\")",
            valueInInches: 4,
          },
          {
            label: "Medium (6\" x 6\" x 3\")",
            valueInInches: 6,
          },
          {
            label: "Large (8\" x 8\" x 4\")",
            valueInInches: 8,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Die-Cut",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Duplex Die-Cut",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Matte Lamination",
            description: "Soft-touch matte film over the exterior print.",
            priceDelta: 0.5,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.8,
          },
        ],
      },
    ],
    basePricePerUnit: 3.8,
  },
  {
    id: "prod-glued-mailer-wallets",
    slug: "glued-mailer-wallets",
    name: "Glued Mailer Wallets",
    categoryId: "cat-pkg-mailer-wallets",
    description: "A rigid glued wallet-style mailer that opens like an envelope — built for books, prints and flat items that need a stiff mailer, not a folding box.",
    useCases: [
      "E-commerce & DTC",
    ],
    images: [
      "/images/products/glued-mailer-wallets.webp",
    ],
    seo: {
      title: "Glued Mailer Wallets | Outprint",
      description: "Custom glued mailer wallets in corrugated or duplex board. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (9\" x 6\" x 1\")",
            valueInInches: 9,
          },
          {
            label: "Medium (11\" x 8.5\" x 2\")",
            valueInInches: 11,
          },
          {
            label: "Large (13\" x 10\" x 2\")",
            valueInInches: 13,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "E-Flute Corrugated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
          {
            label: "Kraft Corrugated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Tear Strip Closure",
            description: "Adds a perforated tear strip for a tamper-evident open.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.4,
          },
        ],
      },
    ],
    basePricePerUnit: 3,
  },
  {
    id: "prod-countertop-display-boxes",
    slug: "countertop-display-boxes",
    name: "Countertop Display Boxes",
    categoryId: "cat-pkg-display-boxes",
    description: "A point-of-sale display box that holds multiple retail units upright on a checkout counter, litho-laminated for shelf-ready print quality.",
    useCases: [
      "E-commerce & DTC",
      "Beauty & Cosmetics",
    ],
    images: [
      "/images/products/countertop-display-boxes.webp",
    ],
    seo: {
      title: "Countertop Display Boxes | Outprint",
      description: "Custom countertop point-of-sale display boxes, corrugated or litho-laminated board. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (8\" x 6\" x 6\")",
            valueInInches: 8,
          },
          {
            label: "Medium (10\" x 8\" x 8\")",
            valueInInches: 10,
          },
          {
            label: "Large (12\" x 10\" x 10\")",
            valueInInches: 12,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "E-Flute Corrugated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "White Duplex Litho-Laminated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Header Card",
            description: "Adds a printed header card above the display.",
            priceDelta: 0.8,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 1.2,
          },
        ],
      },
    ],
    basePricePerUnit: 6.5,
  },
  {
    id: "prod-hook-display-boxes",
    slug: "hook-display-boxes",
    name: "Hook Display Boxes",
    categoryId: "cat-pkg-display-boxes",
    description: "A peg-board ready display box with a die-cut hang hole, for retail aisles and impulse-buy end caps.",
    useCases: [
      "E-commerce & DTC",
    ],
    images: [
      "/images/products/hook-display-boxes.webp",
    ],
    seo: {
      title: "Hook Display Boxes | Outprint",
      description: "Custom peg-hook display boxes with die-cut hang hole. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (4\" x 2\" x 6\")",
            valueInInches: 4,
          },
          {
            label: "Medium (5\" x 3\" x 8\")",
            valueInInches: 5,
          },
          {
            label: "Large (6\" x 4\" x 10\")",
            valueInInches: 6,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "E-Flute Corrugated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Reinforced Hang Hole",
            description: "Adds a plastic grommet around the hang hole for durability.",
            priceDelta: 0.1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 4.5,
  },
  {
    id: "prod-standard-paper-bags",
    slug: "standard-paper-bags",
    name: "Standard Paper Bags",
    categoryId: "cat-pkg-paper-bags",
    description: "A glossy laminated paper carry bag with twisted handles, printed full color for retail checkout and gifting.",
    useCases: [
      "E-commerce & DTC",
      "Fashion & Apparel",
    ],
    images: [
      "/images/products/standard-paper-bags.webp",
    ],
    seo: {
      title: "Standard Paper Bags | Outprint",
      description: "Custom glossy laminated paper carry bags with twisted handles. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (8\" x 4\" x 10\")",
            valueInInches: 8,
          },
          {
            label: "Medium (10\" x 5\" x 13\")",
            valueInInches: 10,
          },
          {
            label: "Large (12\" x 6\" x 15\")",
            valueInInches: 12,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Art Paper — Gloss Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "White Art Paper — Matte Laminated",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Twisted Cotton Handles",
            description: "Upgrades to reinforced twisted cotton cord handles.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.3,
          },
        ],
      },
    ],
    basePricePerUnit: 1.2,
  },
  {
    id: "prod-brown-kraft-paper-bags",
    slug: "brown-kraft-paper-bags",
    name: "Brown Kraft Paper Bags",
    categoryId: "cat-pkg-paper-bags",
    description: "An uncoated natural kraft carry bag with flat or twisted handles — an eco-forward look for cafes and craft retail.",
    useCases: [
      "Food & Beverage",
      "E-commerce & DTC",
    ],
    images: [
      "/images/products/brown-kraft-paper-bags.webp",
    ],
    seo: {
      title: "Brown Kraft Paper Bags | Outprint",
      description: "Custom brown kraft paper carry bags with flat or twisted handles. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (8\" x 4\" x 10\")",
            valueInInches: 8,
          },
          {
            label: "Medium (10\" x 5\" x 13\")",
            valueInInches: 10,
          },
          {
            label: "Large (12\" x 6\" x 15\")",
            valueInInches: 12,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Natural Kraft Paper",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Natural Kraft Paper + Rope Handles",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Flat Paper Handles",
            description: "Swaps twisted cord handles for flat paper strap handles.",
            priceDelta: 0.05,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.25,
          },
        ],
      },
    ],
    basePricePerUnit: 1.1,
  },

  // ── Invoice Books, Stamps, Paper Cups & Paper Bag variants ───────────
  {
    id: "prod-custom-receipt-books",
    slug: "custom-receipt-books",
    name: "Custom Receipt Books",
    categoryId: "cat-bp-invoice-books",
    description: "A carbonless duplicate receipt book, numbered and perforated for easy tear-off, for retail and service billing.",
    useCases: [
      "Corporate & Office",
      "Food & Beverage",
    ],
    images: [
      "/images/products/custom-receipt-books.webp",
    ],
    seo: {
      title: "Custom Receipt Books | Outprint",
      description: "Custom carbonless duplicate receipt books, numbered and perforated. Bulk order discounts from 10 to 250 books.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "5.5\" x 8.5\" Standard",
            valueInInches: 5.5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "2-Part Carbonless (Duplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "3-Part Carbonless (Triplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Sequential Numbering",
            description: "Unique incrementing number printed on each receipt.",
            priceDelta: 1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 8,
  },
  {
    id: "prod-a6-custom-ncr-bill-books",
    slug: "a6-custom-ncr-bill-books",
    name: "A6 Custom NCR Bill Books",
    categoryId: "cat-bp-invoice-books",
    description: "A carbonless NCR bill book sized A6, numbered and bound for daily invoicing and delivery notes.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a6-custom-ncr-bill-books.webp",
    ],
    seo: {
      title: "A6 Custom NCR Bill Books | Outprint",
      description: "Custom A6 NCR carbonless bill books, numbered and bound. Bulk order discounts from 10 to 250 books.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A6 (4.1\" x 5.8\")",
            valueInInches: 4.1,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "2-Part Carbonless (Duplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "3-Part Carbonless (Triplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Sequential Numbering",
            description: "Unique incrementing number printed on each page.",
            priceDelta: 1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 10,
  },
  {
    id: "prod-a5-custom-ncr-bill-books",
    slug: "a5-custom-ncr-bill-books",
    name: "A5 Custom NCR Bill Books",
    categoryId: "cat-bp-invoice-books",
    description: "A carbonless NCR bill book sized A5, numbered and bound for daily invoicing and delivery notes.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a5-custom-ncr-bill-books.webp",
    ],
    seo: {
      title: "A5 Custom NCR Bill Books | Outprint",
      description: "Custom A5 NCR carbonless bill books, numbered and bound. Bulk order discounts from 10 to 250 books.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A5 (5.8\" x 8.3\")",
            valueInInches: 5.8,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "2-Part Carbonless (Duplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "3-Part Carbonless (Triplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Sequential Numbering",
            description: "Unique incrementing number printed on each page.",
            priceDelta: 1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 14,
  },
  {
    id: "prod-a4-custom-ncr-bill-books",
    slug: "a4-custom-ncr-bill-books",
    name: "A4 Custom NCR Bill Books",
    categoryId: "cat-bp-invoice-books",
    description: "A carbonless NCR bill book sized A4, numbered and bound for daily invoicing and delivery notes.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/a4-custom-ncr-bill-books.webp",
    ],
    seo: {
      title: "A4 Custom NCR Bill Books | Outprint",
      description: "Custom A4 NCR carbonless bill books, numbered and bound. Bulk order discounts from 10 to 250 books.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "A4 (8.3\" x 11.7\")",
            valueInInches: 8.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          10,
          25,
          50,
          100,
          250,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "2-Part Carbonless (Duplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "3-Part Carbonless (Triplicate)",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.35,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Sequential Numbering",
            description: "Unique incrementing number printed on each page.",
            priceDelta: 1,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 3,
          },
        ],
      },
    ],
    basePricePerUnit: 20,
  },
  {
    id: "prod-self-ink-stamp",
    slug: "self-ink-stamp",
    name: "Self-Ink Stamp",
    categoryId: "cat-bp-stamps",
    description: "A pre-inked self-ink stamp for your logo, signature or approval mark — good for thousands of clean impressions before re-inking.",
    useCases: [
      "Corporate & Office",
    ],
    images: [
      "/images/products/self-ink-stamp.webp",
    ],
    seo: {
      title: "Self-Ink Stamp | Outprint",
      description: "Custom self-ink business stamps in multiple sizes and ink colors. Bulk order discounts from 1 to 50 stamps.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "38mm x 14mm Small",
            valueInInches: 1.5,
          },
          {
            label: "47mm x 18mm Medium",
            valueInInches: 1.85,
          },
          {
            label: "58mm x 22mm Large",
            valueInInches: 2.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          1,
          5,
          10,
          25,
          50,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Black Ink",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Blue Ink",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Red Ink",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Extra Ink Refill",
            description: "Includes a spare bottle of ink for re-inking the pad.",
            priceDelta: 8,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 15,
          },
        ],
      },
    ],
    basePricePerUnit: 45,
  },
  {
    id: "prod-custom-paper-cups",
    slug: "custom-paper-cups",
    name: "Custom Paper Cups",
    categoryId: "cat-pp-hospitality",
    description: "Double-wall or single-wall paper cups printed with your branding — for coffee, cold drinks or takeaway service.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/custom-paper-cups.webp",
    ],
    seo: {
      title: "Custom Paper Cups | Outprint",
      description: "Custom branded paper cups in 120ml to 240ml sizes, single or double-wall. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "120ml (4oz)",
            valueInInches: 2.5,
          },
          {
            label: "190ml (6.5oz)",
            valueInInches: 3,
          },
          {
            label: "240ml (8oz)",
            valueInInches: 3.3,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Single-Wall Paper",
            image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Double-Wall Paper",
            image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Matching Lids",
            description: "Adds a printed or plain lid sized to match.",
            priceDelta: 0.15,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 1.8,
  },
  {
    id: "prod-ready-made-kraft-paper-bags",
    slug: "ready-made-kraft-paper-bags",
    name: "Ready-Made Kraft Paper Bags",
    categoryId: "cat-pkg-paper-bags",
    description: "In-stock plain kraft paper bags in a choice of colors, ready for immediate dispatch — no print setup or lead time.",
    useCases: [
      "E-commerce & DTC",
      "Fashion & Apparel",
    ],
    images: [
      "/images/products/ready-made-kraft-paper-bags.webp",
    ],
    seo: {
      title: "Ready-Made Kraft Paper Bags | Outprint",
      description: "In-stock ready-made kraft paper bags in 5 colors, dispatched immediately with no custom print lead time. Bulk order discounts from 25 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "8\" x 4\" x 10\"",
            valueInInches: 8,
          },
          {
            label: "10\" x 5\" x 13\"",
            valueInInches: 10,
          },
          {
            label: "12\" x 6\" x 15\"",
            valueInInches: 12,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Brown Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Pink Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Purple Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Navy Blue Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Black Kraft",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.2,
          },
        ],
      },
    ],
    basePricePerUnit: 3,
  },
  {
    id: "prod-luxury-paper-bags",
    slug: "luxury-paper-bags",
    name: "Luxury Paper Bags",
    categoryId: "cat-pkg-paper-bags",
    description: "A premium shopping bag on heavyweight laminated stock with rope handles — for boutique retail, gifting and unboxing moments.",
    useCases: [
      "Fashion & Apparel",
      "Beauty & Cosmetics",
      "Events & Weddings",
    ],
    images: [
      "/images/products/luxury-paper-bags.webp",
    ],
    seo: {
      title: "Luxury Paper Bags | Outprint",
      description: "Custom premium laminated shopping bags with rope handles for boutique retail and gifting. Bulk order discounts from 25 to 500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "8\" x 4\" x 10\"",
            valueInInches: 8,
          },
          {
            label: "10\" x 5\" x 13\"",
            valueInInches: 10,
          },
          {
            label: "12\" x 6\" x 15\"",
            valueInInches: 12,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          250,
          500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "Gloss Laminated Art Card",
            image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Matte Laminated Art Card",
            image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Soft-Touch Laminated Art Card",
            image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.2,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Ribbon Handles",
            description: "Upgrades from cotton rope to a satin ribbon handle.",
            priceDelta: 0.4,
          },
          {
            label: "Foil Stamped Logo",
            description: "Metallic foil accent on the printed logo.",
            priceDelta: 0.6,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 5.5,
  },
  {
    id: "prod-gable-lunch-box",
    slug: "gable-lunch-box",
    name: "Gable Lunch Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A fold-top carrier box with a built-in handle — ideal for lunch sets, party favors and grab-and-go meals.",
    useCases: [
      "Food & Beverage",
      "Events & Weddings",
    ],
    images: [
      "/images/products/gable-lunch-box.webp",
    ],
    seo: {
      title: "Gable Lunch Box | Outprint",
      description: "Custom fold-top gable lunch boxes with a built-in carry handle. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (5\" x 3.5\" x 6\")",
            valueInInches: 5,
          },
          {
            label: "Medium (6\" x 4\" x 6.5\")",
            valueInInches: 6,
          },
          {
            label: "Large (7\" x 5\" x 7\")",
            valueInInches: 7,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Interior Grease-Proof Liner",
            description: "Adds a foil or PE liner inside the box.",
            priceDelta: 0.3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.5,
  },
  {
    id: "prod-burger-box",
    slug: "burger-box",
    name: "Burger Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A tuck-top clamshell box sized for a stacked burger, keeping it warm and mess-free on the go.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/burger-box.webp",
    ],
    seo: {
      title: "Burger Box | Outprint",
      description: "Custom tuck-top burger boxes, grease-resistant and printed full color. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (4.5\" x 4.5\" x 3\")",
            valueInInches: 4.5,
          },
          {
            label: "Medium (5\" x 5\" x 3.5\")",
            valueInInches: 5,
          },
          {
            label: "Large (5.5\" x 5.5\" x 4\")",
            valueInInches: 5.5,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Interior Grease-Proof Liner",
            description: "Adds a foil or PE liner inside the box.",
            priceDelta: 0.3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.1,
  },
  {
    id: "prod-bento-meal-box",
    slug: "bento-meal-box",
    name: "Bento Meal Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A wide hinged-lid box with room for a full meal — mains, sides and sauce in one compartment-friendly tray.",
    useCases: [
      "Food & Beverage",
      "Corporate & Office",
    ],
    images: [
      "/images/products/bento-meal-box.webp",
    ],
    seo: {
      title: "Bento Meal Box | Outprint",
      description: "Custom hinged-lid bento meal boxes for full takeout meals. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (7\" x 5\" x 2\")",
            valueInInches: 7,
          },
          {
            label: "Medium (8\" x 6\" x 2.5\")",
            valueInInches: 8,
          },
          {
            label: "Large (9\" x 7\" x 3\")",
            valueInInches: 9,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Compartment Divider Insert",
            description: "Adds a fitted insert to separate mains, sides and sauce.",
            priceDelta: 0.35,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.8,
  },
  {
    id: "prod-pillow-box",
    slug: "pillow-box",
    name: "Pillow Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A curved-edge favor box that pops open flat-packed — sized for cookies, pastries and small gifted treats.",
    useCases: [
      "Food & Beverage",
      "Events & Weddings",
    ],
    images: [
      "/images/products/pillow-box.webp",
    ],
    seo: {
      title: "Pillow Box | Outprint",
      description: "Custom curved pillow boxes for bakery treats and party favors. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Small (4\" x 3\" x 1.5\")",
            valueInInches: 4,
          },
          {
            label: "Medium (5\" x 4\" x 2\")",
            valueInInches: 5,
          },
          {
            label: "Large (6\" x 5\" x 2.5\")",
            valueInInches: 6,
          },
        ],
        allowCustomSize: true,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Pearlescent Art Card",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.15,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Ribbon Tie",
            description: "Adds a satin ribbon tie around the box.",
            priceDelta: 0.25,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 1.8,
  },
  {
    id: "prod-noodle-box",
    slug: "noodle-box",
    name: "Noodle Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A leak-resistant fold-top pail for noodles, rice and other saucy takeout, with a wire carry handle.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/noodle-box.webp",
    ],
    seo: {
      title: "Noodle Box | Outprint",
      description: "Custom leak-resistant noodle boxes with a wire carry handle. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "26oz Small",
            valueInInches: 2.6,
          },
          {
            label: "32oz Medium",
            valueInInches: 3.2,
          },
          {
            label: "46oz Large",
            valueInInches: 4.6,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Leak-Resistant PE-Lined Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.25,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Wire Handle Upgrade",
            description: "Adds a folding wire carry handle.",
            priceDelta: 0.2,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 1.6,
  },
  {
    id: "prod-french-fries-box",
    slug: "french-fries-box",
    name: "French Fries Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A tapered scoop box that stands upright for fries, onion rings and other shareable sides.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/french-fries-box.webp",
    ],
    seo: {
      title: "French Fries Box | Outprint",
      description: "Custom tapered fries scoop boxes, grease-resistant and printed full color. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Regular",
            valueInInches: 3,
          },
          {
            label: "Large",
            valueInInches: 3.6,
          },
          {
            label: "Shareable",
            valueInInches: 4.4,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 0.9,
  },
  {
    id: "prod-hotdog-box",
    slug: "hotdog-box",
    name: "Hotdog Box",
    categoryId: "cat-pkg-food-boxes",
    description: "An open-top tray sized to cradle a dressed hot dog without crushing the bun.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/hotdog-box.webp",
    ],
    seo: {
      title: "Hotdog Box | Outprint",
      description: "Custom open-top hotdog trays, grease-resistant and printed full color. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "Standard (7\")",
            valueInInches: 7,
          },
          {
            label: "Large (8.5\")",
            valueInInches: 8.5,
          },
          {
            label: "Foot-Long (10\")",
            valueInInches: 10,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          100,
          250,
          500,
          1000,
          2500,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 0.85,
  },
  {
    id: "prod-fried-chicken-box",
    slug: "fried-chicken-box",
    name: "Fried Chicken Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A wide-mouth bucket box built to hold a full share of fried chicken, wings or nuggets.",
    useCases: [
      "Food & Beverage",
    ],
    images: [
      "/images/products/fried-chicken-box.webp",
    ],
    seo: {
      title: "Fried Chicken Box | Outprint",
      description: "Custom wide-mouth fried chicken bucket boxes, grease-resistant and printed full color. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      {
        type: "size",
        presets: [
          {
            label: "8pc Bucket",
            valueInInches: 5,
          },
          {
            label: "12pc Bucket",
            valueInInches: 6,
          },
          {
            label: "16pc Family Bucket",
            valueInInches: 7.5,
          },
        ],
        allowCustomSize: false,
      },
      {
        type: "quantity",
        tiers: [
          25,
          50,
          100,
          500,
          1000,
        ],
      },
      {
        type: "material",
        options: [
          {
            label: "White Duplex Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1,
          },
          {
            label: "Kraft Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.05,
          },
          {
            label: "Grease-Resistant PE-Coated Board",
            image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80",
            priceMultiplier: 1.3,
          },
        ],
      },
      {
        type: "addons",
        options: [
          {
            label: "Interior Grease-Proof Liner",
            description: "Adds a foil or PE liner inside the box.",
            priceDelta: 0.3,
          },
          {
            label: "Rush Production",
            description: "Moves your order to the front of the press queue.",
            priceDelta: 0.5,
          },
        ],
      },
    ],
    basePricePerUnit: 2.4,
  },
];
