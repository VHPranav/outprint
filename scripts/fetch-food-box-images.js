// Pexels search for the 8 new food-box products (replacing the generated
// mockups). Dry run only — writes image-review-data.json + a review grid;
// downloading happens in a separate pass after candidates are checked.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY");
  process.exit(1);
}

const PRODUCTS = [
  { slug: "gable-lunch-box", name: "Gable Lunch Box", primary: "gable box packaging", secondary: "kraft lunch box with handle" },
  { slug: "burger-box", name: "Burger Box", primary: "burger box packaging", secondary: "fast food burger box open" },
  { slug: "bento-meal-box", name: "Bento Meal Box", primary: "bento box takeout packaging", secondary: "meal prep box open" },
  { slug: "pillow-box", name: "Pillow Box", primary: "pillow box packaging", secondary: "favor box bakery treat" },
  { slug: "noodle-box", name: "Noodle Box", primary: "noodle box takeout container", secondary: "chinese takeout box" },
  { slug: "french-fries-box", name: "French Fries Box", primary: "french fries box packaging", secondary: "fries scoop container" },
  { slug: "hotdog-box", name: "Hotdog Box", primary: "hot dog box packaging", secondary: "hot dog tray paper" },
  { slug: "fried-chicken-box", name: "Fried Chicken Box", primary: "fried chicken box packaging", secondary: "chicken bucket box" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function pexelsSearch(query, attempt = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (res.status === 429 && attempt <= 3) {
    await sleep(2000 * attempt);
    return pexelsSearch(query, attempt + 1);
  }
  if (!res.ok) return { photos: [] };
  const data = await res.json();
  return { photos: data.photos || [] };
}

async function main() {
  const results = [];
  for (const p of PRODUCTS) {
    process.stderr.write(`${p.slug}...\n`);
    let usedQuery = p.primary;
    let result = await pexelsSearch(p.primary);
    if (!result.photos.length) {
      usedQuery = p.secondary;
      result = await pexelsSearch(p.secondary);
    }
    results.push({
      ...p,
      used_query: usedQuery,
      candidates: result.photos.map((ph) => ({
        pexels_id: ph.id,
        photographer: ph.photographer,
        page_url: ph.url,
        thumb: ph.src.medium,
        original: ph.src.original,
      })),
    });
    await sleep(200);
  }

  fs.writeFileSync(path.join(__dirname, "food-box-image-data.json"), JSON.stringify(results, null, 2));

  const cells = [];
  for (const r of results) {
    r.candidates.forEach((c, i) => {
      cells.push(`<div class="cell"><img src="${c.thumb}"><div class="lbl">${r.slug} c${i + 1}</div><div class="sub">${c.photographer}</div></div>`);
    });
  }
  const html = `<!DOCTYPE html><html><head><style>
body{background:#111;margin:0;padding:16px;font-family:sans-serif}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.cell{background:#1c1c1c;border-radius:6px;overflow:hidden}
.cell img{width:100%;height:130px;object-fit:cover;display:block}
.lbl{color:#fff;font-size:11px;padding:4px 6px 0}
.sub{color:#888;font-size:9px;padding:0 6px 4px}
</style></head><body><div class="grid">${cells.join("\n")}</div></body></html>`;
  fs.writeFileSync(path.join(ROOT, "food-box-review.html"), html);
  console.error("done");
}

main();
