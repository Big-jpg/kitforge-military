// lib/types.ts

export type VehicleType =
  | "plane"
  | "helicopter"
  | "tank"
  | "light-vehicle"
  | "destroyer"
  | "submarine";

export type KitSize =
  | "business-card"
  | "postcard"
  | "20x20"
  | "30x30";

export type LiveryVariant = {
  id: string;
  name: string;
  countryCode: string;
  description?: string;
  previewImageUrl: string;
  textureUrl: string; // URL to camouflage texture pattern
};

export type KitProduct = {
  id: string;
  slug: string;
  name: string;
  vehicleType: VehicleType;
  kitSize: KitSize;
  shortDescription: string;
  longDescription: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  partsCount: number;
  printTimeEstimateHours: number;
  images: string[];
  modelUrl?: string; // Path to 3MF file
  basePriceAUD: number;
  liveryVariants?: LiveryVariant[];
  shopifyProductHandle?: string;
  shopifyVariantMapping?: Record<string, string>;
};
