// One-time asset generator for the business-card product line, replacing the
// failed stock-photo matches. Renders an HTML/CSS card template with
// Playwright (one config per SKU, same fictional brand throughout), then
// crops/pads it onto a neutral square backdrop with sharp and writes WebP.
//
// Usage:
//   node scripts/generate-card-mockups.ts            # sample set (4 cards)
//   node scripts/generate-card-mockups.ts --all       # full batch (21 cards)
//   node scripts/generate-card-mockups.ts --slug=xyz  # single card by slug

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/products");
const SAMPLES_DIR = path.join(ROOT, "scripts/card-mockup-samples");

const STAGE = 1000; // final square canvas, px
const SCALE = 2; // supersample factor for crisp edges after downscale

type Shape = "rect" | "square" | "circle" | "oval" | "custom";
type Finish =
  | "none"
  | "soft-sheen"
  | "textured-lines"
  | "pearlescent-gradient"
  | "speckled"
  | "gloss-highlight"
  | "colored-edge"
  | "thick-edge";

interface CardConfig {
  slug: string;
  bg: string; // any valid CSS `background` value (color or gradient)
  textColor: string;
  accentColor: string;
  shape: Shape;
  finish: Finish;
  badge?: string;
  highlightTarget?: "full" | "logo";
  centerOnly?: boolean; // circle: drop contact line, center logo+name
  deboss?: boolean; // letterpress: dual-tone shadow on text
}

const EMERALD = "#0F5D3F";

