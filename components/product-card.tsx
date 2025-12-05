// components/product-card.tsx

import Link from "next/link";
import Image from "next/image";
import { KitProduct } from "@/lib/types";
import { VehicleTypeBadge, KitSizeBadge, ComplexityBadge } from "./badges";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: KitProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-stone-800 border border-stone-700 rounded-lg overflow-hidden hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
    >
      {/* Image */}
      <div className="relative aspect-square bg-stone-900 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <VehicleTypeBadge type={product.vehicleType} />
          <KitSizeBadge size={product.kitSize} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-400 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-700">
          <ComplexityBadge complexity={product.buildComplexity} />
          <span className="text-lg font-bold text-amber-500">
            {formatPrice(product.basePriceAUD)}
          </span>
        </div>

        {/* Build Time */}
        <div className="text-xs text-stone-500">
          <span>~{product.buildTimeMinutes} min build</span>
        </div>
      </div>
    </Link>
  );
}
