// One-time asset generator for the 8 new food-box products. Same approach as
// generate-card-mockups.ts: a flat front-facing silhouette (via clip-path)
// rendered with Playwright, one consistent fictional brand ("Crave & Co.")
// across every box, differentiated by shape/stock color/label — not
// anatomically exact packaging renders, just an honest placeholder mockup.

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/products");
const SAMPLES_DIR = path.join(ROOT, "scripts/box-mockup-samples");

const STAGE = 1000;
const SCALE = 2;

type Shape = "gable" | "clamshell" | "bento" | "pillow" | "pail" | "scoop" | "tray" | "bucket";

interface BoxConfig {
  slug: string;
  shape: Shape;
  bg: string;
  textColor: string;
  accentColor: string;
  label: string;
  handle?: boolean;
}

const RED = "#C1382E";
const KRAFT = "#C9A876";
const KRAFT_TEXT = "#3A2A18";

const BOXES: BoxConfig[] = [
  { slug: "gable-lunch-box", shape: "gable", bg: KRAFT, textColor: KRAFT_TEXT, accentColor: RED, label: "LUNCH BOX" },
  { slug: "burger-box", shape: "clamshell", bg: "#FFFFFF", textColor: "#141414", accentColor: RED, label: "BURGER" },
  { slug: "bento-meal-box", shape: "bento", bg: KRAFT, textColor: KRAFT_TEXT, accentColor: RED, label: "MEAL BOX" },
  { slug: "pillow-box", shape: "pillow", bg: "#FFFFFF", textColor: "#141414", accentColor: RED, label: "SWEET TREATS" },
  { slug: "noodle-box", shape: "pail", bg: "#FFFFFF", textColor: "#141414", accentColor: RED, label: "NOODLES", handle: true },
  { slug: "french-fries-box", shape: "scoop", bg: RED, textColor: "#FFFFFF", accentColor: "#FFFFFF", label: "FRIES" },
  { slug: "hotdog-box", shape: "tray", bg: KRAFT, textColor: KRAFT_TEXT, accentColor: RED, label: "HOT DOG" },
  { slug: "fried-chicken-box", shape: "bucket", bg: RED, textColor: "#FFFFFF", accentColor: "#FFFFFF", label: "CHICKEN", handle: true },
];

const SAMPLE_SLUGS = ["gable-lunch-box", "noodle-box", "fried-chicken-box"];

function shapeGeometry(shape: Shape): { w: number; h: number; clipPath: string; radius?: string } {
  switch (shape) {
    case "gable": {
      const w = 420, roof = 90, body = 320, total = roof + body;
      const roofPct = (roof / total) * 100;
      return { w, h: total, clipPath: `polygon(50% 0%, 100% ${roofPct}%, 100% 100%, 0% 100%, 0% ${roofPct}%)` };
    }
    case "clamshell":
      return { w: 440, h: 330, clipPath: "none", radius: "56px" };
    case "bento":
      return { w: 480, h: 300, clipPath: "none", radius: "34px" };
    case "pillow":
      return { w: 420, h: 320, clipPath: "none", radius: "150px" };
    case "pail":
      return { w: 380, h: 420, clipPath: "polygon(0% 0%, 100% 0%, 84% 100%, 16% 100%)" };
    case "scoop":
      return { w: 320, h: 460, clipPath: "polygon(4% 0%, 96% 0%, 72% 100%, 28% 100%)" };
    case "tray":
      return { w: 480, h: 220, clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)" };
    case "bucket":
      return { w: 440, h: 380, clipPath: "polygon(2% 0%, 98% 0%, 82% 100%, 18% 100%)" };
  }
}

