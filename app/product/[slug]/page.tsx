// app/product/[slug]/page.tsx

"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/lib/data";
import { LiveryVariant } from "@/lib/types";
import { VehicleTypeBadge, KitSizeBadge, DifficultyBadge } from "@/components/badges";
import { formatPrice } from "@/lib/utils";
import { ModelViewer } from "@/components/model-viewer";
import { LiverySelector } from "@/components/livery-selector";
import { addToCart } from "@/lib/shopify";
import { Clock, Package, Wrench, Ruler } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedLivery, setSelectedLivery] = useState<LiveryVariant | undefined>(
    product.liveryVariants?.[0]
  );
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "build">("overview");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart({
        shopifyProductHandle: product.shopifyProductHandle || product.slug,
        variantId: selectedLivery
          ? product.shopifyVariantMapping?.[selectedLivery.id]
          : undefined,
        quantity: 1,
        liveryVariantId: selectedLivery?.id,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images & 3D Viewer */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-stone-900 rounded-lg overflow-hidden border border-stone-800">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 3D Model Viewer */}
            {product.modelUrl && (
              <div className="bg-stone-900 rounded-lg border border-stone-800 p-4">
                <h3 className="text-lg font-semibold mb-4">3D Model Preview</h3>
                <ModelViewer
                  modelUrl={product.modelUrl}
                  textureUrl={selectedLivery?.textureUrl}
                  className="h-[400px]"
                />
                <p className="text-xs text-stone-500 mt-2 text-center">
                  Use mouse to rotate, scroll to zoom
                </p>
              </div>
            )}

            {/* Additional Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square bg-stone-900 rounded-lg overflow-hidden border border-stone-800"
                  >
                    <Image src={image} alt={`${product.name} ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <VehicleTypeBadge type={product.vehicleType} />
                <KitSizeBadge size={product.kitSize} />
                <DifficultyBadge difficulty={product.difficulty} />
              </div>
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-xl text-stone-400 mb-4">{product.shortDescription}</p>
              <div className="text-3xl font-bold text-amber-500">
                {formatPrice(product.basePriceAUD)}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-stone-900 rounded-lg border border-stone-800">
                <Package className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="text-sm text-stone-400">Parts</div>
                  <div className="font-semibold">{product.partsCount}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-stone-900 rounded-lg border border-stone-800">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="text-sm text-stone-400">Print Time</div>
                  <div className="font-semibold">~{product.printTimeEstimateHours}h</div>
                </div>
              </div>
            </div>

            {/* Livery Selector */}
            {product.liveryVariants && product.liveryVariants.length > 0 && (
              <div className="p-6 bg-stone-900 rounded-lg border border-stone-800">
                <LiverySelector
                  variants={product.liveryVariants}
                  selectedVariant={selectedLivery || product.liveryVariants[0]}
                  onSelect={setSelectedLivery}
                />
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full py-4 bg-amber-500 text-stone-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>

            {/* Tabs */}
            <div className="border-t border-stone-800 pt-6">
              <div className="flex space-x-4 mb-6 border-b border-stone-800">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "specs", label: "Specifications" },
                  { id: "build", label: "Build Notes" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`pb-3 px-1 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                {activeTab === "overview" && (
                  <div className="text-stone-300">
                    <p>{product.longDescription}</p>
                  </div>
                )}
                {activeTab === "specs" && (
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-stone-800">
                      <span className="text-stone-400">Vehicle Type</span>
                      <span className="text-stone-100 font-medium">
                        {product.vehicleType.charAt(0).toUpperCase() + product.vehicleType.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-800">
                      <span className="text-stone-400">Kit Size</span>
                      <span className="text-stone-100 font-medium">{product.kitSize}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-800">
                      <span className="text-stone-400">Difficulty</span>
                      <span className="text-stone-100 font-medium capitalize">{product.difficulty}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-800">
                      <span className="text-stone-400">Parts Count</span>
                      <span className="text-stone-100 font-medium">{product.partsCount}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-800">
                      <span className="text-stone-400">Print Time</span>
                      <span className="text-stone-100 font-medium">~{product.printTimeEstimateHours} hours</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-stone-400">Recommended Material</span>
                      <span className="text-stone-100 font-medium">PLA / PLA+</span>
                    </div>
                  </div>
                )}
                {activeTab === "build" && (
                  <div className="text-stone-300 space-y-4">
                    <p>
                      <strong>Assembly Tips:</strong> Carefully remove parts from the sprue using flush cutters.
                      Sand any rough edges for best fit. No glue required - parts snap together.
                    </p>
                    <p>
                      <strong>Recommended Settings:</strong> 0.2mm layer height, 20% infill, supports not required.
                      Print with the sprue card flat on the bed.
                    </p>
                    <p>
                      <strong>Finishing:</strong> Model can be painted or hydro-dipped for custom liveries.
                      Includes display stand for desktop presentation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
