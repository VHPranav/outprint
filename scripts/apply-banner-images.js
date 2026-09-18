// Final pass over the 18 banner/display products that were deferred from
// the main Phase B batch. 11 had a real, verified candidate (checked by eye
// at full resolution, not just the search-result thumbnail) among Pexels'
// top-3 results; 7 had no honest match on Pexels OR Unsplash and get a
// clearly-labeled placeholder + needsManualSourcing: true instead.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/products");
const PRODUCTS_FILE = path.join(ROOT, "data/products.ts");
const DATA = require("./image-review-data.json");

// id -> candidate index (0-based) among that product's top-3 Pexels results.
const RESCUED = {
  "013": 2, // Vinyl Outdoor Banners
  "084": 1, // 5mm Foam Board Panel
  "085": 1, // 10mm Foam Board Panel
  "086": 2, // Large Stickers
  "087": 0, // Large Posters
  "088": 1, // Rolled Canvas Print
  "089": 0, // Stretched Canvas Print
  "090": 0, // Classic Framed Canvas
  "092": 0, // Spring A-Board
  "093": 1, // Sail Flag
  "094": 0, // Custom Table Cloth
};

const PLACEHOLDER_SLUGS = new Set([
  "mesh-windproof-banners",
  "retractable-banner-stands",
  "roll-up-banner-85x200cm",
  "premium-roll-up-banner",
  "custom-printed-banners",
  "backdrop-banner",
  "pop-up-banner-hardcase-straight",
]);

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let src = fs.readFileSync(PRODUCTS_FILE, "utf8");

  const rescuedSlugs = [];
  for (const [id, idx] of Object.entries(RESCUED)) {
    const rec = DATA.find((r) => r.id === id);
    const candidate = rec.candidates[idx];
    const outPath = path.join(OUT_DIR, `${rec.slug}.webp`);
    process.stderr.write(`[rescued] #${id} ${rec.product_name} <- candidate ${idx + 1}\n`);
    const buf = await downloadBuffer(candidate.original);
    await sharp(buf)
      .resize(1000, 1000, { fit: "cover", position: "attention" })
      .webp({ quality: 85 })
      .toFile(outPath);
    rescuedSlugs.push(rec.slug);
    await sleep(120);
  }

  // Point rescued products at their new real photo; flag placeholder products.
  const allSlugs = [
    ...rescuedSlugs.map((slug) => ({ slug, placeholder: false })),
    ...Array.from(PLACEHOLDER_SLUGS).map((slug) => ({ slug, placeholder: true })),
  ];

  const bySlugDesc = allSlugs
    .map(({ slug, placeholder }) => {
      const re = new RegExp(`slug:\\s*"${slug}"`);
      const m = re.exec(src);
      return m ? { slug, placeholder, idx: m.index } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.idx - a.idx);

  let changed = 0;
  for (const { slug, placeholder, idx } of bySlugDesc) {
    const rest = src.slice(idx);
    const imagesRe = /images:\s*\[[\s\S]*?\n(\s*)\],(\n\s*needsManualSourcing:\s*true,)?/;
    const m = rest.match(imagesRe);
    if (!m) {
      console.error(`NO IMAGES ARRAY: ${slug}`);
      continue;
    }
    const absoluteIdx = idx + m.index;
    const indent = m[1] + "  ";
    const flagLine = placeholder ? `\n${m[1]}needsManualSourcing: true,` : "";
    const newBlock = `images: [\n${indent}"/images/products/${slug}.webp",\n${m[1]}],${flagLine}`;
    src = src.slice(0, absoluteIdx) + newBlock + src.slice(absoluteIdx + m[0].length);
    changed++;
  }

  fs.writeFileSync(PRODUCTS_FILE, src);
  console.error(`\nRescued ${rescuedSlugs.length}, placeholdered ${PLACEHOLDER_SLUGS.size}. Updated ${changed} entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
