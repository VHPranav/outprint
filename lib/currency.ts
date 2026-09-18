// Single static currency for v1 — no live conversion, no selector state.
// Centralised here so every "ships to UAE, AED" style display reads the
// same value. No prices are calculated or shown on the site — every quote
// comes from the team over WhatsApp.

export const CURRENCY = {
  code: "AED",
  symbol: "AED ",
} as const;
