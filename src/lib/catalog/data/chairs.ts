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
    images: [
      "https://images.unsplash.com/photo-1723810388971-f8cd6474597f?q=80&w=1200&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1536851784907-ca92b8a12f69?q=80&w=1200&auto=format&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1636487658609-28282bb5a3a0?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      material: "Premium mesh with adaptive lumbar",
      adjustableHeight: true,
      lumbarSupport: true,
      maxLoadKg: 150,
      recommendedUseHoursPerDay: 12,
    },
  },
];