const CARDS: CardConfig[] = [
  { slug: "standard-matte-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "rect", finish: "none" },
  { slug: "premium-suede-business-cards", bg: "#F7F5F2", textColor: "#141414", accentColor: "#3A3A3A", shape: "rect", finish: "soft-sheen" },
  { slug: "letterpress-cotton-business-cards", bg: "#F1ECE1", textColor: "#2B2014", accentColor: "#2B2014", shape: "rect", finish: "textured-lines", deboss: true },
  { slug: "standard-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "rect", finish: "none" },
  { slug: "express-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "rect", finish: "none", badge: "24H" },
  { slug: "velvet-laminated-cards", bg: "#F7F5F2", textColor: "#141414", accentColor: "#5B2A4A", shape: "rect", finish: "soft-sheen" },
  { slug: "textured-business-cards", bg: "#F5F2ED", textColor: "#141414", accentColor: "#141414", shape: "rect", finish: "textured-lines" },
  { slug: "pearl-shimmer-cards", bg: "linear-gradient(135deg, #F6D9E4 0%, #E4D7F0 50%, #D7E4F3 100%)", textColor: "#141414", accentColor: "#141414", shape: "rect", finish: "pearlescent-gradient" },
  { slug: "smooth-white-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: "#141414", shape: "rect", finish: "none" },
  { slug: "brown-kraft-business-cards", bg: "#C4A47C", textColor: "#281C12", accentColor: "#281C12", shape: "rect", finish: "none" },
  { slug: "waterproof-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: "#1E5FA8", shape: "rect", finish: "gloss-highlight", highlightTarget: "full" },
  { slug: "eco-friendly-cards", bg: "#F3F1EA", textColor: "#141414", accentColor: "#3A6B35", shape: "rect", finish: "speckled" },
  { slug: "spot-uv-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: "#141414", shape: "rect", finish: "gloss-highlight", highlightTarget: "logo" },
  { slug: "white-ink-black-cards", bg: "#141414", textColor: "#F5F5F5", accentColor: "#F5F5F5", shape: "rect", finish: "none" },
  { slug: "gold-foil-black-cards", bg: "#121212", textColor: "#F0F0F0", accentColor: "#C49B54", shape: "rect", finish: "none" },
  { slug: "double-pasted-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: "#141414", shape: "rect", finish: "thick-edge" },
  { slug: "triplex-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: "#8C2B2B", shape: "rect", finish: "colored-edge" },
  { slug: "square-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "square", finish: "none" },
  { slug: "circle-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "circle", finish: "none", centerOnly: true },
  { slug: "oval-shaped-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "oval", finish: "none" },
  { slug: "any-shape-die-cut-business-cards", bg: "#FFFFFF", textColor: "#141414", accentColor: EMERALD, shape: "custom", finish: "none" },
];

// Sample set shown for approval before the full batch runs: covers a plain
// card, a shaped card, a dark/foil card, and a strong background effect.
const SAMPLE_SLUGS = [
  "standard-matte-business-cards",
  "pearl-shimmer-cards",
  "circle-business-cards",
  "gold-foil-black-cards",
];

function shapeSize(shape: Shape): { w: number; h: number } {
  switch (shape) {
    case "square":
      return { w: 420, h: 420 };
    case "circle":
      return { w: 420, h: 420 };
    case "oval":
      return { w: 560, h: 380 };
    case "custom":
      return { w: 640, h: 400 };
    case "rect":
    default:
      return { w: 640, h: 366 };
  }
}

function shapeCss(shape: Shape, w: number, h: number): string {
  switch (shape) {
    case "circle":
      return "border-radius: 50%;";
    case "oval":
      return "border-radius: 50%;";
    case "square":
      return "border-radius: 18px;";
    case "custom": {
      const c = Math.round(w * 0.09);
      return `clip-path: polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px); border-radius: 6px;`;
    }
    case "rect":
    default:
      return "border-radius: 16px;";
  }
}

function finishOverlayCss(cfg: CardConfig): string {
  switch (cfg.finish) {
    case "soft-sheen":
      return `background-image: linear-gradient(120deg, transparent 38%, rgba(255,255,255,0.4) 50%, transparent 62%);`;
    case "textured-lines":
      return `background-image: repeating-linear-gradient(115deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 7px);`;
    case "pearlescent-gradient":
      return `background-image: linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%);`;
    case "speckled":
      return `background-image: radial-gradient(rgba(60,45,20,0.16) 1px, transparent 1.4px), radial-gradient(rgba(60,45,20,0.12) 1px, transparent 1.4px); background-size: 9px 9px, 13px 13px; background-position: 0 0, 5px 7px;`;
    case "gloss-highlight":
      if (cfg.highlightTarget === "logo") return "";
      return `background-image: linear-gradient(100deg, transparent 25%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.15) 58%, transparent 72%);`;
    default:
      return "";
  }
}

function renderCardHtml(cfg: CardConfig): string {
  const { w, h } = shapeSize(cfg.shape);
  const pad = Math.round(w * (cfg.shape === "oval" ? 0.15 : 0.085));
  const logoSize = Math.round(w * 0.085);
  const wordmarkSize = Math.round(w * 0.042);
  const nameSize = Math.round(w * 0.054);
  const titleSize = Math.round(w * 0.033);
  const contactSize = Math.round(w * 0.026);
  const centerOnly = !!cfg.centerOnly;

  const overlay = finishOverlayCss(cfg);
  const logoHighlight =
    cfg.finish === "gloss-highlight" && cfg.highlightTarget === "logo"
      ? `<div class="logo-gloss"></div>`
      : "";

  const thickEdgePad = cfg.finish === "thick-edge" ? Math.round(w * 0.022) : 0;

  const coloredEdge =
    cfg.finish === "colored-edge"
      ? `<div class="edge-stripe" style="background:${cfg.accentColor};"></div>`
      : "";

  const badge = cfg.badge
    ? `<div class="badge" style="background:${cfg.accentColor}; color:${cfg.bg.startsWith("#") ? cfg.bg : "#fff"};">${cfg.badge}</div>`
    : "";

  const debossStyle = cfg.deboss
    ? `text-shadow: 0 1px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(0,0,0,0.3);`
    : "";

  const contactLine = centerOnly
    ? ""
    : `<div class="contact" style="font-size:${contactSize}px;">hello@studioandnorth.com&nbsp;&nbsp;&middot;&nbsp;&nbsp;+1 (555) 019-2044</div>`;

  const divider = centerOnly
    ? ""
    : `<div class="divider" style="background:${cfg.textColor};"></div>`;

  const infoBlockClass = centerOnly ? "info-block centered" : "info-block";
  const brandRowClass = centerOnly ? "brand-row centered" : "brand-row";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:${STAGE}px; height:${STAGE}px; background:#F4F2EE; }
  body { display:flex; align-items:center; justify-content:center; font-family:-apple-system, "Helvetica Neue", Arial, sans-serif; }
  .card-edge {
    width:${w}px; height:${h}px;
    padding:${thickEdgePad}px;
    background:${thickEdgePad ? "#E4E1DA" : "transparent"};
    border-radius:${cfg.shape === "circle" || cfg.shape === "oval" ? "50%" : cfg.shape === "square" ? "18px" : "16px"};
    box-shadow: 0 22px 46px -12px rgba(20,16,10,0.32), 0 6px 14px rgba(20,16,10,0.14);
  }
  .card {
    position:relative; width:100%; height:100%; overflow:hidden;
    background:${cfg.bg}; color:${cfg.textColor};
    ${shapeCss(cfg.shape, w, h)}
  }
  .card::after {
    content:""; position:absolute; inset:0; pointer-events:none;
    ${overlay}
  }
  .brand-row { position:absolute; top:${pad}px; left:${pad}px; display:flex; align-items:center; gap:${Math.round(w*0.025)}px; }
  .brand-row.centered { position:static; margin-top:${Math.round(h*0.22)}px; flex-direction:column; left:auto; top:auto; width:100%; align-items:center; }
  .logomark { position:relative; }
  .wordmark { font-weight:700; letter-spacing:0.14em; font-size:${wordmarkSize}px; white-space:nowrap; }
  .brand-row.centered .wordmark { margin-top:${Math.round(h*0.05)}px; }
  .badge {
    position:absolute; top:${pad}px; right:${pad}px; font-size:${Math.round(w*0.03)}px; font-weight:700;
    padding:${Math.round(w*0.014)}px ${Math.round(w*0.024)}px; border-radius:999px; letter-spacing:0.04em;
  }
  .divider { width:${Math.round(w * 0.42)}px; height:1px; opacity:0.22; margin-bottom:${Math.round(h*0.045)}px; }
  .info-block { position:absolute; left:${pad}px; bottom:${pad}px; display:flex; flex-direction:column; align-items:flex-start; }
  .info-block.centered { position:static; align-items:center; text-align:center; margin-top:${Math.round(h*0.04)}px; }
  .info-block.centered .divider { margin-left:auto; margin-right:auto; }
  .name { font-weight:700; font-size:${nameSize}px; ${debossStyle} }
  .title { font-size:${titleSize}px; color:${cfg.accentColor}; letter-spacing:0.05em; margin-top:${Math.round(h*0.018)}px; }
  .contact { opacity:0.72; margin-top:${Math.round(h*0.03)}px; }
  .edge-stripe { position:absolute; left:0; right:0; bottom:0; height:${Math.round(h*0.045)}px; }
  .logo-gloss {
    position:absolute; top:${-Math.round(w*0.02)}px; left:${-Math.round(w*0.02)}px;
    width:${logoSize + Math.round(w*0.04)}px; height:${logoSize + Math.round(w*0.04)}px; border-radius:50%;
    background: radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.1) 45%, transparent 60%);
    box-shadow: 0 0 0 1px rgba(20,20,20,0.08), inset 0 0 ${Math.round(w*0.01)}px rgba(20,20,20,0.05);
    pointer-events:none;
  }
</style></head>
<body>
  <div class="card-edge">
    <div class="card">
      ${badge}
      ${coloredEdge}
      <div class="${brandRowClass}">
        <div class="logomark">
          ${logoHighlight}
          <svg width="${logoSize}" height="${logoSize}" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="17" fill="none" stroke="${cfg.accentColor}" stroke-width="2.5"/>
            <circle cx="20" cy="20" r="6" fill="${cfg.accentColor}"/>
          </svg>
        </div>
        <div class="wordmark">STUDIO &amp; NORTH</div>
      </div>
      <div class="${infoBlockClass}">
        ${divider}
        <div class="name" style="font-size:${nameSize}px;">Alex Morgan</div>
        <div class="title" style="font-size:${titleSize}px;">Creative Director</div>
        ${contactLine}
      </div>
    </div>
  </div>
</body></html>`;
}

async function renderOne(browser: any, cfg: CardConfig, outPath: string) {
  const page = await browser.newPage({
    viewport: { width: STAGE, height: STAGE },
    deviceScaleFactor: SCALE,
  });
  await page.setContent(renderCardHtml(cfg), { waitUntil: "networkidle" });
  const pngBuffer = await page.screenshot({ type: "png" });
  await page.close();

  await sharp(pngBuffer)
    .resize(STAGE, STAGE)
    .webp({ quality: 92 })
    .toFile(outPath);
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const slugArg = args.find((a) => a.startsWith("--slug="));
  const singleSlug = slugArg ? slugArg.split("=")[1] : null;

  let targets: CardConfig[];
  let outDir: string;

  if (singleSlug) {
    const cfg = CARDS.find((c) => c.slug === singleSlug);
    if (!cfg) throw new Error(`Unknown slug: ${singleSlug}`);
    targets = [cfg];
    outDir = SAMPLES_DIR;
  } else if (all) {
    targets = CARDS;
    outDir = OUT_DIR;
  } else {
    targets = CARDS.filter((c) => SAMPLE_SLUGS.includes(c.slug));
    outDir = SAMPLES_DIR;
  }

  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  for (const cfg of targets) {
    const outPath = path.join(outDir, `${cfg.slug}.webp`);
    await renderOne(browser, cfg, outPath);
    console.error(`wrote ${outPath}`);
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
