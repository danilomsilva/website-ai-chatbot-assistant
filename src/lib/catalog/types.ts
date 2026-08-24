export type Category =
  | "laptops"
  | "desktops"
  | "monitors"
  | "desks"
  | "chairs"
  | "accessories";

export type Tier = "essential" | "pro" | "elite";

interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  tier: Tier;
  price: number;
  tagline: string;
  description: string;
  images: string[];
}

export interface LaptopSpecs {
  cpu: string;
  ramGb: number;
  storageGb: number;
  gpu: string;
  displaySizeInches: number;
  displayResolution: string;
  batteryLifeHours: number;
  weightKg: number;
  ports: string[];
}

export interface DesktopSpecs {
  cpu: string;
  ramGb: number;
  storageGb: number;
  gpu: string;
  formFactor: string;
  ports: string[];
}

export interface MonitorSpecs {
  sizeInches: number;
  resolution: string;
  refreshRateHz: number;
  panelType: string;
  ports: string[];
}

export interface DeskSpecs {
  widthCm: number;
  depthCm: number;
  heightAdjustable: boolean;
  material: string;
  maxLoadKg: number;
  hasCableManagement: boolean;
}

export interface ChairSpecs {
  material: string;
  adjustableHeight: boolean;
  lumbarSupport: boolean;
  maxLoadKg: number;
  recommendedUseHoursPerDay: number;
}

export interface AccessorySpecs {
  subtype: string;
  connectivity: string;
  compatibleWith?: string[];
}

export type Product =
  | (BaseProduct & { category: "laptops"; specs: LaptopSpecs })
  | (BaseProduct & { category: "desktops"; specs: DesktopSpecs })
  | (BaseProduct & { category: "monitors"; specs: MonitorSpecs })
  | (BaseProduct & { category: "desks"; specs: DeskSpecs })
  | (BaseProduct & { category: "chairs"; specs: ChairSpecs })
  | (BaseProduct & { category: "accessories"; specs: AccessorySpecs });
