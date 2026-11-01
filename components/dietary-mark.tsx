import React from "react"
import { cn } from "@/lib/utils"

interface DietaryMarkProps {
  isEggless?: boolean
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DietaryMark({
  isEggless = true,
  showLabel = false,
  size = "md",
  className,
}: DietaryMarkProps) {
  const sizeClasses = {
    sm: "w-3 h-3 p-0.5",
    md: "w-4 h-4 p-0.5",
    lg: "w-5 h-5 p-1",
  }

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "rounded-xs border flex items-center justify-center shrink-0",
          sizeClasses[size],
          isEggless
            ? "border-green-600 bg-white dark:bg-zinc-900"
            : "border-amber-700 bg-white dark:bg-zinc-900"
        )}
        title={isEggless ? "100% Pure Veg / Eggless" : "Contains Egg"}
      >
        <span
          className={cn(
            "rounded-full",
            dotSizeClasses[size],
            isEggless ? "bg-green-600" : "bg-amber-700"
          )}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "text-xs font-medium tracking-tight",
            isEggless ? "text-green-700 dark:text-green-400" : "text-amber-800 dark:text-amber-300"
          )}
        >
          {isEggless ? "Eggless / 100% Veg" : "Contains Egg"}
        </span>
      )}
    </div>
  )
}
