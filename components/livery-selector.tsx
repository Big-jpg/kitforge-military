// components/livery-selector.tsx

"use client";

import { LiveryVariant } from "@/lib/types";
import Image from "next/image";

interface LiverySelectorProps {
  variants: LiveryVariant[];
  selectedVariant: LiveryVariant;
  onSelect: (variant: LiveryVariant) => void;
}

// Country code to flag emoji mapping
const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  AU: "🇦🇺",
  NATO: "🏳️",
  DE: "🇩🇪",
  GB: "🇬🇧",
  FR: "🇫🇷",
  JP: "🇯🇵",
  KR: "🇰🇷",
};

export function LiverySelector({
  variants,
  selectedVariant,
  onSelect,
}: LiverySelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-100 mb-2">
          Select Livery / Camouflage
        </h3>
        <p className="text-sm text-stone-400">
          Choose your preferred camouflage pattern. The 3D model will update to show your selection.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-stone-700 bg-stone-800 hover:border-amber-500/50"
              }`}
            >
              {/* Preview Image */}
              <div className="relative aspect-square mb-3 rounded-md overflow-hidden bg-stone-900">
                <Image
                  src={variant.previewImageUrl}
                  alt={variant.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Country Flag */}
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl">
                  {countryFlags[variant.countryCode] || "🏴"}
                </span>
              </div>

              {/* Name */}
              <div className="text-center">
                <div className="font-medium text-stone-100 text-sm mb-1">
                  {variant.name}
                </div>
                <div className="text-xs text-stone-500">
                  {variant.countryCode}
                </div>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-stone-900"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Livery Info */}
      <div className="p-4 bg-stone-800 border border-stone-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">
            {countryFlags[selectedVariant.countryCode] || "🏴"}
          </span>
          <div>
            <div className="font-medium text-stone-100">
              Selected: {selectedVariant.name}
            </div>
            {selectedVariant.description && (
              <div className="text-sm text-stone-400 mt-1">
                {selectedVariant.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
