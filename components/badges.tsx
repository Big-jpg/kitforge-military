// components/badges.tsx

import { cn, getDifficultyColor, getKitSizeLabel, getVehicleTypeLabel } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border",
        className
      )}
    >
      {children}
    </span>
  );
}

export function VehicleTypeBadge({ type }: { type: string }) {
  return (
    <Badge className="bg-stone-800 text-amber-500 border-stone-700">
      {getVehicleTypeLabel(type)}
    </Badge>
  );
}

export function KitSizeBadge({ size }: { size: string }) {
  return (
    <Badge className="bg-stone-700 text-stone-200 border-stone-600">
      {getKitSizeLabel(size)}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <Badge className={getDifficultyColor(difficulty)}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
}
