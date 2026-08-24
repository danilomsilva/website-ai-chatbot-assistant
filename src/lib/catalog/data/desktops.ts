import type { Product } from "@/lib/catalog/types";

export const desktops: Product[] = [
  {
    id: "desktop-essential",
    slug: "fractal-pattern-desktop-essential",
    name: "Fractal Pattern Desktop Essential",
    category: "desktops",
    tier: "essential",
    price: 649,
    tagline: "A quiet, capable machine for everyday work.",
    description:
      "Compact enough for a small desk, capable enough for browsing, office work, and streaming without fuss. No unnecessary bulk, no unnecessary noise.",
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "Quad-core 2.4GHz",
      ramGb: 8,
      storageGb: 512,
      gpu: "Integrated graphics",
      formFactor: "Compact tower",
      ports: ["USB-C", "USB-A (4x)", "HDMI", "Ethernet"],
    },
  },
  {
    id: "desktop-pro",
    slug: "fractal-pattern-desktop-pro",
    name: "Fractal Pattern Desktop Pro",
    category: "desktops",
    tier: "pro",
    price: 1499,
    tagline: "Built to keep up with real multitasking.",
    description:
      "Dedicated graphics and a mid-tower chassis with real airflow, for hybrid work that spills into creative projects — video calls, spreadsheets, and photo or video editing without the fan spinning up in protest.",
    images: [
      "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "8-core 3.4GHz",
      ramGb: 16,
      storageGb: 1024,
      gpu: "8GB dedicated graphics",
      formFactor: "Mid tower",
      ports: ["USB-C", "USB-A (6x)", "HDMI", "DisplayPort", "Ethernet"],
    },
  },
  {
    id: "desktop-elite",
    slug: "fractal-pattern-desktop-elite",
    name: "Fractal Pattern Desktop Elite",
    category: "desktops",
    tier: "elite",
    price: 2799,
    tagline: "No compromises, built for sustained load.",
    description:
      "A full tower with liquid cooling and high-end components for competitive gaming and heavy creative workloads that run for hours, not minutes — built to sustain peak performance rather than just hit it briefly.",
    images: [
      "https://images.unsplash.com/photo-1761131745229-763bffe31248?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "16-core 4.0GHz",
      ramGb: 64,
      storageGb: 2048,
      gpu: "16GB dedicated graphics",
      formFactor: "Full tower, liquid-cooled",
      ports: [
        "USB-C (2x, Thunderbolt)",
        "USB-A (8x)",
        "HDMI",
        "DisplayPort (2x)",
        "Ethernet",
      ],
    },
  },
];
