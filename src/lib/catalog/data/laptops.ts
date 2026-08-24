import type { Product } from "@/lib/catalog/types";

export const laptops: Product[] = [
  {
    id: "laptop-essential",
    slug: "fractal-pattern-laptop-essential",
    name: "Fractal Pattern Laptop Essential",
    category: "laptops",
    tier: "essential",
    price: 799,
    tagline: "Everyday computing, engineered simple.",
    description:
      "A dependable daily driver for browsing, documents, and video calls. Essential trims away what you don't need so the rest is solid: a crisp 14-inch display, all-day battery, and a keyboard built for long typing sessions.",
    images: [
      "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "Quad-core 2.4GHz",
      ramGb: 8,
      storageGb: 256,
      gpu: "Integrated graphics",
      displaySizeInches: 14,
      displayResolution: "1920x1080",
      batteryLifeHours: 10,
      weightKg: 1.4,
      ports: ["USB-C", "USB-A", "HDMI", "3.5mm audio"],
    },
  },
  {
    id: "laptop-pro",
    slug: "fractal-pattern-laptop-pro",
    name: "Fractal Pattern Laptop Pro",
    category: "laptops",
    tier: "pro",
    price: 1399,
    tagline: "Built for hybrid work that doesn't slow down.",
    description:
      "More cores, more memory, and a sharper 15.6-inch display for the work that piles up — spreadsheets, multi-tab research, video calls, and light creative work, all without the laptop becoming the bottleneck.",
    images: [
      "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "8-core 3.2GHz",
      ramGb: 16,
      storageGb: 512,
      gpu: "6GB dedicated graphics",
      displaySizeInches: 15.6,
      displayResolution: "2560x1440",
      batteryLifeHours: 12,
      weightKg: 1.6,
      ports: ["USB-C (2x)", "USB-A", "HDMI", "SD card reader", "3.5mm audio"],
    },
  },
  {
    id: "laptop-elite",
    slug: "fractal-pattern-laptop-elite",
    name: "Fractal Pattern Laptop Elite",
    category: "laptops",
    tier: "elite",
    price: 2199,
    tagline: "Desktop-class performance, untethered.",
    description:
      "The top of the line for competitive gaming and demanding creative workloads: a 12-core processor, dedicated graphics with 12GB of memory, and a 16-inch 4K display, in a chassis built to keep it all cool under sustained load.",
    images: [
      "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      cpu: "12-core 3.8GHz",
      ramGb: 32,
      storageGb: 1024,
      gpu: "12GB dedicated graphics",
      displaySizeInches: 16,
      displayResolution: "3840x2160",
      batteryLifeHours: 9,
      weightKg: 1.9,
      ports: [
        "USB-C (2x, Thunderbolt)",
        "USB-A (2x)",
        "HDMI",
        "SD card reader",
        "3.5mm audio",
      ],
    },
  },
];
