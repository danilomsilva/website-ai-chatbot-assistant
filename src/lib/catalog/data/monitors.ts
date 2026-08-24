import type { Product } from "@/lib/catalog/types";

export const monitors: Product[] = [
  {
    id: "monitor-essential",
    slug: "fractal-pattern-monitor-essential",
    name: "Fractal Pattern Monitor Essential",
    category: "monitors",
    tier: "essential",
    price: 179,
    tagline: "A clear, honest screen for daily work.",
    description:
      "A 24-inch IPS display with accurate color and comfortable viewing angles — sized right for a single-monitor desk without dominating it.",
    images: [
      "https://images.unsplash.com/photo-1738676524296-364cf18900a8?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      sizeInches: 24,
      resolution: "1920x1080",
      refreshRateHz: 60,
      panelType: "IPS",
      ports: ["HDMI", "VGA"],
    },
  },
  {
    id: "monitor-pro",
    slug: "fractal-pattern-monitor-pro",
    name: "Fractal Pattern Monitor Pro",
    category: "monitors",
    tier: "pro",
    price: 399,
    tagline: "More screen, more clarity, less desk clutter.",
    description:
      "A 27-inch QHD display with a 100Hz refresh rate and USB-C connectivity — sharp enough for detailed work, smooth enough for casual gaming, and able to charge a laptop over the same cable.",
    images: [
      "https://images.unsplash.com/photo-1738676524296-364cf18900a8?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      sizeInches: 27,
      resolution: "2560x1440",
      refreshRateHz: 100,
      panelType: "IPS",
      ports: ["HDMI", "DisplayPort", "USB-C"],
    },
  },
  {
    id: "monitor-elite",
    slug: "fractal-pattern-monitor-elite",
    name: "Fractal Pattern Monitor Elite",
    category: "monitors",
    tier: "elite",
    price: 899,
    tagline: "Reference-grade clarity at competitive speed.",
    description:
      "A 32-inch 4K Mini-LED display with a 165Hz refresh rate, built for competitive gaming and color-critical creative work in the same panel — with enough USB-C power delivery to run a laptop off a single cable.",
    images: [
      "https://images.unsplash.com/photo-1738676524296-364cf18900a8?q=80&w=1200&auto=format&fit=crop",
    ],
    specs: {
      sizeInches: 32,
      resolution: "3840x2160",
      refreshRateHz: 165,
      panelType: "Mini-LED IPS",
      ports: ["HDMI (2x)", "DisplayPort", "USB-C (90W PD)"],
    },
  },
];
