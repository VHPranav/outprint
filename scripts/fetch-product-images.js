// PHASE A — dry run only. Queries the Pexels Search API for every product in
// product-image-sourcing-map.csv and writes image-review.html so candidates
// can be checked visually before anything is downloaded. Downloads nothing.
//
// Usage:
//   PEXELS_API_KEY=... node scripts/fetch-product-images.js
// (or rely on .env.local, which is loaded automatically below)

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CSV_PATH = path.join(__dirname, "product-image-sourcing-map.csv");
const OUT_HTML = path.join(ROOT, "image-review.html");
const OUT_JSON = path.join(__dirname, "image-review-data.json");

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
  console.error("Missing PEXELS_API_KEY (checked env and .env.local).");
  process.exit(1);
}

// --- tiny CSV parser (handles quoted fields with embedded commas) ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const raw = fs.readFileSync(CSV_PATH, "utf8");
const rows = parseCsv(raw).filter((r) => r.length > 1 && r[0] !== "");
const header = rows[0];
const records = rows.slice(1).map((r) => {
  const obj = {};
  header.forEach((h, i) => (obj[h] = r[i] || ""));
  return obj;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pexelsSearch(query, attempt = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=3`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (res.status === 429 && attempt <= 3) {
    await sleep(2000 * attempt);
    return pexelsSearch(query, attempt + 1);
  }
  if (!res.ok) {
    return { error: `HTTP ${res.status}`, photos: [] };
  }
  const data = await res.json();
  return { photos: data.photos || [] };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const results = [];
  const flagged = [];

  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    process.stderr.write(
      `[${i + 1}/${records.length}] ${rec.id} ${rec.product_name}\n`
    );

    let usedQuery = rec.primary_query;
    let usedField = "primary_query";
    let result = await pexelsSearch(rec.primary_query);

    if (!result.photos.length) {
      await sleep(200);
      usedQuery = rec.secondary_query;
      usedField = "secondary_query";
      result = await pexelsSearch(rec.secondary_query);
    }

    if (!result.photos.length) {
      flagged.push(rec);
    }

    results.push({
      ...rec,
      used_query: usedQuery,
      used_field: usedField,
      candidates: result.photos.slice(0, 3).map((p) => ({
        pexels_id: p.id,
        photographer: p.photographer,
        page_url: p.url,
        thumb: p.src.medium,
        original: p.src.original,
        landscape: p.src.landscape,
      })),
    });

    await sleep(200); // stay well under Pexels rate limits
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));

  const html = buildHtml(results, flagged);
  fs.writeFileSync(OUT_HTML, html);

  console.error(
    `\nDone. ${records.length} products checked, ${flagged.length} flagged (no results on either query).`
  );
  console.error(`Review file: ${OUT_HTML}`);
  console.error(`Raw data:    ${OUT_JSON}`);
}

function buildHtml(results, flagged) {
  const cards = results
    .map((r) => {
      const isFlagged = r.candidates.length === 0;
      const candidateHtml = r.candidates
        .map(
          (c, idx) => `
        <a class="candidate" href="${escapeHtml(
          c.page_url
        )}" target="_blank" rel="noopener noreferrer">
          <img loading="lazy" src="${escapeHtml(c.thumb)}" alt="candidate ${idx + 1}">
          <div class="candidate-meta">
            <span class="candidate-num">#${idx + 1}</span>
            <span>Pexels ID ${c.pexels_id}</span>
            <span>by ${escapeHtml(c.photographer)}</span>
          </div>
        </a>`
        )
        .join("");

      return `
      <div class="card ${isFlagged ? "flagged" : ""}" id="p-${escapeHtml(r.id)}">
        <div class="card-head">
          <span class="pid">#${escapeHtml(r.id)}</span>
          <h3>${escapeHtml(r.product_name)}</h3>
          <span class="cat">${escapeHtml(r.category)} &rsaquo; ${escapeHtml(
        r.subcategory
      )}</span>
        </div>
        <div class="meta-row">
          <span class="query-used">query used: <code>${escapeHtml(
            r.used_query
          )}</code> (${r.used_field === "primary_query" ? "primary" : "secondary fallback"})</span>
          <span class="notes">${escapeHtml(r.visual_notes)}</span>
          <span class="target">→ ${escapeHtml(r.target_filename)}</span>
        </div>
        ${
          isFlagged
            ? `<div class="flag-banner">NO RESULTS on either query — needs manual sourcing.</div>`
            : `<div class="candidates">${candidateHtml}</div>`
        }
      </div>`;
    })
    .join("\n");

  const flaggedList = flagged
    .map(
      (r) =>
        `<li><a href="#p-${escapeHtml(r.id)}">#${escapeHtml(r.id)} ${escapeHtml(
          r.product_name
        )}</a></li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Outprint — Product Image Review (Phase A)</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #111; color: #eee; margin: 0; padding: 24px 32px 80px;
  }
  h1 { font-size: 20px; margin-bottom: 4px; }
  .sub { color: #999; font-size: 13px; margin-bottom: 20px; }
  .summary { background: #1c1c1c; border: 1px solid #333; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
  .summary h2 { font-size: 14px; margin: 0 0 8px; color: #f88; }
  .summary ul { margin: 0; padding-left: 20px; font-size: 13px; }
  .summary a { color: #f88; }
  .grid { display: flex; flex-direction: column; gap: 14px; }
  .card { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 14px 18px; }
  .card.flagged { border-color: #663; background: #221c14; }
  .card-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .pid { font-size: 12px; color: #666; font-variant-numeric: tabular-nums; }
  .card-head h3 { font-size: 15px; margin: 0; }
  .cat { font-size: 12px; color: #888; }
  .meta-row { display: flex; gap: 18px; flex-wrap: wrap; font-size: 11.5px; color: #999; margin: 6px 0 10px; }
  .meta-row code { background: #262626; padding: 1px 5px; border-radius: 4px; color: #ddd; }
  .target { color: #6a6; }
  .candidates { display: flex; gap: 10px; flex-wrap: wrap; }
  .candidate { display: block; width: 160px; text-decoration: none; color: #ccc; background: #0e0e0e; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; }
  .candidate:hover { border-color: #555; }
  .candidate img { width: 100%; height: 110px; object-fit: cover; display: block; background: #000; }
  .candidate-meta { padding: 6px 8px; font-size: 10.5px; display: flex; flex-direction: column; gap: 2px; }
  .candidate-num { font-weight: 700; color: #fff; }
  .flag-banner { background: #3a2412; color: #f2a545; border: 1px dashed #7a4a12; border-radius: 6px; padding: 8px 12px; font-size: 12.5px; }
</style>
</head>
<body>
  <h1>Outprint — Product Image Review (Phase A dry run)</h1>
  <p class="sub">${results.length} products · Pexels API · no downloads yet. Click any thumbnail to open its Pexels page. Tell me the candidate # (or "none") per product id.</p>

  ${
    flagged.length
      ? `<div class="summary"><h2>${flagged.length} product(s) with zero results on both queries</h2><ul>${flaggedList}</ul></div>`
      : ""
  }

  <div class="grid">
    ${cards}
  </div>
</body>
</html>`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