function renderBoxHtml(cfg: BoxConfig): string {
  const { w, h, clipPath, radius } = shapeGeometry(cfg.shape);
  const badgeSize = Math.round(w * 0.14);
  const wordmarkSize = Math.round(w * 0.072);
  const labelSize = Math.round(w * 0.05);
  const isTray = cfg.shape === "tray";
  const contentTop = isTray ? "50%" : cfg.shape === "pail" || cfg.shape === "scoop" || cfg.shape === "bucket" ? "38%" : "50%";

  const handle = cfg.handle
    ? `<div class="handle" style="border-color:${cfg.textColor};"></div>`
    : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:${STAGE}px; height:${STAGE}px; background:#F4F2EE; }
  body { display:flex; align-items:center; justify-content:center; font-family:-apple-system, "Helvetica Neue", Arial, sans-serif; }
  .wrap {
    position:relative; width:${w}px; height:${h}px;
    filter: drop-shadow(0 18px 30px rgba(20,16,10,0.32)) drop-shadow(0 5px 10px rgba(20,16,10,0.14));
  }
  .handle {
    position:absolute; left:50%; top:-46px; width:${Math.round(w * 0.5)}px; height:90px;
    border: 7px solid; border-bottom:none; border-radius:999px 999px 0 0;
    transform: translateX(-50%); opacity:0.85;
  }
  .box {
    position:relative; width:100%; height:100%; overflow:hidden;
    background:${cfg.bg}; color:${cfg.textColor};
    ${radius ? `border-radius:${radius};` : ""}
    ${clipPath !== "none" ? `clip-path:${clipPath};` : ""}
  }
  .box::after {
    content:""; position:absolute; inset:0; pointer-events:none;
    background-image: linear-gradient(115deg, rgba(255,255,255,0.16) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.05) 100%);
  }
  .content {
    position:absolute; left:0; right:0; top:${contentTop}; transform:translateY(-50%);
    display:flex; flex-direction:column; align-items:center; text-align:center;
  }
  .badge {
    width:${badgeSize}px; height:${badgeSize}px; border-radius:50%;
    background:${cfg.accentColor}; color:${cfg.bg};
    display:flex; align-items:center; justify-content:center;
    font-weight:800; font-size:${Math.round(badgeSize * 0.52)}px;
  }
  .wordmark {
    margin-top:${Math.round(w * 0.045)}px; font-weight:800; letter-spacing:0.06em;
    font-size:${wordmarkSize}px; white-space:nowrap;
  }
  .label {
    margin-top:${Math.round(w * 0.02)}px; font-weight:600; letter-spacing:0.12em;
    font-size:${labelSize}px; color:${cfg.accentColor};
  }
</style></head>
<body>
  <div class="wrap">
    ${handle}
    <div class="box">
      <div class="content">
        <div class="badge">C</div>
        <div class="wordmark">CRAVE &amp; CO.</div>
        <div class="label">${cfg.label}</div>
      </div>
    </div>
  </div>
</body></html>`;
}

async function renderOne(browser: any, cfg: BoxConfig, outPath: string) {
  const page = await browser.newPage({
    viewport: { width: STAGE, height: STAGE },
    deviceScaleFactor: SCALE,
  });
  await page.setContent(renderBoxHtml(cfg), { waitUntil: "networkidle" });
  const pngBuffer = await page.screenshot({ type: "png" });
  await page.close();

  await sharp(pngBuffer).resize(STAGE, STAGE).webp({ quality: 92 }).toFile(outPath);
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const slugArg = args.find((a) => a.startsWith("--slug="));
  const singleSlug = slugArg ? slugArg.split("=")[1] : null;

  let targets: BoxConfig[];
  let outDir: string;

  if (singleSlug) {
    const cfg = BOXES.find((b) => b.slug === singleSlug);
    if (!cfg) throw new Error(`Unknown slug: ${singleSlug}`);
    targets = [cfg];
    outDir = SAMPLES_DIR;
  } else if (all) {
    targets = BOXES;
    outDir = OUT_DIR;
  } else {
    targets = BOXES.filter((b) => SAMPLE_SLUGS.includes(b.slug));
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
