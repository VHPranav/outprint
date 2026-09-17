// Single static currency for v1 — no live conversion, no selector state.
// Centralised here so the header display and every price string in the app
// format the same way.

export const CURRENCY = {
  code: "AED",
  symbol: "AED ",
} as const;

export function formatCurrency(amount: number): string {
  return `${CURRENCY.symbol}${amount.toFixed(2)}`;
}
