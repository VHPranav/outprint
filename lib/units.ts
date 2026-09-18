// Length-unit conversion for the custom-size configurator input. Design
// sizing only understands inches, so any mm/cm entry gets converted before
// it's used to resolve a design canvas or run a resolution check.

export type LengthUnit = "in" | "mm" | "cm";

const MM_PER_INCH = 25.4;
const CM_PER_INCH = 2.54;

export const LENGTH_UNITS: { value: LengthUnit; label: string }[] = [
  { value: "in", label: "in" },
  { value: "cm", label: "cm" },
  { value: "mm", label: "mm" },
];

export function toInches(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "in":
      return value;
    case "cm":
      return value / CM_PER_INCH;
    case "mm":
      return value / MM_PER_INCH;
  }
}
