// Static category catalog. Categories form a tree via `parentId`, flattened
// into a single array so it stays trivial to seed and to look up by id/slug.
// Use `getCategoryTree()` in @/lib/catalog to rebuild the nested structure.

export interface CategoryPromoTile {
  image: string;
  label: string;
  href: string;
}

export interface CategorySEO {
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** lucide-react icon export name, e.g. "Sticker" */
  icon: string;
  bannerImage: string;
  parentId: string | null;
  /** Optional feature tile shown inside a mega-menu panel for this category */
  promoTile?: CategoryPromoTile;
  /** Used by generateMetadata() on /category/[slug]; falls back to name-derived defaults when absent */
  seo?: CategorySEO;
}

export const categories: Category[] = [
  // ── Stickers ─────────────────────────────────────────────────────────
  {
    id: "cat-stickers",
    name: "Stickers",
    slug: "stickers",
    icon: "Sticker",
    bannerImage:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1200&q=80",
    parentId: null,
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=600&q=80",
      label: "New: Holographic Foil Die-Cuts",
      href: "/category/stickers/die-cut/holographic",
    },
    seo: {
      title: "Custom Stickers Online | Die-Cut & Sheet Stickers | Outprint",
      description:
        "Order custom die-cut and sheet stickers in vinyl, holographic and matte finishes. Bulk pricing from 25 units, free digital proof, pan-India delivery.",
    },
  },
  {
    id: "cat-stickers-die-cut",
    name: "Die-Cut Stickers",
    slug: "die-cut",
    icon: "Scissors",
    bannerImage:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-stickers",
    seo: {
      title: "Custom Die-Cut Stickers | Outprint",
      description:
        "Weatherproof die-cut stickers cut precisely to your artwork's outline, in vinyl and holographic finishes. Bulk pricing, free proof.",
    },
  },
  {
    id: "cat-stickers-die-cut-vinyl",
    name: "Vinyl Die-Cut",
    slug: "vinyl",
    icon: "Droplet",
    bannerImage:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-stickers-die-cut",
    seo: {
      title: "Vinyl Die-Cut Stickers | Outprint",
      description:
        "Custom vinyl die-cut stickers, UV-laminated for 5+ years of outdoor durability. Matte, glossy and clear finishes.",
    },
  },
  {
    id: "cat-stickers-die-cut-holographic",
    name: "Holographic Die-Cut",
    slug: "holographic",
    icon: "Sparkles",
    bannerImage:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-stickers-die-cut",
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=600&q=80",
      label: "Prismatic rainbow refraction",
      href: "/category/stickers/die-cut/holographic",
    },
    seo: {
      title: "Holographic Die-Cut Stickers | Outprint",
      description:
        "Prismatic rainbow-refraction die-cut stickers with opaque white backing. Rainbow, gold and silver dot holographic finishes.",
    },
  },
  {
    id: "cat-stickers-sheet",
    name: "Sticker Sheets",
    slug: "sheets",
    icon: "LayoutGrid",
    bannerImage:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-stickers",
    seo: {
      title: "Custom Sticker Sheets | Outprint",
      description:
        "Kiss-cut sticker sheets with multiple designs per sheet — ideal for sticker packs, product inserts and merch.",
    },
  },

  // ── Labels ───────────────────────────────────────────────────────────
  {
    id: "cat-labels",
    name: "Labels",
    slug: "labels",
    icon: "Tag",
    bannerImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    parentId: null,
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
      label: "Weatherproof labels for outdoor gear",
      href: "/category/labels/product-labels/weatherproof",
    },
    seo: {
      title: "Custom Product & Packaging Labels | Outprint",
      description:
        "Custom matte, glossy and weatherproof labels for products and packaging. Roll or sheet fulfillment, bulk discounts to 5000 units.",
    },
  },
  {
    id: "cat-labels-product",
    name: "Product Labels",
    slug: "product-labels",
    icon: "Tags",
    bannerImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-labels",
    seo: {
      title: "Custom Product Labels | Outprint",
      description:
        "Matte and glossy product labels for candles, cosmetics and packaged goods, with bulk pricing to 5000 units.",
    },
  },
  {
    id: "cat-labels-product-weatherproof",
    name: "Weatherproof Labels",
    slug: "weatherproof",
    icon: "CloudRain",
    bannerImage:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-labels-product",
    seo: {
      title: "Weatherproof Vinyl Labels | Outprint",
      description:
        "UV-stable, waterproof vinyl labels built for bottles, outdoor gear and cold-chain products.",
    },
  },
  {
    id: "cat-labels-packaging",
    name: "Packaging Labels",
    slug: "packaging-labels",
    icon: "Package2",
    bannerImage:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-labels",
    seo: {
      title: "Custom Packaging Labels | Outprint",
      description:
        "Branded closure and shipping labels sized for mailers, pouches and retail boxes.",
    },
  },

  // ── Boxes & Packaging ────────────────────────────────────────────────
  {
    id: "cat-boxes",
    name: "Boxes & Packaging",
    slug: "boxes",
    icon: "Package",
    bannerImage:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    parentId: null,
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=600&q=80",
      label: "Rigid gift boxes, made to spec",
      href: "/category/boxes/rigid-boxes",
    },
    seo: {
      title: "Custom Boxes & Packaging | Outprint",
      description:
        "Custom-printed mailer boxes and rigid gift boxes for e-commerce shipping and premium unboxing. Bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-boxes-mailer",
    name: "Mailer Boxes",
    slug: "mailer-boxes",
    icon: "Mail",
    bannerImage:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-boxes",
    seo: {
      title: "Custom Mailer Boxes | Outprint",
      description:
        "Custom-printed corrugated and kraft mailer boxes with tuck-lock closure, sized for e-commerce shipping.",
    },
  },
  {
    id: "cat-boxes-mailer-corrugated",
    name: "Corrugated Mailers",
    slug: "corrugated",
    icon: "Boxes",
    bannerImage:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-boxes-mailer",
    seo: {
      title: "Custom Corrugated Mailer Boxes | Outprint",
      description:
        "Custom-printed corrugated mailer boxes with tuck-lock closure. Sturdy, lightweight, bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-boxes-rigid",
    name: "Rigid Boxes",
    slug: "rigid-boxes",
    icon: "Box",
    bannerImage:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-boxes",
    seo: {
      title: "Custom Rigid Gift Boxes | Outprint",
      description:
        "Two-piece rigid chipboard boxes with magnetic or friction-fit lid, built for premium unboxing moments.",
    },
  },

  // ── Business Cards ───────────────────────────────────────────────────
  {
    id: "cat-business-cards",
    name: "Business Cards",
    slug: "business-cards",
    icon: "CreditCard",
    bannerImage:
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=1200&q=80",
    parentId: null,
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=600&q=80",
      label: "Letterpress on 600gsm cotton",
      href: "/category/business-cards/premium/letterpress",
    },
    seo: {
      title: "Custom Business Cards | Outprint",
      description:
        "Standard matte, premium suede and letterpress cotton business cards. Fast turnaround, bulk pricing from 100 cards.",
    },
  },
  {
    id: "cat-cards-standard",
    name: "Standard Cards",
    slug: "standard",
    icon: "IdCard",
    bannerImage:
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-business-cards",
    seo: {
      title: "Standard Matte Business Cards | Outprint",
      description:
        "Everyday 14pt matte business cards — smudge-resistant, quick turnaround, priced for ordering in volume.",
    },
  },
  {
    id: "cat-cards-premium",
    name: "Premium Cards",
    slug: "premium",
    icon: "Gem",
    bannerImage:
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-business-cards",
    seo: {
      title: "Premium Business Cards | Outprint",
      description:
        "32pt suede-laminated and letterpress cotton business cards with foil stamping and edge painting options.",
    },
  },
  {
    id: "cat-cards-premium-letterpress",
    name: "Letterpress Cards",
    slug: "letterpress",
    icon: "Stamp",
    bannerImage:
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-cards-premium",
    seo: {
      title: "Letterpress Cotton Business Cards | Outprint",
      description:
        "600gsm cotton stock, deep-impression letterpress or blind deboss business cards on Colorplan stock.",
    },
  },

  // ── Banners & Signage ────────────────────────────────────────────────
  {
    id: "cat-banners",
    name: "Banners & Signage",
    slug: "banners",
    icon: "Flag",
    bannerImage:
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=1200&q=80",
    parentId: null,
    promoTile: {
      image:
        "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=600&q=80",
      label: "Windproof mesh for outdoor events",
      href: "/category/banners/mesh-banners",
    },
    seo: {
      title: "Custom Banners & Signage | Outprint",
      description:
        "Vinyl and mesh outdoor banners, plus retractable banner stands. Grommets, pole pockets, fast turnaround for events.",
    },
  },
  {
    id: "cat-banners-vinyl",
    name: "Vinyl Banners",
    slug: "vinyl-banners",
    icon: "RectangleHorizontal",
    bannerImage:
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-banners",
    seo: {
      title: "Custom Vinyl Outdoor Banners | Outprint",
      description:
        "13oz and 18oz scrim vinyl banners with reinforced hems and brass grommets, custom sizes from 2x4ft to 10x20ft.",
    },
  },
  {
    id: "cat-banners-mesh",
    name: "Mesh Banners",
    slug: "mesh-banners",
    icon: "Wind",
    bannerImage:
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=1200&q=80",
    parentId: "cat-banners",
    seo: {
      title: "Mesh Windproof Banners | Outprint",
      description:
        "Perforated mesh vinyl banners built for wind resistance on fence lines and outdoor events.",
    },
  },
];
