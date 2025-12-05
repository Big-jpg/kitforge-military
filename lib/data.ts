// lib/data.ts

import { KitProduct, LiveryVariant } from "./types";

// Livery variants for F-22 Raptor
const f22Liveries: LiveryVariant[] = [
  {
    id: "us-gray",
    name: "USAF Low Visibility Gray",
    countryCode: "US",
    description: "Standard US Air Force stealth gray finish",
    previewImageUrl: "/images/pasted_file_R6fu0Y_image.png",
    textureUrl: "/textures/gray-camo.jpg",
  },
  {
    id: "aus-desert",
    name: "RAAF Desert Camouflage",
    countryCode: "AU",
    description: "Australian desert operations camouflage",
    previewImageUrl: "/images/pasted_file_00kyde_image.png",
    textureUrl: "/textures/desert-camo.jpg",
  },
  {
    id: "nato-woodland",
    name: "NATO Woodland",
    countryCode: "NATO",
    description: "Standard NATO woodland camouflage pattern",
    previewImageUrl: "/images/pasted_file_FUidnu_image.png",
    textureUrl: "/textures/woodland-camo.jpg",
  },
  {
    id: "night-ops",
    name: "Night Operations Black",
    countryCode: "US",
    description: "Matte black finish for night operations",
    previewImageUrl: "/images/pasted_file_FUidnu_image.png",
    textureUrl: "/textures/black-camo.jpg",
  },
];

