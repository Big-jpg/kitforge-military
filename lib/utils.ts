// lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)} AUD`;
}

export function getVehicleTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    plane: "Aircraft",
    helicopter: "Helicopter",
    tank: "Tank",
    "light-vehicle": "Light Vehicle",
    destroyer: "Destroyer",
    submarine: "Submarine",
  };
  return labels[type] || type;
}

export function getKitSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    "business-card": "Business Card",
    postcard: "Postcard",
    "20x20": "20cm × 20cm",
    "30x30": "30cm × 30cm",
  };
  return labels[size] || size;
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 border-green-300",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    advanced: "bg-red-100 text-red-800 border-red-300",
  };
  return colors[difficulty] || "bg-gray-100 text-gray-800 border-gray-300";
}
