// Generates product images with the Gemini image API (same models that power
// Google Flow), in two phases so nothing on the site changes until approved:
//
//   1. generate  -> writes review PNGs to scripts/product-image-samples/<slug>.png
//   2. --apply   -> converts approved samples to 1000x1000 WebP in
//                   public/images/products/<slug>.webp (no API call)
//
// Usage:
//   node scripts/generate-product-images.js --pilot
//   node scripts/generate-product-images.js --slug=standard-business-cards,rigid-gift-boxes
//   node scripts/generate-product-images.js --all [--skip-existing]
//   node scripts/generate-product-images.js --apply --slug=a,b   (or --apply --all)
//   Optional: --model=gemini-3-pro-image   --concurrency=3
//
// Flow / manual workflow (no API key needed):
//   node scripts/generate-product-images.js --prompts        -> scripts/product-image-prompts.csv
//   node scripts/generate-product-images.js --import=~/Downloads/flow
//        picks up files named "<slug>.<ext>", "<NNN>.<ext>" or "<NNN>-<anything>.<ext>" (NNN = row # in the CSV)
//        and stages them as review samples; then run --apply.
//
// Needs GEMINI_API_KEY in .env.local (read here; never printed).

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SAMPLES_DIR = path.join(__dirname, "product-image-samples");
const PUBLIC_DIR = path.join(ROOT, "public/images/products");
const SIZE = 1000;
// Brand reference image sent with every request so the logo is reproduced, not re-invented.
const LOGO_BASE64 = fs.readFileSync(path.join(ROOT, "public/logo.png")).toString("base64");

const PILOT_SLUGS = [
  "standard-business-cards",
  "unisex-heavy-weight-t-shirt",
  "corrugated-mailer-boxes",
  "rigid-gift-boxes",
  "vinyl-die-cut-stickers",
];

function arg(name) {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes("=") ? hit.split("=").slice(1).join("=") : true;
}

