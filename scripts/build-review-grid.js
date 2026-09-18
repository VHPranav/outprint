// Compact grid of candidate #1 thumbnails for every product NOT already
// resolved (business cards -> generator, banners -> deferred, #002/#135 ->
// resolved individually). Used to eyeball ~94 products quickly for misses.
const fs = require("fs");
const path = require("path");

const DATA = require("./image-review-data.json");

const CARD_IDS = new Set([
  "010","011","012","016","017","018","019","020","021","022","023","024",
  "025","026","027","028","029","030","031","032","033",
]);
const BANNER_IDS = new Set([
  "013","014","015","080","081","082","083","084","085","086","087","088",
  "089","090","091","092","093","094",
]);
const RESOLVED_IDS = new Set(["002", "135"]);

const remaining = DATA.filter(
  (r) => !CARD_IDS.has(r.id) && !BANNER_IDS.has(r.id) && !RESOLVED_IDS.has(r.id)
);

const cards = remaining
  .map((r) => {
    const c1 = r.candidates[0];
    if (!c1) return `<div class="cell noresult"><div class="lbl">#${r.id} ${r.product_name}</div><div class="sub">NO CANDIDATES</div></div>`;
    return `<div class="cell" id="p-${r.id}">
      <img loading="lazy" src="${c1.thumb}">
      <div class="lbl">#${r.id} ${r.product_name}</div>
      <div class="sub">${r.category} &rsaquo; ${r.subcategory}</div>
    </div>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Review grid</title>
<style>
  body { background:#111; margin:0; padding:16px; font-family:sans-serif; }
  .grid { display:grid; grid-template-columns:repeat(8,1fr); gap:8px; }
  .cell { background:#1c1c1c; border-radius:6px; overflow:hidden; }
  .cell img { width:100%; height:100px; object-fit:cover; display:block; background:#000; }
  .lbl { color:#fff; font-size:10px; padding:3px 5px 0; line-height:1.2; }
  .sub { color:#888; font-size:8.5px; padding:0 5px 4px; }
  .noresult { background:#3a1c1c; padding:8px; }
</style></head>
<body><div class="grid">${cards}</div></body></html>`;

fs.writeFileSync(path.join(__dirname, "..", "review-grid.html"), html);
console.error(`${remaining.length} products in grid.`);
