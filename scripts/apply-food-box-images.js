// Replaces the generated food-box mockups with real, manually-verified
// Pexels photography. Picks were checked at full resolution (not just
// thumbnails) for correct subject matter and no visible third-party branding.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/products");
const PRODUCTS_FILE = path.join(ROOT, "data/products.ts");

// slug -> chosen Pexels photo (verified individually, see conversation).
const PICKS = {
  "gable-lunch-box": "https://images.pexels.com/photos/8015467/pexels-photo-8015467.jpeg",
  "burger-box": "https://images.pexels.com/photos/8228281/pexels-photo-8228281.jpeg",
  "bento-meal-box": "https://images.pexels.com/photos/8165382/pexels-photo-8165382.jpeg",
  "pillow-box": "https://images.pexels.com/photos/7460109/pexels-photo-7460109.jpeg",
  "noodle-box": "https://images.pexels.com/photos/6646542/pexels-photo-6646542.jpeg",
  "french-fries-box": "https://images.pexels.com/photos/31701975/pexels-photo-31701975.jpeg",
  "hotdog-box": "https://images.pexels.com/photos/5779668/pexels-photo-5779668.jpeg",
  "fried-chicken-box": "https://images.pexels.com/photos/7788310/pexels-photo-7788310.jpeg",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [slug, url] of Object.entries(PICKS)) {
    process.stderr.write(`${slug}...\n`);
    const buf = await downloadBuffer(url);
    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    await sharp(buf)
      .resize(1000, 1000, { fit: "cover", position: "attention" })
      .webp({ quality: 85 })
      .toFile(outPath);
    await sleep(150);
  }
  console.error("Downloaded all 8. Images already point at these paths — no data/products.ts change needed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
