// app/catalog/page.tsx

"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import { VehicleType, KitSize } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { FilterBar } from "@/components/filter-bar";

export default function CatalogPage() {
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<VehicleType[]>([]);
  const [selectedKitSizes, setSelectedKitSizes] = useState<KitSize[]>([]);
  const [sortBy, setSortBy] = useState("name-asc");

  const handleVehicleTypeToggle = (type: VehicleType) => {
    setSelectedVehicleTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleKitSizeToggle = (size: KitSize) => {
    setSelectedKitSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by vehicle type
    if (selectedVehicleTypes.length > 0) {
      filtered = filtered.filter((p) => selectedVehicleTypes.includes(p.vehicleType));
    }

    // Filter by kit size
    if (selectedKitSizes.length > 0) {
      filtered = filtered.filter((p) => selectedKitSizes.includes(p.kitSize));
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.basePriceAUD - b.basePriceAUD);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.basePriceAUD - a.basePriceAUD);
        break;
      case "difficulty-asc":
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case "difficulty-desc":
        const difficultyOrderDesc = { beginner: 3, intermediate: 2, advanced: 1 };
        sorted.sort((a, b) => difficultyOrderDesc[a.difficulty] - difficultyOrderDesc[b.difficulty]);
        break;
    }

    return sorted;
  }, [selectedVehicleTypes, selectedKitSizes, sortBy]);

  return (
    <div className="min-h-screen bg-stone-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Kit Catalog</h1>
          <p className="text-stone-400">
            Browse our collection of 3D-printed military kit cards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterBar
              selectedVehicleTypes={selectedVehicleTypes}
              selectedKitSizes={selectedKitSizes}
              sortBy={sortBy}
              onVehicleTypeToggle={handleVehicleTypeToggle}
              onKitSizeToggle={handleKitSizeToggle}
              onSortChange={setSortBy}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-stone-400">
                  No kits found for this combination
                </p>
                <p className="text-stone-500 mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-stone-400">
                  Showing {filteredAndSortedProducts.length} of {products.length} kits
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
