// Points the `images` field of the 21 business-card products at the
// generated mockups in /public/images/products, replacing the earlier
// stock-photo (mis-)matches.
const fs = require("fs");
const path = require("path");

const PRODUCTS_FILE = path.join(__dirname, "..", "data/products.ts");

const SLUGS = [
  "standard-matte-business-cards",
  "premium-suede-business-cards",
  "letterpress-cotton-business-cards",
  "standard-business-cards",
  "express-business-cards",
  "velvet-laminated-cards",
  "textured-business-cards",
  "pearl-shimmer-cards",
  "smooth-white-business-cards",
  "brown-kraft-business-cards",
  "waterproof-cards",
  "eco-friendly-cards",
  "spot-uv-business-cards",
  "white-ink-black-cards",
  "gold-foil-black-cards",
  "double-pasted-cards",
  "triplex-business-cards",
  "square-business-cards",
  "circle-business-cards",
  "oval-shaped-business-cards",
  "any-shape-die-cut-business-cards",
];

let src = fs.readFileSync(PRODUCTS_FILE, "utf8");

// Locate each product block by its `slug: "..."` marker (unique per product).
const markers = SLUGS.map((slug) => {
  const re = new RegExp(`slug:\\s*"${slug}"`);
  const m = re.exec(src);
  if (!m) throw new Error(`slug not found: ${slug}`);
  return { slug, idx: m.index };
}).sort((a, b) => b.idx - a.idx); // process from the end backward

let changed = 0;
for (const { slug, idx } of markers) {
  // The `images:` array is the next occurrence after this slug's start.
  const searchFrom = idx;
  const imagesRe = /images:\s*\[[\s\S]*?\n(\s*)\],/;
  const rest = src.slice(searchFrom);
  const m = rest.match(imagesRe);
  if (!m) {
    console.error(`NO IMAGES ARRAY: ${slug}`);
    continue;
  }
  const absoluteIdx = searchFrom + m.index;
  const indent = m[1] + "  ";
  const newBlock = `images: [\n${indent}"/images/products/${slug}.webp",\n${m[1]}],`;
  src = src.slice(0, absoluteIdx) + newBlock + src.slice(absoluteIdx + m[0].length);
  changed++;
}

fs.writeFileSync(PRODUCTS_FILE, src);
console.error(`Updated ${changed} of ${markers.length} products.`);
