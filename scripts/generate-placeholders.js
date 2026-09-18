// Clearly-labeled placeholder for products where neither Pexels nor Unsplash
// search returned an honest match. Not a stock photo — a flat, on-brand
// "photo pending" card so nothing misleading ships to the storefront.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "..", "public/images/products");

const PRODUCTS = [
  { slug: "mesh-windproof-banners", name: "Mesh Windproof Banners" },
  { slug: "retractable-banner-stands", name: "Retractable Banner Stands" },
  { slug: "roll-up-banner-85x200cm", name: "Roll-Up Banner 85x200cm" },
  { slug: "premium-roll-up-banner", name: "Premium Roll-Up Banner" },
  { slug: "custom-printed-banners", name: "Custom Printed Banners" },
  { slug: "backdrop-banner", name: "Backdrop Banner" },
  { slug: "pop-up-banner-hardcase-straight", name: "Pop-Up Banner Hardcase" },
];

function svg(name) {
  return `<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1000" fill="#F4F2EE"/>
    <rect x="60" y="60" width="880" height="880" rx="28" fill="none" stroke="#D8D4CB" stroke-width="2" stroke-dasharray="10 10"/>
    <g transform="translate(500,430)" stroke="#B9B4A8" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
      <rect x="-70" y="-50" width="140" height="100" rx="10"/>
      <circle cx="0" cy="0" r="28"/>
      <rect x="-24" y="-68" width="48" height="22" rx="4"/>
    </g>
    <text x="500" y="560" font-family="-apple-system,Helvetica Neue,Arial,sans-serif" font-size="26" font-weight="600" fill="#5B584F" text-anchor="middle">Photo sourcing pending</text>
    <text x="500" y="598" font-family="-apple-system,Helvetica Neue,Arial,sans-serif" font-size="19" fill="#8A8578" text-anchor="middle">${name.replace(/&/g, "&amp;")}</text>
  </svg>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  for (const p of PRODUCTS) {
    const outPath = path.join(OUT_DIR, `${p.slug}.webp`);
    await sharp(Buffer.from(svg(p.name))).webp({ quality: 90 }).toFile(outPath);
    console.error(`wrote ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
