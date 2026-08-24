export function humanizeSpecKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function formatSpecValue(value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

export function formatPrice(price: number): string {
  return `€${price.toLocaleString("en-US")}`;
}

export function tierBadgeClasses(tier: string): string {
  switch (tier) {
    case "essential":
      return "border border-neon-cyan/60 text-neon-cyan bg-neon-cyan/10";
    case "pro":
      return "border border-neon-magenta/60 text-neon-magenta bg-neon-magenta/10";
    case "elite":
      return "border border-neon-purple/60 text-neon-purple bg-neon-purple/10";
    default:
      return "border border-muted/60 text-muted bg-muted/10";
  }
}
