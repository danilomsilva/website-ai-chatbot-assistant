import type { Product } from "@/lib/catalog/types";

export const accessories: Product[] = [
  {
    id: "accessory-essential",
    slug: "fractal-pattern-hub-essential",
    name: "Fractal Pattern Hub Essential",
    category: "accessories",
    tier: "essential",
    price: 39,
    tagline: "One cable, a few more ports.",
    description:
      "A simple USB-C hub that adds the ports most laptops leave out — useful the moment you plug in a second monitor or a wired mouse.",
    images: ["/images/accessories/fractal-pattern-hub-essential-1.jpg"],
    specs: {
      subtype: "USB-C Hub",
      connectivity: "USB-C (single cable)",
    },
  },
  {
    id: "accessory-pro",
    slug: "fractal-pattern-dock-pro",
    name: "Fractal Pattern Dock Pro",
    category: "accessories",
    tier: "pro",
    price: 149,
    tagline: "Turn any laptop into a full workstation.",
    description:
      "A Thunderbolt 3 docking station that connects a laptop to a monitor, keyboard, mouse, and ethernet with a single cable — built for a hybrid setup you sit down at every day.",
    images: ["/images/accessories/fractal-pattern-dock-pro-1.jpg"],
    specs: {
      subtype: "Docking Station",
      connectivity: "USB-C (Thunderbolt 3)",
      compatibleWith: ["laptops", "desktops"],
    },
  },
  {
    id: "accessory-elite",
    slug: "fractal-pattern-dock-elite",
    name: "Fractal Pattern Dock Elite",
    category: "accessories",
    tier: "elite",
    price: 299,
    tagline: "The single connection point for a serious setup.",
    description:
      "A USB4/Thunderbolt 4 dock built for multi-monitor, high-refresh setups — enough bandwidth and power delivery to drive an Elite-tier monitor and charge an Elite-tier laptop from the same cable.",
    images: ["/images/accessories/fractal-pattern-dock-elite-1.jpg"],
    specs: {
      subtype: "Docking Station",
      connectivity: "USB4 (Thunderbolt 4)",
      compatibleWith: ["laptops", "desktops", "monitors"],
    },
  },
];
