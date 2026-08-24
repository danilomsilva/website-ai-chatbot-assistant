import type { Product } from "@/lib/catalog/types";

export const desks: Product[] = [
  {
    id: "desk-essential",
    slug: "fractal-pattern-desk-essential",
    name: "Fractal Pattern Desk Essential",
    category: "desks",
    tier: "essential",
    price: 229,
    tagline: "A solid surface, sized to fit anywhere.",
    description:
      "A fixed-height desk with a durable laminate surface — straightforward, sturdy, and sized to fit in a home office or bedroom corner without dominating the room.",
    images: [
      "https://images.unsplash.com/photo-1746021535489-00edc5efb203?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      widthCm: 120,
      depthCm: 60,
      heightAdjustable: false,
      material: "Engineered wood laminate",
      maxLoadKg: 40,
      hasCableManagement: false,
    },
  },
  {
    id: "desk-pro",
    slug: "fractal-pattern-desk-pro",
    name: "Fractal Pattern Desk Pro",
    category: "desks",
    tier: "pro",
    price: 449,
    tagline: "Room to work, and room to move.",
    description:
      "A larger desk with a manual crank height adjustment and built-in cable management — enough surface for a full multi-monitor setup, and enough flexibility to switch between sitting and standing through the day.",
    images: [
      "https://images.unsplash.com/photo-1747006384626-9a14687639e2?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      widthCm: 140,
      depthCm: 70,
      heightAdjustable: true,
      material: "Solid-core wood veneer",
      maxLoadKg: 70,
      hasCableManagement: true,
    },
  },
  {
    id: "desk-elite",
    slug: "fractal-pattern-desk-elite",
    name: "Fractal Pattern Desk Elite",
    category: "desks",
    tier: "elite",
    price: 899,
    tagline: "The anchor of a serious setup.",
    description:
      "A dual-motor electric standing desk with a full-width cable channel, built to carry a heavy multi-monitor and dual-PC setup and move it smoothly between sitting and standing at the press of a button.",
    images: [
      "https://images.unsplash.com/photo-1677272272512-d7e7946aafeb?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      widthCm: 160,
      depthCm: 80,
      heightAdjustable: true,
      material: "Bamboo composite",
      maxLoadKg: 100,
      hasCableManagement: true,
    },
  },
];
