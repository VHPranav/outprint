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
        "Order custom die-cut and sheet stickers in vinyl, holographic and matte finishes. Bulk pricing from 25 units, free digital proof, UAE-wide delivery.",
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

  // ── Business Prints & Promo Prints ──────────────────────────────────
  {
    id: "cat-business-prints",
    name: "Business Prints",
    slug: "business-prints",
    icon: "Briefcase",
    bannerImage: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=600&q=80",
      label: "Executive letterheads & folders",
      href: "/category/business-prints/letterheads",
    },
    seo: {
      title: "Business Prints | Business Cards, Letterheads & Stationery | Outprint",
      description: "Order business cards, letterheads, envelopes, notepads, certificates and presentation folders for your company. Bulk pricing, free digital proof.",
    },
  },
  {
    id: "cat-bp-business-cards",
    name: "Business Cards",
    slug: "biz-cards",
    icon: "CreditCard",
    bannerImage: "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Business Cards | Outprint",
      description: "Standard, textured, foil and die-cut business cards in every finish — matte, gloss, silk, velvet, kraft and more. Bulk pricing from 100 cards.",
    },
  },
  {
    id: "cat-bp-letterheads",
    name: "Letterheads",
    slug: "letterheads",
    icon: "FileText",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Letterheads | Outprint",
      description: "Standard, express and executive letterheads on bond and premium stock, printed to your brand's letterhead template.",
    },
  },
  {
    id: "cat-bp-envelopes",
    name: "Envelopes",
    slug: "envelopes",
    icon: "Mail",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Envelopes | DL, C5 & C4 | Outprint",
      description: "Branded DL, C5 and C4 envelopes with optional window cut and full-color printing. Bulk pricing from 100 units.",
    },
  },
  {
    id: "cat-bp-notepads",
    name: "Notepads & Notebooks",
    slug: "notepads-notebooks",
    icon: "NotebookText",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Notepads & Notebooks | Outprint",
      description: "Branded A5 notepads and wire-o bound notebooks, printed with your logo and layout on every sheet.",
    },
  },
  {
    id: "cat-bp-certificates",
    name: "Certificates",
    slug: "certificates",
    icon: "Award",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Certificates | Outprint",
      description: "Standard and premium award, completion and training certificates on quality cardstock with decorative borders.",
    },
  },
  {
    id: "cat-bp-folders",
    name: "Presentation Folders",
    slug: "presentation-folders",
    icon: "FolderOpen",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Presentation Folders | Outprint",
      description: "A4 two-pocket presentation folders and custom die-cut shape folders on heavy board, full-color printed.",
    },
  },
  {
    id: "cat-promo-prints",
    name: "Promo Prints",
    slug: "promo-prints",
    icon: "Megaphone",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
      label: "Flyers, posters & brochures",
      href: "/category/promo-prints/flyers",
    },
    seo: {
      title: "Promo Prints | Flyers, Posters, Brochures & Merch | Outprint",
      description: "Order flyers, calendars, postcards, brochures, posters, stickers and hospitality print for your next campaign or event. Bulk pricing, fast turnaround.",
    },
  },
  {
    id: "cat-pp-flyers",
    name: "Flyers",
    slug: "flyers",
    icon: "FileImage",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Flyers | Outprint",
      description: "A6, A5 and A4 flyers in 150gsm to 350gsm stock, gloss laminated, kraft or waterproof. Bulk pricing from 100 to 10,000 units.",
    },
  },
  {
    id: "cat-pp-calendars",
    name: "Calendars",
    slug: "calendars",
    icon: "Calendar",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Calendars | Outprint",
      description: "Desktop tent, wall and poster calendars printed with your branding — a corporate gifting staple. Bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-pp-postcards",
    name: "Postcards",
    slug: "postcards",
    icon: "Send",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Postcards | Outprint",
      description: "Standard, photo-finish and square postcards for direct mail and event handouts. Bulk pricing from 100 to 5000 units.",
    },
  },
  {
    id: "cat-pp-greeting-cards",
    name: "Greeting Cards",
    slug: "greeting-cards",
    icon: "Gift",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Greeting Cards | Outprint",
      description: "Folded greeting cards with matching envelopes for corporate and personal occasions. Bulk pricing from 25 to 1000 units.",
    },
  },
  {
    id: "cat-pp-menus-brochures",
    name: "Menus & Brochures",
    slug: "menus-brochures",
    icon: "BookOpen",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Menus, Brochures & Booklets | Outprint",
      description: "Trifold menus and pamphlets, saddle-stitched booklets, catalogues, brochures and company profiles. Bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-pp-door-hangers",
    name: "Door Hangers",
    slug: "door-hangers",
    icon: "DoorOpen",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Door Hangers | Outprint",
      description: "Die-cut door hangers with a slotted handle, printed full color for real estate, local services and campaigns.",
    },
  },
  {
    id: "cat-pp-stickers-labels",
    name: "Stickers & Labels",
    slug: "stickers-labels",
    icon: "Sticker",
    bannerImage: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Promo Stickers | Round, Square & Kiss-Cut | Outprint",
      description: "Round, square, kiss-cut and paper stickers for campaigns and giveaways. Bulk pricing from 25 to 2500 units.",
    },
  },
  {
    id: "cat-pp-posters",
    name: "Posters",
    slug: "posters",
    icon: "Image",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Posters | Outprint",
      description: "Large-format posters in matte, gloss or waterproof synthetic stock, from A3 up to A0. Bulk pricing from 10 to 500 units.",
    },
  },
  {
    id: "cat-pp-hospitality",
    name: "Hospitality",
    slug: "hospitality",
    icon: "Coffee",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Coasters, Placemats & Table Print | Outprint",
      description: "Coasters, placemats, food wrappers and table tents for cafes, bars and restaurants. Bulk pricing from 100 units.",
    },
  },
  {
    id: "cat-pp-tags-bookmarks",
    name: "Tags & Bookmarks",
    slug: "tags-bookmarks",
    icon: "Tag",
    bannerImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Hang Tags & Bookmarks | Outprint",
      description: "Retail hang tags and standard or premium bookmarks, full-color printed on quality cardstock. Bulk pricing from 100 units.",
    },
  },
  {
    id: "cat-pp-tickets-vouchers",
    name: "Tickets & Vouchers",
    slug: "tickets-vouchers",
    icon: "Ticket",
    bannerImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-promo-prints",
    seo: {
      title: "Custom Tickets & Vouchers | Outprint",
      description: "Event tickets and gift vouchers with optional sequential numbering and perforation. Bulk pricing from 100 units.",
    },
  },

  // ── Large Prints & Gift Prints ──────────────────────────────────────
  {
    id: "cat-large-prints",
    name: "Large Prints",
    slug: "large-prints",
    icon: "Maximize",
    bannerImage: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=600&q=80",
      label: "Roll-up banners & backdrops",
      href: "/category/large-prints/roll-up-banners",
    },
    seo: {
      title: "Large Format Printing | Banners, Canvas & Display Stands | Outprint",
      description: "Roll-up banners, backdrop banners, foam board panels, large stickers, canvas prints and display stands. Custom cm sizing, small-run friendly pricing.",
    },
  },
  {
    id: "cat-lp-rollup-banners",
    name: "Roll-up Banners",
    slug: "roll-up-banners",
    icon: "RectangleVertical",
    bannerImage: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Custom Roll-Up Banners | Outprint",
      description: "Retractable roll-up banners with aluminum base and carry case, from economy to premium wide-base stands.",
    },
  },
  {
    id: "cat-lp-backdrop-banners",
    name: "Backdrop Banners",
    slug: "backdrop-banners",
    icon: "PanelTop",
    bannerImage: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Custom Backdrop Banners | Outprint",
      description: "Large custom-printed and step-and-repeat backdrop banners in vinyl or wrinkle-resistant fabric, made to your cm dimensions.",
    },
  },
  {
    id: "cat-lp-foam-board",
    name: "Foam Board Panels",
    slug: "foam-board-panels",
    icon: "PanelsTopLeft",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Custom Foam Board Panels | Outprint",
      description: "Lightweight rigid 5mm and 10mm foam board panels for signage, exhibition displays and photo mounting.",
    },
  },
  {
    id: "cat-lp-large-format",
    name: "Large Format",
    slug: "large-format",
    icon: "Expand",
    bannerImage: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Large Format Stickers & Posters | Outprint",
      description: "Oversized wall stickers and large-format posters, printed up to 2 meters wide.",
    },
  },
  {
    id: "cat-lp-canvas-prints",
    name: "Canvas Prints",
    slug: "canvas-prints",
    icon: "Frame",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Custom Canvas Prints | Outprint",
      description: "Rolled, stretched and classic framed canvas prints for photography, art and branded office decor.",
    },
  },
  {
    id: "cat-lp-display-stands",
    name: "Display Stands",
    slug: "display-stands",
    icon: "PictureInPicture2",
    bannerImage: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-large-prints",
    seo: {
      title: "Custom Display Stands | Outprint",
      description: "Pop-up hardcase displays, A-boards, sail flags and printed table cloths for trade shows and storefronts.",
    },
  },
  {
    id: "cat-gift-prints",
    name: "Gift Prints",
    slug: "gift-prints",
    icon: "Gift",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=600&q=80",
      label: "Branded corporate gifting",
      href: "/category/gift-prints/corporate-gifts",
    },
    seo: {
      title: "Corporate & Photo Gifts | Branded Merchandise | Outprint",
      description: "Branded pens, mugs, power banks, notebooks and NFC cards, plus personalized photo gifts. Bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-gp-corporate-gifts",
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    icon: "Briefcase",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-gift-prints",
    seo: {
      title: "Custom Corporate Gifts | Outprint",
      description: "Branded pens, mugs, tote bags, power banks, notebooks and NFC cards for corporate gifting and onboarding kits.",
    },
  },
  {
    id: "cat-gp-photo-gifts",
    name: "Photo Gifts",
    slug: "photo-gifts",
    icon: "Camera",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-gift-prints",
    seo: {
      title: "Custom Photo Gifts | Outprint",
      description: "Photo strips, mini books, greeting cards, stickers, calendars and canvas prints for personalized photo gifting.",
    },
  },

  // ── T-shirt Prints & Packaging ──────────────────────────────────────
  {
    id: "cat-tshirt-prints",
    name: "T-shirt Prints",
    slug: "t-shirt-prints",
    icon: "Shirt",
    bannerImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      label: "Custom printed tees, made to order",
      href: "/category/t-shirt-prints/round-neck-t-shirts",
    },
    seo: {
      title: "Custom T-Shirt Printing | Outprint",
      description: "Custom round neck and polo t-shirts for teams, events and merch drops. 6-8 colors, S to XXL, bulk pricing from 10 units.",
    },
  },
  {
    id: "cat-ts-round-neck",
    name: "Round Neck T-Shirts",
    slug: "round-neck-t-shirts",
    icon: "Shirt",
    bannerImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-tshirt-prints",
    seo: {
      title: "Custom Round Neck T-Shirts | Outprint",
      description: "Unisex and kids round neck t-shirts in light and heavy weight cotton, printed full color. Bulk pricing from 10 units.",
    },
  },
  {
    id: "cat-ts-polo",
    name: "Polo T-Shirts",
    slug: "polo-t-shirts",
    icon: "Shirt",
    bannerImage: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-tshirt-prints",
    seo: {
      title: "Custom Polo T-Shirts | Outprint",
      description: "Collared pique-knit polo shirts for corporate uniforms and staff wear, embroidered or printed. Bulk pricing from 10 units.",
    },
  },
  {
    id: "cat-packaging",
    name: "Packaging",
    slug: "packaging",
    icon: "PackageOpen",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: null,
    promoTile: {
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=600&q=80",
      label: "Food boxes, display boxes & bags",
      href: "/category/packaging/food-boxes",
    },
    seo: {
      title: "Custom Packaging | Food Boxes, Display Boxes & Bags | Outprint",
      description: "Custom food boxes, retail product boxes, mailer wallets, display boxes and paper bags. Corrugated, kraft and white duplex board.",
    },
  },
  {
    id: "cat-pkg-food-boxes",
    name: "Food Boxes",
    slug: "food-boxes",
    icon: "Sandwich",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-packaging",
    seo: {
      title: "Custom Food Boxes | Outprint",
      description: "Fast food and bakery boxes in grease-resistant white duplex or kraft board, full-color printed. Bulk pricing from 25 units.",
    },
  },
  {
    id: "cat-pkg-product-boxes",
    name: "Product Boxes",
    slug: "product-boxes",
    icon: "PackageCheck",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-packaging",
    seo: {
      title: "Custom Product Boxes | Outprint",
      description: "Retail product boxes in standard and custom die-cut shapes, full-color printed on corrugated, kraft or white duplex board.",
    },
  },
  {
    id: "cat-pkg-mailer-wallets",
    name: "Mailer Wallets",
    slug: "mailer-wallets",
    icon: "Wallet",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-packaging",
    seo: {
      title: "Custom Mailer Wallets | Outprint",
      description: "Glued rigid mailer wallets for books, documents and flat retail items, printed full color on corrugated or duplex board.",
    },
  },
  {
    id: "cat-pkg-display-boxes",
    name: "Display Boxes",
    slug: "display-boxes",
    icon: "ShoppingBasket",
    bannerImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-packaging",
    seo: {
      title: "Custom Display Boxes | Outprint",
      description: "Countertop and hook-hang retail display boxes, litho-laminated for point-of-sale presentation.",
    },
  },
  {
    id: "cat-pkg-paper-bags",
    name: "Paper Bags",
    slug: "paper-bags",
    icon: "ShoppingBag",
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-packaging",
    seo: {
      title: "Custom Paper Bags | Outprint",
      description: "Standard glossy and brown kraft paper carry bags with twisted or flat handles, full-color printed. Bulk pricing from 25 units.",
    },
  },

  // ── Invoice Books & Stamps (from printcraft.ae parity pass) ─────────
  {
    id: "cat-bp-invoice-books",
    name: "Invoice Books",
    slug: "invoice-books",
    icon: "Receipt",
    bannerImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Invoice & NCR Bill Books | Outprint",
      description: "Custom NCR carbonless bill books and receipt books in A4, A5 and A6, numbered and duplicate/triplicate sets.",
    },
  },
  {
    id: "cat-bp-stamps",
    name: "Stamps",
    slug: "stamps",
    icon: "Stamp",
    bannerImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80",
    parentId: "cat-business-prints",
    seo: {
      title: "Custom Self-Ink Stamps | Outprint",
      description: "Custom self-ink rubber stamps for business use — signatures, approvals, dates and logos, thousands of clean impressions.",
    },
  },
];
