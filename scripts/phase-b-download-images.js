// Phase B: download the approved Pexels candidate for every non-card,
// non-banner product, crop/pad to a 1000x1000 WebP, save to
// /public/images/products/[slug].webp, and point data/products.ts at it.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/products");
const PRODUCTS_FILE = path.join(ROOT, "data/products.ts");
const DATA = require("./image-review-data.json");

const CARD_IDS = new Set([
  "010","011","012","016","017","018","019","020","021","022","023","024",
  "025","026","027","028","029","030","031","032","033",
]);
const BANNER_IDS = new Set([
  "013","014","015","080","081","082","083","084","085","086","087","088",
  "089","090","091","092","093","094",
]);

// Candidate index overrides after manual review (0-based). Default: 0 (top pick).
// 002: candidate #2 excluded (inappropriate/explicit content) -> keep #1.
// 135: candidate #1 excluded (branded Chanel bag) -> use #2 (unbranded mockup).
// 068: candidate #1 excluded (NVIDIA/Intel branded stickers) -> use #2.
const CANDIDATE_OVERRIDE = { "002": 0, "135": 1, "068": 1 };

const targets = DATA.filter((r) => !CARD_IDS.has(r.id) && !BANNER_IDS.has(r.id));

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let src = fs.readFileSync(PRODUCTS_FILE, "utf8");

  const results = [];
  for (let i = 0; i < targets.length; i++) {
    const rec = targets[i];
    const idx = CANDIDATE_OVERRIDE[rec.id] ?? 0;
    const candidate = rec.candidates[idx];
    if (!candidate) {
      console.error(`SKIP (no candidate ${idx}): #${rec.id} ${rec.product_name}`);
      continue;
    }
    process.stderr.write(`[${i + 1}/${targets.length}] #${rec.id} ${rec.product_name} <- candidate ${idx + 1}\n`);

    const outPath = path.join(OUT_DIR, `${rec.slug}.webp`);
    try {
      const buf = await downloadBuffer(candidate.original);
      await sharp(buf)
        .resize(1000, 1000, { fit: "cover", position: "attention" })
        .webp({ quality: 85 })
        .toFile(outPath);
      results.push(rec.slug);
    } catch (err) {
      console.error(`FAILED: ${rec.slug}: ${err.message}`);
    }
    await sleep(120);
  }

  // Update data/products.ts `images` field for every successfully downloaded slug.
  const bySlugDesc = results
    .map((slug) => {
      const re = new RegExp(`slug:\\s*"${slug}"`);
      const m = re.exec(src);
      return m ? { slug, idx: m.index } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.idx - a.idx);

  let changed = 0;
  for (const { slug, idx } of bySlugDesc) {
    const rest = src.slice(idx);
    const imagesRe = /images:\s*\[[\s\S]*?\n(\s*)\],/;
    const m = rest.match(imagesRe);
    if (!m) {
      console.error(`NO IMAGES ARRAY: ${slug}`);
      continue;
    }
    const absoluteIdx = idx + m.index;
    const indent = m[1] + "  ";
    const newBlock = `images: [\n${indent}"/images/products/${slug}.webp",\n${m[1]}],`;
    src = src.slice(0, absoluteIdx) + newBlock + src.slice(absoluteIdx + m[0].length);
    changed++;
  }

  fs.writeFileSync(PRODUCTS_FILE, src);
  console.error(`\nDownloaded ${results.length}/${targets.length}. Updated ${changed} product entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