function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  const line = fs.readFileSync(envPath, "utf8").split("\n").find((l) => l.startsWith("GEMINI_API_KEY="));
  return line ? line.slice("GEMINI_API_KEY=".length).trim().replace(/^["']|["']$/g, "") : undefined;
}

const catalog = require("../data/products.ts").products;
const meta = Object.fromEntries(
  JSON.parse(fs.readFileSync(path.join(ROOT, "products_list_data.json"), "utf8")).map((p) => [p.slug, p])
);

function buildPrompt(product) {
  const path_ = meta[product.slug]?.categoryPath ?? "";
  return [
    `Professional e-commerce studio product photograph of: ${product.name}.`,
    product.description,
    path_ ? `Product category: ${path_}.` : "",
    "Show the product exactly as it would be sold — complete, undistorted, in a flattering three-quarter hero angle, centered with generous empty margin around it.",
    "Background: clean seamless very light warm-grey (#F2F2F0). Lighting: soft diffused studio light with a gentle natural contact shadow. Realistic materials, print quality and paper/fabric texture.",
    "Branding: the attached image is the Outprint logo (a blue wordmark with a small coral bar under the 'O'). Print this logo faithfully on the product — on a business card, the card front; on a box, the lid or side panel; on apparel, the chest; on a sticker, the sticker face; on a bag, the front; and so on — sized and placed the way a real branded product would carry it.",
    "The only readable text anywhere in the image is the brand name 'Outprint', spelled exactly O-u-t-p-r-i-n-t. Do not invent any other words, names, phone numbers, emails or lorem ipsum. Keep the design otherwise clean and minimal, using white or light neutral materials so the blue logo stands out.",
    "No people, no hands, no watermark, no border or frame, no extra props competing with the product. Square 1:1 composition.",
  ]
    .filter(Boolean)
    .join(" ");
}

async function generate(product, { apiKey, model }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const body = {
    contents: [{ parts: [{ inlineData: { mimeType: "image/png", data: LOGO_BASE64 } }, { text: buildPrompt(product) }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "1:1" } },
  };

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${json.error?.message ?? "unknown error"}`);
      const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
      if (!part) {
        const reason = json.candidates?.[0]?.finishReason ?? json.promptFeedback?.blockReason ?? "no image returned";
        throw new Error(`No image (${reason})`);
      }
      return Buffer.from(part.inlineData.data, "base64");
    } catch (err) {
      lastError = err;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  throw lastError;
}

async function runPool(items, limit, worker) {
  const queue = [...items];
  const results = [];
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (queue.length) {
        const item = queue.shift();
        results.push(await worker(item));
      }
    })
  );
  return results;
}

async function main() {
  const wanted = arg("all")
    ? catalog.map((p) => p.slug)
    : arg("pilot")
      ? PILOT_SLUGS
      : String(arg("slug") || "").split(",").map((s) => s.trim()).filter(Boolean);

  if (!wanted.length && (arg("prompts") || arg("import") || arg("flow-message"))) wanted.push(...catalog.map((p) => p.slug));
  if (!wanted.length) {
    console.error("Pick products with --pilot, --all or --slug=a,b");
    process.exit(1);
  }
  const products = wanted.map((slug) => {
    const p = catalog.find((c) => c.slug === slug);
    if (!p) throw new Error(`Unknown product slug: ${slug}`);
    return p;
  });

  fs.mkdirSync(SAMPLES_DIR, { recursive: true });

  if (arg("prompts")) {
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [["#", "slug", "name", "category", "prompt"].map(esc).join(",")];
    products.forEach((p) => {
      const n = String(catalog.indexOf(p) + 1).padStart(3, "0");
      rows.push([n, p.slug, p.name, meta[p.slug]?.categoryPath ?? "", buildPrompt(p)].map(esc).join(","));
    });
    const out = path.join(__dirname, "product-image-prompts.csv");
    fs.writeFileSync(out, rows.join("\n") + "\n");
    console.log(`wrote ${products.length} prompts -> ${path.relative(ROOT, out)}`);
    return;
  }

  if (arg("flow-message")) {
    const count = Number(arg("flow-message")) || 6;
    // Numbers already generated in Flow but not yet imported are tracked in the done file.
    const doneFile = path.join(__dirname, "product-image-flow-done.txt");
    const done = new Set(fs.existsSync(doneFile) ? fs.readFileSync(doneFile, "utf8").split(/[\s,]+/).filter(Boolean) : []);
    const pending = catalog
      .filter((p) => !fs.existsSync(path.join(SAMPLES_DIR, `${p.slug}.png`)) && !done.has(String(catalog.indexOf(p) + 1).padStart(3, "0")))
      .slice(0, count);
    if (!pending.length) {
      console.log("Nothing pending: every product has a staged sample.");
      return;
    }
    const list = pending
      .map((p) => `(${String(catalog.indexOf(p) + 1).padStart(3, "0")}) ${p.name} - ${p.description}`)
      .join(" ");
    if (arg("compact")) {
      console.log(
        `Same style, branding and rules as before (attached Outprint logo printed faithfully on each product, the only readable text is 'Outprint', clean warm-grey studio background, three-quarter hero angle, no people/hands/props, square 1:1). Generate ${pending.length} separate images, each titled with its number and product name (e.g. '016 Standard Business Cards'). Products: ${list}`
      );
      console.error(`[${pending.length} pending: ${pending.map((p) => String(catalog.indexOf(p) + 1).padStart(3, "0")).join(", ")}]`);
      return;
    }
    console.log(
      `Generate ${pending.length} separate square (1:1) images, one per product below, all in the same style. Style for every image: professional e-commerce studio product photograph, flattering three-quarter hero angle, product complete and undistorted and centered with generous empty margin, clean seamless very light warm-grey background (#F2F2F0), soft diffused studio lighting with a gentle natural contact shadow, realistic materials and print quality. Branding: the attached image is the Outprint logo (a blue wordmark with a small coral bar under the 'O'). Print this logo faithfully on each product, sized and placed the way a real branded product would carry it (for example: card face, box lid, garment chest, sticker face, bag front, mug side, banner centre). The only readable text in any image is the brand name 'Outprint', spelled exactly O-u-t-p-r-i-n-t; do not invent any other words, names, phone numbers, emails or lorem ipsum. Keep designs clean and minimal using white or light neutral materials so the blue logo stands out. No people, no hands, no watermark, no border or frame, no extra props. Title each generated image with its number and product name, for example '016 Standard Business Cards'. Products: ${list}`
    );
    console.error(`[${pending.length} pending: ${pending.map((p) => String(catalog.indexOf(p) + 1).padStart(3, "0")).join(", ")}]`);
    return;
  }

  if (typeof arg("import") === "string") {
    const dir = path.resolve(String(arg("import")).replace(/^~/, process.env.HOME || "~"));
    const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
    let staged = 0;
    for (const p of products) {
      const n = String(catalog.indexOf(p) + 1).padStart(3, "0");
      const hit = files.find((f) => {
        const base = f.replace(/\.[^.]+$/, "").toLowerCase();
        return base === p.slug || base === n || new RegExp(`^${n}(?!\\d)`).test(base);
      });
      if (!hit) continue;
      await sharp(path.join(dir, hit)).resize(SIZE, SIZE, { fit: "cover" }).png().toFile(path.join(SAMPLES_DIR, `${p.slug}.png`));
      console.log(`staged ${p.slug}  <-  ${hit}`);
      staged++;
    }
    console.log(`\n${staged} staged in ${path.relative(ROOT, SAMPLES_DIR)}. Review them, then run --apply.`);
    return;
  }

  if (arg("apply")) {
    for (const p of products) {
      const src = path.join(SAMPLES_DIR, `${p.slug}.png`);
      if (!fs.existsSync(src)) {
        console.log(`skip   ${p.slug} (no sample)`);
        continue;
      }
      await sharp(src).resize(SIZE, SIZE, { fit: "cover" }).webp({ quality: 82 }).toFile(path.join(PUBLIC_DIR, `${p.slug}.webp`));
      console.log(`applied ${p.slug}`);
    }
    return;
  }

  const apiKey = loadApiKey();
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in environment or .env.local");
    process.exit(1);
  }
  const model = arg("model") || "gemini-3.1-flash-image";
  const concurrency = Number(arg("concurrency") || 3);
  const skipExisting = Boolean(arg("skip-existing"));

  let ok = 0;
  const failed = [];
  await runPool(products, concurrency, async (p) => {
    const out = path.join(SAMPLES_DIR, `${p.slug}.png`);
    if (skipExisting && fs.existsSync(out)) {
      console.log(`exists ${p.slug}`);
      return;
    }
    try {
      const raw = await generate(p, { apiKey, model });
      await sharp(raw).resize(SIZE, SIZE, { fit: "cover" }).png().toFile(out);
      ok++;
      console.log(`done   ${p.slug}`);
    } catch (err) {
      failed.push(p.slug);
      console.log(`FAILED ${p.slug}: ${err.message}`);
    }
  });
  console.log(`\n${ok}/${products.length} generated (${model}) -> ${path.relative(ROOT, SAMPLES_DIR)}`);
  if (failed.length) console.log(`Failed: ${failed.join(", ")}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
