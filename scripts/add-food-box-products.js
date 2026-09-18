const fs = require("fs");
const path = require("path");

const PRODUCTS_FILE = path.join(__dirname, "..", "data/products.ts");

const MATERIAL_IMG = "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=200&q=80";

const STANDARD_MATERIALS = [
  { label: "White Duplex Board", image: MATERIAL_IMG, priceMultiplier: 1 },
  { label: "Kraft Board", image: MATERIAL_IMG, priceMultiplier: 1.05 },
  { label: "Grease-Resistant PE-Coated Board", image: MATERIAL_IMG, priceMultiplier: 1.3 },
];

const RUSH_ADDON = { label: "Rush Production", description: "Moves your order to the front of the press queue.", priceDelta: 0.5 };
const LINER_ADDON = { label: "Interior Grease-Proof Liner", description: "Adds a foil or PE liner inside the box.", priceDelta: 0.3 };

const PRODUCTS = [
  {
    id: "prod-gable-lunch-box",
    slug: "gable-lunch-box",
    name: "Gable Lunch Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A fold-top carrier box with a built-in handle — ideal for lunch sets, party favors and grab-and-go meals.",
    useCases: ["Food & Beverage", "Events & Weddings"],
    images: ["/images/products/gable-lunch-box.webp"],
    seo: {
      title: "Gable Lunch Box | Outprint",
      description: "Custom fold-top gable lunch boxes with a built-in carry handle. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Small (5\" x 3.5\" x 6\")", valueInInches: 5 },
        { label: "Medium (6\" x 4\" x 6.5\")", valueInInches: 6 },
        { label: "Large (7\" x 5\" x 7\")", valueInInches: 7 },
      ], allowCustomSize: true },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [LINER_ADDON, RUSH_ADDON] },
    ],
    basePricePerUnit: 2.5,
  },
  {
    id: "prod-burger-box",
    slug: "burger-box",
    name: "Burger Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A tuck-top clamshell box sized for a stacked burger, keeping it warm and mess-free on the go.",
    useCases: ["Food & Beverage"],
    images: ["/images/products/burger-box.webp"],
    seo: {
      title: "Burger Box | Outprint",
      description: "Custom tuck-top burger boxes, grease-resistant and printed full color. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Small (4.5\" x 4.5\" x 3\")", valueInInches: 4.5 },
        { label: "Medium (5\" x 5\" x 3.5\")", valueInInches: 5 },
        { label: "Large (5.5\" x 5.5\" x 4\")", valueInInches: 5.5 },
      ], allowCustomSize: true },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [LINER_ADDON, RUSH_ADDON] },
    ],
    basePricePerUnit: 2.1,
  },
  {
    id: "prod-bento-meal-box",
    slug: "bento-meal-box",
    name: "Bento Meal Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A wide hinged-lid box with room for a full meal — mains, sides and sauce in one compartment-friendly tray.",
    useCases: ["Food & Beverage", "Corporate & Office"],
    images: ["/images/products/bento-meal-box.webp"],
    seo: {
      title: "Bento Meal Box | Outprint",
      description: "Custom hinged-lid bento meal boxes for full takeout meals. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Small (7\" x 5\" x 2\")", valueInInches: 7 },
        { label: "Medium (8\" x 6\" x 2.5\")", valueInInches: 8 },
        { label: "Large (9\" x 7\" x 3\")", valueInInches: 9 },
      ], allowCustomSize: true },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [
        { label: "Compartment Divider Insert", description: "Adds a fitted insert to separate mains, sides and sauce.", priceDelta: 0.35 },
        RUSH_ADDON,
      ] },
    ],
    basePricePerUnit: 2.8,
  },
  {
    id: "prod-pillow-box",
    slug: "pillow-box",
    name: "Pillow Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A curved-edge favor box that pops open flat-packed — sized for cookies, pastries and small gifted treats.",
    useCases: ["Food & Beverage", "Events & Weddings"],
    images: ["/images/products/pillow-box.webp"],
    seo: {
      title: "Pillow Box | Outprint",
      description: "Custom curved pillow boxes for bakery treats and party favors. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Small (4\" x 3\" x 1.5\")", valueInInches: 4 },
        { label: "Medium (5\" x 4\" x 2\")", valueInInches: 5 },
        { label: "Large (6\" x 5\" x 2.5\")", valueInInches: 6 },
      ], allowCustomSize: true },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: [
        { label: "White Duplex Board", image: MATERIAL_IMG, priceMultiplier: 1 },
        { label: "Kraft Board", image: MATERIAL_IMG, priceMultiplier: 1.05 },
        { label: "Pearlescent Art Card", image: MATERIAL_IMG, priceMultiplier: 1.15 },
      ] },
      { type: "addons", options: [
        { label: "Ribbon Tie", description: "Adds a satin ribbon tie around the box.", priceDelta: 0.25 },
        RUSH_ADDON,
      ] },
    ],
    basePricePerUnit: 1.8,
  },
  {
    id: "prod-noodle-box",
    slug: "noodle-box",
    name: "Noodle Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A leak-resistant fold-top pail for noodles, rice and other saucy takeout, with a wire carry handle.",
    useCases: ["Food & Beverage"],
    images: ["/images/products/noodle-box.webp"],
    seo: {
      title: "Noodle Box | Outprint",
      description: "Custom leak-resistant noodle boxes with a wire carry handle. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "26oz Small", valueInInches: 2.6 },
        { label: "32oz Medium", valueInInches: 3.2 },
        { label: "46oz Large", valueInInches: 4.6 },
      ], allowCustomSize: false },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: [
        { label: "White Duplex Board", image: MATERIAL_IMG, priceMultiplier: 1 },
        { label: "Kraft Board", image: MATERIAL_IMG, priceMultiplier: 1.05 },
        { label: "Leak-Resistant PE-Lined Board", image: MATERIAL_IMG, priceMultiplier: 1.25 },
      ] },
      { type: "addons", options: [
        { label: "Wire Handle Upgrade", description: "Adds a folding wire carry handle.", priceDelta: 0.2 },
        RUSH_ADDON,
      ] },
    ],
    basePricePerUnit: 1.6,
  },
  {
    id: "prod-french-fries-box",
    slug: "french-fries-box",
    name: "French Fries Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A tapered scoop box that stands upright for fries, onion rings and other shareable sides.",
    useCases: ["Food & Beverage"],
    images: ["/images/products/french-fries-box.webp"],
    seo: {
      title: "French Fries Box | Outprint",
      description: "Custom tapered fries scoop boxes, grease-resistant and printed full color. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Regular", valueInInches: 3 },
        { label: "Large", valueInInches: 3.6 },
        { label: "Shareable", valueInInches: 4.4 },
      ], allowCustomSize: false },
      { type: "quantity", tiers: [100, 250, 500, 1000, 2500] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [RUSH_ADDON] },
    ],
    basePricePerUnit: 0.9,
  },
  {
    id: "prod-hotdog-box",
    slug: "hotdog-box",
    name: "Hotdog Box",
    categoryId: "cat-pkg-food-boxes",
    description: "An open-top tray sized to cradle a dressed hot dog without crushing the bun.",
    useCases: ["Food & Beverage"],
    images: ["/images/products/hotdog-box.webp"],
    seo: {
      title: "Hotdog Box | Outprint",
      description: "Custom open-top hotdog trays, grease-resistant and printed full color. Bulk order discounts from 100 to 2500 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "Standard (7\")", valueInInches: 7 },
        { label: "Large (8.5\")", valueInInches: 8.5 },
        { label: "Foot-Long (10\")", valueInInches: 10 },
      ], allowCustomSize: false },
      { type: "quantity", tiers: [100, 250, 500, 1000, 2500] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [RUSH_ADDON] },
    ],
    basePricePerUnit: 0.85,
  },
  {
    id: "prod-fried-chicken-box",
    slug: "fried-chicken-box",
    name: "Fried Chicken Box",
    categoryId: "cat-pkg-food-boxes",
    description: "A wide-mouth bucket box built to hold a full share of fried chicken, wings or nuggets.",
    useCases: ["Food & Beverage"],
    images: ["/images/products/fried-chicken-box.webp"],
    seo: {
      title: "Fried Chicken Box | Outprint",
      description: "Custom wide-mouth fried chicken bucket boxes, grease-resistant and printed full color. Bulk order discounts from 25 to 1000 units.",
    },
    optionGroups: [
      { type: "size", presets: [
        { label: "8pc Bucket", valueInInches: 5 },
        { label: "12pc Bucket", valueInInches: 6 },
        { label: "16pc Family Bucket", valueInInches: 7.5 },
      ], allowCustomSize: false },
      { type: "quantity", tiers: [25, 50, 100, 500, 1000] },
      { type: "material", options: STANDARD_MATERIALS },
      { type: "addons", options: [LINER_ADDON, RUSH_ADDON] },
    ],
    basePricePerUnit: 2.4,
  },
];

function ser(value, indent) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((v) => `${padIn}${ser(v, indent + 1)},`).join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    return `{\n${keys.map((k) => `${padIn}${k}: ${ser(value[k], indent + 1)},`).join("\n")}\n${pad}}`;
  }
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}

let src = fs.readFileSync(PRODUCTS_FILE, "utf8");

// Validate no id/slug collisions.
for (const p of PRODUCTS) {
  if (src.includes(`id: "${p.id}"`)) throw new Error(`duplicate id: ${p.id}`);
  if (src.includes(`slug: "${p.slug}"`)) throw new Error(`duplicate slug: ${p.slug}`);
}

const entries = PRODUCTS.map((p) => `  ${ser(p, 1)},`).join("\n");

const marker = "\n];\n";
const lastIdx = src.lastIndexOf(marker);
if (lastIdx === -1) throw new Error("closing marker not found");

src = src.slice(0, lastIdx) + "\n" + entries + marker + src.slice(lastIdx + marker.length);

fs.writeFileSync(PRODUCTS_FILE, src);
console.error(`Added ${PRODUCTS.length} products.`);
