import type { Product } from "@/lib/catalog/types";

export const chairs: Product[] = [
  {
    id: "chair-essential",
    slug: "fractal-pattern-chair-essential",
    name: "Fractal Pattern Chair Essential",
    category: "chairs",
    tier: "essential",
    price: 179,
    tagline: "Comfortable enough for a few hours at a time.",
    description:
      "A breathable mesh-back chair with basic height adjustment — a solid upgrade over a kitchen chair for shorter work sessions.",
    images: ["/images/chairs/fractal-pattern-chair-essential-1.jpg"],
    specs: {
      material: "Mesh back, foam seat",
      adjustableHeight: true,
      lumbarSupport: false,
      maxLoadKg: 100,
      recommendedUseHoursPerDay: 4,
    },
  },
  {
    id: "chair-pro",
    slug: "fractal-pattern-chair-pro",
    name: "Fractal Pattern Chair Pro",
    category: "chairs",
    tier: "pro",
    price: 399,
    tagline: "Built for a full workday.",
    description:
      "Molded foam, breathable mesh, and adjustable lumbar support — designed to stay comfortable through a full 8-hour workday, not just the first hour of it.",
    images: ["/images/chairs/fractal-pattern-chair-pro-1.jpg"],
    specs: {
      material: "Breathable mesh, molded foam",
      adjustableHeight: true,
      lumbarSupport: true,
      maxLoadKg: 120,
      recommendedUseHoursPerDay: 8,
    },
  },
  {
    id: "chair-elite",
    slug: "fractal-pattern-chair-elite",
    name: "Fractal Pattern Chair Elite",
    category: "chairs",
    tier: "elite",
    price: 799,
    tagline: "For the long sessions that actually matter.",
    description:
      "Premium mesh with adaptive lumbar support, built for extended competitive gaming or work sessions that run well past a normal workday without leaving you sore.",
    images: ["/images/chairs/fractal-pattern-chair-elite-1.jpg"],
    specs: {
      material: "Premium mesh with adaptive lumbar",
      adjustableHeight: true,
      lumbarSupport: true,
      maxLoadKg: 150,
      recommendedUseHoursPerDay: 12,
    },
  },
];
