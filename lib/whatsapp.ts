// Shared "submit to us" utility. Every flow that hands off to a human on
// WhatsApp (product configurator, hire-a-designer form, cart) builds a
// payload describing what happened and turns it into a wa.me deep link here
// — so the message format only needs to be right in one place.

import { formatCurrency } from "./currency";

const BUSINESS_NUMBER_ENV = "NEXT_PUBLIC_WHATSAPP_NUMBER";

export interface ProductOrderSelections {
  shape?: string;
  size?: string;
  quantity: number;
  material?: string;
  addons?: string[];
}

export interface ProductOrderPayload {
  type: "product-order";
  productName: string;
  selections: ProductOrderSelections;
  unitPrice: number;
  totalPrice: number;
  designFileUrl?: string;
  customerName?: string;
  notes?: string;
}

export interface DesignRequestPayload {
  type: "design-request";
  customerName: string;
  contact: string;
  /** What they're designing — a category name, or "Not sure yet". */
  category?: string;
  /** The specific product the request started from (e.g. arrived via a product page's "Hire a Designer" tile). */
  productContext?: string;
  projectDescription: string;
  styleTags?: string[];
  referenceFileUrls?: string[];
  packageTier: string;
  turnaround: string;
  price: number;
}

export interface CartItem {
  productName: string;
  selections: ProductOrderSelections;
  totalPrice: number;
  designFileUrl?: string;
}

export interface CartPayload {
  type: "cart";
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  customerName?: string;
}

export interface GeneralInquiryPayload {
  type: "general-inquiry";
  message?: string;
}

export type WhatsAppPayload =
  | ProductOrderPayload
  | DesignRequestPayload
  | CartPayload
  | GeneralInquiryPayload;

/** Renders "Label: value" only when value is present, so optional fields never leave blank lines. */
function line(label: string, value?: string | number | null): string | null {
  if (value === undefined || value === null || value === "") return null;
  return `${label}: ${value}`;
}

/** Joins a title with its non-empty lines; returns "" (dropped later) if every line was empty. */
function section(title: string, lines: Array<string | null>): string {
  const filtered = lines.filter((entry): entry is string => Boolean(entry));
  if (!filtered.length) return "";
  return [title, ...filtered].join("\n");
}

function formatSelectionLines(selections: ProductOrderSelections): Array<string | null> {
  return [
    line("Shape", selections.shape),
    line("Size", selections.size),
    line("Quantity", selections.quantity),
    line("Material", selections.material),
    line("Add-ons", selections.addons?.length ? selections.addons.join(", ") : undefined),
  ];
}

function buildProductOrderMessage(payload: ProductOrderPayload): string {
  const sections = [
    "Hi Outprint! I'd like to order:",
    section("📦 Order Details", [
      line("Product", payload.productName),
      ...formatSelectionLines(payload.selections),
    ]),
    section("💰 Pricing", [
      line("Unit Price", formatCurrency(payload.unitPrice)),
      line("Total", formatCurrency(payload.totalPrice)),
    ]),
    section("🎨 Design File", [line("Link", payload.designFileUrl)]),
    section("👤 Contact", [line("Name", payload.customerName)]),
    section("📝 Notes", [payload.notes ?? null]),
  ];

  return sections.filter(Boolean).join("\n\n");
}

function buildDesignRequestMessage(payload: DesignRequestPayload): string {
  const sections = [
    "Hi Outprint! I'd like to hire a designer for a new project.",
    section("🙋 Contact", [
      line("Name", payload.customerName),
      line("Contact", payload.contact),
    ]),
    section("🗂️ Project", [
      line("Category", payload.category),
      line("Related product", payload.productContext),
      line("Style", payload.styleTags?.length ? payload.styleTags.join(", ") : undefined),
    ]),
    section("📝 Brief", [payload.projectDescription]),
    section(
      "🔗 Reference Files",
      payload.referenceFileUrls?.length ? payload.referenceFileUrls : [null]
    ),
    section("📦 Package", [
      line("Tier", payload.packageTier),
      line("Turnaround", payload.turnaround),
      line("Price", formatCurrency(payload.price)),
    ]),
  ];

  return sections.filter(Boolean).join("\n\n");
}

function buildCartMessage(payload: CartPayload): string {
  const itemLines = payload.items.map((item, index) => {
    const details = [
      line("Qty", item.selections.quantity),
      line("Material", item.selections.material),
      line("Size", item.selections.size),
      line("Shape", item.selections.shape),
      line("Add-ons", item.selections.addons?.length ? item.selections.addons.join(", ") : undefined),
    ]
      .filter(Boolean)
      .join(" • ");

    const fileLine = item.designFileUrl ? `\n   Design file: ${item.designFileUrl}` : "";

    return `${index + 1}. ${item.productName}\n   ${details}\n   Subtotal: ${formatCurrency(
      item.totalPrice
    )}${fileLine}`;
  });

  const sections = [
    "Hi Outprint! I'd like to place an order for multiple items:",
    section("👤 Contact", [line("Name", payload.customerName)]),
    section("🛒 Cart Items", itemLines),
    section("💰 Total", [
      line("Subtotal", formatCurrency(payload.subtotal)),
      line("GST", formatCurrency(payload.gstAmount)),
      line("Grand Total", formatCurrency(payload.grandTotal)),
    ]),
  ];

  return sections.filter(Boolean).join("\n\n");
}

function buildGeneralInquiryMessage(payload: GeneralInquiryPayload): string {
  return payload.message?.trim() || "Hi Outprint! I have a question about your products.";
}

export function buildWhatsAppMessage(payload: WhatsAppPayload): string {
  switch (payload.type) {
    case "product-order":
      return buildProductOrderMessage(payload);
    case "design-request":
      return buildDesignRequestMessage(payload);
    case "cart":
      return buildCartMessage(payload);
    case "general-inquiry":
      return buildGeneralInquiryMessage(payload);
  }
}

function getBusinessNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) {
    throw new Error(
      `Missing ${BUSINESS_NUMBER_ENV} environment variable. Set it in .env.local (see .env.local.example).`
    );
  }

  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    throw new Error(`${BUSINESS_NUMBER_ENV} must contain a valid phone number, got "${raw}".`);
  }

  return digits;
}

/**
 * Builds a `https://wa.me/<BUSINESS_NUMBER>?text=<message>` link for the
 * given payload. Reads the destination number from NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
export function buildWhatsAppLink(payload: WhatsAppPayload): string {
  const message = buildWhatsAppMessage(payload);
  const number = getBusinessNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