export const products: KitProduct[] = [
  {
    id: "f22-raptor",
    slug: "f22-raptor",
    name: "F-22 Raptor",
    vehicleType: "plane",
    kitSize: "30x30",
    shortDescription: "Fifth-generation stealth air superiority fighter",
    longDescription:
      "The Lockheed Martin F-22 Raptor is a fifth-generation, single-seat, twin-engine, stealth tactical fighter aircraft. This precision-engineered kit card features incredible detail including movable control surfaces, landing gear, and display stand. Perfect for aviation enthusiasts and collectors.",
    buildTimeMinutes: 45,
    buildComplexity: "advanced",
    images: [
      "/images/f22-thumbnail.png",
      "/images/pasted_file_R6fu0Y_image.png",
      "/images/pasted_file_S4HL5R_image.png",
      "/images/pasted_file_FUidnu_image.png",
      "/images/pasted_file_Vmhtnh_image.png",
    ],
    modelUrl: "/models/F-22_v33_kit.3mf",
    basePriceAUD: 45.99,
    liveryVariants: f22Liveries,
    shopifyProductHandle: "f22-raptor-kit-card",
    shopifyVariantMapping: {
      "us-gray": "variant-001",
      "aus-desert": "variant-002",
      "nato-woodland": "variant-003",
      "night-ops": "variant-004",
    },
  },
  {
    id: "ah64-apache",
    slug: "ah64-apache",
    name: "AH-64 Apache",
    vehicleType: "helicopter",
    kitSize: "30x30",
    shortDescription: "Attack helicopter with twin-engine design",
    longDescription:
      "The Boeing AH-64 Apache is an American twin-turboshaft attack helicopter. Features rotating main rotor, tail rotor, and detailed cockpit. An iconic military helicopter that makes an impressive display piece.",
    buildTimeMinutes: 50,
    buildComplexity: "advanced",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 48.99,
    shopifyProductHandle: "ah64-apache-kit-card",
  },
  {
    id: "m1-abrams",
    slug: "m1-abrams",
    name: "M1 Abrams Tank",
    vehicleType: "tank",
    kitSize: "20x20",
    shortDescription: "Main battle tank of the United States Army",
    longDescription:
      "The M1 Abrams is a third-generation American main battle tank. This kit features a rotating turret, elevating main gun, and detailed track assemblies. Perfect for armor enthusiasts.",
    buildTimeMinutes: 35,
    buildComplexity: "intermediate",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 32.99,
    shopifyProductHandle: "m1-abrams-kit-card",
  },
  {
    id: "humvee",
    slug: "humvee",
    name: "M998 HMMWV",
    vehicleType: "light-vehicle",
    kitSize: "postcard",
    shortDescription: "High Mobility Multipurpose Wheeled Vehicle",
    longDescription:
      "The iconic HMMWV (Humvee) is a family of light, four-wheel drive military vehicles. Features opening doors, detailed interior, and roof-mounted weapon system. Great starter kit.",
    buildTimeMinutes: 20,
    buildComplexity: "beginner",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 24.99,
    shopifyProductHandle: "humvee-kit-card",
  },
  {
    id: "arleigh-burke",
    slug: "arleigh-burke",
    name: "Arleigh Burke Destroyer",
    vehicleType: "destroyer",
    kitSize: "30x30",
    shortDescription: "Guided missile destroyer of the US Navy",
    longDescription:
      "The Arleigh Burke class is a United States Navy class of guided missile destroyers. Features detailed superstructure, radar arrays, and weapon systems. An impressive naval vessel for your collection.",
    buildTimeMinutes: 60,
    buildComplexity: "advanced",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 52.99,
    shopifyProductHandle: "arleigh-burke-kit-card",
  },
  {
    id: "virginia-submarine",
    slug: "virginia-submarine",
    name: "Virginia-class Submarine",
    vehicleType: "submarine",
    kitSize: "30x30",
    shortDescription: "Nuclear-powered fast attack submarine",
    longDescription:
      "The Virginia class is a class of nuclear-powered fast attack submarines. Features detailed hull, conning tower, and propulsion systems. A unique addition to any military model collection.",
    buildTimeMinutes: 40,
    buildComplexity: "intermediate",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 44.99,
    shopifyProductHandle: "virginia-submarine-kit-card",
  },
  {
    id: "f35-lightning",
    slug: "f35-lightning",
    name: "F-35 Lightning II",
    vehicleType: "plane",
    kitSize: "20x20",
    shortDescription: "Multirole stealth fighter aircraft",
    longDescription:
      "The Lockheed Martin F-35 Lightning II is a family of single-seat, single-engine, stealth multirole fighters. Compact kit with excellent detail and multiple configuration options.",
    buildTimeMinutes: 30,
    buildComplexity: "intermediate",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 36.99,
    shopifyProductHandle: "f35-lightning-kit-card",
  },
  {
    id: "leopard-2",
    slug: "leopard-2",
    name: "Leopard 2 Tank",
    vehicleType: "tank",
    kitSize: "20x20",
    shortDescription: "German main battle tank",
    longDescription:
      "The Leopard 2 is a third generation German main battle tank. Features rotating turret, detailed armor plating, and realistic track assemblies. Excellent for NATO armor collections.",
    buildTimeMinutes: 35,
    buildComplexity: "intermediate",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 34.99,
    shopifyProductHandle: "leopard-2-kit-card",
  },
  {
    id: "uh60-blackhawk",
    slug: "uh60-blackhawk",
    name: "UH-60 Black Hawk",
    vehicleType: "helicopter",
    kitSize: "postcard",
    shortDescription: "Medium-lift utility helicopter",
    longDescription:
      "The Sikorsky UH-60 Black Hawk is a four-blade, twin-engine, medium-lift utility helicopter. Compact postcard-sized kit perfect for beginners, with rotating rotors and detailed fuselage.",
    buildTimeMinutes: 25,
    buildComplexity: "beginner",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 26.99,
    shopifyProductHandle: "uh60-blackhawk-kit-card",
  },
  {
    id: "mrap",
    slug: "mrap",
    name: "MRAP MaxxPro",
    vehicleType: "light-vehicle",
    kitSize: "business-card",
    shortDescription: "Mine-Resistant Ambush Protected vehicle",
    longDescription:
      "The MaxxPro MRAP is designed to survive IED attacks and ambushes. Business card sized kit, perfect for quick builds and gifts. Features detailed armor plating and V-shaped hull.",
    buildTimeMinutes: 15,
    buildComplexity: "beginner",
    images: ["/images/f22-thumbnail.png"],
    basePriceAUD: 18.99,
    shopifyProductHandle: "mrap-kit-card",
  },
];

// Helper functions
export function getProductBySlug(slug: string): KitProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByVehicleType(type: string): KitProduct[] {
  return products.filter((p) => p.vehicleType === type);
}

export function getProductsByKitSize(size: string): KitProduct[] {
  return products.filter((p) => p.kitSize === size);
}
