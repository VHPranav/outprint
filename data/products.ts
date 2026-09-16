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
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Custom Vinyl Die-Cut Stickers | Outprint",
      description:
        "Order weatherproof custom vinyl die-cut stickers cut to any shape. Bulk pricing from 25 to 2500 units, matte, glossy and holographic finishes.",
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
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Holographic Die-Cut Stickers | Outprint",
      description:
        "Custom holographic die-cut stickers with prismatic rainbow refraction and opaque white backing. Free proof, bulk pricing.",
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
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Weatherproof Vinyl Labels | Outprint",
      description:
        "UV-stable, waterproof vinyl labels for outdoor and cold-chain products. Freezer-safe adhesive, bulk pricing available.",
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
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Custom Packaging Labels | Outprint",
      description:
        "Custom branded packaging and shipping labels for mailers, pouches and retail boxes with bulk pricing tiers.",
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
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Custom Corrugated Mailer Boxes | Outprint",
      description:
        "Custom-printed corrugated mailer boxes with tuck-lock closure. Sized for e-commerce shipping, bulk pricing from 25 units.",
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
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Kraft Mailer Boxes | Outprint",
      description:
        "Recyclable kraft mailer boxes with natural uncoated finish. Custom sizes, one-color or full-color print, bulk pricing.",
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
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Standard Matte Business Cards | Outprint",
      description:
        "Order standard 14pt matte business cards with fast turnaround. Bulk pricing from 100 to 5000 cards.",
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
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Premium Suede Business Cards | Outprint",
      description:
        "32pt suede-laminated business cards with colored edge paint and foil stamping options. Premium bulk pricing.",
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
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=900&q=80",
    ],
    seo: {
      title: "Letterpress Cotton Business Cards | Outprint",
      description:
        "600gsm cotton letterpress business cards with deep-impression deboss. Colorplan stock options, small-batch bulk pricing.",
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
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
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
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    ],
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
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    ],
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
];
