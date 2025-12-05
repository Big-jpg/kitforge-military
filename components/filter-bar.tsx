// components/filter-bar.tsx

"use client";

import { VehicleType, KitSize } from "@/lib/types";
import { getVehicleTypeLabel, getKitSizeLabel } from "@/lib/utils";

interface FilterBarProps {
  selectedVehicleTypes: VehicleType[];
  selectedKitSizes: KitSize[];
  sortBy: string;
  onVehicleTypeToggle: (type: VehicleType) => void;
  onKitSizeToggle: (size: KitSize) => void;
  onSortChange: (sort: string) => void;
}

const vehicleTypes: VehicleType[] = [
  "plane",
  "helicopter",
  "tank",
  "light-vehicle",
  "destroyer",
  "submarine",
];

const kitSizes: KitSize[] = ["business-card", "postcard", "20x20", "30x30"];

export function FilterBar({
  selectedVehicleTypes,
  selectedKitSizes,
  sortBy,
  onVehicleTypeToggle,
  onKitSizeToggle,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="bg-stone-800 border border-stone-700 rounded-lg p-6 space-y-6">
      {/* Vehicle Type Filter */}
      <div>
        <h3 className="text-sm font-semibold text-stone-100 mb-3">Vehicle Type</h3>
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((type) => (
            <button
              key={type}
              onClick={() => onVehicleTypeToggle(type)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                selectedVehicleTypes.includes(type)
                  ? "bg-amber-500 text-stone-900 border-amber-500"
                  : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500"
              }`}
            >
              {getVehicleTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Kit Size Filter */}
      <div>
        <h3 className="text-sm font-semibold text-stone-100 mb-3">Kit Size</h3>
        <div className="flex flex-wrap gap-2">
          {kitSizes.map((size) => (
            <button
              key={size}
              onClick={() => onKitSizeToggle(size)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                selectedKitSizes.includes(size)
                  ? "bg-amber-500 text-stone-900 border-amber-500"
                  : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500"
              }`}
            >
              {getKitSizeLabel(size)}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-stone-100 mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-md text-stone-200 text-sm focus:outline-none focus:border-amber-500"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="difficulty-asc">Difficulty (Easy to Hard)</option>
          <option value="difficulty-desc">Difficulty (Hard to Easy)</option>
        </select>
      </div>
    </div>
  );
}
